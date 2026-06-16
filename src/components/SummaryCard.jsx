function SummaryCard({ label, value, helper }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_12px_30px_rgba(30,58,138,0.07)]">
      <p className="text-sm font-medium text-[#6B7280]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">{value}</p>
      {helper && <p className="mt-1 text-sm text-[#6B7280]">{helper}</p>}
    </div>
  )
}

export default SummaryCard
