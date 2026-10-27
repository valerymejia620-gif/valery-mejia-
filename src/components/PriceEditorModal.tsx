import React, { useState } from 'react';
import {
  X,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Database,
  RefreshCw,
  Copy,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PERFUMES_DATA } from '../data/perfumes';

export const PriceEditorModal: React.FC = () => {
  const {
    isPriceEditorOpen,
    setIsPriceEditorOpen,
    prices,
    updatePrice,
    resetPrices,
    supabaseConnected,
    supabaseSyncStatus,
    syncWithSupabase,
    supabaseMessage
  } = useStore();

  const [localPrices, setLocalPrices] = useState<Record<string, string>>(prices);
  const [showSqlHelp, setShowSqlHelp] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isPriceEditorOpen) return null;

  const handlePriceChange = (id: string, val: string) => {
    setLocalPrices((prev) => ({
      ...prev,
      [id]: val
    }));
  };

  const handleSaveAll = async () => {
    setIsSyncing(true);
    Object.entries(localPrices).forEach(([id, val]) => {
      updatePrice(id, val);
    });
    await syncWithSupabase();
    setIsSyncing(false);
    setIsPriceEditorOpen(false);
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    await syncWithSupabase();
    setIsSyncing(false);
  };

  const handleResetAll = () => {
    resetPrices();
    const initial: Record<string, string> = {};
    PERFUMES_DATA.forEach((p) => {
      initial[p.id] = p.defaultPrice;
    });
    setLocalPrices(initial);
  };

  const sqlSchema = `-- ==========================================================
-- SCRIPT DE CREACIÓN DE TABLAS EN SUPABASE
-- PROYECTO: Premium quality (ID: ldtjhcrlrztiittneici)
-- ==========================================================

-- 1. Tabla de precios del catálogo
CREATE TABLE IF NOT EXISTS public.perfume_prices (
  perfume_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT 'Consultar precio',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabla de consultas por WhatsApp y Guía
CREATE TABLE IF NOT EXISTS public.perfume_inquiries (
  id BIGSERIAL PRIMARY KEY,
  fragrance_name TEXT NOT NULL,
  source TEXT NOT NULL,
  preference TEXT,
  occasion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Habilitar permisos públicos (Row Level Security)
ALTER TABLE public.perfume_prices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir lectura publica perfume_prices" ON public.perfume_prices;
CREATE POLICY "Permitir lectura publica perfume_prices"
  ON public.perfume_prices FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir actualizacion publica perfume_prices" ON public.perfume_prices;
CREATE POLICY "Permitir actualizacion publica perfume_prices"
  ON public.perfume_prices FOR ALL
  USING (true);

ALTER TABLE public.perfume_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir insercion publica perfume_inquiries" ON public.perfume_inquiries;
CREATE POLICY "Permitir insercion publica perfume_inquiries"
  ON public.perfume_inquiries FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir lectura publica perfume_inquiries" ON public.perfume_inquiries;
CREATE POLICY "Permitir lectura publica perfume_inquiries"
  ON public.perfume_inquiries FOR SELECT
  USING (true);

-- 4. Registrar los 8 perfumes iniciales
INSERT INTO public.perfume_prices (perfume_id, name, category, price)
VALUES
  ('berry-on-top', 'Berry On Top', 'Unisex', 'Consultar precio'),
  ('donna-born-in-roma', 'Donna Born in Roma', 'Femenino', 'Consultar precio'),
  ('sauvage', 'Sauvage', 'Masculino', 'Consultar precio'),
  ('d-lina-exclusive', 'D. Lina Exclusive', 'Femenino', 'Consultar precio'),
  ('good-girl', 'Good Girl', 'Femenino', 'Consultar precio'),
  ('eros', 'Eros', 'Masculino', 'Consultar precio'),
  ('invictus', 'Invictus', 'Masculino', 'Consultar precio'),
  ('acqua-di-gio', 'Acqua di Giò', 'Masculino', 'Consultar precio')
ON CONFLICT (perfume_id) DO NOTHING;
`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const supabaseSqlEditorUrl = 'https://supabase.com/dashboard/project/ldtjhcrlrztiittneici/sql/new';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsPriceEditorOpen(false)}
    >
      <div
        className="w-full max-w-3xl bg-neutral-950 border border-[#d4af37]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-serif text-lg text-white font-normal">
                Gestor de Precios & Base de Datos Supabase
              </h3>
              <p className="text-xs text-neutral-400">
                Personaliza los precios. Se sincronizan en vivo con tu proyecto Supabase.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPriceEditorOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Supabase Status Banner */}
        <div className="px-6 py-3 bg-neutral-900/90 border-b border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="flex items-center gap-1.5 text-neutral-200">
              <Database className="w-4 h-4 text-[#3ECF8E]" />
              <span className="font-semibold text-[#3ECF8E]">Supabase:</span>
              <span className="text-neutral-300">Premium quality</span>
              <span className="font-mono text-neutral-400 text-[11px]">(ldtjhcrlrztiittneici)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={supabaseSqlEditorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#3ECF8E]/15 hover:bg-[#3ECF8E]/25 text-[#3ECF8E] border border-[#3ECF8E]/40 text-xs font-medium transition-colors"
              title="Abrir el Editor SQL en Supabase en una pestaña nueva"
            >
              <span>Abrir SQL Editor</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
              title="Probar y forzar sincronización ahora"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-[#d4af37]' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar'}</span>
            </button>

            <button
              onClick={() => setShowSqlHelp(!showSqlHelp)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-[#d4af37] hover:underline"
            >
              <span>{showSqlHelp ? 'Ocultar SQL' : 'Ver SQL'}</span>
              {showSqlHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Setup Banner for New Supabase Projects */}
        {showSqlHelp && (
          <div className="px-6 py-3.5 bg-neutral-900/95 border-b border-neutral-800 text-xs animate-in slide-in-from-top-2">
            <div className="p-3 bg-neutral-950/80 border border-[#3ECF8E]/30 rounded-sm mb-3">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#3ECF8E]" />
                  <span className="font-semibold text-white text-xs">
                    ¿Proyecto nuevo en Supabase? Crea las tablas en 30 segundos:
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copySqlToClipboard}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#d4af37] text-neutral-950 hover:bg-[#c5a059] font-medium text-xs shadow transition-colors"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? '¡Copiado!' : '1. Copiar Script SQL'}</span>
                  </button>

                  <a
                    href={supabaseSqlEditorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs border border-neutral-700 transition-colors"
                  >
                    <span>2. Pegar en Supabase</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400">
                Pega este script en tu <strong>SQL Editor</strong> de Supabase y presiona <strong>RUN</strong>. Creará las tablas <code className="text-emerald-400">perfume_prices</code> y <code className="text-emerald-400">perfume_inquiries</code> con los 8 perfumes precargados.
              </p>
            </div>

            <pre className="p-3 bg-black/90 text-emerald-400 font-mono text-[10px] rounded overflow-x-auto max-h-36 border border-neutral-800 leading-relaxed">
              {sqlSchema}
            </pre>
          </div>
        )}

        {/* Perfume List with Inputs */}
        <div className="overflow-y-auto p-6 space-y-4 flex-grow">
          <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded text-xs text-neutral-300">
            <span className="text-[#d4af37] font-semibold">Consejo: </span>
            Escribe el valor real en tu moneda, por ejemplo <span className="font-mono text-white">$ 280.000 COP</span>, <span className="font-mono text-white">$ 350.000</span>, o déjalo en <span className="font-mono text-white">Consultar precio</span>.
          </div>

          <div className="divide-y divide-neutral-900">
            {PERFUMES_DATA.map((perfume) => (
              <div
                key={perfume.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-12 h-12 rounded object-cover border border-neutral-800"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-medium text-white">{perfume.name}</h4>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                      {perfume.category} · {perfume.concentration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={localPrices[perfume.id] ?? prices[perfume.id] ?? 'Consultar precio'}
                      onChange={(e) => handlePriceChange(perfume.id, e.target.value)}
                      placeholder="Consultar precio"
                      className="w-48 bg-neutral-900 border border-neutral-700 focus:border-[#d4af37] rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <button
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer a &quot;Consultar precio&quot;</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPriceEditorOpen(false)}
              className="px-4 py-2 border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={handleSaveAll}
              disabled={isSyncing}
              className="px-5 py-2 bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-sm hover:brightness-110 transition-all flex items-center gap-1.5 shadow"
            >
              <Check className="w-4 h-4" />
              <span>{isSyncing ? 'Guardando en Supabase...' : 'Guardar y Sincronizar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
