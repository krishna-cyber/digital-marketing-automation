import { betterAuth } from "better-auth/minimal"
import { nextCookies } from "better-auth/next-js"
import { twoFactor } from "better-auth/plugins/two-factor"

import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017/betterauth")
const db = client.db()

export const auth = betterAuth({
  appName: "Digital Marketing Automation",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
  },
  plugins: [
    twoFactor({
      skipVerificationOnEnable: true,
      trustDeviceMaxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      otpOptions: {
        async sendOTP({ user, otp }, ctx) {
          console.log("generated otp", otp)
          console.log("user for otp", user)
          // send otp to user
        },
      },
    }),
    nextCookies(),
  ],
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  advanced: {
    disableOriginCheck: true,
    disableCSRFCheck: true,
    database: {
      joins: true,
    },
  },
  logger: {
    level: "info",
  },
})

export type Session = typeof auth.$Infer.Session

export type User = (typeof auth.$Infer.Session)["user"]
