import express from 'express'
import dotenv, { config } from 'dotenv'
import userRoutes from './followup backend/routes/user routes.js'
import adminRoutes from './followup backend/routes/admin routes.js'
import { connectDB } from './followup backend/config/db.js'
import bycrypt from 'bcrypt'



dotenv.config()

const app = express()

const port = process.env.port

app.use(express.json())
app.use("/api/user", userRoutes)
app.use("/api/admin", adminRoutes)

app.listen(port, () =>{
    connectDB()
    console.log('server started at http://localhost: ' + port)
})

