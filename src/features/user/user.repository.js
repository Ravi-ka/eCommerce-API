import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";


class UserRepository{
    async signUp(newUser) {
        try {
              // 1. Get the database
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("users") 
            // 3. Insert the document
            await collection.insertOne(newUser);
            return newUser;
        } catch (error) {
              throw new ApplicationError("Something went wrong with the data", 500)
        }
      }

      async signIn(email, password) {
        try {
              // 1. Get the database
            const db = getDB();
            // 2. Get the collection
            const collection = db.collection("users") 
            // 3. find the document
            return await collection.findOne({email, password});
            
        } catch (error) {
              throw new ApplicationError("Something went wrong with the data", 500)
        }
      }
}

export default UserRepository;