import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";

export interface SupabaseServerClientOptions {
  supabaseUrl?: string;
  serviceRoleKey?: string;
  options?: SupabaseClientOptions<any>;
}

function resolveServiceRoleKey(override?: string): string {
  const key = override ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) {
    throw new Error("Supabase service role key is missing. Define SUPABASE_SERVICE_ROLE_KEY.");
  }
  return key;
}

function resolveSupabaseUrl(override?: string): string {
  const url = override ?? process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Supabase URL is missing. Define SUPABASE_URL.");
  }
  return url;
}

export function createSupabaseServerClient<Database = Record<string, unknown>>(
  options: SupabaseServerClientOptions = {}
) {
  const url = resolveSupabaseUrl(options.supabaseUrl);
  const key = resolveServiceRoleKey(options.serviceRoleKey);

  const clientOptions: SupabaseClientOptions<any> = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    ...(options.options ?? {}),
  };

  return createClient<Database>(url, key, clientOptions);
}
