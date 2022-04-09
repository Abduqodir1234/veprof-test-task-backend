import startDB from "../config/db"
import {Application} from "express"
import cors from "cors"
import express from "express"
import indexRouter from "../routes"
import notFound from "../middlewares/404"


let start = (app:Application) =>{

    const PORT = process.env.PORT || 3000

    
    //middlewares
    app.use(cors())
    app.use(express.json())
    app.use(require('express-log-url'));
    
    //Routes
    app.use("/api/v1/",indexRouter)
    app.use(notFound)
    
    //Start db and log "app started"
    startDB(app,PORT)
}
export default start