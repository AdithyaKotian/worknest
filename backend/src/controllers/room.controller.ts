import { Request, Response } from 'express'
import { RoomType } from '@prisma/client'
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  RoomFilters,
} from '../services/room.service'

export const listRooms = async (req: Request, res: Response) => {
  try {
    const { type, branchId, isActive, locationId } = req.query

    const filters: RoomFilters = {}

    if (type && Object.values(RoomType).includes(type as RoomType)) {
      filters.type = type as RoomType
    }

    if (branchId) {
      filters.branchId = Number(branchId)
    }

    if (isActive !== undefined) {
      filters.isActive = isActive === 'true'
    }

    if (locationId) {
      filters.locationId = Number(locationId)
    }

    const rooms = await getAllRooms(filters)

    return res.status(200).json({
      success: true,
      data: rooms,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const getRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID',
      })
    }

    const room = await getRoomById(id)
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: room,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const addRoom = async (req: Request, res: Response) => {
  try {
    const room = await createRoom(req.body)

    return res.status(201).json({
      success: true,
      data: room,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const editRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID',
      })
    }

    const room = await updateRoom(id, req.body)

    return res.status(200).json({
      success: true,
      data: room,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const removeRoom = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid room ID',
      })
    }

    await deleteRoom(id)

    return res.status(200).json({
      success: true,
      message: 'Room deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
