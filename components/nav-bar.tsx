"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Map, MessageCircle, Heart, User, Book } from "lucide-react"
import { useEffect, useState } from "react"

export function NavBar() {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for session cookie
    const hasSession = document.cookie.includes("session=")
    setIsAuthenticated(hasSession)
  }, [pathname])

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore", icon: Map },
    { href: "/phrases", label: "Phrases", icon: Book },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/favorites", label: "Favorites", icon: Heart },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
            <span className="text-lg font-bold text-primary-foreground">C</span>
          </div>
          <span className="text-xl font-bold">Clifnotes</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            )
          })}
        </div>

        {isAuthenticated ? (
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Link href="/auth/login">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="flex items-center justify-around h-16 px-4">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                <link.icon className="w-5 h-5" />
                <span className="text-xs">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
