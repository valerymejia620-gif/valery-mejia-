import React, { useState } from 'react';
import { Sparkles, MessageCircle, Info, Filter } from 'lucide-react';
import { PERFUMES_DATA, WHATSAPP_CONFIG, Perfume } from '../data/perfumes';
import { useStore } from '../context/StoreContext';
import { EditablePrice } from './EditablePrice';

type FilterType = 'Todos' | 'Femenino' | 'Masculino' | 'Unisex';

export const Catalogo: React.FC = () => {
  const { openPerfumeModal, logConsultation } = useStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');

  const filteredPerfumes = PERFUMES_DATA.filter((perfume) => {
    if (activeFilter === 'Todos') return true;
    return perfume.category === activeFilter;
  });

  const filterOptions: { label: string; value: FilterType; count: number }[] = [
    { label: 'Todos', value: 'Todos', count: PERFUMES_DATA.length },
    {
      label: 'Femeninos',
      value: 'Femenino',
      count: PERFUMES_DATA.filter((p) => p.category === 'Femenino').length
    },
    {
      label: 'Masculinos',
      value: 'Masculino',
      count: PERFUMES_DATA.filter((p) => p.category === 'Masculino').length
    },
    {
      label: 'Unisex',
      value: 'Unisex',
      count: PERFUMES_DATA.filter((p) => p.category === 'Unisex').length
    }
  ];

  return (
    <section
      id="catalogo"
      className="py-24 bg-[#f9f7f2] text-neutral-900 relative border-y border-[#dfd6c5] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 mb-2 text-xs uppercase tracking-[0.25em] text-[#997327] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curaduría de Alta Gama</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal tracking-tight mb-4">
            Catálogo de Fragancias
          </h2>
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mb-5" />
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Explora las 8 obras maestras de nuestra colección. Fragancias de alta concentración
            formuladas para distinguir tu presencia con una elegancia impecable.
          </p>

          {/* Interactive Filter Tabs (Button elements per Zero-Pill Constitution) */}
          <div className="mt-9 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#ebe5d8] rounded-sm border border-[#dfd6c5]">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-neutral-950 text-[#d4af37] shadow-sm'
                      : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
                  }`}
                >
                  {opt.label}{' '}
                  <span className={`text-[10px] ml-1 ${isActive ? 'text-[#c5a059]' : 'text-neutral-500'}`}>
                    ({opt.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Perfumes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredPerfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="group bg-white rounded-sm border border-[#e3dac9] hover:border-[#c5a059] flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5"
            >
              {/* Product Visual */}
              <div
                className="relative aspect-[4/3] bg-neutral-100 overflow-hidden cursor-pointer"
                onClick={() => openPerfumeModal(perfume)}
              >
                <img
                  src={perfume.image}
                  alt={`Perfume ${perfume.name}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-black/80 text-white rounded-sm">
                    {perfume.category}
                  </span>
                </div>

                {/* Volume badge */}
                <div className="absolute bottom-2.5 right-3 pointer-events-none">
                  <span className="text-[10px] uppercase font-mono text-white/90 drop-shadow">
                    {perfume.volume.split('/')[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  {/* Subtle family kicker */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8c6b24] uppercase tracking-wider font-semibold mb-1">
                    <span>{perfume.concentration}</span>
                  </div>

                  {/* Perfume Name */}
                  <h3
                    onClick={() => openPerfumeModal(perfume)}
                    className="font-serif text-lg sm:text-xl font-normal text-neutral-900 group-hover:text-[#997327] transition-colors cursor-pointer mb-1 leading-tight"
                  >
                    {perfume.name}
                  </h3>

                  {/* Subtitle / Olfactory Accord */}
                  <p className="text-xs text-neutral-500 line-clamp-1 mb-3">
                    {perfume.olfactoryFamily}
                  </p>

                  {/* Key Notes Snippet */}
                  <div className="text-[11px] text-neutral-600 mb-4 pb-3 border-b border-neutral-200">
                    <span className="text-neutral-400 font-medium">Notas:</span>{' '}
                    <span>{perfume.topNotes[0]}, {perfume.heartNotes[0]} & {perfume.baseNotes[0]}</span>
                  </div>
                </div>

                {/* Price & Action Module */}
                <div className="mt-auto">
                  {/* Price display with inline edit */}
                  <div className="flex items-center justify-between mb-3.5 pt-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                      Precio:
                    </span>
                    <EditablePrice perfumeId={perfume.id} size="sm" theme="light" />
                  </div>

                  {/* Buttons: Consultar detalles & WhatsApp */}
                  <div className="flex flex-col gap-2">
                    {/* Requested Button: "Consultar detalles" */}
                    <button
                      onClick={() => openPerfumeModal(perfume)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 border border-neutral-900 hover:bg-neutral-950 text-neutral-900 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Consultar detalles</span>
                    </button>

                    {/* Direct WhatsApp button with fragrance name in message */}
                    <a
                      href={WHATSAPP_CONFIG.getWhatsAppUrl(WHATSAPP_CONFIG.getProductMessage(perfume.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => logConsultation(perfume.name, 'catalogo')}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
                      title={`Consultar por WhatsApp sobre ${perfume.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pedir por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
