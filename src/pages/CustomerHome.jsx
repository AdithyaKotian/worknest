import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { customer, customerBookings, nearbySpaces } from '../data/mockData'

function CustomerHome() {
  const bookedSpace = customerBookings[0]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">Welcome, {customer.name}</h1>
          <p className="mt-2 text-sm text-[#6B7280]">Location: {customer.location}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="ghost">Notifications</Button>
          <Button as={Link} to="/order-history">
            Order History
          </Button>
          <Button as={Link} to="/manage-profile" variant="outline">
            Manage Profile
          </Button>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111827]">My Booked Spaces</h2>

        <Card className="border-blue-100 bg-[#EFF6FF]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#111827]">{bookedSpace.space}</h3>
              <p className="mt-2 text-sm text-[#6B7280]">{bookedSpace.date}</p>
              <p className="mt-1 text-sm text-[#6B7280]">{bookedSpace.time}</p>
              <div className="mt-3">
                <StatusBadge status={bookedSpace.status} />
              </div>
            </div>
            <Button as={Link} to="/room-details/1" variant="outline">
              View Details
            </Button>
          </div>
        </Card>

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
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111827]">
          Nearby Available Spaces in {customer.location}
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {nearbySpaces.map((space) => (
            <Card key={space.id} className="shadow-[0_10px_26px_rgba(30,58,138,0.06)]">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-[#111827]">{space.name}</h3>
                  <StatusBadge status={space.status} />
                </div>
                <p className="text-sm text-[#6B7280]">Capacity: {space.capacity}</p>
                <p className="text-sm text-[#6B7280]">Price: {space.priceLabel}</p>
                <Button as={Link} to="/room-details/1" variant="outline" className="w-full">
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
