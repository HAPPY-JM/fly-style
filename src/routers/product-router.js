import { Router } from "express";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";
import { adminRequired } from '../middlewares';
import { productService, categoryService } from "../services";



const productRouter = Router();


//상품 등록 (login 확인, admin 확인)
productRouter.post('/add', loginRequired, adminRequired, async (req, res, next) => {
    try{
        {const { name, category, price, content, brand, size } = req.body;

        const newProduct = await productService.addProduct({
            name,
            category,
            price,
            content,
            brand,
            size
        });

        res.redirect(`/product/${newProduct._id}`);
        }
    }catch(err){
        next(err);
    }
}); 



//상품 목록
productRouter.get('/', async (req, res) => {
    const productList = await productService.productList();

    res.json(productList);
}); 



//상품 수정 (login 확인, admin 확인)
productRouter.patch('/edit/:id', loginRequired, adminRequired, async(req, res) => {
    const productId = req.params.id;

    const { name, category, price, content, brand, size } = req.body;

    const updateData = {
        ...(name && {name}),
        ...(category && {category}),
        ...(price && {price}),
        ...(content && {content}),
        ...(brand && {brand}),
        ...(size && {size}),
    };

    await productService.editProduct(productId, updateData);

    res.redirect(`/product/${productId}`);
}); 


//상품 삭제 (login 확인, admin 확인)
productRouter.delete('/:id', loginRequired, adminRequired, async(req, res) => {
    const productId = req.params.id;

    await productService.deleteProduct(productId);
    // res.send(`상품을 삭제했습니다.`);
    res.redirect('/');
});

// //카테고리별 상품
// productRouter.get('/:category', async(req, res) => {
//     const category = req.params.category;
//     const categoryProduct = await productService.findByCategory(category);
//     res.json(categoryProduct);
// });


//상품 상세 보기
productRouter.get('/:id', async(req, res) => {
    const productId = req.params.id;
    const productData = await productService.viewProductData(productId);
    res.json(productData);
});



export { productRouter };

