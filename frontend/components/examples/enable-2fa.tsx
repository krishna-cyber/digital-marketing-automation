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
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldCheck } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { PasswordInput } from "../password-input"
import { Field, FieldError, FieldLabel } from "../ui/field"

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
  const form = useForm<z.infer<typeof Enable2faSchema>>({
    resolver: zodResolver(Enable2faSchema),
    defaultValues: {
      password: "",
    },
  })

  const handleSubmit = async (data: z.infer<typeof Enable2faSchema>) => {
    console.log("Submitting Enable 2FA form with data:", data) // Log the form data for debugging
    const { data: resData, error } = await authClient.twoFactor.enable({
      password: data.password,
    })

    console.log("Enable 2FA response:", resData) // Log the response for debugging
    if (error) {
      toast.error(
        error.message || "Failed to enable two-factor authentication."
      )
    } else {
      setOpen(false)
      form.reset()
      toast.success("Two-factor authentication enabled successfully.")
    }
  }

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

            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username-1">Password</FieldLabel>
                  <PasswordInput {...field} aria-invalid={fieldState.invalid} />
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
            <Button variant="default" type="submit" form="enable-2fa-password">
              Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
