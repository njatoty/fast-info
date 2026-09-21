import { createBrowserClient } from "@supabase/ssr";

import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

/**
 * Browser-side Supabase client. Only call this where `isSupabaseConfigured`
 * is true — callers are responsible for that check since this throws
 * otherwise (createBrowserClient requires both values).
 */
export function createClient() {
  return createBrowserClient<Database>(supabaseUrl!, supabaseAnonKey!);
}
