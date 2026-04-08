import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { getMissingRuntimeEnv } from '@/lib/env';

export async function GET() {
  const missingEnv = getMissingRuntimeEnv();

  if (missingEnv.length > 0) {
    return NextResponse.json(
      {
        status: 'error',
        checks: {
          env: 'error',
          database: 'unknown',
        },
        missingEnv,
      },
      {
        status: 503,
      },
    );
  }

  try {
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'ok',
      checks: {
        env: 'ok',
        database: 'ok',
      },
    });
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        checks: {
          env: 'ok',
          database: 'error',
        },
      },
      {
        status: 503,
      },
    );
  }
}

