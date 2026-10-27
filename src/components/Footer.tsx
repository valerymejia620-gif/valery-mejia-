import React, { useState } from 'react';
import { MessageCircle, Instagram, Clock, MapPin, Phone, Pencil, Check, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_CONFIG } from '../data/perfumes';

export const Footer: React.FC = () => {
  const { storeInfo, updateStoreInfo } = useStore();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState('');

  const startEdit = (field: 'instagram' | 'hours' | 'location', currentVal: string) => {
    setEditingField(field);
    setFieldValue(currentVal);
  };

  const saveEdit = (field: 'instagram' | 'hours' | 'location') => {
    if (fieldValue.trim()) {
      updateStoreInfo(field, fieldValue.trim());
    }
    setEditingField(null);
  };

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Perfumes', href: '#catalogo' },
    { label: 'Nueva colección', href: '#nueva-coleccion' },
    { label: 'Guía', href: '#guia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="bg-[#050505] text-neutral-300 pt-20 pb-12 border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-neutral-800">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <BrandLogo className="mb-6" />
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-6">
                Tu esencia, tu sello, tu historia. Curaduría exclusiva de fragancias de lujo para
                quienes reconocen el poder de una huella aromática inolvidable.
              </p>
            </div>

            {/* Direct WhatsApp Pill */}
            <div className="pt-2">
              <a
                href={WHATSAPP_CONFIG.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {WHATSAPP_CONFIG.phoneNumber}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-5">
              Navegación
            </h4>
            <ul className="flex flex-col gap-3 text-xs tracking-wider uppercase text-neutral-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-[#d4af37] transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Instagram (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-5">
              Canales Directos
            </h4>
            <div className="flex flex-col gap-4 text-xs">
              {/* WhatsApp phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">
                    Línea Exclusiva
                  </span>
                  <a
                    href={WHATSAPP_CONFIG.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-neutral-200 hover:text-[#d4af37] transition-colors"
                  >
                    +57 {WHATSAPP_CONFIG.phoneNumber}
                  </a>
                </div>
              </div>

              {/* Instagram (Editable) */}
              <div className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">
                    Instagram Oficial
                  </span>
                  {editingField === 'instagram' ? (
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        placeholder="@usuario"
                        className="bg-neutral-900 text-xs px-2 py-1 rounded border border-[#d4af37] text-white focus:outline-none"
                      />
                      <button
                        onClick={() => saveEdit('instagram')}
                        className="p-1 bg-[#d4af37] text-black rounded"
                        title="Guardar"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingField(null)}
                        className="p-1 bg-neutral-700 text-white rounded"
                        title="Cancelar"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group/ig">
                      <span className="text-neutral-200 font-medium">{storeInfo.instagram}</span>
                      <button
                        onClick={() => startEdit('instagram', storeInfo.instagram)}
                        className="opacity-40 group-hover/ig:opacity-100 transition-opacity p-0.5 hover:text-[#d4af37]"
                        title="Editar Instagram"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Cobertura / Envíos (Editable) */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">
                    Cobertura & Despachos
                  </span>
                  {editingField === 'location' ? (
                    <div className="flex items-center gap-1.5 mt-1">
                      <input
                        type="text"
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        className="bg-neutral-900 text-xs px-2 py-1 rounded border border-[#d4af37] text-white focus:outline-none"
                      />
                      <button
                        onClick={() => saveEdit('location')}
                        className="p-1 bg-[#d4af37] text-black rounded"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingField(null)}
                        className="p-1 bg-neutral-700 text-white rounded"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group/loc">
                      <span className="text-neutral-300 leading-snug">{storeInfo.location}</span>
                      <button
                        onClick={() => startEdit('location', storeInfo.location)}
                        className="opacity-40 group-hover/loc:opacity-100 transition-opacity p-0.5 hover:text-[#d4af37]"
                        title="Editar cobertura"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Horarios & Compromiso (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-5">
              Horarios & Asistencia
            </h4>
            <div className="flex items-start gap-3 text-xs mb-4">
              <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-[10px] uppercase text-neutral-400 tracking-wider block">
                  Horario de Atención
                </span>
                {editingField === 'hours' ? (
                  <div className="flex items-center gap-1.5 mt-1">
                    <input
                      type="text"
                      value={fieldValue}
                      onChange={(e) => setFieldValue(e.target.value)}
                      className="bg-neutral-900 text-xs px-2 py-1 rounded border border-[#d4af37] text-white focus:outline-none"
                    />
                    <button
                      onClick={() => saveEdit('hours')}
                      className="p-1 bg-[#d4af37] text-black rounded"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="p-1 bg-neutral-700 text-white rounded"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 group/hrs">
                    <span className="text-neutral-200">{storeInfo.hours}</span>
                    <button
                      onClick={() => startEdit('hours', storeInfo.hours)}
                      className="opacity-40 group-hover/hrs:opacity-100 transition-opacity p-0.5 hover:text-[#d4af37]"
                      title="Editar horario"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-sm">
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Asesoría personalizada por sommelier aromático directamente en WhatsApp para elegir
                tu fragancia ideal.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 PREMIUM QUALITY – Luxury Edition. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-neutral-400">
            <span>Perfumes 100% Originales & Concentrados</span>
            <span>·</span>
            <span>Atención Directa WhatsApp</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
