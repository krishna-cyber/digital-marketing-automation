"use client"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpCircleIcon } from "lucide-react"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Dialog } from "../ui/dialog"
import { Disable2faDialog } from "./confirm-disable-2fa"
import { Enable2faDialog } from "./enable-2fa"

const formSchema = z.object({
  twoFactor: z.boolean().optional(),
})

export function Enable2faSwitch() {
  const [disable2faDialogOpen, setDisable2faDialogOpen] = useState(false)
  const [enable2faDialogOpen, setEnable2faDialogOpen] = useState(false)
  const { data } = authClient.useSession()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: data?.user.twoFactorEnabled ?? false,
    },
  })

  const handleDisable2faDialogClose = () => {
    form.resetDefaultValues({ twoFactor: data?.user.twoFactorEnabled ?? false })
    setDisable2faDialogOpen(false)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.twoFactor) {
      setEnable2faDialogOpen(true)
    } else {
      setDisable2faDialogOpen(true)
    }
  }

  return (
    <>
      <form
        id="enable-2fa-form"
        onChange={form.handleSubmit(onSubmit)}
        className="justify-first flex flex-col items-start"
      >
        <Controller
          name="twoFactor"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" className="w-full">
              <FieldLabel htmlFor="sw-tooltip">
                Two-factor authentication
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-muted-foreground">
                      <HelpCircleIcon aria-hidden="true" className="size-3.5" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Adds an extra layer of security by requiring a
                      verification code on login.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FieldLabel>
              <Switch
                name={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
                id="sw-tooltip"
              />
            </Field>
          )}
        />
      </form>

      <Disable2faDialog
        open={disable2faDialogOpen}
        setOpen={handleDisable2faDialogClose}
      />
      <Enable2faDialog
        open={enable2faDialogOpen}
        setOpen={setEnable2faDialogOpen}
      />
    </>
  )
}
