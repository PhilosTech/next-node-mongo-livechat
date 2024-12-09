import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Access Denied. No token provided.' })
    return
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    (req as any).user = verified
    next()
  } catch (err) {
    console.error('Token verification error:', err)
    res.status(403).json({ error: 'Invalid token.' })
    return
  }
}
