import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import RoomCard from '../components/RoomCard'
import heroCoworkingImage from '../assets/rooms/hero-coworking.jpg'
import { rooms } from '../data/mockData'

const workspaceOrder = ['Cabin', 'Meeting Room', 'Conference Room', 'Open Desk']
const workspaceRooms = workspaceOrder
  .map((type) => rooms.find((room) => room.type === type))
  .filter(Boolean)

const startTimeOptions = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
]

const endTimeOptions = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
]

const fieldClass =
  'h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] shadow-sm shadow-blue-900/5 outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100'

function Home() {
  const [heroImageFailed, setHeroImageFailed] = useState(false)

  return (
    <div className="space-y-8">
      <section className="grid items-center gap-8 rounded-lg border border-[#E5E7EB] bg-white p-6 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-[#111827] sm:text-4xl">
            Book coworking rooms and workspaces in minutes
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
            Choose cabins, meeting rooms, conference spaces, and shared desks with flexible hourly booking and subscription plans.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as={Link} to="/slot-booking">
              Book a Slot
            </Button>
            <Button as={Link} to="/available-rooms" variant="outline">
              View Rooms
            </Button>
          </div>
        </div>

        <div className="relative min-h-64 overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] text-sm font-medium text-[#6B7280]">
          {!heroImageFailed && heroCoworkingImage ? (
            <img
              src={heroCoworkingImage}
              alt="WorkNest coworking space"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setHeroImageFailed(true)}
            />
          ) : (
            <div className="flex min-h-64 items-center justify-center">
              Room / Coworking Image
            </div>
          )}
        </div>
      </section>

      <Card>
        <div className="grid gap-4 md:grid-cols-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Room Type</span>
            <select
              className={fieldClass}
              defaultValue={rooms[0].type}
            >
              {workspaceRooms.map((room) => (
                <option key={room.id} value={room.type}>
                  {room.type === 'Cabin' ? 'Private Cabin' : room.type === 'Open Desk' ? 'Shared Workspace' : room.type}
                </option>
              ))}
            </select>
          </label>
          <Input label="Date" name="date" type="date" defaultValue="2026-05-30" />
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Start Time</span>
            <select className={fieldClass} defaultValue="10:00 AM" name="startTime">
              {startTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">End Time</span>
            <select className={fieldClass} defaultValue="12:00 PM" name="endTime">
              {endTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <Button as={Link} to="/available-rooms" className="w-full">
              Check Availability
            </Button>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#111827]">Choose your workspace</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workspaceRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
