"use client"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Field, FieldError, FieldLabel } from "./ui/field"

export const otpFormSchema = z.object({
  otp: z
    .string()
    .min(6, "Please enter the 6-digit code.")
    .max(6, "Please enter the 6-digit code."),
})

type OtpFormProps = React.HTMLAttributes<HTMLFormElement>

export function OtpForm({ className, ...props }: Readonly<OtpFormProps>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: { otp: "" },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const otp = form.watch("otp")

  async function onSubmit(data: z.infer<typeof otpFormSchema>) {
    setIsLoading(true)
    await authClient.twoFactor.verifyTotp({
      code: data.otp, // required
      trustDevice: true,
      fetchOptions: {
        onSuccess() {
          setIsLoading(false)
          toast.success("Successfully authenticated!")
          router.push("/dashboard")
        },
        onError({ error }) {
          setIsLoading(false)
          toast.error(error.message || "Failed to verify OTP.")
        },
      },
    })
  }

  return (
    <form
      id="otp-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("grid gap-2", className)}
      {...props}
    >
      <Controller
        control={form.control}
        name="otp"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="sr-only">One-Time Password</FieldLabel>

            <InputOTP
              maxLength={6}
              {...field}
              containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button className="mt-2" disabled={otp.length < 6 || isLoading}>
        Verify
      </Button>
    </form>
  )
}
