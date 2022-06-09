import { Schema } from "mongoose";
// import { CategorySchema } from "./category-schema";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type : String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    content: {
      type: String,
      required: true,
    }, //상품설명

    brand: {
      type: String,
    },

    Img: {
      type: String,
      required: true,
    },

    size: [{ 
      sizetype:{ type: String },
      stock: {type: Number},
    }],
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
