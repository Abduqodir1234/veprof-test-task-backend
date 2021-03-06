import { NextFunction, Response } from "express";
import Joi, { options } from "joi";
import { Request2 } from "../verifyToken";

const UserRegisterSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string()
        .min(6)
        .pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+])[A-Za-z\d@+$!%*#?&+]{6,}$/))
        .required(),
    confirm_password:Joi.ref("password")
})



export const UserRegisterSchemaValidator = async (req:Request2,res:Response,next:NextFunction)=>{
    try{
        const resVal = UserRegisterSchema.validate(req.body)
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