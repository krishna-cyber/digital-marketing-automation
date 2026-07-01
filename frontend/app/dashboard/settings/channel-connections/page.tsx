"use client"
import { Main } from "@/components/layout/main"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { OctagonX } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type AppType = "all" | "connected" | "notConnected"
const channels = [
  {
    name: "LinkedIn",
    logo: "/linkedin.svg",
    connected: false,
    desc: "Connect with LinkedIn for professional networking.",
  },
  {
    name: "Instagram",
    logo: "/instagram-icon.svg",
    connected: true,
    desc: "Effortlessly sync Instagram posts for seamless collaboration.",
  },

  {
    name: "Slack",
    logo: "/slack.svg",
    connected: false,
    desc: "Integrate Slack for efficient team communication",
  },
  {
    name: "WhatsApp",
    logo: "/whatsapp-icon.svg",
    connected: false,
    desc: "Easily integrate WhatsApp for direct messaging.",
  },
  {
    name: "Zoom",
    logo: "/zoom.svg",
    connected: true,
    desc: "Host Zoom meetings directly from the dashboard.",
  },
  {
    name: "Strapi",
    logo: "/strapi.svg",
    connected: false,
    desc: "Easily manage Strapi content and API endpoints.",
  },
  {
    name: "Gmail",
    logo: "/gmail.svg",
    connected: true,
    desc: "Access and manage Gmail messages effortlessly.",
  },
]

export default function Page() {
  const [appType, setAppType] = useState<AppType>("all")

  const filteredChannels = channels.filter((channel) => {
    if (appType === "all") return true
    if (appType === "connected") return channel.connected
    return !channel.connected
  })

  return (
    <>
      {/* ===== Main ===== */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            {" "}
            <h1 className="text-2xl font-bold tracking-tight">
              Channel Connections
            </h1>
            <p className="text-sm text-muted-foreground">
              Connect and manage the social channels used to publish content.
            </p>
          </span>
        </div>
        {/* Filter and search */}
        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
            <Input
              placeholder="Filter channelsd..."
              className="h-9 w-40 lg:w-62.5"
            />
            <Select
              value={appType}
              onValueChange={(value) => setAppType(value as AppType)}
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="notConnected">Not Connected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="shadow-sm" />
        {/* Information regarding channel configuration */}
        <Collapsible className="mt-3 w-full rounded-lg border-2 border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40">
          <CollapsibleTrigger className="flex w-full items-center gap-3 p-4">
            <OctagonX className="h-5 w-5 text-amber-700 dark:text-amber-300" />
            <span className="font-medium text-amber-900 dark:text-amber-100">
              Channel connections are not configurable.
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t-2 border-amber-300 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:text-amber-200">
            Please contact the administrator to configure the channels. The
            administrator can set up the necessary credentials and permissions
            for each channel, ensuring a smooth integration process.
          </CollapsibleContent>
        </Collapsible>

        {/* Channels list */}
        <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
          {filteredChannels.map((app) => (
            <li
              key={app.name}
              className="rounded-lg border p-4 hover:shadow-md"
            >
              <div className="mb-8 flex items-center justify-between">
                <div
                  className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                >
                  <Image
                    src={app.logo}
                    alt={`${app.name} logo`}
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${app.connected ? "border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900" : ""}`}
                >
                  {app.connected ? "Connected" : "Connect"}
                </Button>
              </div>
              <div>
                <h2 className="mb-1 font-semibold">{app.name}</h2>
                <p className="line-clamp-2 text-gray-500">{app.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Main>
    </>
  )
}
