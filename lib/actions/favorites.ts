"use server"

import { sql } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function addFavorite(itemType: "attraction" | "restaurant" | "phrase", itemId: number) {
  const session = await getSession()

  if (!session) {
    return { error: "Not authenticated" }
  }

  try {
    await sql`
      INSERT INTO user_favorites (user_id, favorite_type, favorite_id)
      VALUES (${session.userId}, ${itemType}, ${itemId})
      ON CONFLICT (user_id, favorite_type, favorite_id) DO NOTHING
    `

    revalidatePath("/favorites")
    return { success: true }
  } catch (error) {
    return { error: "Failed to add favorite" }
  }
}

export async function removeFavorite(itemType: "attraction" | "restaurant" | "phrase", itemId: number) {
  const session = await getSession()

  if (!session) {
    return { error: "Not authenticated" }
  }

  try {
    await sql`
      DELETE FROM user_favorites
      WHERE user_id = ${session.userId}
      AND favorite_type = ${itemType}
      AND favorite_id = ${itemId}
    `

    revalidatePath("/favorites")
    return { success: true }
  } catch (error) {
    return { error: "Failed to remove favorite" }
  }
}

export async function checkFavorite(itemType: "attraction" | "restaurant" | "phrase", itemId: number) {
  const session = await getSession()

  if (!session) {
    return { isFavorite: false }
  }

  try {
    const result = await sql`
      SELECT id FROM user_favorites
      WHERE user_id = ${session.userId}
      AND favorite_type = ${itemType}
      AND favorite_id = ${itemId}
    `

    return { isFavorite: result.length > 0 }
  } catch (error) {
    return { isFavorite: false }
  }
}
