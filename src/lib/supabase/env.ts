export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * False whenever Supabase credentials are absent — which is the default in
 * this environment, since no live project has been wired up yet. Every
 * `lib/data/*` reader falls back to `lib/demo/fixtures` in that case, so the
 * site stays fully runnable offline.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
