import type { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

import { orderSelect, paymentEventSelect, type OrderRow, type PaymentEventRow } from './queries';

export async function createOrderRow(data: Prisma.OrderCreateInput) {
  return db.order.create({
    data,
    select: orderSelect,
  });
}

export async function updateOrderStatusRow(orderId: number, data: Prisma.OrderUpdateInput) {
  return db.order.update({
    where: {
      id: orderId,
    },
    data,
    select: orderSelect,
  });
}

export async function findOrderForPurchase(userId: string, courseId: string) {
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

export async function upsertPaymentEventRow(
  data: Pick<Prisma.PaymentEventUncheckedCreateInput, 'orderId' | 'eventType' | 'signatureValue' | 'payload' | 'verified' | 'processedAt'>,
) {
  return db.paymentEvent.upsert({
    where: {
      orderId_eventType_signatureValue: {
        orderId: data.orderId,
        eventType: data.eventType,
        signatureValue: data.signatureValue,
      },
    },
    update: {
      payload: data.payload,
      verified: data.verified,
      processedAt: data.processedAt,
    },
    create: {
      ...data,
    },
    select: paymentEventSelect,
  });
}

export type { OrderRow, PaymentEventRow };
