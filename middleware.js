import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request) {
  // Paths yang membutuhkan autentikasi
  const protectedPaths = [
    '/dashboard',
    '/kegiatan-admin',
    '/kajian-admin',
    '/donasi-admin',
    '/pengurus-admin',
  ];

  // Paths API yang membutuhkan autentikasi
  const protectedApiPaths = ['/api/dashboard', '/api/users'];

  const path = request.nextUrl.pathname;

  // Cek apakah path merupakan protected path
  const isProtectedPath = protectedPaths.some((prefix) =>
    path.startsWith(prefix)
  );
  const isProtectedApiPath = protectedApiPaths.some((prefix) =>
    path.startsWith(prefix)
  );

  if (!isProtectedPath && !isProtectedApiPath) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get('token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  console.log(
    'Middleware checking token:',
    token ? 'token exists' : 'no token'
  );

  if (!token) {
    // Redirect ke halaman login jika akses UI
    if (isProtectedPath) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Return 401 jika akses API
    if (isProtectedApiPath) {
      return NextResponse.json(
        { error: 'Tidak terautentikasi' },
        { status: 401 }
      );
    }
  }

  // Verifikasi token
  const payload = verifyToken(token);
  if (!payload) {
    // Hapus cookie yang tidak valid dan redirect
    if (isProtectedPath) {
      const loginUrl = new URL('/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('token');
      return response;
    }

    // Return 401 jika akses API
    if (isProtectedApiPath) {
      return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/kegiatan-admin',
    '/kegiatan-admin/:path*',
    '/kajian-admin',
    '/kajian-admin/:path*',
    '/donasi-admin',
    '/donasi-admin/:path*',
    '/pengurus-admin',
    '/pengurus-admin/:path*',
  ],
};
