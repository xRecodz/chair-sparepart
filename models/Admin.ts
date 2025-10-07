import mongoose from "mongoose"

export interface IAdmin {
  _id?: string
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      maxlength: [50, "Username cannot be more than 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema)
