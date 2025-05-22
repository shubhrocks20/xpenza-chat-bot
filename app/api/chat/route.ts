import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

const contextCache = new Map();

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  const userId = queryParams.userId

  let context = contextCache.get(userId)

  if (!context) {
    console.log("Fetching user context from backend");
    const res = await fetch(`http://localhost:3012/api/v1/users/user-context`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    })
    context = await res.json();
    contextCache.set(userId, context)
  }


  const { messages } = await req.json();

  messages.unshift({
    role: 'user',
    content: [{ type: 'text', text: `You are Xpenza AI - an intelligent assistant that helps users effectively track, manage, and optimize their expenses. Use the context of the currently logged-in user to provide personalized financial insights, budgeting tips, and smart suggestions to improve their spending habits. Context: ${JSON.stringify(context)} . Date Today ${new Date()}` }]
  })

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
  });
  return result.toDataStreamResponse();
}