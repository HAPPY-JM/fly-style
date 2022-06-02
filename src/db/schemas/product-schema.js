import { Schema } from "mongoose";

const ProductSchema = new Schema({
    // _id:objectId,//상품Id

    Name:{
        type:String,
        Required:true,
    },//상품이름

    Category:{
        type: Array,
        required:true,
        items: {type: String},
    },//상품카테고리

    Price:{
        type:Number,
        Required : true,
    },//가격

    Content:{
        type:String,
        Required: true,
    },//상품설명

    Brand:{
        type:String,
    },//제조사
    
    // Img:{

    // },

    Size:{
        type: Array,
        items: {type: String},
    },
})

export { ProductSchema };