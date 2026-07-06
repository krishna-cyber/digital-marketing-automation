import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { CreditCard, LogOut, Plus, Settings, User } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export function ProfileDropdown({
  user,
}: Readonly<{
  user: Session["user"] | undefined
}>) {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name} />
              <AvatarFallback className="rounded-lg">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm leading-none font-medium">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <User /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <CreditCard /> Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/branding">
                <Settings /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus /> New Team
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    redirect("/sign-in") // redirect to login page
                  },
                },
              })
            }
          >
            <LogOut /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <SignOutDialog open={!!open} onOpenChange={setOpen} /> */}
    </>
  )
}
