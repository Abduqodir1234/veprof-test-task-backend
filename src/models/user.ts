import {Schema,model,Document} from "mongoose"


export interface UserDocument extends Document{
    email:string,
    password:string,
    role:"super" | "ordinary"
}

let UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide correct form of email"
        ],
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:["super","ordinary"],
            message:"{VALUE} is supported"
        }
    }
},{timestamps:true})

const Users = model("users",UserSchema)
export default Users