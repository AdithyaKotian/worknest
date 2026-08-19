import { Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import {
  checkAvailability,
  createBooking,
  getBookingsByUser,
  getBookingById,
  cancelBooking,
} from '../services/booking.service'

export const book = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const { roomId, startTime, endTime, totalAmount } = req.body

    if (!roomId || !startTime || !endTime || totalAmount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'roomId, startTime, endTime, and totalAmount are required',
      })
    }

    const parsedStartTime = new Date(startTime)
    const parsedEndTime = new Date(endTime)

    if (isNaN(parsedStartTime.getTime()) || isNaN(parsedEndTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid startTime or endTime format',
      })
    }

    if (parsedStartTime >= parsedEndTime) {
      return res.status(400).json({
        success: false,
        message: 'startTime must be earlier than endTime',
      })
    }

    const isAvailable = await checkAvailability(
      Number(roomId),
      parsedStartTime,
      parsedEndTime
    )

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available for the selected time slot',
      })
    }

    const booking = await createBooking({
      userId,
      roomId: Number(roomId),
      startTime: parsedStartTime,
      endTime: parsedEndTime,
      totalAmount,
    })

    return res.status(201).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const myBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const bookings = await getBookingsByUser(userId)

    return res.status(200).json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const singleBooking = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string

    const booking = await getBookingById(id)
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      })
    }

    // Ensure only the owner or an admin can view the booking
    if (booking.userId !== req.userId && req.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      })
    }

    return res.status(200).json({
      success: true,
      data: booking,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const cancel = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const id = req.params.id as string

    const result = await cancelBooking(id, userId)

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or already cancelled',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
