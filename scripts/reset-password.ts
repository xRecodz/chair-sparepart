import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config({ path: ".env.local" }); // pastikan path benar

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI environment variable");
  process.exit(1);
}

async function resetPassword(username: string, newPassword: string) {
  const mongoose = await import("mongoose");
  await mongoose.connect(MONGODB_URI);

  const Admin = (await import("../models/Admin")).default;

  const user = await Admin.findOne({ username });
  if (!user) {
    console.error(`User dengan username "${username}" tidak ditemukan.`);
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  console.log(`✅ Password untuk user "${username}" berhasil direset.`);
  console.log(`🔐 Password baru: ${newPassword}`);

  await mongoose.disconnect();
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: tsx scripts/reset-password.ts <username> <newPassword>");
  process.exit(1);
}

const [username, newPassword] = args;
resetPassword(username, newPassword);
