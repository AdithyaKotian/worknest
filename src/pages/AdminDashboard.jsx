import Button from '../components/Button'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import SummaryCard from '../components/SummaryCard'
import { adminSummary, paymentRecords, roomStatus } from '../data/mockData'

const filterPeriods = ['Day', 'Week', 'Month', 'Year']
const roomActions = ['Create Booking', 'Add Room', 'Edit Room', 'Delete Room', 'Disable Room']

function formatCellDate(index) {
  return paymentRecords[index]?.date || `Day ${index + 1}`
}

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Manage bookings, room availability, revenue, and room operations.
        </p>
      </div>

      <Card className="bg-[#EFF6FF]">
        <div className="max-w-xs">
          <p className="text-sm font-medium text-[#6B7280]">Select Location</p>
          <p className="mt-2 flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 text-sm font-semibold text-[#111827]">
            Mangalore
          </p>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminSummary.map((item) => (
          <SummaryCard key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <Card className="bg-[#F8FAFC]">
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Start Date</span>
            <input
              type="date"
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">End Date</span>
            <input
              type="date"
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Range</span>
            <select className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100">
              {filterPeriods.map((period) => (
                <option key={period}>{period}</option>
              ))}
            </select>
          </label>
          <div className="flex items-end lg:col-span-2">
            <Button className="w-full sm:w-auto">Apply</Button>
          </div>
        </div>
      </Card>

      <Card title="Booking Calendar - Mangalore">
        <div className="mb-4 flex flex-wrap gap-3">
          <StatusBadge status="Available" />
          <StatusBadge status="Booked" />
          <StatusBadge status="Reserved" />
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {roomStatus.map((room, index) => (
            <div key={room.roomName} className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
              <p className="text-sm font-semibold text-[#111827]">{formatCellDate(index)}</p>
              <p className="mt-2 text-sm text-[#6B7280]">{room.roomName}</p>
              <div className="mt-3">
                <StatusBadge status={room.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Room Status for Selected Date" subtitle="Location: Mangalore">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E7EB] text-sm whitespace-nowrap">
            <thead className="bg-[#EFF6FF]">
              <tr className="text-left text-[#6B7280]">
                <th className="py-3 pr-4 font-medium">Room Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="py-3 pl-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {roomStatus.map((room) => (
                <tr key={room.roomName}>
                  <td className="py-3 pr-4 font-medium text-[#111827]">{room.roomName}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={room.status} />
                  </td>
                  <td className="py-3 pl-4 text-[#6B7280]">{room.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Room Management - Mangalore">
        <div className="flex flex-wrap gap-3">
          {roomActions.map((action, index) => (
            <Button key={action} variant={index === 0 ? 'primary' : 'outline'}>
              {action}
            </Button>
          ))}
        </div>
      </Card>

      <Card
        title="Payment Records"
        subtitle="Track room-wise and date-wise payment and cancellation status."
      >
        <div className="mb-6 grid gap-4 md:grid-cols-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Start Date</span>
            <input
              type="date"
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">End Date</span>
            <input
              type="date"
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Room</span>
            <select className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100">
              <option>All Rooms</option>
              {roomStatus.map((room) => (
                <option key={room.roomName}>{room.roomName}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Payment Status</span>
            <select className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100">
              <option>All Statuses</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Underpaid</option>
              <option>Advance Paid</option>
            </select>
          </label>
          <div className="flex items-end">
            <Button className="w-full">Apply</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E5E7EB] text-sm whitespace-nowrap">
            <thead className="bg-[#EFF6FF]">
              <tr className="text-left text-[#6B7280]">
                <th className="py-3 pr-4 font-medium">Room</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Expected Amount</th>
                <th className="px-4 py-3 font-medium">Paid Amount</th>
                <th className="px-4 py-3 font-medium">Payment Status</th>
                <th className="px-4 py-3 font-medium">Booking Status</th>
                <th className="px-4 py-3 font-medium">Refund Status</th>
                <th className="py-3 pl-4 font-medium">Email Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {paymentRecords.map((record) => (
                <tr key={`${record.room}-${record.date}-${record.customer}`}>
                  <td className="py-3 pr-4 font-medium text-[#111827]">{record.room}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{record.date}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{record.customer}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{record.expectedAmount}</td>
                  <td className="px-4 py-3 text-[#6B7280]">{record.paidAmount}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.paymentStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={record.bookingStatus} />
                  </td>
                  <td className="px-4 py-3">
                    {record.refundStatus === '-' ? (
                      <span className="text-[#6B7280]">-</span>
                    ) : (
                      <StatusBadge status={record.refundStatus} />
                    )}
                  </td>
                  <td className="py-3 pl-4">
                    {record.emailStatus === '-' ? (
                      <span className="text-[#6B7280]">-</span>
                    ) : (
                      <StatusBadge status={record.emailStatus} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-[#6B7280]">
          Cancelled bookings will trigger email notification and refund/advance status will be recorded.
        </p>
      </Card>
    </div>
  )
}

export default AdminDashboard
