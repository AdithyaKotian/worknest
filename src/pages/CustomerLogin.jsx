import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import { login } from '../services/api'

function CustomerLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await login(email, password)
      const token = response?.data?.token || response?.token
      const user = response?.data?.user || response?.user

      if (token) {
        localStorage.setItem('worknestToken', token)
        localStorage.setItem('token', token)
        localStorage.setItem('worknestUser', JSON.stringify(user || {}))
        localStorage.setItem('worknestMockLoggedIn', 'true')
        window.dispatchEvent(new Event('worknest-auth-change'))

        if (user?.role === 'ADMIN' || user?.role?.toUpperCase() === 'ADMIN') {
          navigate('/admin-dashboard', { replace: true })
        } else {
          navigate('/customer-home', { replace: true })
        }
      } else {
        setError('Invalid response from server. Missing auth token.')
      }
    } catch (err) {
      setError(err?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <Card
        className="w-full"
        title="Login to WorkNest"
        subtitle="Sign in with your registered email and password."
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-center text-sm text-[#6B7280]">
            New customer?{' '}
            <Link to="/create-account" className="font-medium text-[#1E3A8A]">
              Create Account
            </Link>
          </p>
        </form>
      </Card>
    </div>
  )
}

export default CustomerLogin
