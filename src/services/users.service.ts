import Users from "../models/user";
import hashing from "../middlewares/hashing";
import admin from "../middlewares/firebase";
import compareHash from "../middlewares/compareHash";


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
            const pr1 = new Promise<{uid:string}>((resolve)=>resolve(admin.auth().getUserByEmail(email)))
            const pr2 = new Promise<null | {email:string,password:string}>((resolve)=>resolve(Users.findOne({email})))
            const final = await Promise.all([pr1,pr2])
            const isCorrect = await compareHash(final[1]?.password || "",password)
            if(isCorrect){
                const token = await admin.auth().createCustomToken(final[0].uid)
                return {msg:{error:false,token},status:200}
            }
            else{
                return {msg:{error:true,msg:"Password is wrong"},status:403}
            }
        }
        catch(e){
            return{msg:{error:true,msg:e},status:404}
        }
    }  
}
export default UserService