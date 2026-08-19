import { Request, Response } from 'express'
import {
  registerUser,
  findUserByEmail,
  comparePassword,
  generateToken,
  findUserById,
} from '../services/auth.service'
import { AuthRequest } from '../middleware/auth.middleware'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      })
    }

    const user = await registerUser(name, email, password)
    const token = generateToken(user.id, user.role)

    return res.status(201).json({
      success: true,
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user || !user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const isMatch = await comparePassword(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = generateToken(user.id, user.role)

    const { passwordHash: _, ...safeUser } = user

    return res.status(200).json({
      success: true,
      data: {
        user: safeUser,
        token,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const user = await findUserById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const { passwordHash: _, ...safeUser } = user

    return res.status(200).json({
      success: true,
      data: safeUser,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
