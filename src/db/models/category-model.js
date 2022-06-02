import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("category", CategorySchema);

export class CategoryModel {
    async create(name) {
        //카테고리 생성
        const createdNewCategory = await Category.create(name);
        return createdNewCategory;
    }

    async findByName(name) {
        //특정 이름의 카테고리 찾기
        const nameCategory = await Category.findOne({ name });
        return nameCategory;
    }

    async editCategory( categoryId, update ) {
        //카테고리 수정
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


const categorytModel = new CategoryModel();

export { categorytModel };