import { Router } from "express";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
// import { loginRequired } from "../middlewares";
import { productService } from "../services";
import { productModel } from '../db';

const productRouter = Router();


//상품 등록
productRouter.post('/add', async (req, res, next) => {
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

        res.json(newProduct);
        res.redirect(`/product/${newProduct._id}`);}
    }catch(err){
        next(err);
    }
}); 



//상품 목록
productRouter.get('/', async (req, res) => {
    const productList = await productService.productList();

    res.render('post/list', { productList });
}); 



//상품 수정
productRouter.post('/edit/:_id', async(req, res) => {
    const productId = req.params._id;

    const { name, category, price, content, brand, size } = req.body;

    const editProduct = await productService.editProduct(productId, { name, category, price, content, brand, size });
    
    res.json(editProduct);
    res.redirect(`/product/${productId}`);
}); 


//상품 삭제
productRouter.delete('/:_id', async(req, res) => {
    const productId = req.params._id;

    const deleteProduct = await productService.deleteProduct(productId);
    res.redirect('/');
});

//카테고리별 상품
productRouter.get('/:category', async(req, res) => {
    const category = req.params.category;
    const categoryProduct = await productService.findByCategory(category);
    res.render('post/list', { categoryProduct });
});


//상품 상세 보기
productRouter.get('/:_id', async(req, res) => {
    const productId = req.params._id;
    const productData = await productService.viewProductData(productId);
    res.render('post/list', { productData });
})



export { productRouter };

