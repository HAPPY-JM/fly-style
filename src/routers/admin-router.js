import { Router } from "express";
import { userService } from "../services";

const adminRouter = Router();

adminRouter.get("/userList", async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//모든 주문 목록 가져오기
adminRouter.get("/order/lists", async function (req, res, next) {
  try {
    const Orderlists = await orderService.orderLists();
    res.status(201).json(Orderlists);
  } catch (error) {
    next(error);
  }
});

//주문상태변경
adminRouter.patch("/orderStat/:orderId", async function (req, res, next) {
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
adminRouter.delete("/order/:orderId", async function (req, res, next) {
  const _id = mongoose.Types.ObjectId(req.params.orderId);

  try {
    const result = await orderService.orderDelete(_id);

    //주문삭제 결과 전송
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

export { adminRouter };
