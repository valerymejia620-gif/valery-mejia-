import React, { useState, useEffect } from 'react';
import { Search, Menu, X, MessageCircle, SlidersHorizontal, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_CONFIG } from '../data/perfumes';

export const Navbar: React.FC = () => {
  const { setIsSearchOpen, setIsPriceEditorOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Perfumes', href: '#catalogo' },
    { label: 'Nueva colección', href: '#nueva-coleccion' },
    { label: 'Guía', href: '#guia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/95 backdrop-blur-md border-b border-[#d4af37]/20 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* 1. Left: Brand Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            aria-label="Ir al inicio de PREMIUM QUALITY – Luxury Edition"
          >
            <BrandLogo />
          </a>

          {/* 2. Middle: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative py-1 hover:text-[#d4af37] transition-colors whitespace-nowrap group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* 3. Right: Functional Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Price Editor Toggle Button */}
            <button
              onClick={() => setIsPriceEditorOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#d4af37]/30 hover:border-[#d4af37] bg-neutral-900/60 hover:bg-[#d4af37]/10 text-neutral-300 hover:text-[#f3e5ab] text-[11px] uppercase tracking-wider transition-all duration-200"
              title="Ajustar y personalizar precios de la tienda"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Editar precios</span>
            </button>

            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-neutral-300 hover:text-[#d4af37] hover:bg-neutral-800/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              aria-label="Buscar fragancias en el catálogo"
              title="Buscar perfume"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* WhatsApp Direct Header Link */}
            <a
              href={WHATSAPP_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c5a059] text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#d4af37]/15 transition-all duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Asesoría WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-[#d4af37] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <BrandLogo size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-serif text-xl tracking-wider text-neutral-200 hover:text-[#d4af37] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPriceEditorOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs tracking-wider uppercase text-neutral-300 border border-[#d4af37]/40 rounded hover:bg-neutral-900"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#d4af37]" />
                Personalizar Precios
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-xs tracking-wider uppercase text-neutral-300 border border-neutral-700 rounded hover:bg-neutral-900"
              >
                <Search className="w-4 h-4 text-[#d4af37]" />
                Buscar en Catálogo
              </button>
            </div>
          </nav>

          <div className="pt-6 border-t border-neutral-800 flex flex-col gap-3">
            <a
              href={WHATSAPP_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded bg-[#25D366] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </a>
            <p className="text-center text-[11px] text-neutral-500 tracking-wider uppercase">
              Atención personalizada: 324 299 6643
            </p>
          </div>
        </div>
      )}
    </>
  );
};
