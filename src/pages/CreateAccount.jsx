import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { register } from '../services/api'

function CreateAccount() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [accountCreated, setAccountCreated] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await register(name, email, phone, password)
      const token = response.data?.token
      const user = response.data?.user

      if (token) {
        localStorage.setItem('worknestToken', token)
        localStorage.setItem('token', token)
        localStorage.setItem('worknestUser', JSON.stringify(user || {}))
        localStorage.setItem('worknestMockLoggedIn', 'true')
        window.dispatchEvent(new Event('worknest-auth-change'))
        setAccountCreated(true)
      }
    } catch (err) {
      setError(
        err?.message ||
          (err?.errors && err.errors[0]?.message) ||
          'Failed to create account. Please try again.'
      )
    } finally {
      setLoading(false)
    }
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
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div>
              <Input
                label="Mobile Number"
                name="mobileNumber"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                Mobile number is optional for notifications.
              </p>
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default CreateAccount
