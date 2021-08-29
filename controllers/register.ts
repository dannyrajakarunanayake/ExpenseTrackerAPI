import { Router, Request, Response, NextFunction } from 'express';
const Joi = require('joi');
//const db = require("../config/db");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const route = Router();




route.post("/",  async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get user input
        const { username, password: plainTextPassword } = req.body;
        // Valiadte the body
        const schema = Joi.object({
            username: Joi.string().min(3).required(),
            password: Joi.string().min(3).required()
        })
        try {
            const validation = await schema.validateAsync(req.body);
            if(validation.error){
                res.status(422).json({ message:"Validation Error", error: validation.error})
            }
        }catch (e) { 
            console.log(e)
            return res.status(422).json({
                error: 'Server Error',
            })
        }

        
        
         //Validate username
        if (!username || typeof username !== 'string') {
            return res.json({ status: 'error', error: 'Invalid username' })
        }

         //Validate password
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' })
        }

        if (plainTextPassword.length < 5) {
            return res.json({
                status: 'error',
                error: 'Password too small. Should be atleast 6 characters'
            })
        }
        // Hash password
        const password = await bcrypt.hash(plainTextPassword, 10);
        let returnData;

        try {
            //Create user
            const user = await prisma.user.create({
                data: {
                    username,
                    password
                }
            })
            returnData = user;
            console.log('User created successfully: ', user)


        } catch (error) {
            console.log(error)
            if (username) {
                return res.status(400).json({ msg: "User exists" })
            }
        }

        return res.status(201).json({ success: "ok", data: returnData });
    } catch (e) {
        next(e)
    }

})

module.exports = route;