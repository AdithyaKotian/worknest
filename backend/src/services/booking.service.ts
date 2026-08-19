import { BookingStatus, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

export interface CreateBookingData {
  userId: string
  roomId: number
  startTime: Date
  endTime: Date
  totalAmount: number | Prisma.Decimal
}

export const checkAvailability = async (
  roomId: number,
  startTime: Date,
  endTime: Date
): Promise<boolean> => {
  const overlapping = await prisma.booking.findFirst({
    where: {
      roomId,
      status: {
        in: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      },
      startTime: {
        lt: endTime,
      },
      endTime: {
        gt: startTime,
      },
    },
  })

  return !overlapping
}

export const createBooking = async (data: CreateBookingData) => {
  return prisma.booking.create({
    data: {
      userId: data.userId,
      roomId: data.roomId,
      startTime: data.startTime,
      endTime: data.endTime,
      totalAmount: data.totalAmount,
    },
    include: {
      room: {
        include: {
          branch: {
            include: {
              location: true,
            },
          },
        },
      },
    },
  })
}

export const getBookingsByUser = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      room: {
        include: {
          branch: {
            include: {
              location: true,
            },
          },
        },
      },
    },
    orderBy: {
      startTime: 'desc',
    },
  })
}

export const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      room: {
        include: {
          branch: {
            include: {
              location: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  })
}

export const cancelBooking = async (id: string, userId: string) => {
  return prisma.booking.updateMany({
    where: {
      id,
      userId,
      status: {
        not: BookingStatus.CANCELLED,
      },
    },
    data: {
      status: BookingStatus.CANCELLED,
    },
  })
}
