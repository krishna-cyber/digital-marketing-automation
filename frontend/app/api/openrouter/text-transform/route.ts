import { chat, toServerSentEventsResponse } from "@tanstack/ai"
import { openRouterText } from "@tanstack/ai-openrouter"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // Check for API key
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "OPENROUTER_API_KEY not configured",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
  const body = await req.json()

  //GET ONLY LAST message from the array because the last one is the latest query from the client

  console.log(
    "Last query received from client:",
    body.messages[body.messages.length - 1]
  )
  console.log("Received request body:", body)

  try {
    const stream = chat({
      adapter: openRouterText("openrouter/auto"),
      messages: [body.messages[body.messages.length - 1]], // Pass only the last message to the chat function
      stream: true,
    })

    // Convert stream to HTTP response
    return toServerSentEventsResponse(stream)
  } catch (error) {
    console.log("Error during text transformation:", error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }

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
