import React, { useState } from 'react';
import { Compass, Sparkles, MessageCircle, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { PERFUMES_DATA, WHATSAPP_CONFIG, Perfume } from '../data/perfumes';
import { useStore } from '../context/StoreContext';
import { EditablePrice } from './EditablePrice';

type PreferenceCategory = 'Femenino' | 'Masculino' | 'Unisex';

interface OccasionOption {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const OCCASIONS: OccasionOption[] = [
  {
    id: 'noche',
    title: 'Noche & Seducción',
    description: 'Fragancias intensas, misteriosas y con estela envolvente para citas o fiestas.',
    tags: ['Noche & Seducción', 'Citas Románticas', 'Citas y Conquista', 'Fiestas & Vida Nocturna', 'Clima Frío']
  },
  {
    id: 'elegancia',
    title: 'Elegancia & Eventos',
    description: 'Aromas distinguidos, nobles y sofisticados para bodas, galas y ocasiones formales.',
    tags: ['Elegancia & Eventos', 'Galas & Bodas', 'Momentos Inolvidables', 'Firma Personal']
  },
  {
    id: 'diario',
    title: 'Frescura & Uso Diario',
    description: 'Notas radiantes, limpias y versátiles ideales para la oficina, sol y actividades cotidianas.',
    tags: ['Uso Diario & Oficina', 'Uso Diario & Deportivo', 'Días Soleados & Playa', 'Uso Cotidiano']
  },
  {
    id: 'gourmand',
    title: 'Dulce & Frutal Gourmet',
    description: 'Esencias adictivas con acordes de vainilla, frutas silvestres, cacao o almendras.',
    tags: ['Frutal Ambarado Gourmand', 'Oriental Floral Gourmand', 'Dulce']
  }
];

export const Guia: React.FC = () => {
  const { openPerfumeModal, logConsultation } = useStore();
  const [preference, setPreference] = useState<PreferenceCategory>('Femenino');
  const [selectedOccasionId, setSelectedOccasionId] = useState<string>('noche');

  // Find the selected occasion
  const selectedOccasion = OCCASIONS.find((o) => o.id === selectedOccasionId) || OCCASIONS[0];

  // Match perfumes according to preference & occasion
  const matchingPerfumes = PERFUMES_DATA.filter((p) => {
    // Category match
    const categoryMatches = preference === 'Unisex' ? true : p.category === preference;

    // Check occasion / family match
    const hasOccasionMatch = p.recommendedOccasion.some((occ) =>
      selectedOccasion.tags.some((tag) => occ.toLowerCase().includes(tag.toLowerCase()))
    );

    const hasFamilyMatch = selectedOccasion.tags.some(
      (tag) =>
        p.olfactoryFamily.toLowerCase().includes(tag.toLowerCase()) ||
        p.description.toLowerCase().includes(tag.toLowerCase())
    );

    return categoryMatches && (hasOccasionMatch || hasFamilyMatch);
  });

  // Fallback if matching array is empty
  const recommendations: Perfume[] =
    matchingPerfumes.length > 0
      ? matchingPerfumes
      : PERFUMES_DATA.filter((p) => (preference === 'Unisex' ? true : p.category === preference)).slice(0, 2);

  return (
    <section id="guia" className="py-24 bg-[#080808] text-white relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#d4af37]/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#c5a059]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-2 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
            <Compass className="w-3.5 h-3.5" />
            <span>Asesor Virtual Interactivo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mb-4">
            Guía: Encuentra Tu Fragancia Ideal
          </h2>
          <div className="w-16 h-[1.5px] bg-[#d4af37] mx-auto mb-5" />
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Personaliza tu búsqueda en dos sencillos pasos. Descubre la fragancia perfecta según tu
            estilo y la ocasión en la que deseas cautivar.
          </p>
        </div>

        {/* Interactive Selector Card */}
        <div className="bg-neutral-950 border border-[#d4af37]/30 rounded-sm p-6 sm:p-10 mb-14 shadow-2xl">
          {/* Step 1: Gender / Preference */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xs text-[#d4af37] border border-[#d4af37]/50 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-neutral-100 font-normal">
                ¿Para quién es la fragancia?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Femenino', 'Masculino', 'Unisex'] as PreferenceCategory[]).map((cat) => {
                const isSelected = preference === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setPreference(cat)}
                    className={`py-3.5 px-5 text-sm uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c5a059] text-neutral-950 border-[#d4af37] shadow-lg shadow-[#d4af37]/15'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-[#d4af37]/40 hover:text-white'
                    }`}
                  >
                    <span>{cat === 'Unisex' ? 'Unisex (Sin género)' : `Perfumes ${cat}s`}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-neutral-950" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Occasion / Style */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-xs text-[#d4af37] border border-[#d4af37]/50 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-neutral-100 font-normal">
                ¿Qué ocasión o estilo buscas proyectar?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {OCCASIONS.map((occ) => {
                const isSelected = selectedOccasionId === occ.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasionId(occ.id)}
                    className={`p-4 text-left rounded-sm transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-neutral-900 border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                        : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`font-serif text-base font-normal ${
                            isSelected ? 'text-[#d4af37]' : 'text-neutral-200'
                          }`}
                        >
                          {occ.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {occ.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Recommendations Results */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-800">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-1">
                Recomendaciones Seleccionadas
              </p>
              <h3 className="font-serif text-2xl text-white font-normal">
                Sugerencias para {preference} · {selectedOccasion.title}
              </h3>
            </div>
            <p className="text-xs text-neutral-400">
              {recommendations.length} {recommendations.length === 1 ? 'fragancia encontrada' : 'fragancias encontradas'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((perfume) => {
              const whatsappMessage = WHATSAPP_CONFIG.getGuideMessage(
                perfume.name,
                preference,
                selectedOccasion.title
              );

              return (
                <div
                  key={perfume.id}
                  className="bg-neutral-950 border border-neutral-800 hover:border-[#d4af37]/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl"
                >
                  <div
                    className="relative aspect-[4/3] bg-neutral-900 overflow-hidden cursor-pointer group"
                    onClick={() => openPerfumeModal(perfume)}
                  >
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#d4af37] text-neutral-950 rounded-sm">
                        Recomendado para ti
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-medium text-[#d4af37]">{perfume.concentration}</span>
                      <span className="text-neutral-400">{perfume.volume}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h4
                        onClick={() => openPerfumeModal(perfume)}
                        className="font-serif text-2xl text-white hover:text-[#d4af37] transition-colors cursor-pointer mb-1"
                      >
                        {perfume.name}
                      </h4>
                      <p className="text-xs text-[#c5a059] uppercase tracking-wider mb-3">
                        {perfume.olfactoryFamily}
                      </p>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                        {perfume.description}
                      </p>

                      <div className="bg-neutral-900/60 p-3 rounded-sm border border-neutral-800 mb-4">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                          ¿Por qué encaja con tu elección?
                        </span>
                        <p className="text-xs text-neutral-300 italic">
                          Ideal para {selectedOccasion.title.toLowerCase()} gracias a su estela {perfume.intensity.toLowerCase()} y duración de {perfume.longevity}.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-neutral-400 uppercase tracking-wider">
                          Precio:
                        </span>
                        <EditablePrice perfumeId={perfume.id} size="md" theme="dark" />
                      </div>

                      {/* Consultation by WhatsApp button (requested in specification 5) */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openPerfumeModal(perfume)}
                          className="w-full py-2.5 px-3 border border-neutral-700 hover:border-[#d4af37] text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm cursor-pointer"
                        >
                          Ver Ficha
                        </button>
                        <a
                          href={WHATSAPP_CONFIG.getWhatsAppUrl(whatsappMessage)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            logConsultation(
                              perfume.name,
                              'guia',
                              preference,
                              selectedOccasion.title
                            )
                          }
                          className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-sm flex items-center justify-center gap-1.5"
                          title="Consultar esta recomendación por WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
