import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import Card from './Card'
import StatusBadge from './StatusBadge'

function RoomCard({ room }) {
  const [imageFailed, setImageFailed] = useState(false)
  const price = room.priceLabel || room.price
  const hasImage = room.imageSrc && !imageFailed

  return (
    <Card padded={false} className="flex h-full flex-col overflow-hidden">
      <div className="h-36 overflow-hidden bg-[#EFF6FF]">
        {hasImage ? (
          <img
            src={room.imageSrc}
            alt={room.imageAlt || room.name}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-[#1E3A8A]">
            Room Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-[#111827]">{room.name}</h3>
          <StatusBadge status={room.status} />
        </div>

        <div className="mt-4 space-y-2 text-sm text-[#6B7280]">
          <p>Capacity: {room.capacity}</p>
          <p>Price: {price}</p>
        </div>

        <div className="mt-5 flex flex-1 items-end">
          <Button as={Link} to={`/room-details/${room.id}`} className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default RoomCard
