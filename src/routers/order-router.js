import { Router } from "express";
import { orderService } from "../services";
import mongoose from "mongoose";

const orderRouter = Router();

//  바로주문하기
orderRouter.post("/", async function (req, res, next) {
  const userId = req.currentUserId; //여기는 나중에 바꿔줄 예정 (주석값으로)
  const { name, Address, comment, products, phoneNumber } = req.body;
  const totalPrice = Number(req.body.totalPrice);

  try {
    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      userId,
      name,
      phoneNumber,
      totalPrice,
      products,
      Address,
      comment,
    });

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// //카트에 있는 주문목록 하나씩 추가
// orderRouter.post("/cart/additem", function (req, res, next) {
//   const { productId, size } = req.body;
//   const quantity = Number(req.body.quantity);
//   console.log(productId, quantity);
//   const cart = orderService.addCart({ productId, quantity, size });
//   console.log(cart);
//   res.status(201).json(cart);
// });

// //카트에서 주문추가
// orderRouter.post("/cart", async (req, res, next) => {
//   // req (request)의 body 에서 데이터 가져오기
//   const userId = /*req.currentUserId;*/ req.body.userId; //여기는 나중에 주석부분으로 바꿔줄 예정
//   const { name, address, comment } = req.body;
//   const totalPrice = Number(req.body.totalPrice);

//   try {
//     // 위 데이터를 유저 db에 추가하기
//     const newOrder = await orderService.addOrder({
//       userId,
//       totalPrice,
//       name,
//       address,
//       comment,
//     });

//     // 사용자 목록(배열)을 JSON 형태로 프론트에 보
//     res.status(201).json(newOrder);
//   } catch (error) {
//     next(error);
//   }
// });

//사용자 별 주문 목록 받아오기
orderRouter.get("/user", async function (req, res, next) {
  const { userId } = /*req.currentUserId;*/ req.body;
  try {
    const Orderlists = await orderService.findByuserId(userId);

    res.status(201).json(Orderlists);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/detail/:orderId", async function (req, res, next) {
  //objectId로 바꿔주어야 검색 가능하다~!!
  const _id = /*req.currentUserId;*/ mongoose.Types.ObjectId(
    req.params.orderId
  );
  try {
    // 위 데이터를 유저 db에 추가하기
    const order = await orderService.findById(_id);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
