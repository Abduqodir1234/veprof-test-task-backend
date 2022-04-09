import { NextFunction, Response } from "express";
import Joi from "joi";
import { Request2 } from "../verifyToken";

const UserSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})



export const UserSchemaValidator = async (req:Request2,res:Response,next:NextFunction)=>{
    try{
        await UserSchema.validateAsync(req.body)
        next()
    }
    catch(e){
        return res.status(400).json({error:true,msg:e})
    }
}