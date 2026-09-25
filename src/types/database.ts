/**
 * Hand-written to mirror supabase/migrations/*.sql exactly. Regenerate with
 * `supabase gen types typescript` once a live project exists, and diff
 * against this file before replacing it.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AvailabilityStatus = "in_stock" | "out_of_stock" | "on_order";
export type UserRole = "admin" | "viewer";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          full_name?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      product_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_categories"]["Insert"]>;
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          slug: string;
          short_description: string | null;
          description: string | null;
          price: number;
          promo_price: number | null;
          availability: AvailabilityStatus;
          is_featured: boolean;
          is_published: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          price: number;
          promo_price?: number | null;
          availability?: AvailabilityStatus;
          is_featured?: boolean;
          is_published?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          path: string;
          alt: string;
          width: number;
          height: number;
          blur_data_url: string | null;
          is_main: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          path: string;
          alt?: string;
          width: number;
          height: number;
          blur_data_url?: string | null;
          is_main?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["product_images"]["Insert"]>;
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string | null;
          description: string | null;
          is_featured: boolean;
          is_published: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
        Relationships: [];
      };
      service_images: {
        Row: {
          id: string;
          service_id: string;
          path: string;
          alt: string;
          width: number;
          height: number;
          blur_data_url: string | null;
          is_cover: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          path: string;
          alt?: string;
          width: number;
          height: number;
          blur_data_url?: string | null;
          is_cover?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["service_images"]["Insert"]>;
        Relationships: [];
      };
      offers: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_path: string | null;
          image_alt: string | null;
          image_width: number | null;
          image_height: number | null;
          original_price: number | null;
          promo_price: number | null;
          starts_at: string | null;
          ends_at: string | null;
          is_active: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_path?: string | null;
          image_alt?: string | null;
          image_width?: number | null;
          image_height?: number | null;
          original_price?: number | null;
          promo_price?: number | null;
          starts_at?: string | null;
          ends_at?: string | null;
          is_active?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["offers"]["Insert"]>;
        Relationships: [];
      };
      gallery_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          position: number;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          position?: number;
        };
        Update: Partial<Database["public"]["Tables"]["gallery_categories"]["Insert"]>;
        Relationships: [];
      };
      gallery_items: {
        Row: {
          id: string;
          category_id: string | null;
          path: string;
          alt: string;
          caption: string | null;
          width: number;
          height: number;
          blur_data_url: string | null;
          is_published: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          path: string;
          alt?: string;
          caption?: string | null;
          width: number;
          height: number;
          blur_data_url?: string | null;
          is_published?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["gallery_items"]["Insert"]>;
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          category: string;
          event_date: string;
          end_date: string | null;
          location: string;
          description: string | null;
          is_published: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          category: string;
          event_date: string;
          end_date?: string | null;
          location: string;
          description?: string | null;
          is_published?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
        Relationships: [];
      };
      event_images: {
        Row: {
          id: string;
          event_id: string;
          path: string;
          alt: string;
          width: number;
          height: number;
          blur_data_url: string | null;
          is_cover: boolean;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          path: string;
          alt?: string;
          width: number;
          height: number;
          blur_data_url?: string | null;
          is_cover?: boolean;
          position?: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["event_images"]["Insert"]>;
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          phone: string;
          whatsapp: string;
          email: string | null;
          address: string;
          city: string;
          opening_hours: Json;
          socials: Json;
          hero_title: string;
          hero_subtitle: string;
          hero_images: Json;
          map_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          phone?: string;
          whatsapp?: string;
          email?: string | null;
          address?: string;
          city?: string;
          opening_hours?: Json;
          socials?: Json;
          hero_title?: string;
          hero_subtitle?: string;
          hero_images?: Json;
          map_url?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      availability_status: AvailabilityStatus;
      user_role: UserRole;
    };
  };
}

export type TableRow<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TableInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TableUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
