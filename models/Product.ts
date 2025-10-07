import mongoose from "mongoose"

export interface IProduct {
  _id?: string
  name: string
  description: string
  price: number
  image: string
  createdAt?: Date
  updatedAt?: Date
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Please provide a product image URL"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
