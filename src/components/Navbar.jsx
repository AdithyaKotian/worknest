import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Bell, UserCircle, ChevronDown, X } from 'lucide-react'
import Button from './Button'

const authStorageKey = 'worknestMockLoggedIn'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Rooms', to: '/available-rooms' },
  { label: 'Plans', to: '/subscription-plans' },
  { label: 'Contact', to: '/contact' },
]

const mockNotifications = [
  { id: 1, message: 'Booking confirmed', time: '2 mins ago', read: false },
  { id: 2, message: 'Meeting Reminder - Tomorrow 10 AM', time: '1 hour ago', read: false },
  { id: 3, message: 'Payment Successful', time: '3 hours ago', read: true },
]

function getMockLoginState() {
  return typeof window !== 'undefined' && localStorage.getItem(authStorageKey) === 'true'
}

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(getMockLoginState)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAccountDrawer, setShowAccountDrawer] = useState(false)
  const [notificationCount] = useState(3)
  const [notifications, setNotifications] = useState(mockNotifications)

  const notificationRef = useRef(null)
  const navigate = useNavigate()

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const syncLoginState = () => setIsLoggedIn(getMockLoginState())

    window.addEventListener('storage', syncLoginState)
    window.addEventListener('worknest-auth-change', syncLoginState)

    return () => {
      window.removeEventListener('storage', syncLoginState)
      window.removeEventListener('worknest-auth-change', syncLoginState)
    }
  }, [])

  // Close notification popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowAccountDrawer(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleLogout = () => {
    localStorage.setItem(authStorageKey, 'false')
    window.dispatchEvent(new Event('worknest-auth-change'))
    setShowAccountDrawer(false)
    navigate('/')
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const navLinkClass = ({ isActive }) =>
    [
      'inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200',
      isActive ? 'bg-[#F3F4F6] text-[#1E3A8A]' : 'text-[#6B7280] hover:text-[#1E3A8A] hover:bg-[#F8FAFC]',
    ].join(' ')

  return (
    <header className="border-b border-[#E5E7EB] bg-white/95 shadow-sm shadow-blue-900/5">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#1E3A8A]">
          WorkNest
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <div className="relative flex items-center gap-3 ml-2">
              {/* Bell */}
              <div ref={notificationRef} className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] transition-colors duration-200 hover:bg-gray-100"
                >
                  <Bell size={18} className="text-[#6B7280]" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 rounded-xl border border-[#E5E7EB] bg-white shadow-xl z-50">
                    <div className="border-b border-[#E5E7EB] px-4 py-3">
                      <h3 className="text-sm font-semibold text-[#111827]">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`cursor-pointer border-b border-[#F3F4F6] px-4 py-3 transition-colors duration-150 hover:bg-[#F8FAFC] ${
                            !notification.read ? 'bg-[#EFF6FF]' : ''
                          }`}
                        >
                          <p className={`text-sm ${!notification.read ? 'font-medium text-[#111827]' : 'text-[#6B7280]'}`}>
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-[#9CA3AF]">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User */}
              <button
                onClick={() => setShowAccountDrawer(true)}
                className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2 transition-colors duration-200 hover:bg-gray-100"
              >
                <UserCircle size={20} className="text-[#6B7280]" />
                <span className="text-sm font-medium text-[#111827]">Adithya</span>
                <ChevronDown size={16} className="text-[#6B7280]" />
              </button>
            </div>
          ) : (
            <Button as={Link} to="/customer-login" className="ml-2">
              Login
            </Button>
          )}
        </div>
      </nav>

      {/* Account Drawer */}
      <div
        className={[
          'fixed inset-0 z-50 transition-all duration-300',
          showAccountDrawer ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!showAccountDrawer}
      >
        {/* Overlay */}
        <button
          type="button"
          className={[
            'absolute inset-0 bg-[#111827]/30 backdrop-blur-sm transition-opacity duration-300',
            showAccountDrawer ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          aria-label="Close account menu"
          onClick={() => setShowAccountDrawer(false)}
        />

        {/* Drawer */}
        <aside
          className={[
            'absolute right-0 top-0 h-full w-[380px] border-l border-[#E5E7EB] bg-white shadow-2xl transition-transform duration-300 ease-in-out',
            showAccountDrawer ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="flex h-full flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#111827]">Account</h2>
              <button
                onClick={() => setShowAccountDrawer(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-gray-100"
              >
                <X size={18} className="text-[#6B7280]" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* User Info */}
              <div className="flex items-center gap-4 pb-6 border-b border-[#E5E7EB]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <UserCircle size={32} className="text-[#1E3A8A]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#111827]">Adithya</h3>
                  <p className="text-sm text-[#6B7280]">adithya@example.com</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="mt-4 space-y-1">
                <Link
                  to="/manage-profile"
                  onClick={() => setShowAccountDrawer(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#111827] transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  <span className="text-base">👤</span>
                  Manage Profile
                </Link>
                <Link
                  to="/customer-home"
                  onClick={() => setShowAccountDrawer(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#111827] transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  <span className="text-base">📋</span>
                  My Bookings
                </Link>
                <Link
                  to="/order-history"
                  onClick={() => setShowAccountDrawer(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#111827] transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  <span className="text-base">📦</span>
                  Order History
                </Link>
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#111827] transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  <span className="text-base">💾</span>
                  Saved Rooms
                </button>
              </div>

              <div className="mt-4 border-t border-[#E5E7EB] pt-4 space-y-1">
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#111827] transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  <span className="text-base">⚙️</span>
                  Settings
                </button>
                <button
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#111827] transition-colors duration-200 hover:bg-[#F8FAFC]"
                >
                  <span className="text-base">❓</span>
                  Help
                </button>
              </div>

              <div className="mt-4 border-t border-[#E5E7EB] pt-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50"
                >
                  <span className="text-base">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  )
}

export default Navbar