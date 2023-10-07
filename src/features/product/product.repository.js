import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ProductRepository{
    async add(newProduct){
        try {
            // 1. Get the database
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("products");
            // 3. Insert the document
            await collection.InsertOne(newProduct);
            return newProduct;

        } catch (error) {
            throw new ApplicationError("Something went wrong with the data", 500)
        }
    }

    async get(id){
        try {
            // 1. Get DB
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("products");
            // 3. Find all the products 
            return collection.find({_id:ObjectId(id)})
        } catch (error) {
            throw new ApplicationError("Something went wrong with the data", 500)
        }
    }

    async getAll(){
        try {
            // 1. Get DB
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("products");
            // 3. Find all the products 
            return collection.find()
        } catch (error) {
            throw new ApplicationError("Something went wrong with the data", 500)
        }

    }

}

export default ProductRepository;