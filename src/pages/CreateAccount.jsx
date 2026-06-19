import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { customer } from '../data/mockData'

const authStorageKey = 'worknestMockLoggedIn'

function CreateAccount() {
  const [accountCreated, setAccountCreated] = useState(false)

  function handleCreateAccount() {
    localStorage.setItem(authStorageKey, 'true')
    window.dispatchEvent(new Event('worknest-auth-change'))
    setAccountCreated(true)
  }

  if (accountCreated) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
        <Card
          className="w-full"
          title="Account created successfully."
          subtitle="Please complete your profile to get better workspace recommendations."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/manage-profile">
              Complete Profile
            </Button>
            <Button as={Link} to="/customer-home" variant="outline">
              Continue to Customer Home
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
      <Card
        className="w-full"
        title="Create Account"
        subtitle="Enter your details to create your WorkNest account."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Full Name" name="fullName" placeholder="Enter full name" defaultValue={customer.fullName} />

          <div>
            <Input
              label="Mobile Number"
              name="mobileNumber"
              placeholder="Enter mobile number"
              defaultValue={customer.mobile}
            />
            <p className="mt-2 text-xs leading-5 text-[#6B7280]">
              Mobile number is required for OTP verification and booking updates.
            </p>
          </div>

          <Input label="Email" type="email" name="email" placeholder="Enter email" defaultValue={customer.email} />
        </div>

        <div className="mt-6">
          <Button onClick={handleCreateAccount} className="w-full sm:w-auto">
            Create Account
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CreateAccount
