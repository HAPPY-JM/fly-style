import { Router } from "express";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
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

export { adminRouter };
