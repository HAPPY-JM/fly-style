import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("category", CategorySchema);

export class CategoryModel {
    
    async findByName(name) {
    //특정 이름의 카테고리 찾기
        const nameCategory = await Category.findOne({ name });
        return nameCategory;
    }

    async findById(categoryId) {
    //특정 아이디를 가진 카테고리 찾기
        const idCategory = await Category.findOne({ _id:categoryId });
        return idCategory;
    }

    async create(categoryInfo) {
    //카테고리 생성(카테고리등록)
        const createdNewCategory = await Category.create(categoryInfo);
        return createdNewCategory;
    }

    async findAll() {
    //모든 카테고리 가져오기
        const allCategory = await Category.find({});
        return allCategory;
    }

    async editCategory( categoryId, update ) {
    //카테고리 정보 수정
        const filter = { _id:categoryId };
        const option = { returnOriginal: false };
    
        const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
        return updatedCategory;
    }

    async deleteCategory( categoryId ) {
      //카테고리 삭제
        const deleteCategory = await Category.deleteOne({ _id:categoryId });
        return deleteCategory;
    }

}


const categoryModel = new CategoryModel();

export { categoryModel };