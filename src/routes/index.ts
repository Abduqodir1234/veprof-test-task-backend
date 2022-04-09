import { Router } from "express";
import UserRegister from "../views/user/register";
import { UserSchemaValidator } from "../middlewares/joi/user";
import Login from "../views/user/login";
import { UserRegisterSchemaValidator } from "../middlewares/joi/register";

const indexRouter = Router()

indexRouter.post("/register",UserRegisterSchemaValidator,UserRegister)
indexRouter.post("/signin",UserSchemaValidator,Login)


export default indexRouter