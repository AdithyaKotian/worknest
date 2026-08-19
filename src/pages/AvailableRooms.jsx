import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import RoomCard from '../components/RoomCard'
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

function AvailableRooms() {
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
      } catch (err) {
        setError('Failed to load available rooms.')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Available Rooms</h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Explore verified coworking workspaces across our branches.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Available Spaces</h2>
          <p className="mt-2 text-sm text-[#6B7280]">Select a room and continue with your booking.</p>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#6B7280]">
            Loading available rooms...
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : rooms.length === 0 ? (
          <div className="rounded-lg border border-[#E5E7EB] bg-white p-8 text-center text-sm text-[#6B7280]">
            No rooms found matching your criteria.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default AvailableRooms
