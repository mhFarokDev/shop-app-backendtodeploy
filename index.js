import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";
import errorHandler from "./middleware/errorHandleing.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRouter.js";
import cors from "cors"

// configuration express server
const app = express()


// gonfiguration dotenv and difine variables
dotenv.config()
const PORT = process.env.SERVER_PORT || 5000;

// middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))


// make static folder
// if anyone write in in url public rediract root file to public file
app.use(express.static('api/public'))

// cookie-parser config (*** Cookies parser must before rest API ***)
app.use(cookieParser())
app.use(cors())


// express rest API
app.use('/api/v1/product', productRouter)
app.use('/api/user', userRouter)



// error handleing
app.use(errorHandler)

// listen express server
app.listen(PORT, ()=>{
    // mongodb config function
    connectMongoDB()
    console.log(`server is run on port ${PORT}`.bgBlue);
})