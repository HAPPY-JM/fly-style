import { model } from "mongoose";
import { CategorySchema } from "../schemas/category-schema";

const Category = model("category", CategorySchema);

export class CategoryModel {

    async create(categoryName) {
        //카테고리 생성
        const createdNewCategory = await Product.create(categoryName);
        return createdNewCategory;
    }

    async updateCategory ({ category , update }) {
        //카테고리 수정
        const filter = { categoryName: category };
        const option = { returnOriginal: false };
        
        const updatedCategory = await Category.findOneAndUpdate(filter, update, option);
        return updatedCategory;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };