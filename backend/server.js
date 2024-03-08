import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'

import authRouter from './routes/authRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import userRouter from './routes/userRoutes.js'
import connectToDB from './db/connectToMongoDB.js'
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/user', userRouter)
app.listen(port, () => {
  connectToDB()
  console.log(`Server is listening on the port ${port}`)
})
