import { RoomType, Prisma } from '@prisma/client'
import prisma from '../lib/prisma'

export interface RoomFilters {
  type?: RoomType
  branchId?: number
  isActive?: boolean
  locationId?: number
}

export const getAllRooms = async (filters?: RoomFilters) => {
  const where: Prisma.RoomWhereInput = {}

  if (filters?.type) {
    where.type = filters.type
  }

  if (filters?.branchId !== undefined) {
    where.branchId = filters.branchId
  }

  if (filters?.isActive !== undefined) {
    where.isActive = filters.isActive
  }

  if (filters?.locationId !== undefined) {
    where.branch = {
      locationId: filters.locationId,
    }
  }

  return prisma.room.findMany({
    where,
    include: {
      branch: {
        include: {
          location: true,
        },
      },
    },
  })
}

export const getRoomById = async (id: number) => {
  return prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      branch: {
        include: {
          location: true,
        },
      },
    },
  })
}

export const createRoom = async (data: Prisma.RoomUncheckedCreateInput) => {
  return prisma.room.create({
    data,
    include: {
      branch: {
        include: {
          location: true,
        },
      },
    },
  })
}

export const updateRoom = async (
  id: number,
  data: Prisma.RoomUncheckedUpdateInput
) => {
  return prisma.room.update({
    where: {
      id,
    },
    data,
    include: {
      branch: {
        include: {
          location: true,
        },
      },
    },
  })
}

export const deleteRoom = async (id: number) => {
  return prisma.room.delete({
    where: {
      id,
    },
  })
}
