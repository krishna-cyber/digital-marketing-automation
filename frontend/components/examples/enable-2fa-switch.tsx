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
import { Controller, useForm } from "react-hook-form"
import z from "zod"
import { Dialog } from "../ui/dialog"
const formSchema = z.object({
  twoFactor: z.boolean().optional(),
})

export function Enable2faSwitch() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactor: false,
    },
  })
  const twoFactorEnabled = form.watch("twoFactor")

  console.log("Two-factor authentication enabled:", twoFactorEnabled)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data.twoFactor ? "Enabling 2FA..." : "Disabling 2FA...")

    // const { data, error } = await authClient.twoFactor.enable({
    //   password: "secure-password",
    // })
  }

  return (
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
                    Adds an extra layer of security by requiring a verification
                    code on login.
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
  )
}
