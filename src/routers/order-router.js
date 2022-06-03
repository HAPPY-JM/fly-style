import { Router } from "express";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { orderService } from "../services";
import mongoose from "mongoose";

const orderRouter = Router();

//  바로주문하기
orderRouter.post("/purchase", async function (req, res, next) {
  // req (request)의 body 에서 데이터 가져오기
  const { productId } = req.query;
  const quantity = 1;
  const userId = /*req.currentUserId;*/ req.body.userId; //여기는 나중에 바꿔줄 예정 (주석값으로)
  const { name, address, comment, size } = req.body;
  const totalPrice = Number(req.body.totalPrice);
  orderService.addCart({ productId, quantity, size }); //현재상품 하나 주문목록에 추가

  try {
    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      userId,
      totalPrice,
      name,
      address,
      comment,
    });

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

//카트에 있는 주문목록 하나씩 추가
orderRouter.post("/cart/additem", function (req, res, next) {
  const { productId, size } = req.body;
  const quantity = Number(req.body.quantity);
  console.log(productId, quantity);
  const cart = orderService.addCart({ productId, quantity, size });
  console.log(cart);
  res.status(201).json(cart);
});

//카트에서 주문추가
orderRouter.post("/cart", async (req, res, next) => {
  // req (request)의 body 에서 데이터 가져오기
  const userId = /*req.currentUserId;*/ req.body.userId; //여기는 나중에 주석부분으로 바꿔줄 예정
  const { name, address, comment } = req.body;
  const totalPrice = Number(req.body.totalPrice);

  try {
    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      userId,
      totalPrice,
      name,
      address,
      comment,
    });

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/user", async function (req, res, next) {
  // req (request)의 body 에서 데이터 가져오기
  const userId = /*req.currentUserId;*/ req.body.userId;
  try {
    // 위 데이터를 유저 db에 추가하기
    const Orderlists = await orderService.findByuserId(userId);

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    res.status(201).json(Orderlists);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/detail/:orderId", async function (req, res, next) {
  // req (request)의 body 에서 데이터 가져오기
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

orderRouter.get("/all", async function (req, res, next) {
  try {
    // 위 데이터를 유저 db에 추가하기
    const Orderlists = await orderService.orderLists();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    // res.render('order/complete',{newOrder});
    res.status(201).json(Orderlists);
  } catch (error) {
    next(error);
  }
});

//주문상태변경
orderRouter.patch("/status/:orderId", async function (req, res, next) {
  try {
    const _id = mongoose.Types.ObjectId(req.params.orderId);
    const { orderStatus } = req.body;
    const result = await orderService.orderUpdate(_id, orderStatus);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

//주문 삭제
orderRouter.delete("/:orderId", async function (req, res, next) {
  const _id = mongoose.Types.ObjectId(req.params.orderId);

  try {
    const result = await orderService.orderDelete(_id);

    //주문삭제 결과 전송
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
