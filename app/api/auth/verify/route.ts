import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) throw new Error("Token missing")

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ valid: true, user: decoded })
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}
