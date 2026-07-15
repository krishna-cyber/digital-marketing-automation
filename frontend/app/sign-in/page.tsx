import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserAuthForm } from "@/components/user-auth-form"

import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <div className="container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8">
        <div className="mb-4 flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
        <Card className="max-w-sm gap-4">
          <CardHeader>
            <CardTitle className="text-lg tracking-tight">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password below to log into{" "}
              <br className="max-sm:hidden" /> your account. Don&apos;t have an
              account?{" "}
              <Link
                href="/sign-up"
                className="text-nowrap underline underline-offset-4 hover:text-primary"
              >
                Sign Up
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserAuthForm />
          </CardContent>
          <CardFooter>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking sign in, you agree to our{" "}
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default page
