import { Router } from "express";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, adminRequired } from "../middlewares";
import { productService, categoryService } from "../services";


const productRouter = Router();

//상품 등록 (login 확인, admin 확인)
productRouter.post("/", /*loginRequired, adminRequired,*/ async (req, res, next) => {
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

        res.redirect(`/api/product/${newProduct._id}`);
    } catch (err) {
        next(err);
    }
});

//상품 목록
productRouter.get("/", async (req, res) => {

    const page = Number(req.query.page || 1); // 현재 페이지 번호
    const perPage = Number(req.query.perPage || 12); // 한 페이지당 표시할 상품 수

    const productList = await productService.productList();
    
    const [total, productsPerPage] = await Promise.all([
        productList.length,
        productService.pagination(productList, page, perPage)
    ]);
    const totalPage = Math.ceil(total/perPage);

    res.send({ productsPerPage, page, perPage, totalPage });
});

//상품 수정 (login 확인, admin 확인)
productRouter.patch("/:id", /*loginRequired, adminRequired,*/ async (req, res) => {
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
productRouter.delete("/:id", /*loginRequired, adminRequired,*/ async (req, res) => {
    const productId = req.params.id;

    await productService.deleteProduct(productId);
  // res.send(`상품을 삭제했습니다.`);
    res.redirect("/api/product");
});


// //카테고리별 상품
// productRouter.get('/:category', async(req, res) => {
//     const category = req.params.category;
//     const categoryProduct = await productService.findByCategory(category);
//     res.json(categoryProduct);
// });


//상품 상세 보기
productRouter.get("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = await productService.viewProductData(productId);
    res.json(productData);
});

export { productRouter };
