import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { createBooking, getRooms } from '../services/api'

function SlotBooking() {
  const location = useLocation()
  const navigate = useNavigate()
  const [room, setRoom] = useState(location.state?.selectedRoom || null)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [startHour, setStartHour] = useState('10')
  const [endHour, setEndHour] = useState('12')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!room) {
      getRooms().then((res) => {
        if (res.data && res.data.length > 0) {
          setRoom(res.data[0])
        }
      }).catch(() => {
        setError('Failed to load room details.')
      })
    }
  }, [room])

  const durationHours = Math.max(Number(endHour) - Number(startHour), 1)
  const hourlyRate = room ? Number(room.price) : 500
  const totalAmount = durationHours * hourlyRate

  const handleProceed = async () => {
    if (!room) return
    setError('')
    setLoading(true)

    try {
      const [year, month, day] = date.split('-').map(Number)
      const startDateObj = new Date(year, month - 1, day, Number(startHour), 0, 0)
      const endDateObj = new Date(year, month - 1, day, Number(endHour), 0, 0)

      const startTime = startDateObj.toISOString()
      const endTime = endDateObj.toISOString()

      const response = await createBooking({
        roomId: room.id,
        startTime,
        endTime,
        totalAmount,
      })

      const booking = response.data
      localStorage.setItem('worknestBooking', JSON.stringify(booking))
      navigate('/payment', { state: { booking } })
    } catch (err) {
      setError(err?.message || 'Room is not available for the selected time slot.')
    } finally {
      setLoading(false)
    }
  }

  if (!room) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#6B7280]">
        Loading booking details...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Confirm Your Booking</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Select your slot and review details before payment.</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card title="Booking Details">
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-medium text-[#6B7280]">Room</p>
            <p className="mt-1 font-semibold text-[#111827]">{room.name}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Branch</p>
            <p className="mt-1 font-semibold text-[#111827]">
              {room.branch?.name || 'Main Branch'}
            </p>
          </div>
          <div>
            <Input
              label="Booking Date"
              type="date"
              name="bookingDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#111827]">Start Time</label>
              <select
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827]"
              >
                {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((h) => (
                  <option key={h} value={h}>
                    {h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#111827]">End Time</label>
              <select
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827]"
              >
                {[10, 11, 12, 13, 14, 15, 16, 17, 18].map((h) => (
                  <option key={h} value={h}>
                    {h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Duration</p>
            <p className="mt-1 font-semibold text-[#111827]">{durationHours} Hours</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Rate</p>
            <p className="mt-1 font-semibold text-[#111827]">₹{hourlyRate}/hour</p>
          </div>
          <div className="md:col-span-2 rounded-lg bg-[#EFF6FF] p-4">
            <p className="font-medium text-[#6B7280]">Total Amount Payable</p>
            <p className="mt-1 text-2xl font-bold text-[#1E3A8A]">₹{totalAmount}</p>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleProceed} disabled={loading || Number(endHour) <= Number(startHour)}>
            {loading ? 'Confirming slot...' : 'Proceed to Payment'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SlotBooking
