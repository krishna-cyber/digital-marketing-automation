import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log("Received request body:", body)
  return NextResponse.json({
    text: `Transformed text for action: ${body.action} and original text: ${body.text}`,
  })
}

export async function GET(req: NextRequest) {
  const body = await req.json()

  console.log("GET request received at /api/openrouter/text-transform ")
  console.log("Received GET request body:", body)

  return NextResponse.json({
    message: "This is a GET request to the text-transform endpoint.",
  })
}
