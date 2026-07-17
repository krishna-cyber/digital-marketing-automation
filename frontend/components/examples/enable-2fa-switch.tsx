"use client"
import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"

import { User } from "@/lib/auth"
import { HelpCircleIcon } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Disable2faDialog } from "./confirm-disable-2fa"
import { Enable2faDialog } from "./enable-2fa-dialog"
const formSchema = z.object({
  twoFactor: z.boolean().optional(),
})

export function Enable2faSwitch({ user }: Readonly<{ user: User }>) {
  const [disable2faDialogOpen, setDisable2faDialogOpen] = useState(false)
  const [enable2faDialogOpen, setEnable2faDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: user?.twoFactorEnabled || false,
    },
  })

  const handleDisable2faDialogClose = () => {
    form.reset()
    setDisable2faDialogOpen(false)
  }

  const handleEnable2faDialogClose = () => {
    form.reset()
    setEnable2faDialogOpen(false)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted with data:", data)
    if (data.twoFactor && form.formState.isDirty) {
      setEnable2faDialogOpen(true)
    }
    if (!data.twoFactor && form.formState.isDirty) {
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
                onCheckedChange={(value) => field.onChange(value)}
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
        setOpen={handleEnable2faDialogClose}
      />
    </>
  )
}
