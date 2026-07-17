import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScanQrCode, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import QRCode from "react-qr-code"
import { toast } from "sonner"
import z from "zod"
import { otpFormSchema } from "../otp-form"
import { PasswordInput } from "../password-input"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Separator } from "../ui/separator"

const Enable2faSchema = z.object({
  password: z.string().min(1, "Password is required to enable 2FA."),
})

export function Enable2faDialog({
  open,
  setOpen,
}: Readonly<{
  open: boolean
  setOpen: (open: boolean) => void
}>) {
  const activateForm = useForm<z.infer<typeof Enable2faSchema>>({
    resolver: zodResolver(Enable2faSchema),
    defaultValues: {
      password: "",
    },
  })

  const verifyOtpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  })

  const [totpURI, settotpURI] = useState<string | null>(null)

  const handleSubmit = async (data: z.infer<typeof Enable2faSchema>) => {
    await authClient.twoFactor.enable({
      password: data.password,
      fetchOptions: {
        onSuccess({ data }) {
          settotpURI(data.totpURI)
        },
        onError({ error }) {
          toast.error(
            error.message || "Failed to enable two-factor authentication."
          )
        },
      },
    })
  }

  const verifyOtpSubmit = async (otp: z.infer<typeof otpFormSchema>) => {
    console.log("Verifying OTP with data:", otp) // Log the OTP data for debugging
    await authClient.twoFactor.verifyTotp({
      code: otp.otp,
      trustDevice: true,
      fetchOptions: {
        onSuccess() {
          toast.success(
            "Two-factor authentication enabled and verified successfully."
          )
          setOpen(false)
          settotpURI(null)
        },
        onError({ error }) {
          toast.error(
            error.message || "Failed to verify two-factor authentication."
          )
          verifyOtpForm.reset()
        },
      },
    })
  }

  if (totpURI) {
    return (
      <Dialog
        open={open}
        onOpenChange={() => {
          settotpURI(null)
          setOpen(false)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ScanQrCode className="size-5" />
              </div>

              <div className="flex flex-col gap-1">
                <DialogTitle>Scan and verify OTP</DialogTitle>
                <DialogDescription>
                  Scan the QR code below with your authenticator app and enter
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            <QRCode value={totpURI} />
          </div>
          <Separator />
          <Form {...verifyOtpForm}>
            <form
              id="verify-2fa-otp"
              onSubmit={verifyOtpForm.handleSubmit(verifyOtpSubmit)}
            >
              <FormField
                control={verifyOtpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">One-Time Password</FormLabel>
                    <FormControl>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="default"
              disabled={verifyOtpForm.formState.isSubmitting}
              type="submit"
              form="verify-2fa-otp"
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                  <DialogDescription>
                    Please enter your password to verify and enable two-factor
                    authentication for your account.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <form
              id="enable-2fa-password"

              onSubmit={activateForm.handleSubmit(handleSubmit)}
            >
              <Controller
                name="password"
                control={activateForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username-1">Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="default"
                type="submit"
                form="enable-2fa-password"
                disabled={activateForm.formState.isSubmitting}
              >
                Enable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
