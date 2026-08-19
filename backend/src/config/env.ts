// =============================================================================
// WorkNest — Environment Variables
// =============================================================================
// Loads and validates environment variables at startup.
// Throws an error if any required variable is missing.
// =============================================================================

import 'dotenv/config'

// =============================================================================
// Required Environment Variables
// =============================================================================

const REQUIRED_ENV_KEYS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
] as const

for (const key of REQUIRED_ENV_KEYS) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

// =============================================================================
// Export
// =============================================================================

export const env = {
  /** PostgreSQL connection string */
  databaseUrl: process.env.DATABASE_URL as string,

  /** Server port (defaults to 5000) */
  port: Number(process.env.PORT) || 5000,

  /** Current Node.js environment (development | production | test) */
  nodeEnv: process.env.NODE_ENV || 'development',

  /** JWT signing secret */
  jwtSecret: process.env.JWT_SECRET as string,

  /** JWT token expiry (defaults to 7d) */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  /** Razorpay Key ID */
  razorpayKeyId: process.env.RAZORPAY_KEY_ID as string,

  /** Razorpay Key Secret */
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET as string,
} as const