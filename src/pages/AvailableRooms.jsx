import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import RoomCard from '../components/RoomCard'
import { bookingDetails, rooms } from '../data/mockData'

const [startTime = '10:00 AM', endTime = '12:00 PM'] = bookingDetails.time.split(' - ')
const selectedRoomType = rooms.find((room) => room.name === bookingDetails.room)?.type || rooms[0].type

function AvailableRooms() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Available Rooms</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Rooms available based on your selected date and time.</p>
      </div>

      <Card className="bg-[#EFF6FF]">
        <div className="grid gap-4 md:grid-cols-5">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Room Type</p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">{selectedRoomType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Date</p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">{bookingDetails.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#6B7280]">Start Time</p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">{startTime}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#6B7280]">End Time</p>
            <p className="mt-1 text-sm font-semibold text-[#111827]">{endTime}</p>
          </div>
          <div className="flex items-end">
            <Button as={Link} to="/" className="w-full">
              Modify Search
            </Button>
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Available Spaces</h2>
          <p className="mt-2 text-sm text-[#6B7280]">Select a room and continue with your booking.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AvailableRooms
