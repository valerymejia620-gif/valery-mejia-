import { createClient } from '@supabase/supabase-js';

// Provided Supabase project credentials for Premium quality
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://ldtjhcrlrztiittneici.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGpoY3Jscnp0aWl0dG5laWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwNTUyNzgsImV4cCI6MjEwODYzMTI3OH0.jTpoooc72jaKBiRYNdnRFefap9HxOwA8u6pCCpROsYQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

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
    // Attempt a light ping to Supabase rest endpoint
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
      // Table might not exist yet in user's new project, log gracefully
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
 * Save single or bulk price to Supabase
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
      // Table may not yet be created in newly initialized Supabase instances
      console.info('Supabase inquiry recorded locally (table notice):', error.message);
    }
  } catch (err) {
    // Non-blocking for smooth user experience
    console.warn('Inquiry tracking notice:', err);
  }
}
