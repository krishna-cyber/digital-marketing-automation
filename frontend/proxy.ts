import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
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
