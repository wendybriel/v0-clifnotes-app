"use client"

import { PhraseCard } from "@/components/phrase-card"
import { SearchFilter } from "@/components/search-filter"
import { useState } from "react"
import type { Phrase } from "@/lib/types"

interface PhrasesContentProps {
  phrases: Phrase[]
}

export function PhrasesContent({ phrases }: PhrasesContentProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPhrases = phrases.filter(
    (phrase) =>
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group phrases by category
  const phrasesByCategory = filteredPhrases.reduce(
    (acc, phrase) => {
      if (!acc[phrase.category]) {
        acc[phrase.category] = []
      }
      acc[phrase.category].push(phrase)
      return acc
    },
    {} as Record<string, Phrase[]>,
  )

  return (
    <main className="container px-4 py-8 pb-24 md:pb-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Essential Spanish Phrases</h1>
        <p className="text-muted-foreground text-lg">Learn key phrases to help you communicate during your trip</p>
      </div>

      <div className="mb-8">
        <SearchFilter
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search phrases by English, Spanish, or category..."
        />
      </div>

      <div className="space-y-8">
        {Object.entries(phrasesByCategory).map(([category, categoryPhrases]) => (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryPhrases.map((phrase) => (
                <PhraseCard key={phrase.id} phrase={phrase} />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(phrasesByCategory).length === 0 && (
          <p className="text-center text-muted-foreground py-12">No phrases found matching your search.</p>
        )}
      </div>
    </main>
  )
}
