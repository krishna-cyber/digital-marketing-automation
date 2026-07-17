import { Enable2faSwitch } from "@/components/examples/enable-2fa-switch"
import { Main } from "@/components/layout/main"
import PasswordUpdateForm from "@/components/password-update-form"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import React from "react"

const page = async () => {
  const response = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <Main className="space-y-4">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {" "}
          <h1 className="text-2xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings, password and two-factor
            authentication.
          </p>
        </span>
      </div>

      <Separator />
      {response?.user && <Enable2faSwitch user={response?.user} />}
      <Separator />
      <PasswordUpdateForm />
    </Main>
  )
}

export default page
