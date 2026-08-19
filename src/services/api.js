import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach JWT Token to Authorization Header
apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('token') || localStorage.getItem('worknestToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Handle API Responses and Common Errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('worknestToken')
      localStorage.setItem('worknestMockLoggedIn', 'false')
      window.dispatchEvent(new Event('worknest-auth-change'))

      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/customer-login'
      ) {
        window.location.href = '/customer-login'
      }
    } else if (status === 403) {
      console.error('Access Denied: Admin privileges required.')
    } else if (status >= 500) {
      console.error('Server Error: Please try again later.')
    }

    return Promise.reject(error.response?.data || error)
  }
)

// =============================================================================
// Auth API Endpoints
// =============================================================================

export const login = (email, password) =>
  apiClient.post('/auth/login', { email, password })

export const register = (name, email, phone, password) =>
  apiClient.post('/auth/register', { name, email, phone, password })

export const getMe = () => apiClient.get('/auth/me')

// =============================================================================
// Rooms API Endpoints
// =============================================================================

export const getRooms = (filters = {}) =>
  apiClient.get('/rooms', { params: filters })

export const getRoomById = (id) => apiClient.get(`/rooms/${id}`)

// =============================================================================
// Bookings API Endpoints
// =============================================================================

export const createBooking = (data) => apiClient.post('/bookings', data)

export const getMyBookings = () => apiClient.get('/bookings/my-bookings')

export const cancelBooking = (id) => apiClient.patch(`/bookings/${id}/cancel`)

// =============================================================================
// Payments API Endpoints
// =============================================================================

export const createPaymentOrder = (amount) =>
  apiClient.post('/payments/create-order', { amount })

export const verifyPayment = (data) => apiClient.post('/payments/verify', data)

export default apiClient
