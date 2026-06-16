import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { bookingDetails } from '../data/mockData'

function BookingConfirmation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Booking Confirmed!</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Your room has been successfully booked.</p>
      </div>

      <Card title="Booking Details">
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-medium text-[#6B7280]">Booking ID</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.bookingId}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Room</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.room}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Date / Date Range</p>
            <p className="mt-1 font-semibold text-[#111827]">
              {bookingDetails.startDate} - {bookingDetails.endDate}
            </p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.time}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Duration</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.duration}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Payment Status</p>
            <div className="mt-1">
              <StatusBadge status="Paid" />
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
