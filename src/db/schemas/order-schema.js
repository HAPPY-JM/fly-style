import { Schema } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Address = new Schema({
  postalCode: String,
  address1: String,
  address2: String,
});

const OrderSchema = new Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.objectId,
      required: true,
      ref: "users",
    },
    orderdate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    products: {
      type: [
        {
          quantity: Number,
          productId: {
            type: Schema.Types.objectId,
            ref: "products",
          },
        }.populate("productId"),
      ],
      required: true,
    },
    totalPrice: Number,
    delivery: {
      type: {
        name: String,
        Address,
        comment: String, //배송관련요청
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
