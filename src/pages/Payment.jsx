import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { createPaymentOrder, verifyPayment } from '../services/api'

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true)
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const [booking] = useState(() => {
    const rawBooking =
      location.state?.booking || localStorage.getItem('worknestBooking')
    if (!rawBooking) return null
    try {
      return typeof rawBooking === 'string' ? JSON.parse(rawBooking) : rawBooking
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!booking) {
      navigate('/available-rooms')
    }
  }, [booking, navigate])

  const handlePayment = async () => {
    if (!booking) return
    setError('')
    setLoading(true)

    try {
      const amount = Number(booking.totalAmount) || 500
      const scriptLoaded = await loadRazorpayScript()

      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK. Please check your connection.')
      }

      const orderRes = await createPaymentOrder(amount)
      const order = orderRes.data

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TRZScFWJVSDYtw',
        amount: order.amount,
        currency: order.currency || 'INR',
        name: 'WorkNest Co-working',
        description: `Booking for ${booking.room?.name || 'Workspace'}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount,
              bookingId: booking.id,
            })

            const updatedBooking = { ...booking, status: 'CONFIRMED' }
            localStorage.setItem('worknestBooking', JSON.stringify(updatedBooking))
            navigate('/booking-confirmation', { state: { booking: updatedBooking } })
          } catch (verErr) {
            setError(verErr?.message || 'Payment verification failed.')
          }
        },
        theme: {
          color: '#1E3A8A',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      setError(err?.message || 'Unable to process payment order.')
    } finally {
      setLoading(false)
    }
  }

  if (!booking) {
    return null
  }

  const startFormatted = booking.startTime
    ? new Date(booking.startTime).toLocaleString()
    : 'Selected Slot'
  const endFormatted = booking.endTime
    ? new Date(booking.endTime).toLocaleString()
    : 'End Time'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Payment Summary</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Complete your payment to confirm the booking.</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card title="Booking Summary" className="bg-[#EFF6FF]">
        <div className="grid gap-4 text-sm md:grid-cols-2">
          <div>
            <p className="font-medium text-[#6B7280]">Room</p>
            <p className="mt-1 font-semibold text-[#111827]">{booking.room?.name || 'Workspace'}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Branch</p>
            <p className="mt-1 font-semibold text-[#111827]">
              {booking.room?.branch?.name || 'Central'}
            </p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">Start Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{startFormatted}</p>
          </div>
          <div>
            <p className="font-medium text-[#6B7280]">End Time</p>
            <p className="mt-1 font-semibold text-[#111827]">{endFormatted}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-[#6B7280]">Total Amount</p>
            <p className="mt-1 text-2xl font-bold text-[#1E3A8A]">₹{booking.totalAmount}</p>
          </div>
        </div>
      </Card>

      <Card title="Payment Method">
        <p className="text-sm text-[#6B7280]">
          Secure online payment supported via Razorpay (UPI, Credit/Debit Cards, NetBanking, Wallets).
        </p>

        <div className="mt-6">
          <Button onClick={handlePayment} disabled={loading}>
            {loading ? 'Initializing Razorpay...' : `Pay ₹${booking.totalAmount} Now`}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Payment
