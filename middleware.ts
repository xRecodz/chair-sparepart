import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin dashboard routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("adminToken")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    const payload = await verifyToken(token)

    if (!payload) {
      const response = NextResponse.redirect(new URL("/admin", request.url))
      response.cookies.delete("adminToken")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
}
