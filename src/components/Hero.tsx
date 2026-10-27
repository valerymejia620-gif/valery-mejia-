import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/perfumes';

export const Hero: React.FC = () => {
  const scrollToGuide = () => {
    const guideSection = document.getElementById('guia');
    if (guideSection) {
      guideSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalogo');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-neutral-950 via-[#0a0a0a] to-[#0d0d0d]"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] bg-[#c5a059]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle luxury geometric grid watermark */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Statement & Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Curated Pre-title */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.25em] text-[#d4af37]">
              <span className="w-8 h-[1px] bg-[#d4af37]" />
              <span>Alta Perfumería · Colección Exclusiva</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.15] tracking-tight mb-6 text-balance">
              Tu esencia,{' '}
              <span className="italic font-light text-neutral-300">tu sello,</span>{' '}
              <br className="hidden sm:inline" />
              <span className="text-gold-gradient font-medium">tu historia</span>
            </h1>

            {/* Brief Commercial Description */}
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl mb-9 font-normal">
              Descubre una curaduría olfativa donde el magnetismo, la distinción y la elegancia se
              funden en fragancias memorables. Notas selectas concebidas para envolver cada instante
              con un carácter inconfundible.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              {/* Requested Main Button: Leads to Guía */}
              <button
                onClick={scrollToGuide}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c5a059] text-neutral-950 font-semibold text-sm uppercase tracking-widest hover:brightness-110 shadow-xl shadow-[#d4af37]/20 transition-all duration-300 rounded-sm cursor-pointer"
              >
                <span>Encuentra tu fragancia</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary WhatsApp Direct Consultation */}
              <a
                href={WHATSAPP_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-[#d4af37]/40 hover:border-[#d4af37] bg-neutral-900/60 hover:bg-neutral-900 text-neutral-200 text-sm tracking-wider uppercase transition-colors rounded-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Asesoría por WhatsApp</span>
              </a>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-800/80">
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-[#d4af37] tracking-wider">
                  100%
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-wider mt-0.5">
                  Calidad Garantizada
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-[#d4af37] tracking-wider">
                  12h+
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-wider mt-0.5">
                  Fijación Superior
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-[#d4af37] tracking-wider">
                  Colombia
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-wider mt-0.5">
                  Envíos Nacionales
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Large, Elegant Perfume Photography */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Outer Golden Glow Framing */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#d4af37]/30 via-transparent to-[#c5a059]/40 rounded-xl blur-lg opacity-70" />

              {/* Main Image Container */}
              <div className="relative rounded-lg overflow-hidden border border-[#d4af37]/30 bg-neutral-900 shadow-2xl group">
                <img
                  src="/src/assets/images/hero_luxury_perfume_1793055740447.jpg"
                  alt="Frasco de perfume de lujo de PREMIUM QUALITY – Luxury Edition sobre mármol negro"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient scrim overlay at the base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Brand Seal Plaque */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/85 backdrop-blur-md border border-[#d4af37]/40 rounded flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs text-[#d4af37] tracking-[0.25em] uppercase font-semibold">
                      Signature Collection
                    </p>
                    <p className="font-serif text-white text-base font-normal mt-0.5">
                      Edición Limitada 2026
                    </p>
                  </div>
                  <button
                    onClick={scrollToCatalog}
                    className="text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                  >
                    Ver catálogo
                  </button>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
