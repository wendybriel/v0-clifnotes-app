import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Book } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Travel Assistant",
      description: "Chat with Mark or Debbie for calm, personalized Spain guidance",
      href: "/chat",
      color: "bg-green-500",
    },
    {
      icon: Book,
      title: "Learn Simple Spanish",
      description: "One friendly phrase at a time — no pressure",
      href: "/chat",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-grow container px-4 py-12">
        {/* Hero */}
        <section className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Your Personal Guide to <span className="text-primary">Spain</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            A calm, friendly travel companion designed to make Spain feel easy, welcoming,
            and enjoyable — especially when you want reassurance, not overload.
          </p>

          <Link href="/chat">
            <Button size="lg" className="w-full sm:w-auto">
              🗣️ Start with Your Spain Helper
            </Button>
          </Link>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto">
          <h2 cl
