import { productModel, categorytModel } from "../db";
import mongoose from "mongoose";

//프로덕트라우터에서 사용
class ProductService {
  // 본 파일의 맨 아래에서, new ProductService(productModel) 하면, 이 함수의 인자로 전달됨
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품등록
  async addProduct(productInfo) {
    // 객체 destructuring
    const { name, category, price, content, brand, size } = productInfo;

    // 상품명 중복 확인
    const nameProduct = await this.productModel.findByName(name);
    if (nameProduct) {
      throw new Error(
        "이 상품명은 이미 존재합니다. 다른 상품명을 입력해 주세요."
      );
    }
    // 상품명 중복은 이제 아니므로, 상품등록을 진행함

    const newProductInfo = { name, category, price, content, brand, size };

    // db에 저장
    const createdNewProduct = await this.productModel.create(newProductInfo);

    return createdNewProduct;
  }

  async updateQuantity(orderInfo) {
    const { _id, quantity, size } = orderInfo;
    const product = await this.productModel.findById(_id);
    const productSize = product.size.find((data) => data.name == size);
    const productElse = product.size.filter((data) => data.name !== size);
    const modifiedQuantity = productSize.stock - quantity;
    console.log(modifiedQuantity);
    if (modifiedQuantity <= 0 || !modifiedQuantity) {
      throw new Error(
        "상품의 수량이 모자랍니다. 수량을 변경하고 다시 주문해 주세요"
      );
    }

    const updatedProduct = await this.productModel.editProduct(_id, {
      size: [...productElse, { name: size, stock: modifiedQuantity }],
    });

    return updatedProduct;
  }

  //상품 목록(카테고리)
  async productList(categoryName) {
    if (categoryName === "all") {
      const products = await this.productModel.findAll();
      return products;
    } else {
      const findProduct = await this.productModel.findByCategory(categoryName);
      return findProduct;
    }
  }

  //페이지네이션
  async pagination(productList, page, perPage) {
    const productsPaging = await productList.slice(
      perPage * (page - 1),
      perPage * (page - 1) + perPage
    );
    return productsPaging;
  }

  //상품 수정
  async editProduct(productId, update) {
    const editProduct = await this.productModel.editProduct(productId, update);
    return editProduct;
  }

  //상품 삭제
  async deleteProduct(productId) {
    const deleteProduct = await this.productModel.deleteProduct(productId);
    return deleteProduct;
  }

  // //카테고리로 상품 찾기
  // async findByCategory(category) {
  //   const findProduct = await this.productModel.findByCategory(category);
  //   return findProduct;
  // }

  //상품 상세
  async viewProductData(productId) {
    const product = await this.productModel.findById(productId);
    return product;
  }
}

const productService = new ProductService(productModel);

export { productService };
