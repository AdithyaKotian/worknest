import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../services/auth.service'

export interface AuthRequest extends Request {
  userId?: string
  role?: string
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token) as { userId: string; role: string }

    req.userId = decoded.userId
    req.role = decoded.role

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    })
  }
}
