/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NuevaColeccion } from './components/NuevaColeccion';
import { Catalogo } from './components/Catalogo';
import { Guia } from './components/Guia';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { PerfumeDetailModal } from './components/PerfumeDetailModal';
import { SearchModal } from './components/SearchModal';
import { PriceEditorModal } from './components/PriceEditorModal';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans selection:bg-[#c5a059] selection:text-black">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Landing Page Content */}
        <main className="flex-grow">
          {/* 1. Hero Section (2-column layout) */}
          <Hero />

          {/* 2. Nueva Colección (3 featured cards) */}
          <NuevaColeccion />

          {/* 3. Catálogo (8 verified perfumes, light background balance, filters) */}
          <Catalogo />

          {/* 4. Guía Interactiva (Fragrance advisor & recommendations) */}
          <Guia />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Floating WhatsApp Button */}
        <WhatsAppFloating />

        {/* Modals & Overlays */}
        <PerfumeDetailModal />
        <SearchModal />
        <PriceEditorModal />
      </div>
    </StoreProvider>
  );
}
