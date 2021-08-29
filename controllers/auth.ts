import { PrismaClient } from '@prisma/client'
import { Router, Request, Response, NextFunction } from 'express';
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient()
const route = Router();

const atob = (str: any): string => Buffer.from(str, 'base64').toString();
// let buff = new Buffer("rosh12@gmail.com:123456789");
// let base64data = buff.toString('base64');
// console.log(base64data);
route.post("/", async(req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user input
        const  authentication = req.headers.authorization;
        

        const [username , password] = atob(authentication).split(":");
        
        //Validate username & password
        if (!username || !password) {
            return res.status(404).json({msg: "Invalid Username or Password"})
        }
       
        // Find if user exists in the database
        const user = await prisma.user.findUnique({
            where:{
                username:username,
            },
           
            
        }) 
        if(user && (await bcrypt.compare(password, user.password))) {
            const authToken = jwt.sign(
                {
                    id:user.id,
                    username: user.username
                },
                process.env.JWT_SECRET
            )
            return res.status(200).json({ authToken: authToken })
        }
        return res.status(400).json({msg:"Invalid credentials"});
        
    } catch (err){
        console.log(err)
        //res.status(500).send({msg:"Server Error"})
        
    }
    
    
})


module.exports = route ;