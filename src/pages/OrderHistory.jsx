import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { orderHistory } from '../data/mockData'

function OrderHistory() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Order History</h1>
        <p className="mt-2 text-sm text-[#6B7280]">View your previous bookings and payment details.</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E7EB] text-sm whitespace-nowrap">
            <thead className="bg-[#EFF6FF]">
              <tr className="text-left text-[#6B7280]">
                <th className="py-3 pr-4 font-medium">Booking ID</th>
                <th className="px-4 py-3 font-medium">Space</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="py-3 pl-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {orderHistory.map((booking) => (
                <tr key={booking.bookingId}>
                  <td className="py-3 pr-4 font-medium text-[#111827]">{booking.bookingId}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{booking.space}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{booking.date}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{booking.time}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{booking.amount}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="py-3 pl-4">
                    <Button as={Link} to="/room-details/1" variant="ghost" className="px-0">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default OrderHistory
