import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { bookingDetails } from '../data/mockData'

const [startTime = '10:00 AM', endTime = '12:00 PM'] = bookingDetails.time.split(' - ')
const totalAmount = `₹${bookingDetails.totalAmount}`

function SlotBooking() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Confirm Your Booking</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Review your room details before proceeding to payment.</p>
      </div>

      <Card title="Booking Details">
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-medium text-[#6B7280]">Room</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.room}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Start Date</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.startDate}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">End Date</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.endDate}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Start Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{startTime}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">End Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{endTime}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Duration</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.duration}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">People</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.people}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Booking Type</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.bookingType}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Rate</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.rate}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Total Amount</p>
            <p className="mt-1 font-semibold text-[#111827]">{totalAmount}</p>
          </div>
        </div>
        <div className="mt-6">
          <Button as={Link} to="/payment">
            Proceed to Payment
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SlotBooking
