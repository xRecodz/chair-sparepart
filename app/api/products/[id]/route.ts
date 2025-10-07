import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import { verifyToken } from "@/lib/auth"

// PUT update product (admin only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    const product = await Product.findByIdAndUpdate(
      params.id,
      {
        name,
        description,
        price,
        image,
      },
      { new: true, runValidators: true },
    )

    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

// DELETE product (admin only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    await dbConnect()

    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Produk berhasil dihapus",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Delete product error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
