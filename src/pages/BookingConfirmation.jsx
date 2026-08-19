import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'

function BookingConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()

  const [booking] = useState(() => {
    const rawBooking =
      location.state?.booking || localStorage.getItem('worknestBooking')
    if (!rawBooking) return null
    try {
      return typeof rawBooking === 'string' ? JSON.parse(rawBooking) : rawBooking
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!booking) {
      navigate('/customer-home')
    }
  }, [booking, navigate])

  if (!booking) {
    return null
  }

  const startFormatted = booking.startTime
    ? new Date(booking.startTime).toLocaleString()
    : 'Confirmed Slot'
  const endFormatted = booking.endTime
    ? new Date(booking.endTime).toLocaleTimeString()
    : ''

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Booking Confirmed!</h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Your workspace booking has been successfully confirmed.
        </p>
      </div>

      <Card title="Booking Confirmation Details">
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-medium text-[#6B7280]">Booking ID</p>
            <p className="mt-1 font-semibold text-[#111827]">{booking.id}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Room</p>
            <p className="mt-1 font-semibold text-[#111827]">{booking.room?.name || 'Workspace'}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Branch & Location</p>
            <p className="mt-1 font-semibold text-[#111827]">
              {booking.room?.branch?.name || 'Central'} ({booking.room?.branch?.location?.city || 'Karnataka'})
            </p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Slot Time</p>
            <p className="mt-1 font-semibold text-[#111827]">
              {startFormatted} {endFormatted ? `- ${endFormatted}` : ''}
            </p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Total Amount</p>
            <p className="mt-1 font-semibold text-[#111827]">₹{booking.totalAmount}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Booking Status</p>
            <div className="mt-1">
              <StatusBadge status={booking.status || 'CONFIRMED'} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button as={Link} to="/customer-home">
            Go to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default BookingConfirmation
