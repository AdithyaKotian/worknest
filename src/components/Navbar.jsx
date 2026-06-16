import { Link, NavLink } from 'react-router-dom'
import Button from './Button'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Rooms', to: '/available-rooms' },
  { label: 'Plans', to: '/subscription-plans' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    [
      'inline-flex h-10 items-center rounded-lg px-3 text-sm font-medium',
      isActive ? 'bg-[#F3F4F6] text-[#1E3A8A]' : 'text-[#6B7280] hover:text-[#1E3A8A]',
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
          <Button as={Link} to="/customer-login" className="ml-2">
            Login
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
