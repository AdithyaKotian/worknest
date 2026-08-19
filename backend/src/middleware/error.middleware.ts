import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[WorkNest Server Error]:', err)

  const isProduction = process.env.NODE_ENV === 'production'
  const message = isProduction ? 'Internal server error' : err.message || 'Internal server error'

  res.status(500).json({
    success: false,
    message,
  })
}