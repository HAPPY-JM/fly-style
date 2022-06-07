import { Router } from "express";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, adminRequired } from "../middlewares";
import { productService, categoryService } from "../services";

const productRouter = Router();

//상품 등록 (login 확인, admin 확인)/
//POST /api/product/ => 상품등록하는 라우팅
//Ajpi.post('/api/product',productinfo)=> 상품등록하는 라우팅
productRouter.post(
  "/",
  /*loginRequired,
  adminRequired,*/
  async (req, res, next) => {
    try {
      const { name, category, price, content, brand, size } = req.body;

      const newProduct = await productService.addProduct({
        name,
        category,
        price,
        content,
        brand,
        size,
      });

      res.redirect(`/product?id=${newProduct._id}`); //이부분은 json으로 받아온뒤에 프론트에서 보내주어도 괜찮을 듯 하다 아니면 그냥 프론트단으로 제품등록이 완료되었습니다 아니면 전체 리스트? 를 보여주는게 더 나을듯
    } catch (err) {
      next(err);
    }
  }
);

//상품 목록
productRouter.get("/", async (req, res) => {
  const productList = await productService.productList();

  res.json(productList);
});

//상품 수정 (login 확인, admin 확인)
productRouter.patch("/:id", loginRequired, adminRequired, async (req, res) => {
  const productId = req.params.id;

  const { name, category, price, content, brand, size } = req.body;

    const updateData = {
        name,
        category,
        price,
        content,
        brand,
        size,
    };

  await productService.editProduct(productId, updateData);

    res.redirect(`/api/product/${productId}`);
    }
);

//상품 삭제 (login 확인, admin 확인)
productRouter.delete("/:id", loginRequired, adminRequired, async (req, res) => {
  const productId = req.params.id;

  await productService.deleteProduct(productId);
  // res.send(`상품을 삭제했습니다.`);
    res.redirect("/api/product");
});

///api/product/shirts
//카테고리별 상품
productRouter.get("/lists/:category", async (req, res) => {
  const name = req.params.category;
  const category = await categoryService.findByName(name);
  // console.log(category._id);
  const categoryProducts = await productService.findByCategory(category._id);
  res.json(categoryProducts);
});

//상품 상세 보기
productRouter.get("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = await productService.viewProductData(productId);
    res.json(productData);
});

export { productRouter };
