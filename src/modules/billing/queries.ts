import type { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

export const orderSelect = {
  id: true,
  status: true,
  amount: true,
  currency: true,
  paidAt: true,
  createdAt: true,
  updatedAt: true,
  course: {
    select: {
      id: true,
      slug: true,
      title: true,
      accessType: true,
      priceAmount: true,
      status: true,
    },
  },
  user: {
    select: {
      id: true,
      email: true,
      role: true,
    },
  },
} satisfies Prisma.OrderSelect;

export type OrderRow = Prisma.OrderGetPayload<{
  select: typeof orderSelect;
}>;

export const paymentEventSelect = {
  id: true,
  orderId: true,
  eventType: true,
  signatureValue: true,
  verified: true,
  receivedAt: true,
  processedAt: true,
} satisfies Prisma.PaymentEventSelect;

export type PaymentEventRow = Prisma.PaymentEventGetPayload<{
  select: typeof paymentEventSelect;
}>;

export async function findOrderRowById(orderId: number) {
  return db.order.findUnique({
    where: {
      id: orderId,
    },
    select: orderSelect,
  });
}

export async function findPendingOrderRow(userId: string, courseId: string) {
  return db.order.findFirst({
    where: {
      userId,
      courseId,
      status: 'PENDING',
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: orderSelect,
  });
}

export async function findPaidOrderRow(userId: string, courseId: string) {
  return db.order.findFirst({
    where: {
      userId,
      courseId,
      status: 'PAID',
    },
    orderBy: {
      paidAt: 'desc',
    },
    select: orderSelect,
  });
}
