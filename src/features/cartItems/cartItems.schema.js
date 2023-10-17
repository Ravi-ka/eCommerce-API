import mongoose from "mongoose";
import { Schema } from "mongoose";

export const cartSchema = new Schema({
    productID : {
        type : mongoose.Types.ObjectId,
        ref : 'Product'
    },
    userID : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    quantity : Number
})