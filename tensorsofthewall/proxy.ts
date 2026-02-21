import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const notFoundUrl = new URL('/not-found', request.url);

  return NextResponse.rewrite(notFoundUrl);
}

export const config = {
  matcher: [
    '/industry-exp/:path*',
    '/research-exp/:path*',
  ],
};