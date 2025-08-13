import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import { FiX, FiCheck, FiPlus, FiStar, FiUser, FiTag } from 'react-icons/fi';

interface ChipProps extends BaseProps {
  // Contenido principal
  label?: string;
  children?: React.ReactNode;

  // Variantes de estilo
  $variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'success'
    | 'warning'
    | 'outline'
    | 'ghost';
  $size?: 'sm' | 'default' | 'lg';
  $shape?: 'rounded' | 'pill' | 'square';

  // Estados interactivos
  $clickable?: boolean;
  $removable?: boolean;
  $selectable?: boolean;
  $selected?: boolean;
  $disabled?: boolean;

  // Iconos
  $icon?: React.ReactNode;
  $showIcon?: boolean;
  $removeIcon?: React.ReactNode;

  // Callbacks
  onClick?: () => void;
  onRemove?: () => void;
  onSelect?: (selected: boolean) => void;

  // Integración con store
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;
  chipValue?: string; // Valor específico del chip para operaciones de store

  // Personalización
  $custom?: string;
  $animate?: boolean;
  $count?: number; // Para mostrar contadores
  $badge?: string | number; // Para badges adicionales
}

const chipVariants = {
  base: 'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none',

  variants: {
    variant: {
      default:
        'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200',
      primary:
        'bg-blue-100 text-blue-900 hover:bg-blue-200 border border-blue-200',
      secondary:
        'bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-200',
      destructive:
        'bg-red-100 text-red-900 hover:bg-red-200 border border-red-200',
      accent:
        'bg-pink-100 text-pink-900 hover:bg-pink-200 border border-pink-200',
      success:
        'bg-green-100 text-green-900 hover:bg-green-200 border border-green-200',
      warning:
        'bg-yellow-100 text-yellow-900 hover:bg-yellow-200 border border-yellow-200',
      outline:
        'border-2 border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
      ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    },
    size: {
      sm: 'text-xs px-2 py-1 min-h-[24px]',
      default: 'text-sm px-3 py-1.5 min-h-[32px]',
      lg: 'text-base px-4 py-2 min-h-[40px]',
    },
    shape: {
      rounded: 'rounded-md',
      pill: 'rounded-full',
      square: 'rounded-none',
    },
  },

  states: {
    clickable: 'cursor-pointer hover:shadow-sm active:scale-95',
    selected: 'ring-2 ring-blue-500 bg-blue-50 border-blue-300',
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    removable: 'pr-1',
    animated: 'hover:scale-105 active:scale-95',
  },

  defaultVariants: {
    variant: 'default' as const,
    size: 'default' as const,
    shape: 'rounded' as const,
  },
};

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      label,
      children,
      $variant = 'default',
      $size = 'default',
      $shape = 'rounded',
      $clickable = false,
      $removable = false,
      $selectable = false,
      $selected = false,
      $disabled = false,
      $icon,
      $showIcon = false,
      $removeIcon,
      onClick,
      onRemove,
      onSelect,
      $store,
      storeKey,
      chipValue,
      $custom,
      $animate = false,
      $count,
      $badge,
      ...props
    },
    ref
  ) => {
    // Manejo de store
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    const isInStore = React.useMemo(() => {
      if (!chipValue || !Array.isArray(storeValue)) return false;
      return storeValue.includes(chipValue);
    }, [chipValue, storeValue]);

    const actualSelected = $selectable ? $selected || isInStore : $selected;

    // Handlers
    const handleClick = React.useCallback(() => {
      if ($disabled) return;

      if ($selectable && onSelect) {
        onSelect(!actualSelected);
      }

      if ($selectable && $store && storeKey && chipValue) {
        const { toggleChip } = ($store as any).getState();
        if (toggleChip) {
          toggleChip(chipValue, storeKey);
        }
      }

      if ($clickable && onClick) {
        onClick();
      }
    }, [
      $disabled,
      $selectable,
      actualSelected,
      onSelect,
      $store,
      storeKey,
      chipValue,
      $clickable,
      onClick,
    ]);

    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if ($disabled) return;

        if (onRemove) {
          onRemove();
        }

        if ($store && storeKey && chipValue) {
          const { removeChip } = ($store as any).getState();
          if (removeChip) {
            removeChip(chipValue, storeKey);
          }
        }
      },
      [$disabled, onRemove, $store, storeKey, chipValue]
    );

    // Iconos por defecto
    const defaultIcon = $showIcon && !$icon ? <FiTag size={16} /> : $icon;
    const removeIconElement = $removeIcon || <FiX size={14} />;

    // Clases CSS
    const chipClasses = cn(
      chipVariants.base,
      chipVariants.variants.variant[$variant],
      chipVariants.variants.size[$size],
      chipVariants.variants.shape[$shape],
      {
        [chipVariants.states.clickable]: $clickable || $selectable,
        [chipVariants.states.selected]: actualSelected,
        [chipVariants.states.disabled]: $disabled,
        [chipVariants.states.removable]: $removable,
        [chipVariants.states.animated]: $animate,
      },
      className,
      $custom
    );

    return (
      <div
        ref={ref}
        className={chipClasses}
        onClick={handleClick}
        role={$clickable || $selectable ? 'button' : undefined}
        tabIndex={($clickable || $selectable) && !$disabled ? 0 : undefined}
        aria-pressed={$selectable ? actualSelected : undefined}
        aria-disabled={$disabled}
        onKeyDown={(e) => {
          if (
            (e.key === 'Enter' || e.key === ' ') &&
            ($clickable || $selectable)
          ) {
            e.preventDefault();
            handleClick();
          }
        }}
        {...props}>
        {/* Icono principal */}
        {defaultIcon && <span className="flex-shrink-0">{defaultIcon}</span>}

        {/* Indicador de selección */}
        {$selectable && actualSelected && (
          <FiCheck size={14} className="flex-shrink-0 text-current" />
        )}

        {/* Contenido principal */}
        <span className="flex-1 truncate">{children || label}</span>

        {/* Contador */}
        {$count !== undefined && $count > 0 && (
          <span className="flex-shrink-0 bg-current bg-opacity-20 text-current text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
            {$count > 99 ? '99+' : $count}
          </span>
        )}

        {/* Badge */}
        {$badge && (
          <span className="flex-shrink-0 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
            {$badge}
          </span>
        )}

        {/* Botón de eliminar */}
        {$removable && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex-shrink-0 ml-1 p-0.5 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-1 focus:ring-current"
            aria-label="Eliminar"
            tabIndex={-1}>
            {removeIconElement}
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

// Componente para grupos de chips
interface ChipGroupProps extends BaseProps {
  chips?: string[];
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;

  // Props para chips individuales
  $variant?: ChipProps['$variant'];
  $size?: ChipProps['$size'];
  $shape?: ChipProps['$shape'];
  $removable?: boolean;
  $selectable?: boolean;
  $clickable?: boolean;

  // Callbacks
  onChipClick?: (chip: string) => void;
  onChipRemove?: (chip: string) => void;
  onChipSelect?: (chip: string, selected: boolean) => void;

  // Layout
  $gap?: 'sm' | 'default' | 'lg';
  $wrap?: boolean;
  $maxItems?: number;
  $showMore?: boolean;

  // Personalización
  $custom?: string;
}

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      className,
      chips = [],
      $store,
      storeKey,
      $variant = 'default',
      $size = 'default',
      $shape = 'rounded',
      $removable = false,
      $selectable = false,
      $clickable = false,
      onChipClick,
      onChipRemove,
      onChipSelect,
      $gap = 'default',
      $wrap = true,
      $maxItems,
      $showMore = false,
      $custom,
      ...props
    },
    ref
  ) => {
    const [showAll, setShowAll] = React.useState(false);

    // Obtener chips del store si está disponible
    const storeChips =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    const finalChips = Array.isArray(storeChips) ? storeChips : chips;

    // Limitar elementos si se especifica maxItems
    const displayChips = React.useMemo(() => {
      if (!$maxItems || showAll) return finalChips;
      return finalChips.slice(0, $maxItems);
    }, [finalChips, $maxItems, showAll]);

    const hasMore = $maxItems && finalChips.length > $maxItems;

    const gapClasses = {
      sm: 'gap-1',
      default: 'gap-2',
      lg: 'gap-3',
    };

    const groupClasses = cn(
      'flex items-center',
      gapClasses[$gap],
      {
        'flex-wrap': $wrap,
      },
      className,
      $custom
    );

    return (
      <div ref={ref} className={groupClasses} {...props}>
        {displayChips.map((chip, index) => (
          <Chip
            key={`${chip}-${index}`}
            label={chip}
            chipValue={chip}
            $variant={$variant}
            $size={$size}
            $shape={$shape}
            $removable={$removable}
            $selectable={$selectable}
            $clickable={$clickable}
            $store={$store}
            storeKey={storeKey}
            onClick={() => onChipClick?.(chip)}
            onRemove={() => onChipRemove?.(chip)}
            onSelect={(selected) => onChipSelect?.(chip, selected)}
          />
        ))}

        {/* Botón "mostrar más" */}
        {hasMore && $showMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className={cn(
              chipVariants.base,
              chipVariants.variants.variant.ghost,
              chipVariants.variants.size[$size],
              chipVariants.variants.shape[$shape],
              chipVariants.states.clickable,
              'border-2 border-dashed border-gray-300'
            )}>
            <FiPlus size={14} />
            {showAll ? 'Menos' : `+${finalChips.length - $maxItems!}`}
          </button>
        )}
      </div>
    );
  }
);

ChipGroup.displayName = 'ChipGroup';

export { Chip, ChipGroup, type ChipProps, type ChipGroupProps };

