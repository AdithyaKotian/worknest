import { Router } from 'express'
import {
  listRooms,
  getRoom,
  addRoom,
  editRoom,
  removeRoom,
} from '../controllers/room.controller'
import { authMiddleware } from '../middleware/auth.middleware'
import { adminMiddleware } from '../middleware/admin.middleware'

const router = Router()

router.get('/', listRooms)
router.get('/:id', getRoom)
router.post('/', authMiddleware, adminMiddleware, addRoom)
router.put('/:id', authMiddleware, adminMiddleware, editRoom)
router.delete('/:id', authMiddleware, adminMiddleware, removeRoom)

export default router
