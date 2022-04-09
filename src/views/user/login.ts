import { Request, Response } from "express"
import UserService from "../../services/users.service"

const Login = async(req:Request,res:Response)=>{
    const {email,password} = req.body
    const users = new UserService()
    const {msg,status} = await users.logIn(email,password)
    return res.status(status).json(msg)
}
export default Login