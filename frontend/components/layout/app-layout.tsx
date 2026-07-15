"use client"
import { LayoutProvider } from "@/context/layout-provider"
import { Session } from "@/lib/auth"

import { getCookie } from "@/lib/cookies"
import { cn } from "@/lib/utils"
import React from "react"
import { ProfileDropdown } from "../profile-dropdown"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Header } from "./header"
import { NotificationCenter } from "./notification-center"
import { SkipToMain } from "./skip-to-main"
import { TopNav } from "./top-nav"

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
  session?: Session | null
}

const AppLayout = ({ children, session }: AuthenticatedLayoutProps) => {
  const defaultOpen = getCookie("sidebar_state") !== "false"

  return (
    <LayoutProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar user={session?.user} />
        <SidebarInset
          className={cn(
            // Set content container, so we can use container queries
            "@container/content",

            // If layout is fixed, set the height
            // to 100svh to prevent overflow
            "has-data-[layout=fixed]:h-svh",

            // If layout is fixed and sidebar is inset,
            // set the height to 100svh - spacing (total margins) to prevent overflow
            "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]"
          )}
        >
          {/* ===== Top Heading ===== */}
          <Header>
            <TopNav links={[]} className="me-auto" />
            {/* <Search /> */}
            {/* <ThemeSwitch /> */}
            {/* <ConfigDrawer /> */}
            <NotificationCenter />
            <ProfileDropdown user={session?.user} />
          </Header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  )
}

export default AppLayout
