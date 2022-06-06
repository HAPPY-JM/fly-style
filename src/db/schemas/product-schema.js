import { Schema } from "mongoose";
import { CategoryModel } from "../models/category-model";

const ProductSchema = new Schema({

  name: {
    type: String,
    required: true,
  }, 

  category: {
    type: Schema.Types.ObjectId,
    ref:'category',
    // required: true,
  }, 

  price: {
    type: Number,
    required: true,
  }, 

  content: {
    type: String,
    required: true,
  }, //상품 설명

  brand: {
    type: String,
  }, 

  // Img:{

  // },

  size: {
    type: Array,
    items: { type: String },
    default: ["free"],
  },
});

export { ProductSchema };
