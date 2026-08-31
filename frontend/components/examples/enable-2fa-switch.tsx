"use client"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { User } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertTriangleIcon, HelpCircleIcon } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { PasswordInput } from "../password-input"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Enable2faDialog } from "./enable-2fa-dialog"

const Disable2faSchema = z.object({
  password: z.string().min(1, "Password is required to disable 2FA."),
})
export function Enable2faSwitch() {
  const { data } = authClient.useSession()
  const [disable2faDialogOpen, setDisable2faDialogOpen] = useState(false)
  const [enable2faDialogOpen, setEnable2faDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof Disable2faSchema>>({
    resolver: zodResolver(Disable2faSchema),
    defaultValues: {
      password: "",
    },
  })
  const handle2faDisable = async (data: z.infer<typeof Disable2faSchema>) => {
    await authClient.twoFactor.disable({
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Two-factor authentication disabled successfully.")
        },
        onError: ({ error }) => {
          toast.error(
            error.message || "Failed to disable two-factor authentication."
          )
        },
      },
    })
    setDisable2faDialogOpen(false)
  }

  const handleEnable2faDialogClose = () => {
    setEnable2faDialogOpen(false)
  }

  return (
    <>
      <Field orientation="horizontal" className="w-full">
        <FieldLabel htmlFor="sw-tooltip">
          Two-factor authentication
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground">
                <HelpCircleIcon aria-hidden="true" className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="right">
                Adds an extra layer of security by requiring a verification code
                on login.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </FieldLabel>
        <Switch
          name={"twoFactor"}
          checked={data?.user?.twoFactorEnabled ?? false}
          onCheckedChange={(value) => {
            if (value) {
              setEnable2faDialogOpen(true)
            } else {
              setDisable2faDialogOpen(true)
            }
          }}
        />
      </Field>

      {/* Disable 2fa dialog */}
      <div className="flex items-center justify-center">
        <Dialog
          open={disable2faDialogOpen}
          onOpenChange={setDisable2faDialogOpen}
        >
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
              onSubmit={form.handleSubmit(handle2faDisable)}
            >
              <Controller
                name="password"
                control={form.control}
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
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
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

      {/* Enable 2fa dialog */}
      <Enable2faDialog
        open={enable2faDialogOpen}
        setOpen={handleEnable2faDialogClose}
      />
    </>
  )
}
