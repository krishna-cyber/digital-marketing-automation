import AppLayout from "@/components/layout/app-layout"
import { Toaster } from "@/components/ui/sonner"

import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayout>
      <Toaster />
      {children}
    </AppLayout>
  )
}

export default layout
