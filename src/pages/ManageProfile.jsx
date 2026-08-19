import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { getMe } from '../services/api'

function ManageProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Mangalore',
    profileType: 'Individual',
    companyName: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await getMe()
        if (response.data) {
          setProfile((prev) => ({
            ...prev,
            name: response.data.name || prev.name,
            email: response.data.email || prev.email,
            phone: response.data.phone || prev.phone,
          }))
        }
      } catch {
        const cached = localStorage.getItem('worknestUser')
        if (cached) {
          const user = JSON.parse(cached)
          setProfile((prev) => ({
            ...prev,
            name: user.name || prev.name,
            email: user.email || prev.email,
            phone: user.phone || prev.phone,
          }))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  function handleSaveChanges() {
    const cached = localStorage.getItem('worknestUser')
    const prev = cached ? JSON.parse(cached) : {}
    localStorage.setItem(
      'worknestUser',
      JSON.stringify({
        ...prev,
        ...profile,
      })
    )

    navigate('/customer-home', {
      state: {
        profileUpdated: true,
        openAccountDrawer: true,
      },
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-[#6B7280]">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Manage Profile</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Update your personal and account details.</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card title="Profile Details">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              name="fullName"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Mobile Number"
              name="mobileNumber"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={profile.email}
              disabled
            />
            <Input
              label="Location"
              name="location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
            <Input
              label="Profile Type"
              name="profileType"
              value={profile.profileType}
              onChange={(e) => setProfile({ ...profile, profileType: e.target.value })}
            />
            <Input
              label="Company Name"
              name="companyName"
              placeholder="Optional"
              value={profile.companyName}
              onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
            />
          </div>

          <div className="mt-6">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ManageProfile
