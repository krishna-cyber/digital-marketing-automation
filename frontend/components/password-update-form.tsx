"use client"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { StrongPasswordInput } from "./examples/strong-password-input"
import { PasswordInput } from "./password-input"
import { Button } from "./ui/button"
import { Field, FieldError, FieldLabel } from "./ui/field"
import { Label } from "./ui/label"

const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmNewPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmNewPassword"], // Highlights the error directly on this field
      })
    }
  })

const PasswordUpdateForm = () => {
  ;[]
  const [submitting, setSubmitting] = React.useState(false)
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    setSubmitting(true)
    await authClient.changePassword({
      newPassword: data.confirmNewPassword, // required
      currentPassword: data.currentPassword, // required
      revokeOtherSessions: true,
      fetchOptions: {
        onSuccess(context) {
          toast.success("Password changed successfully!")
        },
        onError(context) {
          toast.error(
            context.error?.message ||
              "An error occurred while changing the password."
          )
        },
      },
    })
    setSubmitting(false)
    form.reset()
    // Here you would typically send the data to your backend API for processing
  }
  return (
    <form
      id="change-password-form"
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <h1 className="text-xl font-bold tracking-tight">Update Password</h1>

      {/* current password */}
      <Controller
        name="currentPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="w-full max-w-sm space-y-2">
              <FieldLabel htmlFor="form-rhf-demo-currentPassword">
                Current Password
              </FieldLabel>
              <PasswordInput {...field} />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* New password */}
      <Controller
        control={form.control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <StrongPasswordInput
            label="New Password"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* Confirm new password */}
      <Controller
        control={form.control}
        name="confirmNewPassword"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="password-toggle">Confirm Password</Label>
              <PasswordInput {...field} />
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          variant={"secondary"}
          size={"lg"}
          onClick={() => form.reset()}
          type="button"
        >
          Cancel
        </Button>
        <Button
          size={"lg"}
          type="submit"
          disabled={!form.formState.isValid || submitting}
        >
          {submitting && <LoaderCircle className="animate-spin" />}
          Change Password
        </Button>
      </div>
    </form>
  )
}

export default PasswordUpdateForm
