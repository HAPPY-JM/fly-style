import { Schema } from "mongoose";

const ProductSchema = new Schema({
    // _id:objectId,//상품Id

    name:{
        type:String,
        required:true,
    },//상품이름

    category:{
        type: Array,
        required:true,
        items: {type: String},
    },//상품카테고리

    price:{
        type:Number,
        required : true,
    },//가격

    content:{
        type:String,
        required: true,
    },//상품설명

    brand:{
        type:String,
    },//제조사
    
    // Img:{

    // },

    size:{
        type: Array,
        items: {type: String},
    },
})

export { ProductSchema };