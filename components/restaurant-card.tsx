"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, Utensils } from "lucide-react"
import type { Restaurant } from "@/lib/types"
import { useState, useEffect } from "react"
import { addFavorite, removeFavorite, checkFavorite } from "@/lib/actions/favorites"
import { useRouter } from "next/navigation"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check for session cookie
    const hasSession = document.cookie.includes("session=")
    setIsAuthenticated(hasSession)

    if (hasSession) {
      checkFavorite("restaurant", restaurant.id).then(({ isFavorite }) => {
        setIsFavorite(isFavorite)
      })
    }
  }, [restaurant.id])

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }

    setLoading(true)
    if (isFavorite) {
      await removeFavorite("restaurant", restaurant.id)
      setIsFavorite(false)
    } else {
      await addFavorite("restaurant", restaurant.id)
      setIsFavorite(true)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              {restaurant.name}
            </CardTitle>
            <CardDescription className="mt-2">
              {restaurant.cuisine && <span>{restaurant.cuisine} • </span>}
              {restaurant.price_range}
            </CardDescription>
          </div>
          <Button size="icon" variant="ghost" onClick={toggleFavorite} disabled={loading}>
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{restaurant.description}</p>
        {restaurant.address && (
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
            <span className="text-muted-foreground">{restaurant.address}</span>
          </div>
        )}
        {restaurant.recommended_by && (
          <div className="pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Recommended by <span className="font-medium text-primary">{restaurant.recommended_by}</span>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
