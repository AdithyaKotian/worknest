import { Response } from 'express'
import { BookingStatus, PaymentStatus } from '@prisma/client'
import { AuthRequest } from '../middleware/auth.middleware'
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  createPayment,
} from '../services/payment.service'
import prisma from '../lib/prisma'

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { amount } = req.body

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'A valid amount is required',
      })
    }

    const receipt = `rcpt_${Date.now()}`
    const order = await createRazorpayOrder(Number(amount), receipt)

    return res.status(200).json({
      success: true,
      data: order,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const verifyPayment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const { orderId, paymentId, signature, amount, bookingId } = req.body

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: 'orderId, paymentId, and signature are required',
      })
    }

    const isValid = verifyRazorpayPayment(orderId, paymentId, signature)
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      })
    }

    const payment = await createPayment({
      userId,
      amount: Number(amount) || 0,
      currency: 'INR',
      status: PaymentStatus.SUCCESS,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
    })

    if (bookingId) {
      await prisma.booking.update({
        where: {
          id: String(bookingId),
        },
        data: {
          status: BookingStatus.CONFIRMED,
        },
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: payment,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
