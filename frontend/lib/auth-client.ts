import { twoFactorClient } from "better-auth/client/plugins"
import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  fetchOptions: {
    headers: {
      "content-type": "application/json",
    },
  },
  plugins: [twoFactorClient(), nextCookies()],
})
