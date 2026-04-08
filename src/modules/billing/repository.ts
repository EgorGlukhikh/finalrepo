import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';

import { orderSelect, paymentEventSelect, type OrderRow, type PaymentEventRow } from './queries';

export async function updateOrderStatusRow(orderId: number, data: Prisma.OrderUpdateInput) {
  return db.order.update({
    where: {
      id: orderId,
    },
    data,
    select: orderSelect,
  });
}

export async function createOrReusePendingOrderRow(input: {
  userId: string;
  courseId: string;
  amount: number;
  currency?: string;
}) {
  const currency = input.currency ?? 'RUB';

  const findPendingOrder = () =>
    db.order.findFirst({
      where: {
        userId: input.userId,
        courseId: input.courseId,
        status: 'PENDING',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: orderSelect,
    });

  const syncPendingOrderAmount = async (orderId: number) =>
    db.order.update({
      where: {
        id: orderId,
      },
      data: {
        amount: input.amount,
        currency,
      },
      select: orderSelect,
    });

  const existingOrder = await findPendingOrder();

  if (existingOrder) {
    if (existingOrder.amount !== input.amount || existingOrder.currency !== currency) {
      return syncPendingOrderAmount(existingOrder.id);
    }

    return existingOrder;
  }

  try {
    return await db.order.create({
      data: {
        user: {
          connect: {
            id: input.userId,
          },
        },
        course: {
          connect: {
            id: input.courseId,
          },
        },
        amount: input.amount,
        currency,
        status: 'PENDING',
      },
      select: orderSelect,
    });
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') {
      throw error;
    }

    const concurrentOrder = await findPendingOrder();

    if (!concurrentOrder) {
      throw error;
    }

    if (concurrentOrder.amount !== input.amount || concurrentOrder.currency !== currency) {
      return syncPendingOrderAmount(concurrentOrder.id);
    }

    return concurrentOrder;
  }
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
