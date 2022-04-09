import bcrypt from "bcrypt"
const compareHash = async(hash:string,plain:string)=>{
    try{
        let res = await bcrypt.compare(plain,hash)
        return res
    }
    catch{
        return false
    }
}
export default compareHash;