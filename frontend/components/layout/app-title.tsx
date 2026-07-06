import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export function AppTitle() {
  const { setOpenMobile, state, isMobile } = useSidebar()
  const isCollapsed = state === "collapsed" && !isMobile

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="gap-0 py-0 hover:bg-transparent active:bg-transparent"
          asChild
        >
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              onClick={() => setOpenMobile(false)}
              className={cn(
                "flex flex-1 flex-col items-center text-start text-sm leading-tight",
                isCollapsed && "justify-center"
              )}
            >
              <Image
                src={isCollapsed ? "/logo.jpeg" : "/logo.png"}
                alt="Digital Marketing Automation"
                width={isCollapsed ? 32 : 140}
                height={isCollapsed ? 32 : 40}
                className={cn(
                  "object-contain",
                  isCollapsed ? "h-8 w-8" : "h-10 w-[140px]"
                )}
                priority
              />
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// function ToggleSidebar({
//   className,
//   onClick,
//   ...props
// }: React.ComponentProps<typeof Button>) {
//   const { toggleSidebar } = useSidebar()

//   return (
//     <Button
//       data-sidebar="trigger"
//       data-slot="sidebar-trigger"
//       variant="ghost"
//       size="icon"
//       className={cn("aspect-square size-8 max-md:scale-125", className)}
//       onClick={(event) => {
//         onClick?.(event)
//         toggleSidebar()
//       }}
//       {...props}
//     >
//       <X className="md:hidden" />
//       <Menu className="max-md:hidden" />
//       <span className="sr-only">Toggle Sidebar</span>
//     </Button>
//   )
// }
