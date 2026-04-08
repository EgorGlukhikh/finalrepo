import { NextResponse } from 'next/server';

import { getOrderById } from '@/modules/billing';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = Number(url.searchParams.get('InvId') ?? url.searchParams.get('invId') ?? 0);

  if (!orderId) {
    return NextResponse.redirect(new URL('/courses', request.url));
  }

  const order = await getOrderById(orderId);

  if (!order) {
    return NextResponse.redirect(new URL('/courses', request.url));
  }

  return NextResponse.redirect(
    new URL(
      order.status === 'PAID' ? `/app/courses/${order.course.slug}` : `/courses/${order.course.slug}`,
      request.url,
    ),
  );
}
