import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthSecret, getDeckPassword } from './lib/deck-env';

const COOKIE = 'lux_deck_session';
const HMAC_MESSAGE = 'luxquanta-ai-strategy-v1';

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Self-contained for Edge — avoids separate module graph issues on Vercel. */
async function createAuthToken(secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(HMAC_MESSAGE));
  return bufferToHex(sig);
}

/** Redirect (not rewrite): Edge + `public/*.html` often breaks on `NextResponse.rewrite`, causing MIDDLEWARE_INVOCATION_FAILED. */
function redirectToIndex(request: NextRequest): NextResponse {
  const url = new URL('/index.html', request.nextUrl.origin);
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/index.html', '/it.html'],
};

export async function middleware(request: NextRequest) {
  try {
    const password = getDeckPassword();
    if (!password) {
      if (request.nextUrl.pathname === '/') {
        return redirectToIndex(request);
      }
      return NextResponse.next();
    }

    const authSecret = getAuthSecret(password);
    if (!authSecret) {
      return NextResponse.redirect(new URL('/login.html', request.nextUrl));
    }

    let expected: string;
    try {
      expected = await createAuthToken(authSecret);
    } catch {
      return NextResponse.redirect(new URL('/login.html', request.nextUrl));
    }

    const cookie = request.cookies.get(COOKIE)?.value;
    const ok = !!cookie && cookie === expected;

    if (ok) {
      if (request.nextUrl.pathname === '/') {
        return redirectToIndex(request);
      }
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login.html', request.nextUrl));
  } catch {
    return NextResponse.redirect(new URL('/login.html', request.nextUrl));
  }
}
