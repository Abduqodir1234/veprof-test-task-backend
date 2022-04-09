import readlineSync from "readline-sync"
import mongoose from "mongoose"
import UserService from "../services/users.service"
require('dotenv').config()


const mongo_uri = process.env.MONGO_URI || ""
const email = readlineSync.questionEMail("Email:")
const password = readlineSync.questionNewPassword("Password:",{
    min:3,
    mask:""
})



let createSuperUser = async (email:string,password:string) =>{
    try{
        await mongoose.connect(mongo_uri)
        let service = new UserService()
        const {error,msg} = await service.createUser({email,password,role:"super"})
        console.log("Error",error,"\nMessage",msg)
        process.exit()
    }
    catch(e){
        console.log("Error",e)
        process.exit()
    }
}

createSuperUser(email,password)





