import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { customer } from '../data/mockData'

const authStorageKey = 'worknestMockLoggedIn'

function setMockLoginState() {
  localStorage.setItem(authStorageKey, 'true')
  window.dispatchEvent(new Event('worknest-auth-change'))
}

function OTPVerification() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <Card
        className="w-full"
        title="Verify Mobile Number"
        subtitle={`Enter the OTP sent to ${customer.mobile}`}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((item) => (
              <input
                key={item}
                aria-label={`OTP digit ${item}`}
                inputMode="numeric"
                maxLength="1"
                className="h-12 rounded-lg border border-[#E5E7EB] bg-white text-center text-lg font-semibold text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
              />
            ))}
          </div>

          <Button as={Link} to="/customer-home" className="w-full" onClick={setMockLoginState}>
            Verify & Continue
          </Button>

          <p className="text-center text-sm text-[#6B7280]">
            Didn&apos;t receive OTP?{' '}
            <button type="button" className="font-medium text-[#1E3A8A]">
              Resend OTP
            </button>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default OTPVerification
