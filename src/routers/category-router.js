import { Router } from "express";
import { loginRequired, adminRequired } from "../middlewares";
import { categoryService } from "../services";

const categoryRouter = Router();

//카테고리 등록 (login 확인, admin 확인)
categoryRouter.post(
  "/",
  /*loginRequired,
  adminRequired,*/
  async (req, res, next) => {
    try {
      const { name } = req.body;

      const newCategory = await categoryService.addCategory({ name });

      res.json(newCategory);
    } catch (err) {
      next(err);
    }
  }
);

//카테고리 목록
categoryRouter.get("/", async (req, res) => {
  const categoryList = await categoryService.categoryList();

  res.json(categoryList);
});

//카테고리 수정 (login 확인, admin 확인)
categoryRouter.patch("/:id", loginRequired, adminRequired, async (req, res) => {
  const categoryId = req.params.id;

  const { name } = req.body;

  const updateData = {
    // ...(name && { name }),
    name,
  };

  await categoryService.editCategory(categoryId, updateData);

  res.redirect("/api/category");
});

//카테고리 삭제 (login 확인, admin 확인)
categoryRouter.delete(
  "/:id",
  loginRequired,
  adminRequired,
  async (req, res) => {
    const categoryId = req.params.id;

    await categoryService.deleteCategory(categoryId);
    // res.send(`카테고리를 삭제했습니다.`);
    res.redirect("/api/category");
  }
);

export { categoryRouter };
