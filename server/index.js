import express from 'express'
import dotenv from "dotenv"
import mongoos  from 'mongoose'
import authRoute from './routes/auth.js'
import roomRoute from './routes/rooms.js'
import hotelRoute from './routes/hotels.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()


const connect = async () => {
    try {
        await mongoos.connect(process.env.MONGO_DB_URL)
        console.log("Connected to db");
    } catch (error) {
        throw error
    }
}
mongoos.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected");
})
app.use(cors())
app.use(cookieParser())
app.use(express.json())

mongoos.set('strictQuery', false);


app.use("/api/auth",authRoute)
app.use("/api/rooms",roomRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/users",usersRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.errorMessage || "Somthing went wrong!"
    return res.status(errorStatus).json({
        success : false,
        status : errorStatus,
        messege : errorMessage,
        stack : err.stack

    })
})

app.listen(8800, () => {
    connect()
    console.log("Connected to 8800");
})