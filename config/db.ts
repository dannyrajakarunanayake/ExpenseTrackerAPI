// import mongoose from "mongoose"
// import 'dotenv/config'


// const connectDB = async () => {
   
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
//         console.log(`MongoDB Connected`);
//     } catch (err) {
//         console.log(`MongoDB Connection Error`);
//         process.exit(1);
//     }
// }


//module.exports = connectDB;

// const express = require("express");
// const {createPool} = require("mysql");

// const mysqlConnection = createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "Dev@123!",
//     database: "expence_tracker",
// })

// mysqlConnection.query(`select * from customer_info`, (err:any)=> {
//     if(err){
//         return console.log(err);

//     }
//     return console.log("connected")
// })







