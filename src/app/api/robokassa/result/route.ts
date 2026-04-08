import { NextResponse } from 'next/server';

import { handleRobokassaResult } from '@/modules/billing';

async function readPayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  const url = new URL(request.url);
  return Object.fromEntries(url.searchParams.entries());
}

async function handleResult(request: Request) {
  try {
    const payload = await readPayload(request);
    const result = await handleRobokassaResult({
      merchantLogin: String(payload.MerchantLogin ?? payload.merchantLogin ?? ''),
      outSum: String(payload.OutSum ?? payload.outSum ?? ''),
      invId: Number(payload.InvId ?? payload.invId ?? 0),
      signatureValue: String(payload.SignatureValue ?? payload.signatureValue ?? ''),
    });

    return new NextResponse(`OK${result.orderId}`, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'ROBOKASSA_RESULT_FAILED';

    return new NextResponse(message, {
      status: 400,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    });
  }
}

export async function GET(request: Request) {
  return handleResult(request);
}

export async function POST(request: Request) {
  return handleResult(request);
}
