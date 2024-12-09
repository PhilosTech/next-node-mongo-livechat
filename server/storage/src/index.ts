import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import storageRoutes from './routes'
import cors from 'cors'

dotenv.config({ path: '.env' })

const app = express()
const PORT = process.env.STORAGE_PORT || 3004

// Middleware
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

// Routes
app.use('/api/storage', storageRoutes)

app.listen(PORT, () => {
  console.log(`Storage Service running on port ${PORT}`)
})
