import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark'
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer select-none ${className}`}>
      {/* Luxury Crest Monogram */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className={`relative w-9 h-9 md:w-10 md:h-10 border border-[#d4af37]/60 rotate-45 flex items-center justify-center transition-all duration-300 group-hover:border-[#f3e5ab] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] ${isLight ? 'bg-black/90' : 'bg-neutral-950'}`}>
          <div className="absolute inset-0.5 border border-[#d4af37]/30" />
          <span className="-rotate-45 font-display text-[11px] md:text-xs font-bold tracking-widest text-[#d4af37] drop-shadow-sm">
            PQ
          </span>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-display text-sm md:text-base font-bold tracking-[0.18em] transition-colors ${
              isLight ? 'text-neutral-900 group-hover:text-black' : 'text-neutral-100 group-hover:text-white'
            }`}
          >
            PREMIUM QUALITY
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-3 bg-[#c5a059]/60" />
          <span className="font-display text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#c5a059] font-medium">
            Luxury Edition
          </span>
          <span className="h-[1px] w-3 bg-[#c5a059]/60" />
        </div>
      </div>
    </div>
  );
};
