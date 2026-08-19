# WorkNest — Modern Coworking & Room Booking Platform

WorkNest is a full-stack workspace and room booking application built for modern coworking spaces, private cabins, meeting rooms, and conference facilities.

---

## 🏛️ Architecture Overview

The application follows a decoupled client-server architecture:

```
┌────────────────────────────────────────┐       ┌────────────────────────────────────────┐
│               FRONTEND                 │       │                BACKEND                 │
│  React 19 + Vite + Tailwind CSS        │ ────> │  Express 5 + TypeScript + Prisma ORM  │
│  Hosted on Vercel                      │       │  Hosted on Render / Railway            │
└────────────────────────────────────────┘       └───────────────────┬────────────────────┘
                                                                     │
                                                 ┌───────────────────┴────────────────────┐
                                                 │               DATABASE                 │
                                                 │   PostgreSQL (Serverless Neon DB)      │
                                                 └────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 19, Vite, React Router v7
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **HTTP Client**: Axios (with centralized JWT interceptor)
- **Deployment Target**: Vercel

### **Backend**
- **Runtime & Language**: Node.js, Express v5, TypeScript
- **Database ORM**: Prisma Client v7 with PostgreSQL adapter (`@prisma/adapter-pg`)
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT (`jsonwebtoken`) & `bcryptjs`
- **Validation**: Zod schema validation
- **Payments**: Razorpay Node SDK & HMAC-SHA256 signature verification
- **Deployment Target**: Render / Railway / Fly.io

---

## 🔐 Environment Variables

### **Frontend (`.env.production` / Vercel Environment Variables)**
| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `VITE_API_URL` | Base URL of the deployed backend API | `https://worknest-backend.onrender.com/api` |
| `VITE_RAZORPAY_KEY_ID` | Public Razorpay Key ID | `rzp_test_...` |

### **Backend (`backend/.env` / Render/Railway Environment Variables)**
| Variable | Description | Required | Example Value |
| :--- | :--- | :--- | :--- |
| `PORT` | Server listening port | No (default: 5000) | `5000` |
| `NODE_ENV` | Environment mode | Yes | `production` |
| `DATABASE_URL` | PostgreSQL connection string with SSL | Yes | `postgresql://user:pass@ep-...neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens | Yes | `your-secure-random-jwt-secret` |
| `JWT_EXPIRES_IN` | Token expiration period | No (default: 7d) | `7d` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | Yes | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET`| Razorpay API Secret | Yes | `your-razorpay-key-secret` |

---

## 📡 API Endpoints

### **Health Check**
- `GET /api/health` — Check server status & operational health

### **Authentication (`/api/auth`)**
- `POST /api/auth/register` — Register a new customer (`name`, `email`, `phone`, `password`)
- `POST /api/auth/login` — Login user with credentials (`email`, `password`)
- `GET /api/auth/me` — Fetch current authenticated user profile *(Requires JWT)*

### **Rooms & Workspaces (`/api/rooms`)**
- `GET /api/rooms` — List all rooms (optional query filters: `type`, `branchId`, `isActive`, `locationId`)
- `GET /api/rooms/:id` — Get single room details with branch & location info
- `POST /api/rooms` — Create a new room *(Requires Admin)*
- `PUT /api/rooms/:id` — Update room details *(Requires Admin)*
- `DELETE /api/rooms/:id` — Remove room *(Requires Admin)*

### **Bookings (`/api/bookings`)**
- `POST /api/bookings` — Create a slot booking with availability checking *(Requires JWT)*
- `GET /api/bookings/my-bookings` — Fetch all bookings for logged-in user *(Requires JWT)*
- `GET /api/bookings/:id` — Get single booking details *(Requires JWT)*
- `PATCH /api/bookings/:id/cancel` — Cancel a booking *(Requires JWT)*

### **Payments (`/api/payments`)**
- `POST /api/payments/create-order` — Create a Razorpay order *(Requires JWT)*
- `POST /api/payments/verify` — Verify Razorpay HMAC signature & confirm booking *(Requires JWT)*

---

## 🚀 Local Development Setup

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/worknest.git
cd worknest

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Database Setup & Seed
```bash
cd backend
# Create your .env file with DATABASE_URL and JWT_SECRET
cp .env.example .env

# Generate Prisma client and sync schema
npx prisma generate
npx prisma db push

# Seed initial rooms, branches, and users
npm run seed
```

### 3. Start Development Servers
```bash
# Start backend server (http://localhost:5000)
cd backend
npm run dev

# In a separate terminal, start frontend dev server (http://localhost:5173)
cd ..
npm run dev
```

---

## 🚢 Production Deployment Guide

### **Step 1: Deploy Backend (Render / Railway)**
1. Connect your repository to **Render** or **Railway**.
2. Set the Root Directory to `backend`.
3. Set the **Build Command**: `npm install && npm run build`
4. Set the **Start Command**: `npm run start`
5. Configure all backend environment variables (`DATABASE_URL`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NODE_ENV=production`).
6. Deploy the service and copy your public URL (e.g. `https://worknest-backend.onrender.com`).

### **Step 2: Deploy Frontend (Vercel)**
1. Import the repository root on **Vercel**.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
   - `VITE_RAZORPAY_KEY_ID`: `your_razorpay_key_id`
6. Deploy!
