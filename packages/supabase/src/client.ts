import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";

export interface SupabaseBrowserClientOptions {
  supabaseUrl?: string;
  supabaseKey?: string;
  options?: SupabaseClientOptions<any>;
}

function resolveSupabaseUrl(override?: string): string {
  const url =
    override ??
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.EXPO_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL;

  if (!url) {
    throw new Error(
      "Supabase URL is missing. Define NEXT_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_URL, or SUPABASE_URL."
    );
  }

  return url;
}

function resolveAnonKey(override?: string): string {
  const key =
    override ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error(
      "Supabase anon key is missing. Define NEXT_PUBLIC_SUPABASE_ANON_KEY, EXPO_PUBLIC_SUPABASE_ANON_KEY, or SUPABASE_ANON_KEY."
    );
  }

  return key;
}

export function createSupabaseBrowserClient<Database = Record<string, unknown>>(
  options: SupabaseBrowserClientOptions = {}
) {
  const url = resolveSupabaseUrl(options.supabaseUrl);
  const key = resolveAnonKey(options.supabaseKey);
  const hasWindow =
    typeof globalThis !== "undefined" &&
    typeof (globalThis as { window?: unknown }).window !== "undefined";

  const clientOptions: SupabaseClientOptions<any> = {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: hasWindow,
    },
    ...(options.options ?? {}),
  };

  return createClient<Database>(url, key, clientOptions);
}
