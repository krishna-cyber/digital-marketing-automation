import AppLayout from "@/components/layout/app-layout"
import { authClient } from "@/lib/auth-client"
import { headers } from "next/headers"

import React from "react"

const layout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await authClient.getSession({
    fetchOptions: { headers: await headers() },
  })

  return <AppLayout session={data}>{children}</AppLayout>
}

export default layout
