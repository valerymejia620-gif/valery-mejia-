import React from 'react';
import { Eye, MessageCircle, Sparkles } from 'lucide-react';
import { PERFUMES_DATA, WHATSAPP_CONFIG, Perfume } from '../data/perfumes';
import { useStore } from '../context/StoreContext';
import { EditablePrice } from './EditablePrice';

export const NuevaColeccion: React.FC = () => {
  const { openPerfumeModal, logConsultation } = useStore();

  // Filter exactly Berry On Top, Donna Born in Roma, Sauvage
  const newCollectionPerfumes = PERFUMES_DATA.filter((p) => p.isNewCollection);

  return (
    <section id="nueva-coleccion" className="py-24 bg-[#0d0d0d] relative overflow-hidden border-t border-[#d4af37]/15">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[20rem] bg-[#d4af37]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lanzamientos Destacados</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-4">
            Nueva Colección
          </h2>
          <div className="w-16 h-[1.5px] bg-[#d4af37] mx-auto mb-5" />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Tres creaciones icónicas que definen el pináculo de la elegancia olfativa moderna.
            Seleccionadas meticulosamente por su estela, magnetismo y exclusividad.
          </p>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {newCollectionPerfumes.map((perfume) => (
            <div
              key={perfume.id}
              className="group relative bg-neutral-950/80 border border-neutral-800/90 hover:border-[#d4af37]/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10"
            >
              {/* Product Image Frame */}
              <div
                className="relative aspect-[4/3] sm:aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer"
                onClick={() => openPerfumeModal(perfume)}
              >
                <img
                  src={perfume.image}
                  alt={`Perfume de lujo ${perfume.name}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge: Category & Status */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 bg-black/80 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/40 rounded-sm">
                    {perfume.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-[#d4af37] text-neutral-950 rounded-sm">
                    Nueva Colección
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-gradient-to-b from-neutral-950 to-[#0a0a0a]">
                <div>
                  {/* Category & Olfactory Family */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
                    <span className="text-[#c5a059] font-medium">{perfume.concentration}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{perfume.olfactoryFamily}</span>
                  </div>

                  {/* Perfume Name */}
                  <h3
                    onClick={() => openPerfumeModal(perfume)}
                    className="font-serif text-xl sm:text-2xl text-white font-normal hover:text-[#d4af37] transition-colors cursor-pointer mb-2"
                  >
                    {perfume.name}
                  </h3>

                  {/* Brief subtitle / tagline */}
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {perfume.subtitle}
                  </p>

                  {/* Key Notes Snippet */}
                  <div className="mb-4 pt-3 border-t border-neutral-800/80">
                    <p className="text-[11px] text-neutral-400 tracking-wider uppercase mb-1">
                      Notas Principales:
                    </p>
                    <p className="text-xs text-neutral-300">
                      {perfume.topNotes.slice(0, 2).join(' · ')} & {perfume.baseNotes[0]}
                    </p>
                  </div>
                </div>

                {/* Footer of Card: Editable Price and Action Buttons */}
                <div className="pt-4 border-t border-neutral-800/80 mt-auto">
                  {/* Price Row (Editable) */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">
                      Precio:
                    </span>
                    <EditablePrice perfumeId={perfume.id} size="md" theme="dark" />
                  </div>

                  {/* Buttons: Ver más & WhatsApp */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Requested Button: "Ver más" */}
                    <button
                      onClick={() => openPerfumeModal(perfume)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-[#d4af37]/50 hover:border-[#d4af37] bg-neutral-900 hover:bg-[#d4af37]/15 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-sm cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Ver más</span>
                    </button>

                    {/* Direct WhatsApp button */}
                    <a
                      href={WHATSAPP_CONFIG.getWhatsAppUrl(WHATSAPP_CONFIG.getProductMessage(perfume.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => logConsultation(perfume.name, 'nueva_coleccion')}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm"
                      title={`Consultar por WhatsApp sobre ${perfume.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Consultar</span>
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
