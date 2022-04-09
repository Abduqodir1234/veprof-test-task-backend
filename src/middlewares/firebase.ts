import admin from "firebase-admin"
import service from "../config/firebase.json"
const service2:any = service;


admin.initializeApp({
    credential:admin.credential.cert(service2),
})
export default admin;