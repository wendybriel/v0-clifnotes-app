"use server"

import { sql } from "@/lib/db"
import { hashPassword, verifyPassword, createSession, setSessionCookie, clearSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const redirectTo = (formData.get("redirect") as string) || "/"

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Check if user exists
  const existingUsers = await sql`
    SELECT id FROM users WHERE email = ${email}
  `

  if (existingUsers.length > 0) {
    return { error: "User already exists" }
  }

  // Create user
  const passwordHash = await hashPassword(password)
  const users = await sql`
    INSERT INTO users (email, password_hash, name)
    VALUES (${email}, ${passwordHash}, ${name})
    RETURNING id
  `

  const userId = users[0].id

  // Create user profile
  await sql`
    INSERT INTO user_profiles (user_id)
    VALUES (${userId})
  `

  // Create session
  const token = await createSession(userId)
  await setSessionCookie(token)

  revalidatePath("/")
  redirect(redirectTo)
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const redirectTo = (formData.get("redirect") as string) || "/"

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  // Find user
  const users = await sql`
    SELECT id, password_hash FROM users WHERE email = ${email}
  `

  if (users.length === 0) {
    return { error: "Invalid email or password" }
  }

  const user = users[0]

  // Verify password
  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) {
    return { error: "Invalid email or password" }
  }

  // Create session
  const token = await createSession(user.id)
  await setSessionCookie(token)

  revalidatePath("/")
  redirect(redirectTo)
}

export async function signOut() {
  await clearSession()
  revalidatePath("/")
  redirect("/")
}

// Export logout as an alias for signOut
export { signOut as logout }
