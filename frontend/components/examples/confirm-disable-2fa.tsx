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
import { AlertTriangleIcon } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { PasswordInput } from "../password-input"
import { Field, FieldError, FieldLabel } from "../ui/field"
const Disable2faSchema = z.object({
  password: z.string().min(1, "Password is required to disable 2FA."),
})
export function Disable2faDialog({
  open,
  setOpen,
}: Readonly<{
  open: boolean
  setOpen: (open: boolean) => void
}>) {
  const form = useForm<z.infer<typeof Disable2faSchema>>({
    resolver: zodResolver(Disable2faSchema),
    defaultValues: {
      password: "",
    },
  })
  const handleSubmit = async (data: z.infer<typeof Disable2faSchema>) => {
    await authClient.twoFactor.disable({
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Two-factor authentication disabled successfully.")
          window.location.reload()
        },
        onError: ({ error }) => {
          toast.error(
            error.message || "Failed to disable two-factor authentication."
          )
          window.location.reload()
        },
      },
    })
    setOpen(false)
  }
  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangleIcon className="size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Disabling two-factor authentication will make your account
                  less secure.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <form
            id="disable-2fa-password"
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
            <Button
              variant="destructive"
              type="submit"
              form="disable-2fa-password"
            >
              Disable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
