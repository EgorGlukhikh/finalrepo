import { NextResponse } from 'next/server';

import { getOrderById, recordRobokassaRedirectEvent } from '@/modules/billing';
import { buildCatalogPath, buildPublicCoursePath } from '@/modules/courses/paths';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = Number(url.searchParams.get('InvId') ?? url.searchParams.get('invId') ?? 0);

  if (!orderId) {
    return NextResponse.redirect(new URL(buildCatalogPath(), request.url));
  }

  const order = await getOrderById(orderId);

  if (!order) {
    return NextResponse.redirect(new URL(buildCatalogPath(), request.url));
  }

  await recordRobokassaRedirectEvent({
    orderId,
    eventType: 'FAIL',
    payload: Object.fromEntries(url.searchParams.entries()),
  });

  return NextResponse.redirect(
    new URL(
      order.status === 'PAID' ? `/app/courses/${order.course.slug}` : buildPublicCoursePath(order.course.slug),
      request.url,
    ),
  );
}
