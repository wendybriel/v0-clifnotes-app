"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, User, Bot, Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<"mark" | "debbie">("mark")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { profile: selectedProfile },
    }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== "ready") return

    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="space-y-4">
      {/* Profile Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Choose Your Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedProfile} onValueChange={(v) => setSelectedProfile(v as "mark" | "debbie")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mark">
                <div className="text-left">
                  <div className="font-semibold">Mark</div>
                  <div className="text-xs text-muted-foreground">Culture & History Expert</div>
                </div>
              </TabsTrigger>
              <TabsTrigger value="debbie">
                <div className="text-left">
                  <div className="font-semibold">Debbie</div>
                  <div className="text-xs text-muted-foreground">Budget Travel Pro</div>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="h-[500px] flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
              <div>
                <Bot className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-lg font-semibold mb-2">Hi {selectedProfile === "mark" ? "Mark" : "Debbie"}</p>
                <p className="text-sm">
                  {selectedProfile === "mark"
                    ? "Ask me about Spanish culture, architecture, or the best local experiences!"
                    : "Ask me about budget-friendly travel tips, affordable restaurants, and money-saving strategies!"}
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar>
                <AvatarFallback className={message.role === "user" ? "bg-primary" : "bg-secondary"}>
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex-1 rounded-lg p-4 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap">
                        {part.text}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))}

          {status === "streaming" && (
            <div className="flex gap-3">
              <Avatar>
                <AvatarFallback className="bg-secondary">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 rounded-lg p-4 bg-muted">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </CardContent>

        {/* Input Form */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${selectedProfile === "mark" ? "Mark" : "Debbie"} anything about Spain...`}
              disabled={status !== "ready"}
              className="flex-1"
            />
            <Button type="submit" disabled={!input.trim() || status !== "ready"}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>

      {/* Suggested Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Suggested Questions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {selectedProfile === "mark" ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setInput("Tell me about Gaudí's architecture")}>
                Gaudí's Architecture
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("What are the best museums in Barcelona?")}>
                Best Museums
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("What should I know about Spanish culture?")}>
                Spanish Culture
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setInput("What are the best budget restaurants?")}>
                Budget Restaurants
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("How can I save money on attractions?")}>
                Save Money Tips
              </Button>
              <Button variant="outline" size="sm" onClick={() => setInput("What are free things to do in Barcelona?")}>
                Free Activities
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
