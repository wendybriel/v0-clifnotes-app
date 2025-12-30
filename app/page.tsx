import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, MessageCircle, Book, Utensils, Globe, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: MapPin,
      title: "Explore Destinations",
      description: "Discover amazing attractions and hidden gems",
      href: "/explore",
      color: "bg-amber-500",
    },
    {
      icon: Book,
      title: "Learn Phrases",
      description: "Essential Spanish phrases with pronunciation",
      href: "/phrases",
      color: "bg-blue-500",
    },
    {
      icon: Utensils,
      title: "Find Restaurants",
      description: "Local favorites and budget-friendly eats",
      href: "/explore#restaurants",
      color: "bg-red-500",
    },
    {
      icon: MessageCircle,
      title: "AI Travel Assistant",
      description: "Chat with Mark or Debbie for personalized advice",
      href: "/chat",
      color: "bg-green-500",
    },
    {
      icon: Globe,
      title: "Travel Info",
      description: "Weather, safety tips, and local customs",
      href: "/explore#info",
      color: "bg-purple-500",
    },
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep track of places you want to visit",
      href: "/favorites",
      color: "bg-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-8 pb-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
            Your Personal Guide to <span className="text-primary">Spain</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Discover the best of Spain with AI-powered recommendations, essential phrases, and insider tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explore">
              <Button size="lg" className="w-full sm:w-auto">
                Start Exploring
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Chat with AI Guide
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Attractions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Restaurants</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Phrases</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
