// =============================================================================
// WorkNest — Database Seed
// =============================================================================
// Run: npx prisma db seed
//
// This script populates the database with realistic development data
// spread across multiple date ranges for dashboard testing.
// =============================================================================

import {
  PrismaClient,
  UserRole,
  RoomType,
  PricingUnit,
  BookingStatus,
  PaymentStatus,
} from '@prisma/client'

import { PrismaPg } from '@prisma/adapter-pg'
import * as bcrypt from 'bcrypt'
import 'dotenv/config'

// =============================================================================
// Prisma Client Setup
// =============================================================================

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

// =============================================================================
// Constants
// =============================================================================

const DEFAULT_PASSWORD = 'password123'
const SALT_ROUNDS = 10

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Creates a time slot on a specific date.
 * @param date   — The base date
 * @param hour   — Starting hour (24h format)
 * @param durationHours — Duration in hours (default: 2)
 */
function createSlot(
  date: Date,
  hour: number,
  durationHours: number = 2
): { startTime: Date; endTime: Date } {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const startTime = new Date(year, month, day, hour, 0, 0)
  const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000)

  return { startTime, endTime }
}

/**
 * Creates a date offset from today by the given number of days.
 * Negative values = past, positive = future.
 */
function daysFromToday(offset: number): Date {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new Date(today.getTime() + offset * 24 * 60 * 60 * 1000)
}

// =============================================================================
// Main Seed Function
// =============================================================================

async function main(): Promise<void> {
  console.log('🌱 Seeding database...\n')

  // ===========================================================================
  // Step 0 — Clean existing data
  // ===========================================================================
  // Order matters due to foreign key constraints

  await prisma.payment.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.room.deleteMany()
  await prisma.branch.deleteMany()
  await prisma.location.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleaned existing data\n')

  // ===========================================================================
  // Step 1 — Users
  // ===========================================================================

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@worknest.com',
      phone: '9876543210',
      passwordHash,
      role: UserRole.ADMIN,
    },
  })

  const customer1 = await prisma.user.create({
    data: {
      name: 'Adithya Kotian',
      email: 'adithya@example.com',
      phone: '9876543211',
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '9876543212',
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  })

  const customer3 = await prisma.user.create({
    data: {
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '9876543213',
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  })

  console.log('✅ Users created (1 admin + 3 customers)')

  // ===========================================================================
  // Step 2 — Locations
  // ===========================================================================

  const mangalore = await prisma.location.create({
    data: {
      name: 'Dakshina Kannada',
      address: '123 Lighthouse Road, Hampankatta',
      city: 'Mangalore',
      state: 'Karnataka',
    },
  })

  const bangalore = await prisma.location.create({
    data: {
      name: 'Bangalore Urban',
      address: '456 MG Road, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
    },
  })

  const udupi = await prisma.location.create({
    data: {
      name: 'Udupi',
      address: '789 Temple Road, Udupi',
      city: 'Udupi',
      state: 'Karnataka',
    },
  })

  console.log('✅ Locations created (3)')

  // ===========================================================================
  // Step 3 — Branches
  // ===========================================================================

  const mangaloreCentral = await prisma.branch.create({
    data: {
      name: 'Mangalore Central',
      address: 'Near Clock Tower, Hampankatta',
      locationId: mangalore.id,
    },
  })

  const surathkal = await prisma.branch.create({
    data: {
      name: 'Surathkal',
      address: 'NH-66, Surathkal',
      locationId: mangalore.id,
    },
  })

  const koramangala = await prisma.branch.create({
    data: {
      name: 'Koramangala',
      address: '5th Block, Koramangala',
      locationId: bangalore.id,
    },
  })

  const indiranagar = await prisma.branch.create({
    data: {
      name: 'Indiranagar',
      address: '100 Feet Road, Indiranagar',
      locationId: bangalore.id,
    },
  })

  const udupiMain = await prisma.branch.create({
    data: {
      name: 'Udupi Main',
      address: 'Near Krishna Temple, Udupi',
      locationId: udupi.id,
    },
  })

  console.log('✅ Branches created (5)')

  // ===========================================================================
  // Step 4 — Rooms
  // ===========================================================================

  const rooms = await Promise.all([
    // ── Mangalore Central ──
    prisma.room.create({
      data: {
        name: 'Meeting Room A',
        type: RoomType.MEETING_ROOM,
        capacity: 8,
        price: 500,
        pricingUnit: PricingUnit.HOUR,
        description: 'Small meeting room with whiteboard and projector',
        branchId: mangaloreCentral.id,
      },
    }),
    prisma.room.create({
      data: {
        name: 'Meeting Room B',
        type: RoomType.MEETING_ROOM,
        capacity: 6,
        price: 400,
        pricingUnit: PricingUnit.HOUR,
        description: 'Cozy meeting room with video conferencing',
        branchId: mangaloreCentral.id,
      },
    }),
    prisma.room.create({
      data: {
        name: 'Conference Room',
        type: RoomType.CONFERENCE_ROOM,
        capacity: 20,
        price: 1500,
        pricingUnit: PricingUnit.HOUR,
        description: 'Large conference room with full AV setup',
        branchId: mangaloreCentral.id,
      },
    }),
    prisma.room.create({
      data: {
        name: 'Private Cabin A',
        type: RoomType.PRIVATE_CABIN,
        capacity: 2,
        price: 300,
        pricingUnit: PricingUnit.HOUR,
        description: 'Private cabin for focused work',
        branchId: mangaloreCentral.id,
      },
    }),

    // ── Surathkal ──
    prisma.room.create({
      data: {
        name: 'Shared Workspace',
        type: RoomType.SHARED_WORKSPACE,
        capacity: 12,
        price: 200,
        pricingUnit: PricingUnit.HOUR,
        description: 'Open workspace with hot desks',
        branchId: surathkal.id,
      },
    }),
    prisma.room.create({
      data: {
        name: 'Focus Cabin',
        type: RoomType.PRIVATE_CABIN,
        capacity: 2,
        price: 250,
        pricingUnit: PricingUnit.HOUR,
        description: 'Soundproof cabin for calls',
        branchId: surathkal.id,
      },
    }),

    // ── Koramangala ──
    prisma.room.create({
      data: {
        name: 'The Boardroom',
        type: RoomType.CONFERENCE_ROOM,
        capacity: 15,
        price: 2000,
        pricingUnit: PricingUnit.HOUR,
        description: 'Premium boardroom with city view',
        branchId: koramangala.id,
      },
    }),
    prisma.room.create({
      data: {
        name: 'Startup Hub',
        type: RoomType.SHARED_WORKSPACE,
        capacity: 30,
        price: 150,
        pricingUnit: PricingUnit.HOUR,
        description: 'Collaborative open workspace',
        branchId: koramangala.id,
      },
    }),

    // ── Indiranagar ──
    prisma.room.create({
      data: {
        name: 'Meeting Point',
        type: RoomType.MEETING_ROOM,
        capacity: 10,
        price: 600,
        pricingUnit: PricingUnit.HOUR,
        description: 'Modern meeting space with smart TV',
        branchId: indiranagar.id,
      },
    }),

    // ── Udupi ──
    prisma.room.create({
      data: {
        name: 'Temple View Room',
        type: RoomType.MEETING_ROOM,
        capacity: 8,
        price: 400,
        pricingUnit: PricingUnit.HOUR,
        description: 'Meeting room with temple view',
        branchId: udupiMain.id,
      },
    }),
  ])

  console.log(`✅ Rooms created (${rooms.length})`)

  // ===========================================================================
  // Step 5 — Bookings (spread across date ranges)
  // ===========================================================================

  const today = daysFromToday(0)
  const yesterday = daysFromToday(-1)
  const twoDaysAgo = daysFromToday(-2)
  const lastWeek = daysFromToday(-7)
  const lastMonth = daysFromToday(-30)
  const threeMonthsAgo = daysFromToday(-90)
  const tomorrow = daysFromToday(1)
  const nextWeek = daysFromToday(7)

  // ── Today ──
  const todayBookings = [
    { ...createSlot(today, 9),   userId: customer1.id, roomId: rooms[0].id, status: BookingStatus.CONFIRMED,  totalAmount: 1000 },
    { ...createSlot(today, 11),  userId: customer2.id, roomId: rooms[2].id, status: BookingStatus.CONFIRMED,  totalAmount: 3000 },
    { ...createSlot(today, 14, 1), userId: customer3.id, roomId: rooms[3].id, status: BookingStatus.PENDING,   totalAmount: 300  },
    { ...createSlot(today, 16, 3), userId: customer1.id, roomId: rooms[4].id, status: BookingStatus.COMPLETED, totalAmount: 600  },
  ]

  // ── Yesterday ──
  const yesterdayBookings = [
    { ...createSlot(yesterday, 10), userId: customer2.id, roomId: rooms[1].id, status: BookingStatus.COMPLETED, totalAmount: 800 },
    { ...createSlot(yesterday, 13), userId: customer1.id, roomId: rooms[5].id, status: BookingStatus.CANCELLED, totalAmount: 500 },
  ]

  // ── Two days ago ──
  const twoDaysAgoBookings = [
    { ...createSlot(twoDaysAgo, 9), userId: customer3.id, roomId: rooms[6].id, status: BookingStatus.COMPLETED, totalAmount: 4000 },
  ]

  // ── Last week ──
  const lastWeekBookings = [
    { ...createSlot(lastWeek, 9),  userId: customer1.id, roomId: rooms[0].id, status: BookingStatus.COMPLETED, totalAmount: 1000 },
    { ...createSlot(lastWeek, 11), userId: customer2.id, roomId: rooms[7].id, status: BookingStatus.COMPLETED, totalAmount: 450  },
    { ...createSlot(lastWeek, 14), userId: customer3.id, roomId: rooms[2].id, status: BookingStatus.CANCELLED, totalAmount: 1500 },
  ]

  // ── Last month ──
  const lastMonthBookings = [
    { ...createSlot(lastMonth, 9),  userId: customer1.id, roomId: rooms[8].id, status: BookingStatus.COMPLETED, totalAmount: 1200 },
    { ...createSlot(lastMonth, 13), userId: customer2.id, roomId: rooms[9].id, status: BookingStatus.COMPLETED, totalAmount: 800  },
  ]

  // ── Three months ago (for Year filter) ──
  const threeMonthsAgoBookings = [
    { ...createSlot(threeMonthsAgo, 10), userId: customer1.id, roomId: rooms[3].id, status: BookingStatus.COMPLETED, totalAmount: 600  },
    { ...createSlot(threeMonthsAgo, 14), userId: customer3.id, roomId: rooms[6].id, status: BookingStatus.COMPLETED, totalAmount: 4000 },
  ]

  // ── Future ──
  const futureBookings = [
    { ...createSlot(tomorrow, 9),  userId: customer1.id, roomId: rooms[1].id, status: BookingStatus.CONFIRMED, totalAmount: 800  },
    { ...createSlot(tomorrow, 14), userId: customer2.id, roomId: rooms[2].id, status: BookingStatus.PENDING,   totalAmount: 3000 },
    { ...createSlot(nextWeek, 10), userId: customer3.id, roomId: rooms[0].id, status: BookingStatus.CONFIRMED, totalAmount: 1000 },
  ]

  const allBookings = [
    ...todayBookings,
    ...yesterdayBookings,
    ...twoDaysAgoBookings,
    ...lastWeekBookings,
    ...lastMonthBookings,
    ...threeMonthsAgoBookings,
    ...futureBookings,
  ]

  let bookingCount = 0
  for (const booking of allBookings) {
    await prisma.booking.create({ data: booking })
    bookingCount++
  }

  console.log(`✅ Bookings created (${bookingCount} across 7 date ranges)`)

  // ===========================================================================
  // Step 6 — Subscriptions
  // ===========================================================================

  const subscriptions = await Promise.all([
    prisma.subscription.create({
      data: { name: 'Basic',    price: 999,  duration: 30, isActive: true },
    }),
    prisma.subscription.create({
      data: { name: 'Premium',  price: 1999, duration: 30, isActive: true },
    }),
    prisma.subscription.create({
      data: { name: 'Business', price: 3999, duration: 30, isActive: true },
    }),
  ])

  console.log(`✅ Subscriptions created (${subscriptions.length})`)

  // ===========================================================================
  // Step 7 — Payments
  // ===========================================================================

  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        userId:            customer1.id,
        amount:            1000,
        currency:          'INR',
        status:            PaymentStatus.SUCCESS,
        razorpayOrderId:   'order_mock_001',
        razorpayPaymentId: 'pay_mock_001',
      },
    }),
    prisma.payment.create({
      data: {
        userId:            customer2.id,
        amount:            3000,
        currency:          'INR',
        status:            PaymentStatus.SUCCESS,
        razorpayOrderId:   'order_mock_002',
        razorpayPaymentId: 'pay_mock_002',
      },
    }),
    prisma.payment.create({
      data: {
        userId:          customer3.id,
        amount:          500,
        currency:        'INR',
        status:          PaymentStatus.PENDING,
        razorpayOrderId: 'order_mock_003',
      },
    }),
    prisma.payment.create({
      data: {
        userId:            customer1.id,
        amount:            800,
        currency:          'INR',
        status:            PaymentStatus.REFUNDED,
        razorpayOrderId:   'order_mock_004',
        razorpayPaymentId: 'pay_mock_004',
      },
    }),
  ])

  console.log(`✅ Payments created (${payments.length})`)

  // ===========================================================================
  // Summary
  // ===========================================================================

  console.log('\n──────────────────────────────────────────────')
  console.log('🎉 Seeding complete!')
  console.log('──────────────────────────────────────────────')
  console.log(`   Users:         4`)
  console.log(`   Locations:     3`)
  console.log(`   Branches:      5`)
  console.log(`   Rooms:         ${rooms.length}`)
  console.log(`   Bookings:      ${bookingCount}`)
  console.log(`   Subscriptions: ${subscriptions.length}`)
  console.log(`   Payments:      ${payments.length}`)
  console.log('──────────────────────────────────────────────\n')
}

// =============================================================================
// Execute
// =============================================================================

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('❌ Seed failed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })