export const runtime = "nodejs"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("adminToken")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }

    // ✅ Verifikasi token via API Route (bukan lewat Node module)
    const res = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })

    if (!res.ok) {
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
