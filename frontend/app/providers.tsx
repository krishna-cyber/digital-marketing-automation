// app/providers.tsx
"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { aiDevtoolsPlugin } from "@tanstack/react-ai-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import { useState } from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <TooltipProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TooltipProvider>
      {/* Devtools will only appear in development environments */}
      <TanStackDevtools
        plugins={[
          // ... other plugins
          aiDevtoolsPlugin(),
          {
            name: "React Query Devtools",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
        // this config is important to connect to the server event bus
        eventBusConfig={{
          connectToServerBus: true,
        }}
      />
    </QueryClientProvider>
  )
}
