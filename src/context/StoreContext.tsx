import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PERFUMES_DATA, Perfume } from '../data/perfumes';
import {
  fetchRemotePrices,
  syncPriceToRemote,
  syncAllPricesToRemote,
  testSupabaseConnection,
  recordInquiryToRemote,
  SupabaseInquiryRecord
} from '../lib/supabase';

export interface StoreInfo {
  instagram: string;
  hours: string;
  location: string;
  phone: string;
}

interface StoreContextType {
  prices: Record<string, string>;
  updatePrice: (id: string, newPrice: string) => void;
  resetPrices: () => void;
  storeInfo: StoreInfo;
  updateStoreInfo: (field: keyof StoreInfo, value: string) => void;
  selectedPerfume: Perfume | null;
  openPerfumeModal: (perfume: Perfume) => void;
  closePerfumeModal: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isPriceEditorOpen: boolean;
  setIsPriceEditorOpen: (open: boolean) => void;
  editingPerfumeId: string | null;
  setEditingPerfumeId: (id: string | null) => void;
  // Supabase features
  supabaseConnected: boolean;
  supabaseSyncStatus: 'synced' | 'syncing' | 'idle' | 'error';
  supabaseMessage: string;
  syncWithSupabase: () => Promise<void>;
  logConsultation: (
    fragranceName: string,
    source: 'catalogo' | 'nueva_coleccion' | 'guia' | 'modal' | 'general',
    preference?: string,
    occasion?: string
  ) => void;
}

const DEFAULT_STORE_INFO: StoreInfo = {
  instagram: '@premiumquality_luxury',
  hours: 'Lunes a Sábado: 9:00 AM – 7:00 PM',
  location: 'Envíos asegurados a toda Colombia & Asesoría personalizada',
  phone: '324 299 6643'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_PRICES_KEY = 'pq_perfume_prices_v1';
const LOCAL_STORAGE_INFO_KEY = 'pq_store_info_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize prices with local cache fallback
  const [prices, setPrices] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRICES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    const initial: Record<string, string> = {};
    PERFUMES_DATA.forEach((p) => {
      initial[p.id] = p.defaultPrice;
    });
    return initial;
  });

  // Initialize store info
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_INFO_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_STORE_INFO;
  });

  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPriceEditorOpen, setIsPriceEditorOpen] = useState(false);
  const [editingPerfumeId, setEditingPerfumeId] = useState<string | null>(null);

  // Supabase state
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [supabaseSyncStatus, setSupabaseSyncStatus] = useState<'synced' | 'syncing' | 'idle' | 'error'>('idle');
  const [supabaseMessage, setSupabaseMessage] = useState('Conectando a Supabase...');

  // Initialize Supabase check and initial remote sync
  useEffect(() => {
    let isMounted = true;

    async function initSupabase() {
      setSupabaseSyncStatus('syncing');
      try {
        const ping = await testSupabaseConnection();
        if (isMounted) {
          setSupabaseConnected(ping.success);
          setSupabaseMessage(ping.message);
        }

        // Try to fetch prices stored on Supabase
        const remotePrices = await fetchRemotePrices();
        if (isMounted && remotePrices && Object.keys(remotePrices).length > 0) {
          setPrices((prev) => ({
            ...prev,
            ...remotePrices
          }));
          setSupabaseSyncStatus('synced');
        } else {
          if (isMounted) setSupabaseSyncStatus('idle');
        }
      } catch (err: any) {
        if (isMounted) {
          setSupabaseConnected(false);
          setSupabaseSyncStatus('error');
          setSupabaseMessage(err?.message || 'Error al conectar con Supabase');
        }
      }
    }

    initSupabase();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRICES_KEY, JSON.stringify(prices));
    } catch (e) {
      console.warn('Unable to persist prices', e);
    }
  }, [prices]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_INFO_KEY, JSON.stringify(storeInfo));
    } catch (e) {
      console.warn('Unable to persist store info', e);
    }
  }, [storeInfo]);

  // Update a single price and sync to Supabase in background
  const updatePrice = (id: string, newPrice: string) => {
    const formatted = newPrice.trim() || 'Consultar precio';
    setPrices((prev) => ({
      ...prev,
      [id]: formatted
    }));

    const perfumeMeta = PERFUMES_DATA.find((p) => p.id === id);

    // Non-blocking sync to Supabase
    syncPriceToRemote(id, formatted, perfumeMeta?.name, perfumeMeta?.category).then((success) => {
      if (success) {
        setSupabaseSyncStatus('synced');
      }
    });
  };

  // Sync entire current price list to Supabase
  const syncWithSupabase = useCallback(async () => {
    setSupabaseSyncStatus('syncing');
    try {
      const meta = PERFUMES_DATA.map((p) => ({ id: p.id, name: p.name, category: p.category }));
      const ok = await syncAllPricesToRemote(prices, meta);
      if (ok) {
        setSupabaseSyncStatus('synced');
        setSupabaseMessage('Precios sincronizados con Supabase');
      } else {
        setSupabaseSyncStatus('idle');
        setSupabaseMessage('Guardado listo.');
      }
    } catch {
      setSupabaseSyncStatus('error');
    }
  }, [prices]);

  // Record a customer inquiry into Supabase
  const logConsultation = useCallback(
    (
      fragranceName: string,
      source: 'catalogo' | 'nueva_coleccion' | 'guia' | 'modal' | 'general',
      preference?: string,
      occasion?: string
    ) => {
      recordInquiryToRemote({
        fragrance_name: fragranceName,
        source,
        preference,
        occasion
      });
    },
    []
  );

  const resetPrices = () => {
    const initial: Record<string, string> = {};
    PERFUMES_DATA.forEach((p) => {
      initial[p.id] = p.defaultPrice;
    });
    setPrices(initial);
  };

  const updateStoreInfo = (field: keyof StoreInfo, value: string) => {
    setStoreInfo((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const openPerfumeModal = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
  };

  const closePerfumeModal = () => {
    setSelectedPerfume(null);
  };

  return (
    <StoreContext.Provider
      value={{
        prices,
        updatePrice,
        resetPrices,
        storeInfo,
        updateStoreInfo,
        selectedPerfume,
        openPerfumeModal,
        closePerfumeModal,
        isSearchOpen,
        setIsSearchOpen,
        isPriceEditorOpen,
        setIsPriceEditorOpen,
        editingPerfumeId,
        setEditingPerfumeId,
        supabaseConnected,
        supabaseSyncStatus,
        supabaseMessage,
        syncWithSupabase,
        logConsultation
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
