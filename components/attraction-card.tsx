"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Heart } from "lucide-react"
import type { Attraction } from "@/lib/types"
import { useState, useEffect } from "react"
import { addFavorite, removeFavorite, checkFavorite } from "@/lib/actions/favorites"
import { useRouter } from "next/navigation"

interface AttractionCardProps {
  attraction: Attraction
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check for session cookie
    const hasSession = document.cookie.includes("session=")
    setIsAuthenticated(hasSession)

    if (hasSession) {
      checkFavorite("attraction", attraction.id).then(({ isFavorite }) => {
        setIsFavorite(isFavorite)
      })
    }
  }, [attraction.id])

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    setLoading(true)
    if (isFavorite) {
      await removeFavorite("attraction", attraction.id)
      setIsFavorite(false)
    } else {
      await addFavorite("attraction", attraction.id)
      setIsFavorite(true)
    }
    setLoading(false)
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-muted">
        <img
          src={attraction.image_url || "/placeholder.svg?height=300&width=400"}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2"
          onClick={toggleFavorite}
          disabled={loading}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>
      <CardHeader>
        <CardTitle>{attraction.name}</CardTitle>
        <CardDescription className="flex items-center gap-4">
          {attraction.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              {attraction.rating}
            </span>
          )}
          {attraction.location && (
            <span className="flex items-center gap-1 text-xs">
              <MapPin className="w-3 h-3" />
              {attraction.location}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{attraction.description}</p>
        {attraction.category && (
          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {attraction.category}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
