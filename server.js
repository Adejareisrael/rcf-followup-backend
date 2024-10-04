import express from 'express'
import dotenv, { config } from 'dotenv'
import userRoutes from './followup backend/routes/user routes.js'
import { connectDB } from './followup backend/config/db.js'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()

const port = process.env.port

app.use(express.json())
app.use("/api/user", userRoutes)

app.listen(port, () =>{
    connectDB()
    console.log('server started at http://localhost: ' + port)
})