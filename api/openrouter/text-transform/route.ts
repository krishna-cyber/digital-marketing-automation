import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log("Received request body:", body);

  const dummyWords = [
    "This ",
    "is ",
    "a ",
    "streamed ",
    "text ",
    "response ",
    "from ",
    "the ",
    "text-transform ",
    "endpoint.",
  ];

  const stream = new ReadableStream({
    async start(controller) {
      for (const word of dummyWords) {
        controller.enqueue(new TextEncoder().encode(word));
        await new Promise((r) => setTimeout(r, 200));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

export async function GET() {
  console.log("GET /api/openrouter/text-transform hit");

  return NextResponse.json({
    message: "Text transform endpoint is live.",
  });
}
