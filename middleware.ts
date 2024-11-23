import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
        const token = request.cookies.get('token')

        if (request.nextUrl.pathname === '' && token) {
                return NextResponse.redirect(new URL('/home', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/login') && token) {
                return NextResponse.redirect(new URL('/home', request.url))
        }

        if (!request.nextUrl.pathname.startsWith('/login') && !token) {
                return NextResponse.redirect(new URL(`/login`, request.url))
        }
}

// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',
     matcher: ['/login', '/home', '/booking'],
}