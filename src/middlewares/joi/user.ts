import { NextFunction, Response } from "express";
import Joi from "joi";
import { Request2 } from "../verifyToken";

const UserSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})



export const UserSchemaValidator = async (req:Request2,res:Response,next:NextFunction)=>{
    try{
        const resVal = UserSchema.validate(req.body)
        if(resVal.error){
            return res.status(400).json({error:true,msg:resVal.error?.details[0].message}) 
        }
        else{
            next()
        }
    }
    catch(e){
        return res.status(500).json({error:true,msg:e})
    }
}