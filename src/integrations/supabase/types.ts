export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          action_type: string | null
          admin_email: string | null
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          status: string | null
          target_email: string | null
          target_license: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          action_type?: string | null
          admin_email?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          status?: string | null
          target_email?: string | null
          target_license?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          action_type?: string | null
          admin_email?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          status?: string | null
          target_email?: string | null
          target_license?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      licenses: {
        Row: {
          activated_at: string | null
          created_at: string
          current_activations: number
          duration: string | null
          expires_at: string | null
          generated_by_admin: string | null
          id: string
          license_key: string
          max_activations: number
          plan: string
          price_pkr: number | null
          status: string
          updated_at: string
          used_by_email: string | null
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          current_activations?: number
          duration?: string | null
          expires_at?: string | null
          generated_by_admin?: string | null
          id?: string
          license_key: string
          max_activations?: number
          plan?: string
          price_pkr?: number | null
          status?: string
          updated_at?: string
          used_by_email?: string | null
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          current_activations?: number
          duration?: string | null
          expires_at?: string | null
          generated_by_admin?: string | null
          id?: string
          license_key?: string
          max_activations?: number
          plan?: string
          price_pkr?: number | null
          status?: string
          updated_at?: string
          used_by_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          button_text: string | null
          button_url: string | null
          created_at: string
          created_by_admin: string | null
          expires_at: string | null
          icon_type: string
          id: string
          is_active: boolean
          is_draft: boolean
          message: string
          notification_type: string
          priority: string
          read_count: number | null
          recipients_count: number | null
          repeat_interval: string | null
          scheduled_at: string | null
          sent_at: string | null
          target_type: string
          target_value: string | null
          title: string
        }
        Insert: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          created_by_admin?: string | null
          expires_at?: string | null
          icon_type?: string
          id?: string
          is_active?: boolean
          is_draft?: boolean
          message: string
          notification_type?: string
          priority?: string
          read_count?: number | null
          recipients_count?: number | null
          repeat_interval?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          target_type?: string
          target_value?: string | null
          title: string
        }
        Update: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          created_by_admin?: string | null
          expires_at?: string | null
          icon_type?: string
          id?: string
          is_active?: boolean
          is_draft?: boolean
          message?: string
          notification_type?: string
          priority?: string
          read_count?: number | null
          recipients_count?: number | null
          repeat_interval?: string | null
          scheduled_at?: string | null
          sent_at?: string | null
          target_type?: string
          target_value?: string | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          admin_notes: string | null
          avatar_url: string | null
          created_at: string
          device_info: string | null
          email: string | null
          files_processed: number | null
          full_name: string | null
          id: string
          ip_address: string | null
          last_activity: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          avatar_url?: string | null
          created_at?: string
          device_info?: string | null
          email?: string | null
          files_processed?: number | null
          full_name?: string | null
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          avatar_url?: string | null
          created_at?: string
          device_info?: string | null
          email?: string | null
          files_processed?: number | null
          full_name?: string | null
          id?: string
          ip_address?: string | null
          last_activity?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          license_id: string | null
          payment_method: string | null
          reference: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          license_id?: string | null
          payment_method?: string | null
          reference?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          license_id?: string | null
          payment_method?: string | null
          reference?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          clicked_at: string | null
          clicked_button: boolean
          created_at: string
          dismissed_at: string | null
          id: string
          is_read: boolean
          notification_id: string
          read_at: string | null
          user_id: string
        }
        Insert: {
          clicked_at?: string | null
          clicked_button?: boolean
          created_at?: string
          dismissed_at?: string | null
          id?: string
          is_read?: boolean
          notification_id: string
          read_at?: string | null
          user_id: string
        }
        Update: {
          clicked_at?: string | null
          clicked_button?: boolean
          created_at?: string
          dismissed_at?: string | null
          id?: string
          is_read?: boolean
          notification_id?: string
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
