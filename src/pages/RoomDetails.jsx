import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import { bookingDetails, rooms } from '../data/mockData'

const [startTime = '10:00 AM', endTime = '12:00 PM'] = bookingDetails.time.split(' - ')
const totalAmount = `₹${bookingDetails.totalAmount}`

function RoomDetails() {
  const { id } = useParams()
  const [failedImageIds, setFailedImageIds] = useState({})
  const room = rooms.find((item) => item.id === Number(id)) || rooms[0]
  const hasImage = room.imageSrc && !failedImageIds[room.id]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">{room.name}</h1>
        <p className="mt-2 text-sm text-[#6B7280]">{room.description}</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-80 overflow-hidden rounded-xl border border-blue-100 bg-[#EFF6FF] text-sm font-semibold text-[#1E3A8A] shadow-[0_12px_30px_rgba(30,58,138,0.07)]">
          {hasImage ? (
            <img
              src={room.imageSrc}
              alt={room.imageAlt || room.name}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() =>
                setFailedImageIds((current) => ({
                  ...current,
                  [room.id]: true,
                }))
              }
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

      <Card title="Booking Date & Time" className="bg-[#F8FAFC]">
        <div className="grid gap-4 text-sm md:grid-cols-3">
          <div>
            <p className="font-medium text-[#6B7280]">Start Date</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.startDate}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">End Date</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.endDate}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Start Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{startTime}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">End Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{endTime}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Duration</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.duration}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Rate</p>
            <p className="mt-1 font-semibold text-[#111827]">{bookingDetails.rate}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Total</p>
            <p className="mt-1 font-semibold text-[#111827]">{totalAmount}</p>
          </div>
        </div>
        <div className="mt-6">
          <Button as={Link} to="/slot-booking">
            Book Now
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default RoomDetails
