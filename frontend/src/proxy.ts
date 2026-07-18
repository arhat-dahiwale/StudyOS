// src/proxy.ts
import { NextRequest, NextResponse } from "next/server"

const PUBLIC_ROUTES = ["/", "/login", "/register"]

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  const { pathname } = request.nextUrl

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && isPublicRoute && pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/subjects/:path*",
    "/notes/:path*",
    "/assignments/:path*",
    "/study-sessions/:path*",
    "/settings/:path*",
  ],
}