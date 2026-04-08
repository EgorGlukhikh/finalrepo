import type { OrderStatus, PaymentEventType } from '@prisma/client';

export type RobokassaCheckoutIntent = {
  orderId: number;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  amount: number;
  currency: string;
  checkoutUrl: string;
};

export type RobokassaResultPayload = {
  merchantLogin: string;
  outSum: string;
  invId: number;
  signatureValue: string;
};

export type OrderState = {
  id: number;
  status: OrderStatus;
  amount: number;
  currency: string;
  paidAt: Date | null;
  course: {
    id: string;
    slug: string;
    title: string;
  };
  user: {
    id: string;
  };
};

export type PaymentEventState = {
  id: string;
  orderId: number;
  eventType: PaymentEventType;
  signatureValue: string;
  verified: boolean;
  receivedAt: Date;
  processedAt: Date | null;
};

export type AdminOrderListItem = {
  id: number;
  status: OrderStatus;
  amount: number;
  currency: string;
  paidAt: Date | null;
  createdAt: Date;
  course: {
    id: string;
    slug: string;
    title: string;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
  };
};

export type AdminOrderDetails = AdminOrderListItem & {
  updatedAt: Date;
  events: PaymentEventState[];
};
