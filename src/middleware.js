import { NextResponse } from 'next/server';

export async function middleware(req) {
    // Pegar o token do cookie
    const token = req.cookies.get('sb-access-token')?.value ||
        req.cookies.get('sb-localhost-auth-token')?.value;

    const isSystemRoute = req.nextUrl.pathname.startsWith('/system');
    const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');

    // if user is not logged in and trying to access /system/*
    if (isSystemRoute && !token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // if user is logged in and trying to access /auth/*
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/system/watch', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/system/:path*', '/auth/:path*'],
};
