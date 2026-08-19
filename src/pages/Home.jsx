import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import RoomCard from '../components/RoomCard'
import heroCoworkingImage from '../assets/rooms/hero-coworking.jpg'
import conferenceRoomImage from '../assets/rooms/conference-room.jpg'
import meetingRoomImage from '../assets/rooms/meeting-room.jpg'
import privateCabinImage from '../assets/rooms/private-cabin.jpg'
import sharedWorkspaceImage from '../assets/rooms/shared-workspace.jpg'
import { getRooms } from '../services/api'

const roomImageMap = {
  PRIVATE_CABIN: privateCabinImage,
  MEETING_ROOM: meetingRoomImage,
  CONFERENCE_ROOM: conferenceRoomImage,
  SHARED_WORKSPACE: sharedWorkspaceImage,
}

const roomTypeLabels = {
  PRIVATE_CABIN: 'Private Cabin',
  MEETING_ROOM: 'Meeting Room',
  CONFERENCE_ROOM: 'Conference Room',
  SHARED_WORKSPACE: 'Shared Workspace',
}

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
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        const response = await getRooms()
        const fetchedRooms = response.data || []

        const mappedRooms = fetchedRooms.map((room) => ({
          ...room,
          typeLabel: roomTypeLabels[room.type] || room.type,
          priceLabel: `₹${room.price}/${room.pricingUnit ? room.pricingUnit.toLowerCase() : 'hour'}`,
          capacity: room.capacity ? `${room.capacity} People` : 'Flexible',
          status: room.isActive ? 'Available' : 'Unavailable',
          imageSrc: roomImageMap[room.type] || meetingRoomImage,
        }))

        setRooms(mappedRooms)
      } catch {
        setError('Unable to load rooms at the moment.')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const workspaceRooms = rooms.slice(0, 4)

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
            <select className={fieldClass} defaultValue="ALL">
              <option value="ALL">All Spaces</option>
              <option value="PRIVATE_CABIN">Private Cabin</option>
              <option value="MEETING_ROOM">Meeting Room</option>
              <option value="CONFERENCE_ROOM">Conference Room</option>
              <option value="SHARED_WORKSPACE">Shared Workspace</option>
            </select>
          </label>
          <Input label="Date" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
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
        {loading ? (
          <div className="flex min-h-40 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#6B7280]">
            Loading workspaces...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workspaceRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home