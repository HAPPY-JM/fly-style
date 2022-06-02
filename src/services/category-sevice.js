import { categoryModel } from "../db";
import mongoose from "mongoose";

//프로덕트라우터에서 사용
class CategoryService {
    // 본 파일의 맨 아래에서, new CategoryService(categoryModel) 하면, 이 함수의 인자로 전달됨
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    // 카테고리 생성
    async addCategory(categoryName) {
        // 객체 destructuring
        const name = categoryName;

        // 카테고리 중복 확인
        const nameCategory = await this.categoryModel.findByName(name);
        if (nameCategory) {
            throw new Error(
                "이 카테고리는 이미 존재합니다. 다른 상품명을 입력해 주세요."
            );
        }else{

        // 카테고리 중복은 이제 아니므로, 카테고리 생성을 진행함

        // db에 저장
        const createdNewCategory = await this.categoryModel.create(name);

        return createdNewCategory;
        }
    }

    //카테고리 수정
    async editCategory( categoryId, update ) {
        const editCategory = await this.categoryModel.editCategory(categoryId, update);
        return editCategory;
    }

    //카테고리 삭제
    async deleteCategory( categoryId ){
        const deleteCategory = await this.categoryModel.deleteCategory(categoryId);
        return deleteCategory;
    }

}

const categoryService = new CategoryService(categoryModel);

export { categoryService };