import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { customer, customerBookings, nearbySpaces } from '../data/mockData'

const authStorageKey = 'worknestMockLoggedIn'

function CustomerHome() {
  const location = useLocation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(Boolean(location.state?.openAccountDrawer))
  const [showProfileSuccess] = useState(Boolean(location.state?.profileUpdated))
  const navigate = useNavigate()
  const bookedSpace = customerBookings[0]

  function handleLogout() {
    localStorage.removeItem(authStorageKey)
    window.dispatchEvent(new Event('worknest-auth-change'))
    setIsDrawerOpen(false)
    navigate('/')
  }

  return (
    <div className="space-y-8">
      {showProfileSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-sm">
          Profile updated successfully.
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">Welcome, {customer.name}</h1>
          <p className="mt-2 text-sm text-[#6B7280]">Location: {customer.location}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>Notifications</Button>
          <Button onClick={() => setIsDrawerOpen(true)}>Account Menu</Button>
          <Button as={Link} to="/order-history">
            Order History
          </Button>
          <Button as={Link} to="/manage-profile">
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
            <Button as={Link} to="/room-details/1">
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
                <Button as={Link} to="/room-details/1" className="w-full">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div
        className={[
          'fixed inset-0 z-50',
          isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!isDrawerOpen}
      >
        <button
          type="button"
          className={[
            'absolute inset-0 bg-[#111827]/20 transition-opacity',
            isDrawerOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          aria-label="Close account menu"
          onClick={() => setIsDrawerOpen(false)}
        />

        <aside
          className={[
            'absolute right-0 top-0 h-full w-full max-w-sm border-l border-[#E5E7EB] bg-white p-6 shadow-[0_20px_50px_rgba(17,24,39,0.18)] transition-transform duration-200',
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Account Menu</h2>
              <p className="mt-1 text-sm text-[#6B7280]">Manage your WorkNest account.</p>
            </div>
            <Button variant="ghost" onClick={() => setIsDrawerOpen(false)}>
              Close
            </Button>
          </div>

          <div className="mt-6 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-semibold text-[#111827]">Personalization</h3>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#6B7280]">Preferred Location</span>
                <select className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100">
                  <option>Mangalore</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#6B7280]">Workspace Type</span>
                <select className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100">
                  <option>Meeting Room</option>
                  <option>Private Cabin</option>
                  <option>Shared Workspace</option>
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button
              as={Link}
              to="/manage-profile"
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsDrawerOpen(false)}
            >
              Manage Profile
            </Button>
            <Button
              as={Link}
              to="/order-history"
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsDrawerOpen(false)}
            >
              Order History
            </Button>
            <Button
              as={Link}
              to="/customer-home"
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsDrawerOpen(false)}
            >
              My Bookings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-[#B91C1C]" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CustomerHome
