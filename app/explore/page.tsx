import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ExploreContent } from "@/components/explore-content"
import { sql } from "@/lib/db"

export default async function ExplorePage() {
  const [destinations, attractions, restaurants] = await Promise.all([
    sql`SELECT * FROM destinations`,
    sql`SELECT * FROM attractions`,
    sql`SELECT * FROM restaurants`,
  ])

  const destination = destinations[0]

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <ExploreContent destination={destination} attractions={attractions || []} restaurants={restaurants || []} />
      <Footer />
    </div>
  )
}
