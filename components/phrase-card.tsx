"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, Heart } from "lucide-react"
import type { Phrase } from "@/lib/types"
import { useState, useEffect } from "react"
import { addFavorite, removeFavorite, checkFavorite } from "@/lib/actions/favorites"
import { useRouter } from "next/navigation"

interface PhraseCardProps {
  phrase: Phrase
}

export function PhraseCard({ phrase }: PhraseCardProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check for session cookie
    const hasSession = document.cookie.includes("session=")
    setIsAuthenticated(hasSession)

    if (hasSession) {
      checkFavorite("phrase", phrase.id).then(({ isFavorite }) => {
        setIsFavorite(isFavorite)
      })
    }
  }, [phrase.id])

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.translation)
      utterance.lang = "es-ES"
      speechSynthesis.speak(utterance)
    }
  }

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    setLoading(true)
    if (isFavorite) {
      await removeFavorite("phrase", phrase.id)
      setIsFavorite(false)
    } else {
      await addFavorite("phrase", phrase.id)
      setIsFavorite(true)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{phrase.english}</p>
            <p className="text-xl font-semibold mb-1">{phrase.translation}</p>
            {phrase.pronunciation && <p className="text-sm text-muted-foreground italic">{phrase.pronunciation}</p>}
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={speak}>
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={toggleFavorite} disabled={loading}>
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
