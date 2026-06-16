const statusStyles = {
  'advance paid': 'bg-amber-50 text-[#92400E] ring-[#F59E0B]/30',
  'advance retained': 'bg-amber-50 text-[#92400E] ring-[#F59E0B]/30',
  available: 'bg-emerald-50 text-[#047857] ring-[#10B981]/30',
  booked: 'bg-amber-50 text-[#92400E] ring-[#F59E0B]/30',
  cancelled: 'bg-red-50 text-[#B91C1C] ring-[#EF4444]/30',
  'cancellation mail sent': 'bg-blue-50 text-[#1D4ED8] ring-[#1D4ED8]/25',
  completed: 'bg-emerald-50 text-[#047857] ring-[#10B981]/30',
  confirmed: 'bg-emerald-50 text-[#047857] ring-[#10B981]/30',
  paid: 'bg-emerald-50 text-[#047857] ring-[#10B981]/30',
  pending: 'bg-amber-50 text-[#92400E] ring-[#F59E0B]/30',
  reserved: 'bg-blue-50 text-[#1D4ED8] ring-[#1D4ED8]/25',
  underpaid: 'bg-amber-50 text-[#92400E] ring-[#F59E0B]/30',
}

function StatusBadge({ status = 'pending' }) {
  const normalizedStatus = String(status).trim().toLowerCase()

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset shadow-sm',
        statusStyles[normalizedStatus] || 'bg-[#F3F4F6] text-[#111827] ring-[#E5E7EB]',
      ].join(' ')}
    >
      {status}
    </span>
  )
}

export default StatusBadge
