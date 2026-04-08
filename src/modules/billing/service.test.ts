import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/env', () => ({
  env: {
    NODE_ENV: 'test',
    DATABASE_URL: 'postgres://localhost/test',
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'test-secret',
    ROBOKASSA_MERCHANT_LOGIN: 'merchant',
    ROBOKASSA_PASSWORD_1: 'password-1',
    ROBOKASSA_PASSWORD_2: 'password-2',
    ROBOKASSA_PAYMENT_URL: 'https://auth.robokassa.ru/Merchant/Index.aspx',
    ROBOKASSA_IS_TEST: true,
  },
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/modules/enrollments', () => ({
  enrollUserInPaidCourse: vi.fn(),
}));

vi.mock('@/modules/enrollments/queries', () => ({
  findEnrollmentRow: vi.fn(),
}));

vi.mock('@/modules/courses/queries', () => ({
  getCourseAccessRowById: vi.fn(),
}));

vi.mock('./queries', () => ({
  findOrderRowById: vi.fn(),
  findOrderDetailRowById: vi.fn(),
  listOrderRows: vi.fn(),
}));

vi.mock('./repository', () => ({
  createOrReusePendingOrderRow: vi.fn(),
  updateOrderStatusRow: vi.fn(),
  upsertPaymentEventRow: vi.fn(),
}));

import { getCourseAccessRowById } from '@/modules/courses/queries';
import { enrollUserInPaidCourse } from '@/modules/enrollments';
import { findEnrollmentRow } from '@/modules/enrollments/queries';

import { findOrderRowById } from './queries';
import { createOrReusePendingOrderRow, updateOrderStatusRow, upsertPaymentEventRow } from './repository';
import { createPaidCoursePurchaseIntent, handleRobokassaResult } from './service';

const mockGetCourseAccessRowById = vi.mocked(getCourseAccessRowById);
const mockFindEnrollmentRow = vi.mocked(findEnrollmentRow);
const mockFindOrderRowById = vi.mocked(findOrderRowById);
const mockCreateOrReusePendingOrderRow = vi.mocked(createOrReusePendingOrderRow);
const mockUpdateOrderStatusRow = vi.mocked(updateOrderStatusRow);
const mockUpsertPaymentEventRow = vi.mocked(upsertPaymentEventRow);
const mockEnrollUserInPaidCourse = vi.mocked(enrollUserInPaidCourse);

function buildCourseRow() {
  return {
    id: 'course_1',
    slug: 'test-course',
    title: 'Test Course',
    status: 'PUBLISHED' as const,
    accessType: 'PAID' as const,
    priceAmount: 9900,
    owner: null,
  };
}

function buildOrderRow(status: 'PENDING' | 'PAID' | 'CANCELED' = 'PENDING') {
  return {
    id: 101,
    status,
    amount: 9900,
    currency: 'RUB',
    paidAt: status === 'PAID' ? new Date('2026-04-08T00:00:00.000Z') : null,
    createdAt: new Date('2026-04-08T00:00:00.000Z'),
    updatedAt: new Date('2026-04-08T00:00:00.000Z'),
    course: buildCourseRow(),
    user: {
      id: 'user_1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'USER' as const,
    },
  };
}

const payload = {
  merchantLogin: 'merchant',
  outSum: '9900.00',
  invId: 101,
  signatureValue: '2c5cc56b7d7c6fa170e264ac05a16a4d',
};

beforeEach(() => {
  mockGetCourseAccessRowById.mockReset();
  mockFindEnrollmentRow.mockReset();
  mockFindOrderRowById.mockReset();
  mockCreateOrReusePendingOrderRow.mockReset();
  mockUpdateOrderStatusRow.mockReset();
  mockUpsertPaymentEventRow.mockReset();
  mockEnrollUserInPaidCourse.mockReset();
});

describe('billing service', () => {
  it('creates a paid checkout intent through the centralized pending-order helper', async () => {
    mockGetCourseAccessRowById.mockResolvedValueOnce(buildCourseRow());
    mockFindEnrollmentRow.mockResolvedValueOnce(null);
    mockCreateOrReusePendingOrderRow.mockResolvedValueOnce(buildOrderRow('PENDING'));

    const intent = await createPaidCoursePurchaseIntent('user_1', 'course_1');

    expect(mockCreateOrReusePendingOrderRow).toHaveBeenCalledWith({
      userId: 'user_1',
      courseId: 'course_1',
      amount: 9900,
      currency: 'RUB',
    });
    expect(intent).toMatchObject({
      orderId: 101,
      courseId: 'course_1',
      courseSlug: 'test-course',
      amount: 9900,
      currency: 'RUB',
    });
    expect(intent.checkoutUrl).toContain('MerchantLogin=merchant');
    expect(intent.checkoutUrl).toContain('InvId=101');
    expect(intent.checkoutUrl).toContain('OutSum=9900.00');
  });

  it('rejects non-payable orders even with a valid signature', async () => {
    mockFindOrderRowById.mockResolvedValueOnce(buildOrderRow('CANCELED'));

    await expect(handleRobokassaResult(payload)).rejects.toThrow('ORDER_NOT_PAYABLE');
    expect(mockUpsertPaymentEventRow).not.toHaveBeenCalled();
    expect(mockUpdateOrderStatusRow).not.toHaveBeenCalled();
    expect(mockEnrollUserInPaidCourse).not.toHaveBeenCalled();
  });

  it('keeps callback status updates idempotent for repeated verified callbacks', async () => {
    mockFindOrderRowById
      .mockResolvedValueOnce(buildOrderRow('PENDING'))
      .mockResolvedValueOnce(buildOrderRow('PAID'));

    mockUpsertPaymentEventRow.mockResolvedValue({
      id: 'evt_1',
      orderId: 101,
      eventType: 'RESULT',
      signatureValue: payload.signatureValue,
      verified: true,
      receivedAt: new Date('2026-04-08T00:00:00.000Z'),
      processedAt: new Date('2026-04-08T00:00:00.000Z'),
    });

    mockUpdateOrderStatusRow.mockResolvedValue(buildOrderRow('PAID'));

    await expect(handleRobokassaResult(payload)).resolves.toMatchObject({
      orderId: 101,
      responseText: 'OK101',
    });

    await expect(handleRobokassaResult(payload)).resolves.toMatchObject({
      orderId: 101,
      responseText: 'OK101',
    });

    expect(mockUpdateOrderStatusRow).toHaveBeenCalledTimes(1);
    expect(mockEnrollUserInPaidCourse).toHaveBeenCalledTimes(2);
    expect(mockUpsertPaymentEventRow).toHaveBeenCalledTimes(2);
  });
});
