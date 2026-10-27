import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/perfumes';

export const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="relative mr-3 hidden sm:flex items-center gap-2 px-3.5 py-2 bg-neutral-900/95 text-white border border-[#d4af37]/40 rounded-lg shadow-xl shadow-black/50 text-xs backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex flex-col">
            <span className="font-semibold text-[#d4af37]">¿Deseas asesoría exclusiva?</span>
            <span className="text-neutral-400 text-[11px]">Chatea con nosotros al 3242996643</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-neutral-500 hover:text-white p-0.5 ml-1"
            aria-label="Cerrar tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          {/* Arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-neutral-900 border-t border-r border-[#d4af37]/40 rotate-45" />
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={WHATSAPP_CONFIG.getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir chat de WhatsApp con PREMIUM QUALITY al 3242996643"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <span className="sr-only">Contactar por WhatsApp</span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />

        {/* Pulse radar ring */}
        <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/60 animate-ping pointer-events-none opacity-40" />
      </a>
    </div>
  );
};
