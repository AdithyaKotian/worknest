import { useState, useRef, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, Link } from 'react-router-dom'
import About from './pages/About'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import AvailableRooms from './pages/AvailableRooms'
import BookingConfirmation from './pages/BookingConfirmation'
import Contact from './pages/Contact'
import CreateAccount from './pages/CreateAccount'
import CustomerHome from './pages/CustomerHome'
import CustomerLogin from './pages/CustomerLogin'
import Home from './pages/Home'
import ManageProfile from './pages/ManageProfile'
import OTPVerification from './pages/OTPVerification'
import OrderHistory from './pages/OrderHistory'
import Payment from './pages/Payment'
import RoomDetails from './pages/RoomDetails'
import SlotBooking from './pages/SlotBooking'
import SubscriptionPlans from './pages/SubscriptionPlans'
import { UserCircle, ChevronDown } from 'lucide-react'

const authStorageKey = 'worknestMockLoggedIn'

function AdminHeader() {
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowAdminMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.setItem(authStorageKey, 'false')
    window.dispatchEvent(new Event('worknest-auth-change'))
    setShowAdminMenu(false)
    navigate('/')
  }

  return (
    <header className="border-b border-[#E5E7EB] bg-white/95 shadow-sm shadow-blue-900/5">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
          WorkNest
        </Link>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowAdminMenu(!showAdminMenu)}
            className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm font-medium text-[#111827] transition-colors duration-200 hover:bg-gray-100"
          >
            <UserCircle size={20} className="text-[#6B7280]" />
            <span>Admin</span>
            <ChevronDown size={16} className={`text-[#6B7280] transition-transform duration-200 ${showAdminMenu ? 'rotate-180' : ''}`} />
          </button>

          {showAdminMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#E5E7EB] bg-white shadow-xl z-50">
              <div className="border-b border-[#E5E7EB] px-4 py-3">
                <p className="text-sm font-semibold text-[#111827]">Admin</p>
                <p className="text-xs text-[#6B7280]">admin@worknest.com</p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50"
                >
                  <span className="text-base">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdminDashboard = location.pathname === '/admin-dashboard'

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#EFF6FF_0%,#F8FAFC_260px,#F8FAFC_100%)] text-[#111827]">
      {isAdminDashboard ? <AdminHeader /> : <Navbar />}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/available-rooms" element={<AvailableRooms />} />
          <Route path="/room-details/:id" element={<RoomDetails />} />
          <Route path="/slot-booking" element={<SlotBooking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/manage-profile" element={<ManageProfile />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App