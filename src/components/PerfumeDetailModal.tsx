import React, { useEffect } from 'react';
import { X, MessageCircle, Clock, Sparkles, Check, Shield, Droplets } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_CONFIG } from '../data/perfumes';
import { EditablePrice } from './EditablePrice';

export const PerfumeDetailModal: React.FC = () => {
  const { selectedPerfume, closePerfumeModal, logConsultation } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePerfumeModal();
    };
    if (selectedPerfume) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPerfume, closePerfumeModal]);

  if (!selectedPerfume) return null;

  const whatsappMessage = WHATSAPP_CONFIG.getProductMessage(selectedPerfume.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closePerfumeModal}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-[#d4af37]/40 rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePerfumeModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-neutral-300 hover:text-white transition-colors border border-neutral-700 focus:outline-none"
          aria-label="Cerrar detalles del perfume"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-neutral-900 aspect-square md:aspect-auto min-h-[300px]">
          <img
            src={selectedPerfume.image}
            alt={selectedPerfume.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 bg-black/90 text-[#d4af37] border border-[#d4af37]/40 rounded-sm">
              {selectedPerfume.category}
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-[#d4af37] text-neutral-950 rounded-sm">
              {selectedPerfume.concentration}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
            <span>{selectedPerfume.volume}</span>
            <span className="text-[#d4af37] flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> Fijación: {selectedPerfume.longevity}
            </span>
          </div>
        </div>

        {/* Right: Detailed Perfume Dossier */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-left">
          <div>
            {/* Header info */}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-1">
                {selectedPerfume.olfactoryFamily}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
                {selectedPerfume.name}
              </h3>
              <p className="text-xs text-neutral-400 italic">
                {selectedPerfume.subtitle}
              </p>
            </div>

            {/* Price section with inline edit */}
            <div className="flex items-center justify-between p-3.5 bg-neutral-900/90 border border-neutral-800 rounded-sm mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                  Precio unitario:
                </span>
                <EditablePrice perfumeId={selectedPerfume.id} size="lg" theme="dark" />
              </div>
              <span className="text-[10px] text-neutral-400 italic text-right max-w-[120px]">
                Haz clic en el precio o lápiz para modificarlo
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
              {selectedPerfume.description}
            </p>

            {/* Olfactory Pyramid */}
            <div className="mb-6 space-y-3">
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold border-b border-neutral-800 pb-1.5">
                Pirámide Olfativa
              </h4>

              <div className="text-xs">
                <span className="text-[#d4af37] font-semibold">Notas de Salida: </span>
                <span className="text-neutral-300">{selectedPerfume.topNotes.join(', ')}</span>
              </div>
              <div className="text-xs">
                <span className="text-[#d4af37] font-semibold">Notas de Corazón: </span>
                <span className="text-neutral-300">{selectedPerfume.heartNotes.join(', ')}</span>
              </div>
              <div className="text-xs">
                <span className="text-[#d4af37] font-semibold">Notas de Fondo: </span>
                <span className="text-neutral-300">{selectedPerfume.baseNotes.join(', ')}</span>
              </div>
            </div>

            {/* Recommended Occasions */}
            <div className="mb-6">
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold border-b border-neutral-800 pb-1.5 mb-2">
                Ocasión & Recomendación
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPerfume.recommendedOccasion.map((occ) => (
                  <span
                    key={occ}
                    className="text-[11px] px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-sm"
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Call to action */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href={WHATSAPP_CONFIG.getWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => logConsultation(selectedPerfume.name, 'modal')}
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar disponibilidad por WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-neutral-500">
              Respuesta inmediata vía WhatsApp al 3242996643 · Asesoría personalizada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
