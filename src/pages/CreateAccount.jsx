import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { customer } from '../data/mockData'

function CreateAccount() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center">
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

          <Input label="Gmail" type="email" name="gmail" placeholder="Enter Gmail" defaultValue={customer.email} />
          <Input label="Location" name="location" placeholder="Enter location" defaultValue={customer.location} />
          <Input
            label="Profile Type"
            name="profileType"
            placeholder="Enter profile type"
            defaultValue={customer.profileType}
          />
          <Input
            label="Company Name"
            name="companyName"
            placeholder="Enter company name"
            defaultValue={customer.companyName}
          />
        </div>

        <div className="mt-6">
          <Button as={Link} to="/customer-home" className="w-full sm:w-auto">
            Create Account
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default CreateAccount
