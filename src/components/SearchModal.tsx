import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MessageCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PERFUMES_DATA, WHATSAPP_CONFIG, Perfume } from '../data/perfumes';
import { EditablePrice } from './EditablePrice';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openPerfumeModal } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = PERFUMES_DATA.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.olfactoryFamily.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.topNotes.some((n) => n.toLowerCase().includes(q)) ||
      p.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
      p.baseNotes.some((n) => n.toLowerCase().includes(q))
    );
  });

  const handleSelect = (perfume: Perfume) => {
    setIsSearchOpen(false);
    openPerfumeModal(perfume);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-neutral-950 border border-[#d4af37]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, nota (vainilla, jazmín, ambroxan) o categoría..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-white p-1"
              title="Borrar texto"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-neutral-400 hover:text-white text-xs uppercase tracking-wider ml-2"
          >
            Cerrar
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 divide-y divide-neutral-900">
          <div className="flex items-center justify-between px-2 pb-2 text-[11px] text-neutral-400 uppercase tracking-wider">
            <span>{results.length} Fragancias Disponibles</span>
            <span>Haz clic para ver detalles</span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-sm">
              No se encontraron fragancias para &quot;{query}&quot;. Intenta con términos como &quot;Sauvage&quot;, &quot;Rosa&quot; o &quot;Femenino&quot;.
            </div>
          ) : (
            results.map((perfume) => (
              <div
                key={perfume.id}
                onClick={() => handleSelect(perfume)}
                className="flex items-center gap-4 py-3 px-2 rounded hover:bg-neutral-900/80 transition-colors cursor-pointer group"
              >
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-14 h-14 rounded object-cover border border-neutral-800 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base text-white group-hover:text-[#d4af37] transition-colors truncate">
                      {perfume.name}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 bg-neutral-800 text-[#d4af37] rounded-sm shrink-0">
                      {perfume.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate">
                    {perfume.olfactoryFamily} · {perfume.concentration}
                  </p>
                </div>

                <div className="text-right shrink-0 flex items-center gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <EditablePrice perfumeId={perfume.id} size="sm" theme="dark" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-[#d4af37] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
