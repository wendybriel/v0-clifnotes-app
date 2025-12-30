import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { PhrasesContent } from "@/components/phrases-content"
import { sql } from "@/lib/db"

export default async function PhrasesPage() {
  const phrases = await sql`
    SELECT * FROM phrases 
    ORDER BY category ASC
  `

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <PhrasesContent phrases={phrases || []} />
      <Footer />
    </div>
  )
}
