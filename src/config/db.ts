import { connect } from "mongoose"
import { Application } from "express"




const startDB = async (app:Application,PORT:string|number) => {
    try{
        const mongo_uri = process.env.MONGO_URI || ""
        await connect(mongo_uri)
        app.listen(PORT,()=>console.log(`Server is listening in PORT ${PORT}\nDatabase connected`))
    }
    catch(e){
        console.log("DB error",e)
        process.exit(1)
    }
}
export default startDB;