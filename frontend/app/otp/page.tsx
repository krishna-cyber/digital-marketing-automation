import { OtpForm } from "@/components/otp-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const page = () => {
  return (
    <div className="container grid h-svh max-w-none items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:p-8">
        <div className="mb-4 flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>
        <Card className="max-w-md gap-4">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">
              Two-factor Authentication
            </CardTitle>
            <CardDescription>
              Please enter the authentication code. <br /> We have sent the
              authentication code to your email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OtpForm />
          </CardContent>
          <CardFooter>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Haven&apos;t received it?{" "}
              <Link
                href="/sign-in"
                className="underline underline-offset-4 hover:text-primary"
              >
                Resend a new code.
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default page
