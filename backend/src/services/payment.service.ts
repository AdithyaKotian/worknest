import crypto from 'crypto'
import Razorpay from 'razorpay'
import { PaymentStatus, Prisma } from '@prisma/client'
import { env } from '../config/env'
import prisma from '../lib/prisma'

const razorpay = new Razorpay({
  key_id: env.razorpayKeyId,
  key_secret: env.razorpayKeySecret,
})

export interface CreatePaymentData {
  userId: string
  amount: number | Prisma.Decimal
  currency?: string
  status?: PaymentStatus
  razorpayOrderId?: string
  razorpayPaymentId?: string
}

export const createRazorpayOrder = async (amount: number, receipt: string) => {
  const options = {
    amount: Math.round(amount * 100), // amount in paise
    currency: 'INR',
    receipt,
  }

  return razorpay.orders.create(options)
}

export const verifyRazorpayPayment = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  const generatedSignature = crypto
    .createHmac('sha256', env.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return generatedSignature === signature
}

export const createPayment = async (data: CreatePaymentData) => {
  return prisma.payment.create({
    data: {
      userId: data.userId,
      amount: data.amount,
      currency: data.currency || 'INR',
      status: data.status || PaymentStatus.PENDING,
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
    },
  })
}

export const updatePaymentStatus = async (
  id: string,
  status: PaymentStatus
) => {
  return prisma.payment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}
