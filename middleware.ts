import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createAuthToken } from './lib/auth-token';

const COOKIE = 'lux_deck_session';

export const config = {
  matcher: ['/', '/index.html', '/it.html'],
};

export async function middleware(request: NextRequest) {
  const password = process.env.DECK_PASSWORD;
  const authSecret = process.env.DECK_AUTH_SECRET || password || '';

  if (!password) {
    if (request.nextUrl.pathname === '/') {
      const u = request.nextUrl.clone();
      u.pathname = '/index.html';
      return NextResponse.rewrite(u);
    }
    return NextResponse.next();
  }

  const cookie = request.cookies.get(COOKIE)?.value;
  const expected = await createAuthToken(authSecret);
  const ok = cookie === expected;

  if (ok) {
    if (request.nextUrl.pathname === '/') {
      const u = request.nextUrl.clone();
      u.pathname = '/index.html';
      return NextResponse.rewrite(u);
    }
    return NextResponse.next();
  }

  const login = request.nextUrl.clone();
  login.pathname = '/login.html';
  return NextResponse.redirect(login);
}
