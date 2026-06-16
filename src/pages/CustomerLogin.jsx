import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'

function CustomerLogin() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <Card
        className="w-full"
        title="Login to WorkNest"
        subtitle="Continue with your mobile number or Gmail."
      >
        <div className="space-y-5">
          <Input label="Mobile Number" name="mobileNumber" placeholder="Enter mobile number" />

          <Button as={Link} to="/otp-verification" className="w-full">
            Send OTP
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#E5E7EB]" />
            <span className="text-sm text-[#6B7280]">or</span>
            <div className="h-px flex-1 bg-[#E5E7EB]" />
          </div>

          <Button variant="outline" className="w-full">
            Continue with Gmail
          </Button>

          <p className="text-center text-sm text-[#6B7280]">
            New customer?{' '}
            <Link to="/create-account" className="font-medium text-[#1E3A8A]">
              Create Account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default CustomerLogin
