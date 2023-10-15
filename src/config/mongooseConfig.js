import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DB_URL;
export const connectUsingMongoose = async () =>{
    try {
        await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("MongoDB connected using Mongoose")
    } catch (error) {
        console.log("Error while connecting to MongoDB")
        console.log(error)
    }
    
}