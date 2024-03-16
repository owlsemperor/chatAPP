import path from 'path'
import { fileURLToPath } from 'url' // Import fileURLToPath function

// Use fileURLToPath to get the directory path
const __dirname = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'

import authRouter from './routes/authRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import userRouter from './routes/userRoutes.js'
import connectToDB from './db/connectToMongoDB.js'
import { app, server } from './socket/socket.js'
const port = process.env.PORT || 5000

app.use(express.json())

app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/messages', messageRouter)
app.use('/api/user', userRouter)

app.use(express.static(path.join(__dirname, 'fronted', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'fronted', 'dist', 'index.html'))
})
console.log('__dirname:', __dirname)
console.log(
  'Resolved path:',
  path.join(__dirname, 'frontend', 'dist', 'index.html')
)

server.listen(port, () => {
  connectToDB()
  console.log(`Server is listening on the port ${port}`)
})
