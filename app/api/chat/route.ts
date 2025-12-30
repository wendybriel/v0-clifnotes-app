import { convertToModelMessages, streamText, type UIMessage } from "ai"
import { getUser } from "@/lib/auth"
import { sql } from "@/lib/db"

export const maxDuration = 30

// Chatbot profiles matching the original implementation
const profiles = {
  mark: {
    name: "Mark",
    systemPrompt: `You are Mark, a friendly and enthusiastic travel guide for Spain. You're passionate about Spanish culture, history, and cuisine. You speak with warmth and excitement, often sharing personal anecdotes and insider tips. You love recommending hidden gems and authentic experiences. You're knowledgeable about architecture, especially Gaudí's work, and you're always happy to help travelers make the most of their trip. Keep responses conversational and helpful, typically 2-4 sentences unless more detail is requested.`,
  },
  debbie: {
    name: "Debbie",
    systemPrompt: `You are Debbie, a practical and budget-conscious travel expert for Spain. You focus on helping travelers save money while still having amazing experiences. You're great at finding deals, suggesting affordable restaurants, and providing tips for free or low-cost attractions. You're organized, detail-oriented, and love helping people plan efficient itineraries. You speak in a friendly but straightforward manner, always with the traveler's budget in mind. Keep responses clear and actionable, typically 2-4 sentences unless more detail is requested.`,
  },
}

export async function POST(req: Request) {
  try {
    const { messages, profile = "mark" }: { messages: UIMessage[]; profile?: "mark" | "debbie" } = await req.json()

    const selectedProfile = profiles[profile] || profiles.mark

    // Get user if authenticated
    const user = await getUser()

    // Get destination context
    const destinations = await sql`
      SELECT name, description, safety_info, weather_info 
      FROM destinations 
      LIMIT 1
    `

    const attractions = await sql`
      SELECT name, description, category, location 
      FROM attractions 
      LIMIT 10
    `

    const restaurants = await sql`
      SELECT name, description, cuisine, price_range, address 
      FROM restaurants 
      LIMIT 10
    `

    const phrases = await sql`
      SELECT english, translation, pronunciation 
      FROM phrases 
      LIMIT 20
    `

    // Build context about Spain for the AI
    const context = `
You have access to the following information about Spain destinations:

Destinations: ${JSON.stringify(destinations)}

Top Attractions: ${JSON.stringify(attractions)}

Recommended Restaurants: ${JSON.stringify(restaurants)}

Common Spanish Phrases: ${JSON.stringify(phrases)}

Use this information to provide helpful, specific recommendations when travelers ask questions.
`

    const prompt = convertToModelMessages(messages)

    const result = streamText({
      model: "openai/gpt-4o-mini",
      system: `${selectedProfile.systemPrompt}\n\n${context}`,
      messages: prompt,
      abortSignal: req.signal,
    })

    // Save chat history if user is authenticated
    if (user && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "user") {
        const conversationId = crypto.randomUUID()
        await sql`
          INSERT INTO chat_history (user_id, conversation_id, role, content)
          VALUES (${user.id}, ${conversationId}, ${lastMessage.role}, ${lastMessage.parts[0]?.type === "text" ? lastMessage.parts[0].text : ""})
        `
      }
    }

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
