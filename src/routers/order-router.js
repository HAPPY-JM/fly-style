import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { orderService } from "../services";

const orderRouter = Router();

//  바로주문하기
orderRouter.post("/only/:productId", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const { productId } = req.params;
    const quantity = 1;
    const userId = /*req.currentUserId;*/ req.body.userId;
    const name = req.body.name;
    const address = req.body.address;
    const comment = req.body.comment;
    const totalPrice = Number(req.body.totalPrice);
    console.log(orderService);
    orderService.addCart({ productId, quantity }); //현재상품 하나 주문목록에 추가
    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      userId,
      totalPrice,
      name,
      address,
      comment,
    });

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    // res.render('order/complete',{newOrder});
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

//카트에 있는 주문목록 하나씩 추가
orderRouter.post("/cart/additem", function (req, res, next) {
  const productId = req.body.productId;
  const quantity = Number(req.body.quantity);
  console.log(productId, quantity);
  const cart = orderService.addCart({ productId, quantity });
  console.log(cart);
  res.status(201).json(cart);
});

//카트에서 주문추가
orderRouter.post("/cart", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const userId = /*req.currentUserId;*/ req.body.userId;
    const name = req.body.name;
    const address = req.body.address;
    const comment = req.body.comment;
    const totalPrice = Number(req.body.totalPrice);

    // 위 데이터를 유저 db에 추가하기
    const newOrder = await orderService.addOrder({
      userId,
      totalPrice,
      name,
      address,
      comment,
    });

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보
    // res.render('order/complete',{newOrder});
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

export { orderRouter };
