import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://farhannix9_db_user:GwrxMkLabM88utIs@cluster0.e84bzxr.mongodb.net/chair-spare?retryWrites=true&w=majority";

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
