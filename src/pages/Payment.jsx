import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { bookingDetails } from '../data/mockData'

const paymentMethods = ['UPI / Google Pay', 'Razorpay', 'Debit / Credit Card', 'Net Banking']
const totalAmount = `₹${bookingDetails.totalAmount}`

function Payment() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Payment Summary</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Complete your payment to confirm the booking.</p>
      </div>

      <Card title="Booking Summary" className="bg-[#EFF6FF]">
        <div className="grid gap-4 text-sm md:grid-cols-2">
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
            <p className="font-medium text-[#6B7280]">Total Amount</p>
            <p className="mt-1 font-semibold text-[#111827]">{totalAmount}</p>
          </div>
        </div>
      </Card>

      <Card title="Payment Methods">
        <div className="grid gap-3 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <div
              key={method}
              className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#111827] shadow-sm shadow-blue-900/5"
            >
              {method}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button as={Link} to="/booking-confirmation">
            Pay Now
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Payment
