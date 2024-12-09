import bcrypt from 'bcrypt'
import { Request, Response, Router } from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from './models'
import { verifyToken } from './middleware'

dotenv.config({ path: '.env' })
const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey'


// Register
router.post('/register', async (req, res) => {
  const { name, email, password, createdAt } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword, createdAt })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' })
  }
})

// Login
router.post(
  '/login',
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.status(400).json({ error: 'Invalid credentials' })
        return
      }
      const token = jwt.sign({ id: user._id, email: user.email, chats: user.chats }, JWT_SECRET, {
        expiresIn: '1d',
      })

      res.json({ token })
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' })
    }
  }
)

router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, '_id name email')
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.get('/protected', verifyToken, (req: Request, res: Response) => {

  const user = (req as any).user
  res.json({ message: 'This is a protected route.', user })
})

export default router
