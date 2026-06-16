import conferenceRoomImage from "../assets/rooms/conference-room.jpg";
import meetingRoomImage from "../assets/rooms/meeting-room.jpg";
import privateCabinImage from "../assets/rooms/private-cabin.jpg";
import sharedWorkspaceImage from "../assets/rooms/shared-workspace.jpg";

export const rooms = [
  {
    id: 1,
    name: "Meeting Room A",
    type: "Meeting Room",
    capacity: "4-8 People",
    price: 500,
    priceLabel: "₹500/hour",
    location: "Mangalore",
    status: "Available",
    facilities: ["Wi-Fi", "AC", "Projector", "Whiteboard"],
    description: "Spacious meeting room for team discussions and client meetings.",
    imageSrc: meetingRoomImage,
    imageAlt: "Meeting Room A coworking space",
  },
  {
    id: 2,
    name: "Conference Room",
    type: "Conference Room",
    capacity: "10-20 People",
    price: 700,
    priceLabel: "₹700/hour",
    location: "Mangalore",
    status: "Available",
    facilities: ["Wi-Fi", "AC", "Projector", "Conference Table"],
    description: "Large conference room suitable for meetings and presentations.",
    imageSrc: conferenceRoomImage,
    imageAlt: "Conference room coworking space",
  },
  {
    id: 3,
    name: "Private Cabin",
    type: "Cabin",
    capacity: "1-2 People",
    price: 300,
    priceLabel: "₹300/hour",
    location: "Mangalore",
    status: "Available",
    facilities: ["Wi-Fi", "AC", "Desk", "Power Backup"],
    description: "Private cabin for focused work and client calls.",
    imageSrc: privateCabinImage,
    imageAlt: "Private cabin workspace",
  },
  {
    id: 4,
    name: "Shared Workspace",
    type: "Open Desk",
    capacity: "Open desk",
    price: 200,
    priceLabel: "₹200/day",
    location: "Mangalore",
    status: "Available",
    facilities: ["Wi-Fi", "Shared Desk", "Common Area"],
    description: "Affordable shared workspace for individuals and freelancers.",
    imageSrc: sharedWorkspaceImage,
    imageAlt: "Shared workspace desks",
  },
];

export const bookingDetails = {
  bookingId: "BK1024",
  room: "Meeting Room A",
  date: "May 30, 2026",
  startDate: "May 30, 2026",
  endDate: "May 30, 2026",
  time: "10:00 AM - 12:00 PM",
  duration: "2 Hours",
  people: 6,
  bookingType: "Hourly Booking",
  rate: "₹500/hour",
  totalAmount: 1000,
  paymentStatus: "Paid",
};

export const customer = {
  name: "Adithya",
  fullName: "Adithya Kotian",
  mobile: "+91 98765 43210",
  email: "adithya@gmail.com",
  location: "Mangalore",
  profileType: "Individual",
  companyName: "Optional",
};

export const customerBookings = [
  {
    id: "BK1024",
    space: "Meeting Room A",
    date: "May 30, 2026",
    time: "10:00 AM - 12:00 PM",
    status: "Confirmed",
  },
];

export const nearbySpaces = [
  {
    id: 3,
    name: "Private Cabin",
    capacity: "1-2 People",
    priceLabel: "₹300/hour",
    status: "Available",
  },
  {
    id: 1,
    name: "Meeting Room A",
    capacity: "4-8 People",
    priceLabel: "₹500/hour",
    status: "Available",
  },
  {
    id: 2,
    name: "Conference Room",
    capacity: "10-20 People",
    priceLabel: "₹700/hour",
    status: "Available",
  },
];

export const orderHistory = [
  {
    bookingId: "BK1024",
    space: "Meeting Room A",
    date: "May 30, 2026",
    time: "10 AM - 12 PM",
    amount: "₹1000",
    status: "Paid",
  },
  {
    bookingId: "BK1025",
    space: "Private Cabin",
    date: "May 28, 2026",
    time: "2 PM - 4 PM",
    amount: "₹600",
    status: "Completed",
  },
  {
    bookingId: "BK1026",
    space: "Conference Room",
    date: "May 20, 2026",
    time: "11 AM - 1 PM",
    amount: "₹1400",
    status: "Cancelled",
  },
];

export const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Plan",
    targetLabel: "For individuals",
    price: "₹2999/month",
    features: [
      "10 booking hours",
      "Shared workspace access",
      "Basic meeting room access",
      "Email support",
    ],
  },
  {
    id: 2,
    name: "Premium Plan",
    targetLabel: "For small teams",
    price: "₹7999/month",
    recommended: true,
    features: [
      "30 booking hours",
      "Cabin and meeting room access",
      "Priority booking",
      "Faster support",
    ],
  },
  {
    id: 3,
    name: "Corporate Plan",
    targetLabel: "For companies",
    price: "₹25000/month",
    features: [
      "4 rooms allocated",
      "Team workspace access",
      "Admin managed bookings",
      "Priority support",
    ],
  },
];

export const adminSummary = [
  {
    label: "Total Bookings",
    value: "128",
  },
  {
    label: "Available Rooms",
    value: "12",
  },
  {
    label: "Booked Rooms",
    value: "8",
  },
  {
    label: "Total Revenue",
    value: "₹1,25,000",
  },
];

export const roomStatus = [
  {
    roomName: "Meeting Room A",
    status: "Booked",
    action: "View Payment / Cancel / Refund",
  },
  {
    roomName: "Conference Room",
    status: "Available",
    action: "Reserve / Create Booking",
  },
  {
    roomName: "Private Cabin",
    status: "Reserved",
    action: "Cancel Reserve",
  },
  {
    roomName: "Shared Workspace",
    status: "Available",
    action: "Edit / Disable",
  },
];

export const paymentRecords = [
  {
    room: "Meeting Room A",
    date: "Jun 12",
    customer: "Rahul",
    expectedAmount: "₹1000",
    paidAmount: "₹1000",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
    refundStatus: "-",
    emailStatus: "-",
  },
  {
    room: "Conference Room",
    date: "Jun 13",
    customer: "Sneha",
    expectedAmount: "₹1400",
    paidAmount: "₹900",
    paymentStatus: "Underpaid",
    bookingStatus: "Confirmed",
    refundStatus: "-",
    emailStatus: "-",
  },
  {
    room: "Private Cabin",
    date: "Jun 14",
    customer: "Arjun",
    expectedAmount: "₹600",
    paidAmount: "₹0",
    paymentStatus: "Pending",
    bookingStatus: "Booked",
    refundStatus: "-",
    emailStatus: "-",
  },
  {
    room: "Training Room",
    date: "Jun 15",
    customer: "Kiran",
    expectedAmount: "₹2000",
    paidAmount: "₹500",
    paymentStatus: "Advance Paid",
    bookingStatus: "Cancelled",
    refundStatus: "Advance Retained",
    emailStatus: "Cancellation Mail Sent",
  },
];
