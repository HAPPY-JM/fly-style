import { Schema, SchemaTypes } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Address = new Schema({
  postalCode: String,
  address1: String,
  address2: String,
});

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    orderdate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      default: `상품준비중`,
    },
    products: {
      type: [
        {
          quantity: Number,
          productId: {
            type: Schema.Types.ObjectId,
            ref: "product",
          },
        },
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

//유저별로 주문목록 검색시 인덱싱으로 검색속도 향상
OrderSchema.index({ userId: 1 });

// OrderSchema.plugin(autoIncrement.plugin, {
//   model: "orders",
//   field: "orderId",
//   startAt: 1,
// });

export { OrderSchema };
