import bcrypt from "bcrypt"
let hashing = async (param:string) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(param,salt)
    return hashedPassword
}
export default hashing;