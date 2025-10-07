import bcrypt from "bcryptjs"

// This script creates a default admin user
// Username: admin
// Password: admin123

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI environment variable")
  process.exit(1)
}

async function seedAdmin() {
  const mongoose = await import("mongoose")

  await mongoose.connect(MONGODB_URI)

  const Admin = (await import("../models/Admin")).default

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ username: "admin" })

  if (existingAdmin) {
    console.log("Admin user already exists")
    await mongoose.disconnect()
    return
  }

  // Hash password
  const hashedPassword = await bcrypt.hash("admin123", 10)

  // Create admin
  await Admin.create({
    username: "admin",
    password: hashedPassword,
  })

  console.log("Admin user created successfully")
  console.log("Username: admin")
  console.log("Password: admin123")

  await mongoose.disconnect()
}

seedAdmin()
