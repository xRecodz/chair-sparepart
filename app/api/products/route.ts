import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { verifyToken } from "@/lib/auth"

// GET all products (public)
export async function GET() {
  try {
    await dbConnect()

    const products = await Product.find({}).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get products error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

// POST create new product (admin only)
export async function POST(request: Request) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { name, description, price, image } = await request.json()

    if (!name || !description || !price || !image) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 })
    }

    await dbConnect()

    const product = await Product.create({
      name,
      description,
      price,
      image,
    })

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create product error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
