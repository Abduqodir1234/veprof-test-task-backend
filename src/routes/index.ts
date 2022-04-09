import { Router } from "express";
import UserRegister from "../views/user/register";
import { UserSchemaValidator } from "../middlewares/joi/user";
import Login from "../views/user/login";

const indexRouter = Router()

indexRouter.post("/register",UserSchemaValidator,UserRegister)
indexRouter.post("/signin",UserSchemaValidator,Login)


export default indexRouter