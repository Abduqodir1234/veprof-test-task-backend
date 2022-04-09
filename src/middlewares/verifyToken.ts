import { NextFunction, Request, Response } from "express";
import admin from "./firebase";
export interface Request2 extends Request {
    user?: any
}

const verifyToken = async (req:Request2,res:Response,next:NextFunction) => {
    try{
        const token = req.headers.authorization?.split("Bearer ")[1] || ""
        const decoded = await admin.auth().verifyIdToken(token)
        if(decoded){
            req.user = decoded
            return next()
        }
        else{ 
            return res.status(403).json({error:true,msg:"Unauthorized"})
        }
    }
    catch(e){
        console.log(e);
        
        res.status(403).json({error:true,msg:"Unauthenticated"})
    }
}
export default verifyToken;