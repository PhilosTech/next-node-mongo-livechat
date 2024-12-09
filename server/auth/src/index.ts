import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './routes'

dotenv.config({ path: '.env' })

const app = express()
const PORT = process.env.AUTH_PORT || 3002


// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))


// Routes
app.use('/api/auth', routes)


// Start Server
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`))
