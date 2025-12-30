import { NavBar } from "@/components/nav-bar"
import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/actions/auth"
import Link from "next/link"
import { User } from "lucide-react"

export default async function ProfilePage() {
  const session = await getSession()

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <NavBar />
        <main className="container px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <User className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Login to see your profile</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Create an account to manage your preferences and view your chat history!
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

  const users = await sql`
    SELECT * FROM users WHERE id = ${session.userId}
  `
  const user = users[0]

  const profiles = await sql`
    SELECT * FROM user_profiles WHERE user_id = ${session.userId}
  `
  const profile = profiles[0]

  const chatHistory = await sql`
    SELECT * FROM chat_history
    WHERE user_id = ${session.userId}
    ORDER BY created_at DESC
    LIMIT 10
  `

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <main className="container px-4 py-8 pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground text-lg">Manage your account and preferences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user?.name || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{new Date(user?.created_at || "").toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Your app settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Preferred AI Guide</p>
                  <p className="font-medium capitalize">{profile?.preferred_chat_personality || "Mark"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Travel Interests</p>
                  <p className="font-medium">{profile?.travel_interests?.join(", ") || "Not set"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Chat History</CardTitle>
              <CardDescription>Your latest conversations with the AI guide</CardDescription>
            </CardHeader>
            <CardContent>
              {chatHistory && chatHistory.length > 0 ? (
                <div className="space-y-3">
                  {chatHistory.slice(0, 5).map((chat: any) => (
                    <div key={chat.id} className="p-3 rounded-lg bg-muted">
                      <p className="text-sm font-medium capitalize mb-1">{chat.role}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{chat.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(chat.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No chat history yet. Start a conversation!</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={signOut}>
                <Button type="submit" variant="destructive">
                  Sign Out
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
