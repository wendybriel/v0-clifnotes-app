import { NavBar } from "@/components/nav-bar"
import { getUser } from "@/lib/auth"
import { AttractionCard } from "@/components/attraction-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { PhraseCard } from "@/components/phrase-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { sql } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function FavoritesPage() {
  const user = await getUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Login to see your favorites</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Create an account to save your favorite attractions, restaurants, and phrases!
              </p>
              <div className="flex gap-4">
                <Link href="/auth/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  // Get all user favorites
  const favorites = await sql`
    SELECT * FROM user_favorites 
    WHERE user_id = ${user.id}
  `

  // Get favorite attractions
  const attractionIds = favorites.filter((f) => f.favorite_type === "attraction").map((f) => f.favorite_id)
  const attractions = attractionIds.length ? await sql`SELECT * FROM attractions WHERE id = ANY(${attractionIds})` : []

  // Get favorite restaurants
  const restaurantIds = favorites.filter((f) => f.favorite_type === "restaurant").map((f) => f.favorite_id)
  const restaurants = restaurantIds.length ? await sql`SELECT * FROM restaurants WHERE id = ANY(${restaurantIds})` : []

  // Get favorite phrases
  const phraseIds = favorites.filter((f) => f.favorite_type === "phrase").map((f) => f.favorite_id)
  const phrases = phraseIds.length ? await sql`SELECT * FROM phrases WHERE id = ANY(${phraseIds})` : []

  const totalFavorites = (attractions?.length || 0) + (restaurants?.length || 0) + (phrases?.length || 0)

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-8 pb-24 md:pb-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
          <p className="text-muted-foreground text-lg">
            Your saved attractions, restaurants, and phrases ({totalFavorites} items)
          </p>
        </div>

        {totalFavorites === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Start exploring and save your favorite attractions, restaurants, and phrases to see them here!
              </p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All ({totalFavorites})</TabsTrigger>
              <TabsTrigger value="attractions">Attractions ({attractions?.length || 0})</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants ({restaurants?.length || 0})</TabsTrigger>
              <TabsTrigger value="phrases">Phrases ({phrases?.length || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {attractions && attractions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Attractions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {attractions.map((attraction) => (
                      <AttractionCard key={attraction.id} attraction={attraction} />
                    ))}
                  </div>
                </div>
              )}

              {restaurants && restaurants.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Restaurants</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              )}

              {phrases && phrases.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Phrases</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phrases.map((phrase) => (
                      <PhraseCard key={phrase.id} phrase={phrase} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="attractions">
              {attractions && attractions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attractions.map((attraction) => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No favorite attractions yet. Start exploring!
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="restaurants">
              {restaurants && restaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No favorite restaurants yet. Start exploring!
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="phrases">
              {phrases && phrases.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phrases.map((phrase) => (
                    <PhraseCard key={phrase.id} phrase={phrase} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    No favorite phrases yet. Start learning!
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
