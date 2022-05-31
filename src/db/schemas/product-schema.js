import { Schema } from "mongoose";

const ProductSchema = new Schema({
    _id:objectId,//상품Id
    Name:{
        type:String,
        Required:true,
    },//상품이름
    Category:[{
        type: Schema.Types.objectId,
        ref:"category",
        required:true,
    }],//상품카테고리
    Brand:{
        type:String,
    },//제조사
    Price:{
        type:Number,
        Required : true,
    },//가격
    Content:{
        type:String,
        Required: true,
    },//상품설명
    
    // Img:{

    // },

    Size:{
        type:[String]
    },
})

export { ProductSchema };