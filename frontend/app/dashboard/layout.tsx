import AppLayout from "@/components/layout/app-layout"

import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AppLayout>{children}</AppLayout>
}

export default layout
