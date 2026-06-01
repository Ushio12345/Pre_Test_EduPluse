import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = pathname.startsWith("/profile") || pathname.startsWith("/courses");

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isPrivateRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/courses/:path*",
    "/quiz/:path*",
    "/login",
    "/register"
  ],
};