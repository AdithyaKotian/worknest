import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/health.routes'
import authRoutes from './routes/auth.routes'
import roomRoutes from './routes/room.routes'
import bookingRoutes from './routes/booking.routes'
import paymentRoutes from './routes/payment.routes'
import { errorHandler } from './middleware/error.middleware'

const app = express()

// Middleware
const allowedOrigins = [
  'https://worknest.vercel.app',
  'http://localhost:5173',
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Blocked by CORS policy'))
      }
    },
    credentials: true,
  })
)
app.use(express.json())

// Routes
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)

// Error Handler (must be the last middleware)
app.use(errorHandler)

export default app