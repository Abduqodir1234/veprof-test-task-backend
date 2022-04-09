import express from "express"
import start from "./loaders"
require("dotenv").config()

const app = express()

start(app)