import { model } from "mongoose";
import { ProductSchema } from "../schemas/product-schema";

const Product = model("product", ProductSchema);

export class ProductModel {
  // async findByCategory(category) {
  //   //특정 카테고리의 상품 찾기
  //   const categoryProduct = await Product.findOne({ category });
  //   return categoryProduct;
  // }

  async findByName(name) {
    //특정 이름의 상품 찾기
    const nameProduct = await Product.findOne({ name });
    return nameProduct;
  }

  async findById(productId) {
    //특정 아이디를 가진 상품 찾기
    const idProduct = await Product.findOne({ _id:productId });
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

  // async findPrice(lowprice, highprice) {
  //   //lowprice이상 highprice미만 가격대 상품 찾기
  //   const priceProduct = await Product.filter(prod => prod.Price >=lowprice && prod.Price < highprice);
  //   return priceProduct;
  // }

  async editProduct( productId, update ) {
    //상품 정보 수정(상품명, 상품카테고리, 상품제조사, 상품가격, 상품설명, 사이즈 변경)
    const filter = { _id:productId };
    const option = { returnOriginal: false };
    
    const updatedProduct = await Product.findOneAndUpdate(filter, update, option);
    return updatedProduct;
  }

  async deleteProduct( productId ) {
      //상품 삭제
      const deleteProduct = await Product.deleteOne({ _id:productId });
      return deleteProduct;
  }

}

const productModel = new ProductModel();

export { productModel };
