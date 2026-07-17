"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LogIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { PasswordInput } from "./password-input"

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? "Please enter your email." : undefined),
  }),
  password: z
    .string()
    .min(1, "Please enter your password.")
    .min(7, "Password must be at least 7 characters long."),
})

type UserAuthFormProps = React.HTMLAttributes<HTMLFormElement>

export function UserAuthForm({
  className,
  ...props
}: Readonly<UserAuthFormProps>) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      // callbackURL: `${window.location.origin}/dashboard`,
      fetchOptions: {
        onSuccess: (context) => {
          if (context.data.twoFactorRedirect) {
            const methods = context.data.twoFactorMethods
            if (methods?.includes("otp")) {
              router.push("/verify-otp")
            } else {
              toast.error(
                "Two-factor authentication is enabled, but no supported methods are available."
              )
            }
          } else {
            toast.success("Signed in successfully.")
            router.push("/dashboard")
          }
        },
        onError: ({ error }) => {
          toast.error(error.message || "Failed to sign in.")
        },
      },
    })
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        id="sign-in-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                href="/forgot-password"
                className="absolute inset-e-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75"
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />

        <Button
          className="mt-2"
          form="sign-in-form"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <LogIn className="me-2 h-4 w-4" />
          )}
          Sign in
        </Button>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button">
          <Image src="/google.svg" alt="Google" width={16} height={16} />
          Google
        </Button>
      </form>
    </Form>
  )
}
