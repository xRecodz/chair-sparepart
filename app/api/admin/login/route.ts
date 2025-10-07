import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import Admin from "@/models/Admin"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan password harus diisi" }, { status: 400 })
    }

    await dbConnect()

    // Find admin by username
    const admin = await Admin.findOne({ username })

    if (!admin) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Username atau password salah" }, { status: 401 })
    }

    // Create JWT token
    const token = await createToken({ username: admin.username })

    return NextResponse.json(
      {
        success: true,
        token,
        admin: {
          username: admin.username,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
