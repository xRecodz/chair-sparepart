// This script creates sample chair spare parts products

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI environment variable")
  process.exit(1)
}

async function seedProducts() {
  const mongoose = await import("mongoose")

  await mongoose.connect(MONGODB_URI)

  const Product = (await import("../models/Product")).default

  // Clear existing products
  await Product.deleteMany({})

  // Sample products
  const products = [
    {
      name: "Roda Kursi Barbershop Premium",
      description: "Roda berkualitas tinggi untuk kursi barbershop, tahan lama dan mudah bergerak",
      price: 150000,
      image: "/barbershop-chair-wheel.jpg",
    },
    {
      name: "Hidrolik Kursi Salon",
      description: "Hidrolik pompa untuk kursi salon dan barbershop, dapat mengangkat hingga 150kg",
      price: 450000,
      image: "/hydraulic-chair-pump.jpg",
    },
    {
      name: "Sandaran Kursi Kantor",
      description: "Sandaran ergonomis untuk kursi kantor dengan penyangga lumbar",
      price: 250000,
      image: "/office-chair-backrest.jpg",
    },
    {
      name: "Busa Sofa Berkualitas",
      description: "Busa density tinggi untuk sofa, nyaman dan tahan lama",
      price: 200000,
      image: "/sofa-foam-cushion.jpg",
    },
    {
      name: "Armrest Kursi Gaming",
      description: "Sandaran tangan adjustable untuk kursi gaming dan kantor",
      price: 180000,
      image: "/gaming-chair-armrest.jpg",
    },
    {
      name: "Gas Lift Kursi Kantor",
      description: "Gas lift cylinder untuk kursi kantor, smooth dan reliable",
      price: 320000,
      image: "/office-chair-gas-lift.jpg",
    },
  ]

  await Product.insertMany(products)

  console.log(`${products.length} products created successfully`)

  await mongoose.disconnect()
}

seedProducts()
