const express = require("express"); 
import 'dotenv/config'

import formData from "express-form-data";
const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
import cors from"cors";
//const mysqlConnection = require("./config/db");
//const connectDB = require("./config/db");


const registerRoute = require("./controllers/register");
const authRoute = require("./controllers/auth");
const transactionsRoute = require("./controllers/transactions");
const forgotpasswordRoute = require("./controllers/forgetpassword");

//connectDB();


const app = express();
app.use(express.json());
app.use(cors());
app.use(bearerToken());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/v1/register", registerRoute)
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/transactions", transactionsRoute);
app.use("/api/v1/forgotpassword", forgotpasswordRoute);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on ${process.env.NODE_ENV} mode on port ${port}`));
