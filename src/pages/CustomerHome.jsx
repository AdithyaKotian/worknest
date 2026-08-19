import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { getMyBookings, getRooms } from '../services/api'

function CustomerHome() {
  const location = useLocation()
  const [showProfileSuccess] = useState(Boolean(location.state?.profileUpdated))
  const [user] = useState(() => {
    const cached = localStorage.getItem('worknestUser')
    return cached ? JSON.parse(cached) : { name: 'Customer', location: 'Mangalore' }
  })
  const [bookings, setBookings] = useState([])
  const [spaces, setSpaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [bookingsRes, roomsRes] = await Promise.all([
          getMyBookings().catch(() => ({ data: [] })),
          getRooms().catch(() => ({ data: [] })),
        ])

        setBookings(bookingsRes.data || [])
        setSpaces(roomsRes.data || [])
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const activeBooking = bookings[0]
  const nearbySpaces = spaces.slice(0, 3)

  return (
    <div className="space-y-8">
      {showProfileSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
          Profile updated successfully.
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">
            Welcome, {user.name || 'Member'}
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Email: {user.email || 'Registered User'}
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111827]">My Booked Spaces</h2>

        {loading ? (
          <div className="flex min-h-32 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#6B7280]">
            Loading your bookings...
          </div>
        ) : activeBooking ? (
          <Card className="border-blue-100 bg-[#EFF6FF]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  {activeBooking.room?.name || 'Workspace'}
                </h3>
                <p className="mt-2 text-sm text-[#6B7280]">
                  {new Date(activeBooking.startTime).toLocaleDateString()}
                </p>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {new Date(activeBooking.startTime).toLocaleTimeString()} -{' '}
                  {new Date(activeBooking.endTime).toLocaleTimeString()}
                </p>
                <div className="mt-3">
                  <StatusBadge status={activeBooking.status} />
                </div>
              </div>
              <Button as={Link} to={`/room-details/${activeBooking.roomId || activeBooking.room?.id || 1}`}>
                View Details
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="bg-[#F8FAFC]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#111827]">No bookings yet</h3>
                <p className="mt-2 text-sm text-[#6B7280]">Start by checking nearby available spaces.</p>
              </div>
              <Button as={Link} to="/available-rooms">
                Explore Spaces
              </Button>
            </div>
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111827]">
          Available Spaces
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {nearbySpaces.map((space) => (
            <Card key={space.id} className="shadow-[0_10px_26px_rgba(30,58,138,0.06)]">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#111827]">{space.name}</h3>
                  <StatusBadge status={space.isActive ? 'Available' : 'Unavailable'} />
                </div>
                <p className="text-sm text-[#6B7280]">
                  Capacity: {space.capacity ? `${space.capacity} People` : 'Flexible'}
                </p>
                <p className="text-sm text-[#6B7280]">
                  Price: ₹{space.price}/{space.pricingUnit ? space.pricingUnit.toLowerCase() : 'hour'}
                </p>
                <Button as={Link} to={`/room-details/${space.id}`} className="w-full">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CustomerHome