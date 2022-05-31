import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("products", ProductSchema);

export class ProductModel {
    async findByCategory(Category) {
      //특정 카테고리의 상품 찾기
        const categoryProduct = await Product.findOne({ Category });
        return categoryProduct;
    }

    async findByName(Name) {
        //특정 이름의 상품 찾기
        const nameProduct = await Product.findOne({ Name });
        return nameProduct;
    }

    async findById(productId) {
      //특정 아이디를 가진 상품 찾기
        const idProduct = await Product.findOne({ _id: productId });
        return idProduct;
    }

    async create(productInfo) {
      //상품 생성(상품등록)
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }

    async findAll() {
      //모든 상품 가져오기
        const allProducts = await Product.find({});
        return allProducts;
    }

    async findPrice(lowprice, highprice) {
        //lowprice이상 highprice미만 가격대 상품 찾기
        const priceProduct = await Product.filter(prod => prod.Price >=lowprice && prod.Price < highprice);
    }

    // async update({ userId, update }) {
    //     //유저 정보 수정(아마도 비밀번호 변경 혹은 주소 변경)
    //     const filter = { _id: userId };
    //     const option = { returnOriginal: false };
    
    //     const updatedUser = await User.findOneAndUpdate(filter, update, option);
    //     return updatedUser;
    // }

}

const productModel = new ProductModel();

export { productModel };
