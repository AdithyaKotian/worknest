import { Router } from 'express'
import {
  book,
  myBookings,
  singleBooking,
  cancel,
} from '../controllers/booking.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = Router()

router.use(authMiddleware)

router.post('/', book)
router.get('/my-bookings', myBookings)
router.get('/:id', singleBooking)
router.patch('/:id/cancel', cancel)

export default router
