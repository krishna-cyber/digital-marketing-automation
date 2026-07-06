import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { twoFactor } from "better-auth/plugins/two-factor"
import prisma from "./prisma"

export const auth = betterAuth({
  appName: "Digital Marketing Automation",
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
    }),
    nextCookies(),
  ],
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  experimental: { joins: true },
})

export type Session = typeof auth.$Infer.Session
