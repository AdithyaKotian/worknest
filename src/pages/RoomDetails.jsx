import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import conferenceRoomImage from '../assets/rooms/conference-room.jpg'
import meetingRoomImage from '../assets/rooms/meeting-room.jpg'
import privateCabinImage from '../assets/rooms/private-cabin.jpg'
import sharedWorkspaceImage from '../assets/rooms/shared-workspace.jpg'
import { getRoomById } from '../services/api'

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

function RoomDetails() {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true)
        const response = await getRoomById(id)
        if (response.data) {
          const r = response.data
          setRoom({
            ...r,
            typeLabel: roomTypeLabels[r.type] || r.type,
            priceLabel: `₹${r.price}/${r.pricingUnit ? r.pricingUnit.toLowerCase() : 'hour'}`,
            capacity: r.capacity ? `${r.capacity} People` : 'Flexible',
            status: r.isActive ? 'Available' : 'Unavailable',
            facilities: ['High-speed Wi-Fi', 'Air Conditioning', 'Power Backup', 'Display / Projector'],
            imageSrc: roomImageMap[r.type] || meetingRoomImage,
          })
        }
      } catch {
        setError('Room not found or unavailable.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRoom()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#6B7280]">
        Loading room details...
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-800">Error</h2>
        <p className="mt-1 text-sm text-red-600">{error || 'Room not found.'}</p>
        <div className="mt-4">
          <Button as={Link} to="/available-rooms">
            Back to Available Rooms
          </Button>
        </div>
      </div>
    )
  }

  const hasImage = room.imageSrc && !imageFailed

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">{room.name}</h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          {room.description || `${room.typeLabel} located in ${room.branch?.name || 'our central branch'}.`}
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-80 overflow-hidden rounded-xl border border-blue-100 bg-[#EFF6FF] text-sm font-semibold text-[#1E3A8A] shadow-[0_12px_30px_rgba(30,58,138,0.07)]">
          {hasImage ? (
            <img
              src={room.imageSrc}
              alt={room.name}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex min-h-80 items-center justify-center">
              Room Image
            </div>
          )}
        </div>

        <Card title="Room Details">
          <dl className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-6">
              <dt className="font-medium text-[#6B7280]">Type</dt>
              <dd className="text-right font-semibold text-[#111827]">{room.typeLabel}</dd>
            </div>
            <div className="flex items-start justify-between gap-6">
              <dt className="font-medium text-[#6B7280]">Branch</dt>
              <dd className="text-right font-semibold text-[#111827]">
                {room.branch?.name} ({room.branch?.location?.city})
              </dd>
            </div>
            <div className="flex items-start justify-between gap-6">
              <dt className="font-medium text-[#6B7280]">Capacity</dt>
              <dd className="text-right font-semibold text-[#111827]">{room.capacity}</dd>
            </div>
            <div className="flex items-start justify-between gap-6">
              <dt className="font-medium text-[#6B7280]">Price</dt>
              <dd className="text-right font-semibold text-[#111827]">{room.priceLabel}</dd>
            </div>
            <div className="flex items-start justify-between gap-6">
              <dt className="font-medium text-[#6B7280]">Facilities</dt>
              <dd className="max-w-64 text-right font-semibold text-[#111827]">
                {room.facilities.join(', ')}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="font-medium text-[#6B7280]">Availability</dt>
              <dd>
                <StatusBadge status={room.status} />
              </dd>
            </div>
          </dl>
        </Card>
      </section>

      <Card title="Quick Booking" className="bg-[#F8FAFC]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-[#111827]">
              Ready to book this workspace?
            </p>
            <p className="mt-1 text-sm text-[#6B7280]">
              Proceed to select your time slot and complete confirmation.
            </p>
          </div>
          <Button
            as={Link}
            to="/slot-booking"
            state={{ selectedRoom: room }}
          >
            Book Now
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default RoomDetails
