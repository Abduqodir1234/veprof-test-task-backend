import Users from "../models/user";
import hashing from "../middlewares/hashing";
import admin from "../middlewares/firebase";
import compareHash from "../middlewares/compareHash";
import { ExecFileException } from "child_process";


interface User{
    email:string;
    password:string;
    role:"super"|"ordinary"
}

class UserService{
    async createUser(data:User){
        try{
            if(!await Users.exists({email:data.email}))
            {
                const hashed = await hashing(data.password)
                const firebase = new Promise<{uid:string}>((resolve)=>{
                    resolve(admin.auth().createUser({
                        password:data.password,
                        email:data.email
                    }))
                })
                const local = new Promise((resolve)=>resolve(Users.create({...data,password:hashed})))
                const final = await Promise.all([firebase,local])
                await admin.auth().setCustomUserClaims(final[0].uid,{admin:data.role==="super"})
                return {error:false,msg:"Created",status:201}
            }
            else{
                return{error:true,msg:"User exists with this email",status:400}
            }
        }
        catch(e){
            return{error:true,msg:e,status:400}
        }
    }


    async logIn(email:string,password:string){
        try{
            const user = await Users.findOne({email})
            if(!user){
                return{msg:{error:true,msg:"User does not exist"},status:500}
            }
            const firebase = await admin.auth().getUserByEmail(email)
            const isCorrect = await compareHash(user?.password || "",password)
            if(isCorrect){
                const token = await admin.auth().createCustomToken(firebase.uid)
                return {msg:{error:false,token},status:200}
            }
            else{
                return {msg:{error:true,msg:"Password is wrong"},status:403}
            }
        }
        catch(e){
            return{msg:{error:true,msg:e},status:500}
        }
    }  
}
export default UserService