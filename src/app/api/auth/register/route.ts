import { NextResponse } from 'next/server';

import { AuthError } from '@/modules/auth/errors';
import { registerUser } from '@/modules/auth/users';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'INVALID_JSON',
      },
      { status: 400 },
    );
  }

  try {
    const user = await registerUser(body as Parameters<typeof registerUser>[0]);

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        {
          ok: false,
          error: error.code,
        },
        { status: error.status },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: 'UNKNOWN_ERROR',
      },
      { status: 500 },
    );
  }
}
