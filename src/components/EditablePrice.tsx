import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface EditablePriceProps {
  perfumeId: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

export const EditablePrice: React.FC<EditablePriceProps> = ({
  perfumeId,
  size = 'md',
  theme = 'dark'
}) => {
  const { prices, updatePrice } = useStore();
  const currentPrice = prices[perfumeId] || 'Consultar precio';

  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(currentPrice);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(currentPrice);
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    updatePrice(perfumeId, tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempValue(currentPrice);
    setIsEditing(false);
  };

  const isLight = theme === 'light';

  if (isEditing) {
    return (
      <form
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 my-1"
      >
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder="Ej: $ 280.000 COP"
          autoFocus
          className={`px-2 py-1 text-xs font-mono rounded border border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
            isLight
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'bg-neutral-900 text-white shadow-inner'
          }`}
        />
        <button
          type="submit"
          onClick={handleSave}
          className="p-1 rounded bg-[#d4af37] text-neutral-950 hover:bg-[#c5a059] transition-colors"
          title="Guardar precio"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="p-1 rounded bg-neutral-700 text-neutral-200 hover:bg-neutral-600 transition-colors"
          title="Cancelar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </form>
    );
  }

  const isPlaceholder = currentPrice.toLowerCase().includes('consultar');

  return (
    <div
      onClick={handleStartEdit}
      className={`group/price inline-flex items-center gap-2 cursor-pointer transition-colors py-0.5 rounded ${
        isLight ? 'hover:text-black' : 'hover:text-white'
      }`}
      title="Haz clic para editar este precio"
    >
      <span
        className={`font-mono tabular-nums font-semibold tracking-tight transition-colors ${
          size === 'lg'
            ? 'text-xl md:text-2xl text-[#d4af37]'
            : size === 'sm'
            ? 'text-xs'
            : 'text-sm md:text-base'
        } ${
          isPlaceholder
            ? isLight
              ? 'text-neutral-600 italic'
              : 'text-[#d4af37]/90 italic font-medium'
            : isLight
            ? 'text-neutral-900 font-bold'
            : 'text-neutral-100 font-bold'
        }`}
      >
        {isPlaceholder ? currentPrice : currentPrice.startsWith('$') ? currentPrice : `$ ${currentPrice}`}
      </span>

      {/* Subtle Edit Icon indicator */}
      <span
        className={`opacity-40 group-hover/price:opacity-100 transition-opacity p-1 rounded ${
          isLight ? 'hover:bg-neutral-200' : 'hover:bg-neutral-800'
        }`}
        title="Editar precio"
      >
        <Pencil className="w-3 h-3 text-[#d4af37]" />
      </span>
    </div>
  );
};
