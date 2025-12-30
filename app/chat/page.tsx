"use client"

import { NavBar } from "@/components/nav-bar"
import { ChatInterface } from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">AI Travel Assistant</h1>
            <p className="text-muted-foreground text-lg">
              Chat with Mark or Debbie for personalized travel advice and recommendations
            </p>
          </div>

          <ChatInterface />
        </div>
      </main>
    </div>
  )
}
