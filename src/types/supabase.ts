export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          category: string
          created_at: string | null
          created_by: string
          description: string
          id: string
          image: string
          ingredients: string[]
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by: string
          description: string
          id: string
          image: string
          ingredients: string[]
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string
          description?: string
          id?: string
          image?: string
          ingredients?: string[]
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
