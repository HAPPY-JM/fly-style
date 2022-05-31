import { Schema } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Address = new Schema({
  postalCode: String,
  address1: String,
  address2: String,
});

const Cart = new Schema({
  productId: {
    type: Schema.type.objectId,
    ref: "products",
  },
  quantity: {
    type: Number,
  },
});

const OrderSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.type.objectId,
      required: true,
      ref: "users",
    },
    orderdate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    products: {
      type: [Cart],
      required: true,
    },
    delivery: {
      type: {
        name: String,
        Address,
        comment: String,
      },
      required: true,
    },
  },

  {
    collection: "orders",
    timestamps: true,
  }
);

OrderSchema.plugin(autoIncrement.plugin, {
  model: "orders",
  field: "orderId",
  startAt: 1,
});

export { OrderSchema };
