"use client"

import { AttractionCard } from "@/components/attraction-card"
import { RestaurantCard } from "@/components/restaurant-card"
import { InfoCard } from "@/components/info-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchFilter } from "@/components/search-filter"
import { useState } from "react"
import type { Destination, Attraction, Restaurant } from "@/lib/types"

interface ExploreContentProps {
  destination: Destination | null | undefined
  attractions: Attraction[]
  restaurants: Restaurant[]
}

export function ExploreContent({ destination, attractions, restaurants }: ExploreContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAttractions = attractions.filter(
    (attraction) =>
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="container px-4 py-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Explore {destination?.name}</h1>
        <p className="text-muted-foreground text-lg">{destination?.description}</p>
      </div>

      <Tabs defaultValue="attractions" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="attractions">Attractions</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="info">Travel Info</TabsTrigger>
        </TabsList>

        <TabsContent value="attractions" className="space-y-6">
          <SearchFilter
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search attractions by name, description, or category..."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
          {filteredAttractions.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No attractions found matching your search.</p>
          )}
        </TabsContent>

        <TabsContent value="restaurants" className="space-y-6">
          <SearchFilter
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search restaurants by name, cuisine, or description..."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
          {filteredRestaurants.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No restaurants found matching your search.</p>
          )}
        </TabsContent>

        <TabsContent value="info" className="space-y-6">
          <InfoCard destination={destination} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
