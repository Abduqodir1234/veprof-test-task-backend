import { Request, Response } from "express"
import UserService from "../../services/users.service"

const UserRegister = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    const users = new UserService()
    let {error,msg,status} = await users.createUser({email,password,role:"ordinary"})
    return res.status(status).json({msg:msg,error})
}
export default UserRegister