//! This repo handles all the operation using mongoose //
import mongoose, {Schema} from "mongoose";

import { userSchema } from "./user.schema.js"; // This file contains the schema
import { ApplicationError } from "../../error-handler/applicationError.js";

const UserModel = mongoose.model('User',userSchema) // Creating model from schema

export default class UserRepository{

    async signUp(user){
        try {
            // Create instance of model.
            const newUser = new UserModel(user)
            await newUser.save()
            return newUser;
        } catch (error) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async signIn(email, password){
        try {
             return await UserModel.findOne({email, password})
        } catch (error) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }

    }

    async findByEmail(email) {
        try{
             return await UserModel.findOne({email})
        } catch(err){
          console.log(err);
          throw new ApplicationError("Something went wrong with database", 500);
        }
      }
}