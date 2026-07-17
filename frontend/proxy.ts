import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { authClient } from "./lib/auth-client"

export async function proxy(request: NextRequest) {
  try {
    const { data, error } = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    })

    if (!data) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
    return NextResponse.next()
  } catch (error) {
    console.log("Error fetching session:", error)
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Specify the routes the middleware applies to
}
