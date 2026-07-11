import { useEffect, useMemo, useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";
import DateRangeFilter from "../components/DateRangeFilter";
import StatusBadge from "../components/StatusBadge";
import SummaryCard from "../components/SummaryCard";

import {
  paymentRecords,
  roomStatus,
  roomManagementData,
} from "../data/mockData";

const adminLocations = [
  {
    name: 'Dakshina Kannada',
    branches: [
      { 
        name: 'Mangalore Central', 
        summary: { totalBookings: 42, availableRooms: 8, bookedRooms: 5, reservedRooms: 2, totalRevenue: 42000 },
        analytics: { occupancy: 82, revenue: 42000 }
      },
      { 
        name: 'Surathkal', 
        summary: { totalBookings: 28, availableRooms: 6, bookedRooms: 4, reservedRooms: 1, totalRevenue: 28500 },
        analytics: { occupancy: 70, revenue: 28500 }
      },
    ]
  },
  {
    name: 'Chikmagalur',
    branches: [
      { 
        name: 'Chikmagalur Main', 
        summary: { totalBookings: 34, availableRooms: 7, bookedRooms: 3, reservedRooms: 2, totalRevenue: 33200 },
        analytics: { occupancy: 66, revenue: 33200 }
      },
      { 
        name: 'Mudigere', 
        summary: { totalBookings: 19, availableRooms: 5, bookedRooms: 2, reservedRooms: 1, totalRevenue: 18400 },
        analytics: { occupancy: 52, revenue: 18400 }
      },
    ]
  },
  {
    name: 'Udupi',
    branches: [
      { 
        name: 'Udupi Main', 
        summary: { totalBookings: 31, availableRooms: 6, bookedRooms: 4, reservedRooms: 2, totalRevenue: 31800 },
        analytics: { occupancy: 72, revenue: 31800 }
      },
      { 
        name: 'Manipal', 
        summary: { totalBookings: 37, availableRooms: 9, bookedRooms: 5, reservedRooms: 1, totalRevenue: 36500 },
        analytics: { occupancy: 76, revenue: 36500 }
      },
    ]
  },
  {
    name: 'Kasaragod',
    branches: [
      { 
        name: 'Kanhangad', 
        summary: { totalBookings: 24, availableRooms: 5, bookedRooms: 3, reservedRooms: 1, totalRevenue: 23600 },
        analytics: { occupancy: 55, revenue: 23600 }
      },
      { 
        name: 'Kasaragod Town', 
        summary: { totalBookings: 22, availableRooms: 6, bookedRooms: 2, reservedRooms: 2, totalRevenue: 21400 },
        analytics: { occupancy: 62, revenue: 21400 }
      },
    ]
  }
]

const branchDashboardData = {
  'Mangalore Central': {
    summary: { totalBookings: 42, availableRooms: 8, bookedRooms: 5, reservedRooms: 2, revenue: 42000 },
    bookingTrend: [8, 10, 7, 12, 14, 9, 11],
    dailyOverview: [16, 18, 8],
    timeline: [
      { time: '09 AM', label: 'Morning bookings', bookings: 6 },
      { time: '12 PM', label: 'Team meetings', bookings: 12 },
      { time: '04 PM', label: 'Evening slots', bookings: 8 },
    ],
    rooms: [
      { name: 'Meeting Room A', capacity: '8 people', occupancy: 82, status: 'Booked' },
      { name: 'Private Cabin', capacity: '2 people', occupancy: 48, status: 'Available' },
      { name: 'Conference Room', capacity: '20 people', occupancy: 68, status: 'Reserved' },
    ],
  },
  Surathkal: {
    summary: { totalBookings: 28, availableRooms: 6, bookedRooms: 4, reservedRooms: 1, revenue: 28500 },
    bookingTrend: [4, 7, 6, 8, 9, 5, 7],
    dailyOverview: [9, 13, 6],
    timeline: [
      { time: '10 AM', label: 'Cabin usage', bookings: 5 },
      { time: '01 PM', label: 'Shared workspace', bookings: 9 },
      { time: '05 PM', label: 'Meeting rooms', bookings: 4 },
    ],
    rooms: [
      { name: 'Meeting Room B', capacity: '6 people', occupancy: 70, status: 'Booked' },
      { name: 'Shared Workspace', capacity: '12 desks', occupancy: 54, status: 'Available' },
      { name: 'Focus Cabin', capacity: '2 people', occupancy: 40, status: 'Available' },
    ],
  },
  'Chikmagalur Main': {
    summary: { totalBookings: 34, availableRooms: 7, bookedRooms: 3, reservedRooms: 2, revenue: 33200 },
    bookingTrend: [5, 6, 9, 7, 11, 8, 10],
    dailyOverview: [12, 14, 8],
    timeline: [
      { time: '09 AM', label: 'Desk bookings', bookings: 4 },
      { time: '02 PM', label: 'Client meetings', bookings: 10 },
      { time: '06 PM', label: 'Conference slots', bookings: 5 },
    ],
    rooms: [
      { name: 'Hill View Room', capacity: '10 people', occupancy: 66, status: 'Booked' },
      { name: 'Private Cabin', capacity: '2 people', occupancy: 36, status: 'Available' },
      { name: 'Shared Workspace', capacity: '10 desks', occupancy: 58, status: 'Reserved' },
    ],
  },
  Mudigere: {
    summary: { totalBookings: 19, availableRooms: 5, bookedRooms: 2, reservedRooms: 1, revenue: 18400 },
    bookingTrend: [3, 4, 5, 3, 6, 4, 5],
    dailyOverview: [7, 8, 4],
    timeline: [
      { time: '10 AM', label: 'Shared desks', bookings: 3 },
      { time: '01 PM', label: 'Cabin bookings', bookings: 6 },
      { time: '04 PM', label: 'Meeting rooms', bookings: 3 },
    ],
    rooms: [
      { name: 'Meeting Room A', capacity: '6 people', occupancy: 52, status: 'Available' },
      { name: 'Team Cabin', capacity: '4 people', occupancy: 45, status: 'Booked' },
      { name: 'Open Desk', capacity: '8 desks', occupancy: 38, status: 'Available' },
    ],
  },
  'Udupi Main': {
    summary: { totalBookings: 31, availableRooms: 6, bookedRooms: 4, reservedRooms: 2, revenue: 31800 },
    bookingTrend: [6, 8, 7, 9, 10, 6, 8],
    dailyOverview: [11, 13, 7],
    timeline: [
      { time: '09 AM', label: 'Morning cabins', bookings: 5 },
      { time: '12 PM', label: 'Meeting rooms', bookings: 9 },
      { time: '03 PM', label: 'Conference usage', bookings: 6 },
    ],
    rooms: [
      { name: 'Conference Room', capacity: '18 people', occupancy: 72, status: 'Booked' },
      { name: 'Private Cabin', capacity: '2 people', occupancy: 58, status: 'Reserved' },
      { name: 'Shared Workspace', capacity: '14 desks', occupancy: 61, status: 'Available' },
    ],
  },
  Manipal: {
    summary: { totalBookings: 37, availableRooms: 9, bookedRooms: 5, reservedRooms: 1, revenue: 36500 },
    bookingTrend: [7, 9, 8, 11, 12, 8, 10],
    dailyOverview: [13, 16, 8],
    timeline: [
      { time: '10 AM', label: 'Student workspace', bookings: 8 },
      { time: '02 PM', label: 'Team rooms', bookings: 10 },
      { time: '05 PM', label: 'Evening desks', bookings: 7 },
    ],
    rooms: [
      { name: 'Meeting Room A', capacity: '8 people', occupancy: 76, status: 'Booked' },
      { name: 'Shared Workspace', capacity: '18 desks', occupancy: 64, status: 'Available' },
      { name: 'Conference Room', capacity: '22 people', occupancy: 70, status: 'Reserved' },
    ],
  },
  Kanhangad: {
    summary: { totalBookings: 24, availableRooms: 5, bookedRooms: 3, reservedRooms: 1, revenue: 23600 },
    bookingTrend: [4, 6, 5, 7, 8, 5, 6],
    dailyOverview: [8, 11, 5],
    timeline: [
      { time: '09 AM', label: 'Cabin slots', bookings: 4 },
      { time: '01 PM', label: 'Meeting usage', bookings: 7 },
      { time: '04 PM', label: 'Shared desks', bookings: 5 },
    ],
    rooms: [
      { name: 'Private Cabin', capacity: '2 people', occupancy: 55, status: 'Booked' },
      { name: 'Meeting Room A', capacity: '8 people', occupancy: 60, status: 'Available' },
      { name: 'Shared Workspace', capacity: '10 desks', occupancy: 46, status: 'Reserved' },
    ],
  },
  'Kasaragod Town': {
    summary: { totalBookings: 22, availableRooms: 6, bookedRooms: 2, reservedRooms: 2, revenue: 21400 },
    bookingTrend: [3, 5, 6, 5, 7, 4, 6],
    dailyOverview: [7, 10, 5],
    timeline: [
      { time: '10 AM', label: 'Desk check-ins', bookings: 4 },
      { time: '02 PM', label: 'Conference slots', bookings: 6 },
      { time: '05 PM', label: 'Cabin usage', bookings: 4 },
    ],
    rooms: [
      { name: 'Conference Room', capacity: '16 people', occupancy: 62, status: 'Reserved' },
      { name: 'Private Cabin', capacity: '2 people', occupancy: 42, status: 'Available' },
      { name: 'Shared Workspace', capacity: '12 desks', occupancy: 50, status: 'Available' },
    ],
  },
}

const trendDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dailySlots = ['Morning', 'Afternoon', 'Evening']
const statusColors = {
  Available: 'bg-emerald-500',
  Booked: 'bg-[#1E3A8A]',
  Reserved: 'bg-amber-500',
  Disabled: 'bg-gray-400',
}

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function getOccupancy(summary) {
  const totalRooms = summary.availableRooms + summary.bookedRooms + summary.reservedRooms
  return totalRooms ? Math.round(((summary.bookedRooms + summary.reservedRooms) / totalRooms) * 100) : 0
}

function getStatusDistribution(summary) {
  return [
    { label: 'Available', value: summary.availableRooms },
    { label: 'Booked', value: summary.bookedRooms },
    { label: 'Reserved', value: summary.reservedRooms },
  ]
}

function AdminDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  
  // Room Management states
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("All Locations");
  const [filterBranch, setFilterBranch] = useState("All Branches");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [activeMenu, setActiveMenu] = useState(null);
  const [deleteRoom, setDeleteRoom] = useState(null);

  // Date range states for analytics and payment records
  const [analyticsDateRange, setAnalyticsDateRange] = useState({
    range: "today",
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  const [paymentDateRange, setPaymentDateRange] = useState({
    range: "today",
    from: new Date().toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setActiveMenu(null);
    };

    window.addEventListener("click", handleClick);

    return () =>
      window.removeEventListener("click", handleClick);
  }, []);

  const handleAnalyticsDateChange = (dateData) => {
    setAnalyticsDateRange(dateData);
    console.log("Analytics date range:", dateData);
  };

  const handlePaymentDateChange = (dateData) => {
    setPaymentDateRange(dateData);
    console.log("Payment date range:", dateData);
  };

  // Step 1: Find location and branch data
  const locationData =
    selectedLocation === "All Locations"
      ? null
      : adminLocations.find(
          (location) => location.name === selectedLocation
        )

  const branchData =
    selectedLocation === "All Locations"
      ? null
      : locationData?.branches.find(
          (branch) => branch.name === selectedBranch
        )

  // Step 2: Create one source of truth - activeBranches
  const activeBranches =
    selectedLocation === "All Locations"
      ? adminLocations.flatMap((location) => location.branches)
      : selectedBranch === "All Branches"
        ? locationData?.branches || []
        : branchData
          ? [branchData]
          : []

  const branches = locationData?.branches || []

  const summary = activeBranches.reduce(
    (acc, branch) => ({
      totalBookings: acc.totalBookings + branch.summary.totalBookings,
      availableRooms: acc.availableRooms + branch.summary.availableRooms,
      bookedRooms: acc.bookedRooms + branch.summary.bookedRooms,
      totalRevenue: acc.totalRevenue + branch.summary.totalRevenue,
      reservedRooms: acc.reservedRooms + (branch.summary.reservedRooms || 0),
    }),
    {
      totalBookings: 0,
      availableRooms: 0,
      bookedRooms: 0,
      totalRevenue: 0,
      reservedRooms: 0,
    }
  )

  const dashboardSummary = [
    {
      label: "Total Bookings",
      value: summary.totalBookings,
    },
    {
      label: "Available Rooms",
      value: summary.availableRooms,
    },
    {
      label: "Booked Rooms",
      value: summary.bookedRooms,
    },
    {
      label: "Total Revenue",
      value: `₹${summary.totalRevenue.toLocaleString("en-IN")}`,
    },
  ]

  const analytics = activeBranches.reduce(
    (acc, branch) => ({
      occupancy: acc.occupancy + branch.analytics.occupancy,
      revenue: acc.revenue + branch.summary.totalRevenue,
    }),
    {
      occupancy: 0,
      revenue: 0,
    }
  )

  const avgOccupancy = activeBranches.length > 0 
    ? Math.round(analytics.occupancy / activeBranches.length) 
    : 0

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedBranch("All Branches");
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  // Room Management filtering logic using correct field names
  const filteredRooms = roomManagementData.filter((room) => {
    const matchesSearch = search === "" || 
      room.roomName.toLowerCase().includes(search.toLowerCase());
    
    const matchesLocation = filterLocation === "All Locations" || 
      room.location === filterLocation;
    
    const matchesBranch = filterBranch === "All Branches" || 
      room.branch === filterBranch;
    
    const matchesStatus = filterStatus === "All Statuses" || 
      room.status === filterStatus;
    
    return matchesSearch && matchesLocation && matchesBranch && matchesStatus;
  });

  const uniqueBranches = [...new Set(roomManagementData.map(room => room.branch))];
  const branchCount = uniqueBranches.length;

  const clearFilters = () => {
    setSearch("");
    setFilterLocation("All Locations");
    setFilterBranch("All Branches");
    setFilterStatus("All Statuses");
  };

  const handleMenuAction = (action, room) => {
    setActiveMenu(null);
    if (action === 'delete') {
      setDeleteRoom(room);
    } else if (action === 'disable') {
      console.log('Disable room:', room);
    } else if (action === 'enable') {
      console.log('Enable room:', room);
    }
  };

  const handleDeleteRoom = () => {
    console.log('Deleting room:', deleteRoom);
    setDeleteRoom(null);
  };

  // Get the dashboard data for the selected branch
  const selectedBranchData = selectedBranch !== "All Branches" && selectedLocation !== "All Locations"
    ? branchDashboardData[selectedBranch] 
    : null;

  // Use combined data for "All Branches" or specific branch data
  const dashboardData = selectedBranchData || {
    summary: summary,
    bookingTrend: [],
    dailyOverview: [],
    timeline: [],
    rooms: activeBranches.map(branch => ({
      name: branch.name,
      capacity: `${branch.summary.availableRooms + branch.summary.bookedRooms + (branch.summary.reservedRooms || 0)} rooms`,
      occupancy: branch.analytics.occupancy,
      status: `${branch.summary.bookedRooms} booked`,
    })),
  };

  // Dynamic headings
  const scopeLabel = selectedLocation === "All Locations" 
    ? "All Locations" 
    : selectedBranch === "All Branches" 
      ? selectedLocation 
      : selectedBranch;

  const maxTrendValue = Math.max(...dashboardData.bookingTrend, 1);
  const maxDailyValue = Math.max(...dashboardData.dailyOverview, 1);
  const maxTimelineValue = Math.max(...dashboardData.timeline.map((item) => item.bookings), 1);
  const occupancy = avgOccupancy;
  const totalStatusRooms =
    dashboardData.summary.availableRooms +
    dashboardData.summary.bookedRooms +
    dashboardData.summary.reservedRooms;
  const paymentRoomOptions = [...new Set(paymentRecords.map((record) => record.room))];

  return (
    <div className="space-y-8">
      {/* Delete Confirmation Modal */}
      {deleteRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#111827]">Delete {deleteRoom.roomName}?</h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              This action cannot be undone. This will permanently delete the room and all associated data.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteRoom(null)}>
                Cancel
              </Button>
              <Button onClick={handleDeleteRoom}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-semibold text-[#111827]">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-[#6B7280]">
          Manage bookings, room availability, revenue, and room operations.
        </p>
      </div>

      <Card className="bg-[#EFF6FF]">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Location</span>
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
            >
              <option value="All Locations">
                All Locations
              </option>

              {adminLocations.map((location) => (
                <option
                  key={location.name}
                  value={location.name}
                >
                  {location.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Branch</span>
            <select
              value={selectedBranch}
              onChange={handleBranchChange}
              disabled={selectedLocation === "All Locations"}
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 disabled:bg-[#F8FAFC] disabled:text-[#6B7280]"
            >
              <option value="All Branches">All Branches</option>
              {branches.map((branch) => (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      {/* Analytics Date Range Filter */}
      <Card className="bg-[#F8FAFC]">
        <DateRangeFilter onChange={handleAnalyticsDateChange} />
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardSummary.map((item) => (
          <SummaryCard key={item.label} label={item.label} value={String(item.value)} />
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card
          title={`Booking Analytics - ${scopeLabel}`}
          subtitle="Weekly booking trend, daily usage, and active booking timeline."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
              <p className="text-sm font-medium text-[#6B7280]">Occupancy</p>
              <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">{occupancy}%</p>
            </div>
            <div className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
              <p className="text-sm font-medium text-[#6B7280]">Peak Day</p>
              <p className="mt-2 text-2xl font-semibold text-[#1E3A8A]">
                {dashboardData.bookingTrend.length > 0 ? trendDays[dashboardData.bookingTrend.indexOf(maxTrendValue)] : '-'}
              </p>
            </div>
          </div>

          {dashboardData.bookingTrend.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[#111827]">Weekly Booking Trend</h3>
              <div className="mt-4 flex h-44 items-end gap-3 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
                {dashboardData.bookingTrend.map((bookings, index) => (
                  <div key={trendDays[index]} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-28 w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-[#1E3A8A]"
                        style={{ height: `${Math.max((bookings / maxTrendValue) * 100, 8)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#6B7280]">{trendDays[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {dashboardData.dailyOverview.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-[#111827]">Daily Booking Overview</h3>
              {dashboardData.dailyOverview.map((bookings, index) => (
                <div key={dailySlots[index]}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-[#6B7280]">{dailySlots[index]}</span>
                    <span className="font-semibold text-[#111827]">{bookings}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
                    <div
                      className="h-full rounded-full bg-[#1E3A8A]"
                      style={{ width: `${Math.max((bookings / maxDailyValue) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {dashboardData.timeline.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-[#111827]">Booking Timeline</h3>
              {dashboardData.timeline.map((item) => (
                <div key={`${item.time}-${item.label}`} className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{item.time}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{item.label}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#1E3A8A]">{item.bookings}</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
                    <div
                      className="h-full rounded-full bg-[#1E3A8A]"
                      style={{ width: `${Math.max((item.bookings / maxTimelineValue) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card
          title={`Room Analytics - ${scopeLabel}`}
          subtitle="Room occupancy, availability split, and capacity indicators."
        >
          <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
            <div className="flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-5">
              <div
                className="flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#1E3A8A ${occupancy}%, #E5E7EB ${occupancy}% 100%)`,
                }}
              >
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-semibold text-[#1E3A8A]">{occupancy}%</span>
                  <span className="text-xs font-medium text-[#6B7280]">occupied</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {getStatusDistribution(dashboardData.summary).map((item) => {
                const width = totalStatusRooms ? (item.value / totalStatusRooms) * 100 : 0

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-[#6B7280]">{item.label}</span>
                      <span className="font-semibold text-[#111827]">{item.value}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-[#E5E7EB]">
                      <div
                        className={`h-full rounded-full ${statusColors[item.label]}`}
                        style={{ width: `${Math.max(width, item.value ? 8 : 0)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-semibold text-[#111827]">Available vs Booked</h3>
            <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-[#E5E7EB]">
              {getStatusDistribution(dashboardData.summary).map((item) => {
                const width = totalStatusRooms ? (item.value / totalStatusRooms) * 100 : 0

                return (
                  <div
                    key={item.label}
                    className={statusColors[item.label]}
                    style={{ width: `${width}%` }}
                    title={`${item.label}: ${item.value}`}
                  />
                )
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {getStatusDistribution(dashboardData.summary).map((item) => (
                <span key={item.label} className="inline-flex items-center gap-2 text-xs font-medium text-[#6B7280]">
                  <span className={`h-2 w-2 rounded-full ${statusColors[item.label]}`} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="dashboard-scroll mt-4 max-h-[340px] overflow-y-auto pr-2 space-y-3">
            <h3 className="text-sm font-semibold text-[#111827]">Capacity Indicators</h3>
            {dashboardData.rooms.map((room) => (
              <div key={room.name} className="rounded-lg border border-[#E5E7EB] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{room.name}</p>
                    <p className="mt-1 text-sm text-[#6B7280]">{room.capacity}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#1E3A8A]">{room.occupancy}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div className="h-full rounded-full bg-[#1E3A8A]" style={{ width: `${room.occupancy}%` }} />
                </div>
                <p className="mt-2 text-xs font-medium text-[#6B7280]">{room.status}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Room Management Section */}
      <Card
        title="Room Management"
        subtitle={`${roomManagementData.length} Rooms across ${branchCount} Branches`}
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button>+ Create Room</Button>
          
          <input
            type="text"
            placeholder="Search Room"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
          />
          
          <select 
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
          >
            <option value="All Locations">Location ▼</option>
            {[...new Set(roomManagementData.map(room => room.location))].map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
          
          <select 
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
          >
            <option value="All Branches">Branch ▼</option>
            {uniqueBranches.map((branch) => (
              <option key={branch}>{branch}</option>
            ))}
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100"
          >
            <option value="All Statuses">Status ▼</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Reserved">Reserved</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        {/* Showing X of Y */}
        <div className="mb-4 text-sm text-[#6B7280]">
          Showing <span className="font-semibold text-[#111827]">{filteredRooms.length}</span> of <span className="font-semibold text-[#111827]">{roomManagementData.length}</span> Rooms
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 ? (
          <div className="rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] p-12 text-center">
            <p className="text-sm font-medium text-[#6B7280]">No rooms match your filters</p>
            <div className="mt-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-visible">
            <table className="min-w-full divide-y divide-[#E5E7EB] text-sm whitespace-nowrap">
              <thead className="bg-[#EFF6FF]">
                <tr className="text-left text-[#6B7280]">
                  <th className="py-3 pr-4 font-medium">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#E5E7EB]" />
                  </th>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Branch</th>
                  <th className="px-4 py-3 font-medium">Capacity</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="py-3 pl-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredRooms.map((room) => (
                  <tr 
                    key={room.id}
                    className={room.status === "Disabled" ? "opacity-55" : ""}
                  >
                    <td className="py-3 pr-4">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#E5E7EB]" />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-[#111827]">{room.roomName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">{room.location}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{room.branch}</td>
                    <td className="px-4 py-3 text-[#6B7280]">{room.capacity}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={room.status} />
                    </td>
                    <td className="py-3 pl-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline">Edit</Button>
                        
                        <div className="relative inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu(
                                activeMenu === room.id ? null : room.id
                              );
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F8FAFC]"
                          >
                            ⋮
                          </button>
                          
                          {activeMenu === room.id && (
                            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border bg-white shadow-xl z-50">
                              <div className="py-1">
                                {room.status === 'Disabled' ? (
                                  <button
                                    onClick={() => handleMenuAction('enable', room)}
                                    className="block w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-[#F8FAFC]"
                                  >
                                    Enable Room
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleMenuAction('disable', room)}
                                    className="block w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-[#F8FAFC]"
                                  >
                                    Disable Room
                                  </button>
                                )}
                                <button
                                  onClick={() => handleMenuAction('delete', room)}
                                  className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-[#F8FAFC]"
                                >
                                  Delete Room
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Payment Records with Date Filter */}
      <Card
        title="Payment Records"
        subtitle="Track room-wise and date-wise payment and cancellation status."
      >
        <div className="mb-6">
          <DateRangeFilter onChange={handlePaymentDateChange} />
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#111827]">Room</span>
            <select className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100">
              <option>All Rooms</option>
              {paymentRoomOptions.map((room) => (
                <option key={room}>{room}</option>
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