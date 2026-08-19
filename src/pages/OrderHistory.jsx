import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { getMyBookings } from '../services/api'

function OrderHistory() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await getMyBookings()
        setBookings(response.data || [])
      } catch {
        setError('Failed to fetch order history.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Order History</h1>
        <p className="mt-2 text-sm text-[#6B7280]">View your previous bookings and payment details.</p>
      </div>

      <Card>
        {loading ? (
          <div className="flex min-h-32 items-center justify-center text-sm text-[#6B7280]">
            Loading bookings...
          </div>
        ) : error ? (
          <div className="p-4 text-sm text-red-600">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#6B7280]">
            No bookings found in your account history.
          </div>
        ) : (
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
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="py-3 pr-4 font-medium text-[#111827]">{booking.id}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{booking.room?.name || 'Workspace'}</td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      {new Date(booking.startTime).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                      {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#111827]">₹{booking.totalAmount}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="py-3 pl-4">
                      <Button
                        as={Link}
                        to={`/room-details/${booking.roomId || booking.room?.id || 1}`}
                        variant="ghost"
                        className="px-0"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default OrderHistory
