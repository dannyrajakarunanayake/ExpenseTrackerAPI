

import { Router, Request, Response, NextFunction } from 'express';
const User  = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { NodeMailgun } from 'ts-mailgun';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const mailer = new NodeMailgun();

const route = Router();


mailer.apiKey="abde31d7911448b2120aa879357d3dd0-1d8af1f4-52d2382d";
mailer.domain="sandbox6d6fad72310e49a5b9a18443c563ab46.mailgun.org";
mailer.fromEmail="mesh.ferdi@gmail.com";
mailer.fromTitle= "reset password";

mailer.init();


route.post("/", async(req: Request, res: Response, next:NextFunction)=> {
    try {
		const { authToken, newpassword: plainTextPassword } = req.body

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	try {
		const user = jwt.verify(authToken, process.env.JWT_SECRET)

		const id = user.id

		const password = await bcrypt.hash(plainTextPassword, 10)

		//await prisma.user.update({ where: { id: Number(id) || undefined }})
		res.status(201).json({ status: 'ok' })
        mailer.send("mesh.ferdi@gmail.com", "click the link bellow")
       .then(()=> next())
       .catch((error) => res.sendStatus(500))
	} catch (error) {
		console.log(error)
		res.json({ status: 'error' })
	}
	}catch(e) {
		next(e)
	}
	
    
})



module.exports = route;