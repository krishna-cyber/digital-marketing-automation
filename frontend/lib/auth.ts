import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { twoFactor } from "better-auth/plugins/two-factor"
import prisma from "./prisma"

export const auth = betterAuth({
  appName: "Digital Marketing Automation",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  plugins: [
    twoFactor({
      skipVerificationOnEnable: true,
      trustDeviceMaxAge: 30 * 24 * 60 * 60, // 30 days in seconds
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
  },
  logger: {
    level: "debug",
  },
  experimental: { joins: true },
})

export type Session = typeof auth.$Infer.Session

export type User = (typeof auth.$Infer.Session)["user"]
