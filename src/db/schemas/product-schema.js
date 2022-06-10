import { Schema } from "mongoose";
// import { CategorySchema } from "./category-schema";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      // type: Schema.Types.ObjectId,
      // ref: "category",
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

    Img:{
      type : String,
      required : true,
    },

    size: [{ 
      sizetype:{ type: String, default: "free" },
      stock: {type: Number, default:0},
    }],
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export { ProductSchema };
