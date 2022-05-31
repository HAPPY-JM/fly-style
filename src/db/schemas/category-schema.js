import { Schema } from "mongoose";

const CategorySchema = new Schema({
    categoryName: {
        type: String,
    }
});

export { CategorySchema };