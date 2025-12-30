export interface Destination {
  id: string
  name: string
  country: string
  description: string | null
  image_url: string | null
  weather_info: Record<string, string> | null
  safety_info: string | null
  created_at: string
  updated_at: string
}

export interface Attraction {
  id: string
  destination_id: string
  name: string
  description: string | null
  category: string | null
  location: string | null
  image_url: string | null
  rating: number | null
  created_at: string
}

export interface Restaurant {
  id: string
  destination_id: string
  name: string
  description: string | null
  cuisine: string | null
  price_range: string | null
  address: string | null
  recommended_by: string | null
  created_at: string
}

export interface Phrase {
  id: string
  destination_id: string
  category: string
  english: string
  translation: string
  pronunciation: string | null
  created_at: string
}

export interface UserFavorite {
  id: string
  user_id: string
  favorite_type: "attraction" | "restaurant" | "phrase"
  favorite_id: string
  created_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  conversation_id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  preferred_language: string | null
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  id: string
  user_id: string
  chatbot_profile: "mark" | "debbie"
  theme: string
  created_at: string
  updated_at: string
}
