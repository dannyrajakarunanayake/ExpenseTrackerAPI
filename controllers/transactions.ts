import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
const jwt = require('jsonwebtoken');

const Transaction = require("../models/transaction");
const User = require("../models/user");

import { PrismaClient } from '@prisma/client';
const { JWT_SECRET } =  process.env;

const prisma = new PrismaClient()

const route = Router();

const userValidationRules = [
    body('text')
      .isLength({ min: 1 })
      .withMessage('must not be empty'),
    body('amount').isLength({ min: 1 }).withMessage('must not be empty'),
]
  
  const simpleVadationResult = validationResult.withDefaults({
    formatter: (err) => err.msg,
  })
  
  const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = simpleVadationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped())
    }
    next()
  }

route.get("/", async(req: Request, res:Response, next:NextFunction) => {
    try {
        const token  = req.headers['x-auth-token'];
        const decoded = jwt.verify(token, JWT_SECRET);
    
        const transactions = await prisma.transaction.findMany({
            where: {
              userId:decoded.id  
          },
        });
        

        return res.status(200).json({
            transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        })
        
    }
}),

route.post("/", userValidationRules, checkForErrors ,async(req: Request, res:Response, next:NextFunction) => {
    
    try {
        const { text, amount  } = req.body;
        const token  = req.headers['x-auth-token'];
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET);
      
        // const transaction = await Transaction.create(req.body);
        const transaction = await prisma.transaction.create({
            data:{
                text,
                amount:parseInt(amount),
                userId: decoded.id,
             
            }, 
        })
        
        return res.status(201).json({   
            transaction,
            
        })
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err) 
    }
   
    
}),

route.delete("/:id", async(req: Request, res: Response, next:NextFunction) => {
    try {
        const {id} = req.params;
        const transaction = await prisma.transaction.findUnique({where: {
            id: Number(id),
          }});
        
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        // await transaction.remove();
        await prisma.transaction.delete({ where: {
            id: Number(id),
          },});
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
})

module.exports = route ;