import { NextResponse } from 'next/server';
import { createAuthToken } from '@/lib/auth-token';
import { getAuthSecret, getDeckPassword } from '@/lib/deck-env';

export const runtime = 'edge';

const COOKIE = 'lux_deck_session';

export async function POST(request: Request) {
  const password = getDeckPassword();
  if (!password) {
    return NextResponse.json({ ok: false, error: 'Auth not configured' }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = await createAuthToken(getAuthSecret(password));

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
