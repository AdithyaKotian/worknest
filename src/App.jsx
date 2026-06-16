import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[linear-gradient(180deg,#EFF6FF_0%,#F8FAFC_260px,#F8FAFC_100%)] text-[#111827]">
        <Navbar />
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
    </BrowserRouter>
  )
}

export default App
