import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { customer } from '../data/mockData'

function ManageProfile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Manage Profile</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Update your personal and account details.</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card title="Profile Details">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full Name" name="fullName" defaultValue={customer.fullName} />
            <Input label="Mobile Number" name="mobileNumber" defaultValue={customer.mobile} />
            <Input label="Gmail" type="email" name="gmail" defaultValue={customer.email} />
            <Input label="Location" name="location" defaultValue={customer.location} />
            <Input label="Profile Type" name="profileType" defaultValue={customer.profileType} />
            <Input label="Company Name" name="companyName" defaultValue={customer.companyName} />
          </div>

          <div className="mt-6">
            <Button>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ManageProfile
