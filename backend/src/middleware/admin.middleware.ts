import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth.middleware'

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    })
  }

  next()
}
