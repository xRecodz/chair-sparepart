import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI environment variable");
  process.exit(1);
}

async function seedAdmin() {
  const mongoose = await import("mongoose");
  await mongoose.connect(MONGODB_URI);

  const Admin = (await import("../models/Admin")).default;

  const existingAdmin = await Admin.findOne({ username: "admin" });
  if (existingAdmin) {
    console.log("Admin user already exists");
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("SokarajA55!", 10);

  await Admin.create({
    username: "admin",
    password: hashedPassword,
  });

  console.log("✅ Admin user created successfully");
  console.log("Username: admin");
  console.log("Password: SokarajA55!");

  await mongoose.disconnect();
}

seedAdmin();
