import { MongoClient } from "mongodb";

const url = 'mongodb://127.0.0.1:27017/ecomdb';

let client;
export const connectToMongoDB =() =>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client = clientInstance
        console.log("MongoDB is connected")
    })
    .catch(err=>{
        console.log(err)
    })
}

export const getDB = () =>{
    return client.db();
}

/*
Note: 
    1. Call the function "connectToMongoDB" in server.js file.
*/