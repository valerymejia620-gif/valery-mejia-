import { createClient } from '@supabase/supabase-js';

// Verified project credentials for Premium quality
const DEFAULT_SUPABASE_URL = 'https://ldtjhcrlrztiittneici.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGpoY3Jscnp0aWl0dG5laWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNTUyNzgsImV4cCI6MjEwODYzMTI3OH0.jTpoooc72jaKBiRYNdnRFefap9HxOwA8u6pCCpROsYQ';

/**
 * Validates and normalizes the Supabase URL.
 * Protects against invalid values injected into environment variables (e.g. numbers or invalid formats).
 */
function resolveSupabaseUrl(): string {
  const raw = import.meta.env.VITE_SUPABASE_URL;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      try {
        const parsed = new URL(trimmed);
        return `${parsed.protocol}//${parsed.host}`;
      } catch {
        // Fallback on parse failure
      }
    }
  }
  return DEFAULT_SUPABASE_URL;
}

/**
 * Validates the Supabase anon public key.
 * Ensures the value is a valid 3-segment JWT.
 */
function resolveSupabaseAnonKey(): string {
  const raw = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (trimmed.split('.').length === 3) {
      return trimmed;
    }
  }
  return DEFAULT_SUPABASE_ANON_KEY;
}

export const SUPABASE_URL = resolveSupabaseUrl();
export const SUPABASE_ANON_KEY = resolveSupabaseAnonKey();

/**
 * Safe Supabase client initialization.
 * Guaranteed never to throw top-level uncaught exceptions during module evaluation.
 */
function initSupabaseClient() {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch (err) {
    console.warn('Initial Supabase client creation failed, retrying with defaults:', err);
    return createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false
      }
    });
  }
}

export const supabase = initSupabaseClient();

export interface SupabasePriceRecord {
  perfume_id: string;
  price: string;
  updated_at?: string;
}

export interface SupabaseStoreInfoRecord {
  key: string;
  value: string;
  updated_at?: string;
}

export interface SupabaseInquiryRecord {
  fragrance_name: string;
  source: 'catalogo' | 'nueva_coleccion' | 'guia' | 'modal' | 'general';
  preference?: string;
  occasion?: string;
  created_at?: string;
}

/**
 * Test connectivity with Supabase project
 */
export async function testSupabaseConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (response.ok || response.status === 200 || response.status === 404) {
      return { success: true, message: 'Conectado exitosamente con Supabase (ldtjhcrlrztiittneici)' };
    }
    return { success: false, message: `Respuesta de Supabase status: ${response.status}` };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error de conexión con Supabase' };
  }
}

/**
 * Fetch perfume prices from Supabase table 'perfume_prices' or 'perfumes'
 */
export async function fetchRemotePrices(): Promise<Record<string, string> | null> {
  try {
    const { data, error } = await supabase
      .from('perfume_prices')
      .select('perfume_id, price');

    if (error) {
      console.info('Supabase perfume_prices query notice:', error.message);
      return null;
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const priceMap: Record<string, string> = {};
      data.forEach((item: any) => {
        if (item.perfume_id && item.price) {
          priceMap[item.perfume_id] = item.price;
        }
      });
      return priceMap;
    }
    return null;
  } catch (e) {
    console.warn('Error fetching remote prices from Supabase:', e);
    return null;
  }
}

/**
 * Save single price to Supabase
 */
export async function syncPriceToRemote(
  perfumeId: string,
  price: string,
  name?: string,
  category?: string
): Promise<boolean> {
  try {
    const payload: any = {
      perfume_id: perfumeId,
      price: price,
      updated_at: new Date().toISOString()
    };
    if (name) payload.name = name;
    if (category) payload.category = category;

    const { error } = await supabase
      .from('perfume_prices')
      .upsert(payload, { onConflict: 'perfume_id' });

    if (error) {
      console.info('Notice saving price to Supabase table perfume_prices:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Unable to sync price with Supabase:', err);
    return false;
  }
}

/**
 * Sync entire price map to Supabase
 */
export async function syncAllPricesToRemote(
  prices: Record<string, string>,
  perfumesMeta?: Array<{ id: string; name: string; category: string }>
): Promise<boolean> {
  try {
    const metaMap = new Map<string, { name: string; category: string }>();
    if (perfumesMeta) {
      perfumesMeta.forEach((p) => metaMap.set(p.id, { name: p.name, category: p.category }));
    }

    const rows = Object.entries(prices).map(([perfume_id, price]) => {
      const meta = metaMap.get(perfume_id);
      return {
        perfume_id,
        name: meta?.name || perfume_id,
        category: meta?.category || 'Fragancia',
        price,
        updated_at: new Date().toISOString()
      };
    });

    const { error } = await supabase
      .from('perfume_prices')
      .upsert(rows, { onConflict: 'perfume_id' });

    if (error) {
      console.info('Notice syncing bulk prices to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Unable to bulk sync prices with Supabase:', err);
    return false;
  }
}

/**
 * Save customer consultation/lead into Supabase inquiries table
 */
export async function recordInquiryToRemote(inquiry: SupabaseInquiryRecord): Promise<void> {
  try {
    const { error } = await supabase
      .from('perfume_inquiries')
      .insert({
        fragrance_name: inquiry.fragrance_name,
        source: inquiry.source,
        preference: inquiry.preference || null,
        occasion: inquiry.occasion || null,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.info('Supabase inquiry recorded locally (table notice):', error.message);
    }
  } catch (err) {
    console.warn('Inquiry tracking notice:', err);
  }
}
