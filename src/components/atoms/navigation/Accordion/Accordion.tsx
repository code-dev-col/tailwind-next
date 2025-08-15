import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { IoChevronDown } from 'react-icons/io5';

export interface AccordionItemType {
  id: string;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  isOpen?: boolean;
}

export interface AccordionProps extends BaseProps {
  $size?: 'sm' | 'default' | 'lg';
  $iconPosition?: 'left' | 'right';
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'outline'
    | 'ghost'
    | 'custom';
  $custom?: string;

  // Datos del accordion
  items: AccordionItemType[];

  // Comportamiento
  allowMultiple?: boolean;
  allowToggle?: boolean;
  animated?: boolean;

  // Estilos opcionales
  showIcons?: boolean;
  showBadges?: boolean;
  customChevron?: React.ReactNode;

  // Control externo del estado
  openItems?: string[];
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
  onOpenChange?: (openItems: string[]) => void;

  // Accesibilidad
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

// Esquemas de color simplificados
const colorSchemes = {
  default: {
    background: 'bg-card',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    border: 'border-border',
    hover: 'hover:bg-muted/50',
    active: 'bg-primary/10 text-primary',
    chevron: 'text-muted-foreground',
  },
  secondary: {
    background: 'bg-secondary/10',
    text: 'text-secondary',
    textSecondary: 'text-secondary/90',
    border: 'border-secondary/20',
    hover: 'hover:bg-secondary/15',
    active: 'bg-secondary/25 text-secondary',
    chevron: 'text-secondary/80',
  },
  destructive: {
    background: 'bg-destructive/5',
    text: 'text-destructive',
    textSecondary: 'text-destructive/90',
    border: 'border-destructive/20',
    hover: 'hover:bg-destructive/10',
    active: 'bg-destructive/20 text-destructive',
    chevron: 'text-destructive/80',
  },
  accent: {
    background: 'bg-accent/10',
    text: 'text-accent-foreground',
    textSecondary: 'text-accent-foreground/90',
    border: 'border-accent/20',
    hover: 'hover:bg-accent/15',
    active: 'bg-accent/25 text-accent-foreground',
    chevron: 'text-accent-foreground/80',
  },
  muted: {
    background: 'bg-muted/20',
    text: 'text-foreground',
    textSecondary: 'text-muted-foreground',
    border: 'border-border',
    hover: 'hover:bg-muted/40',
    active: 'bg-muted/50 text-foreground',
    chevron: 'text-muted-foreground',
  },
  minimal: {
    background: 'bg-transparent',
    text: 'text-foreground',
    textSecondary: 'text-muted-foreground',
    border: 'border-transparent',
    hover: 'hover:bg-muted/30',
    active: 'bg-muted/50 text-foreground',
    chevron: 'text-muted-foreground/80',
  },
  outline: {
    background: 'bg-transparent',
    text: 'text-foreground',
    textSecondary: 'text-muted-foreground',
    border: 'border-border',
    hover: 'hover:bg-muted/20',
    active: 'bg-border/10 text-foreground border-border',
    chevron: 'text-muted-foreground',
  },
  ghost: {
    background: 'bg-transparent',
    text: 'text-foreground',
    textSecondary: 'text-muted-foreground/70',
    border: 'border-transparent',
    hover: 'hover:bg-muted/20',
    active: 'bg-muted/30 text-foreground',
    chevron: 'text-muted-foreground/60',
  },
  custom: {
    background: '',
    text: '',
    textSecondary: '',
    border: '',
    hover: '',
    active: '',
    chevron: '',
  },
};

// Hook para animación de altura automática (mejorado)
const useAutoHeight = (
  isOpen: boolean,
  dependencies: React.ReactNode = null
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>('0px');

  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (isOpen) {
        setHeight(`${ref.current!.scrollHeight}px`);
      } else {
        setHeight('0px');
      }
    };

    // Pequeño delay para asegurar que el contenido esté renderizado
    const timer = setTimeout(updateHeight, 10);

    return () => clearTimeout(timer);
  }, [isOpen, dependencies]);

  return [ref, height] as const;
};

// Componente AccordionItem simplificado
interface AccordionItemProps {
  item: AccordionItemType;
  isOpen: boolean;
  onToggle: () => void;
  size: AccordionProps['$size'];
  iconPosition: AccordionProps['$iconPosition'];
  animated: boolean;
  showIcons: boolean;
  showBadges: boolean;
  customChevron?: React.ReactNode;
  colorScheme: keyof typeof colorSchemes;
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
  size = 'default',
  iconPosition = 'right',
  animated = true,
  showIcons = true,
  showBadges = true,
  customChevron,
  colorScheme = 'default',
  className,
}) => {
  const [contentRef, contentHeight] = useAutoHeight(isOpen, item.content);
  const colors = colorSchemes[colorScheme];

  // Clases base para cada parte
  const getItemClasses = () => {
    return cn(
      'transition-all duration-200 border-b border-border/50 last:border-b-0',
      colors.border
    );
  };

  const getTriggerClasses = () => {
    const base = cn(
      'w-full flex items-center justify-between text-left',
      'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring',
      'cursor-pointer',
      colors.background,
      colors.hover,
      isOpen && colors.active
    );

    switch (size) {
      case 'sm':
        return cn(base, 'px-3 py-2 text-sm min-h-[2.5rem]');
      case 'lg':
        return cn(base, 'px-6 py-4 text-lg min-h-[3.5rem]');
      default:
        return cn(base, 'px-4 py-3 text-base min-h-[3rem]');
    }
  };

  const getContentClasses = () => {
    const base = cn(
      'overflow-hidden',
      colors.background,
      colors.textSecondary,
      animated && 'transition-all duration-300 ease-in-out'
    );

    switch (size) {
      case 'sm':
        return cn(base, 'px-3 py-2');
      case 'lg':
        return cn(base, 'px-6 py-4');
      default:
        return cn(base, 'px-4 py-3');
    }
  };

  const ChevronIcon = customChevron || (
    <IoChevronDown
      className={cn(
        'w-5 h-5 transition-transform duration-200',
        colors.chevron,
        isOpen && 'rotate-180'
      )}
    />
  );

  return (
    <div
      className={cn(
        getItemClasses(),
        item.disabled && 'opacity-50 cursor-not-allowed',
        className
      )}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={onToggle}
        disabled={item.disabled}
        className={getTriggerClasses()}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-trigger-${item.id}`}>
        <div className="flex items-center gap-3 flex-1">
          {/* Icon izquierdo */}
          {showIcons && iconPosition === 'left' && item.icon && (
            <div className={cn('flex-shrink-0', colors.text)}>{item.icon}</div>
          )}

          {/* Chevron izquierdo */}
          {iconPosition === 'left' && (
            <div className="flex-shrink-0">{ChevronIcon}</div>
          )}

          {/* Título */}
          <div className="flex-1 text-left">
            <span className={cn('font-medium', colors.text)}>{item.title}</span>
          </div>

          {/* Badge */}
          {showBadges && item.badge && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
                {item.badge}
              </span>
            </div>
          )}

          {/* Icon derecho */}
          {showIcons && iconPosition === 'right' && item.icon && (
            <div className={cn('flex-shrink-0', colors.textSecondary)}>
              {item.icon}
            </div>
          )}
        </div>

        {/* Chevron derecho */}
        {iconPosition === 'right' && (
          <div className="flex-shrink-0 ml-2">{ChevronIcon}</div>
        )}
      </button>

      {/* Content con animación de altura */}
      <div
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${item.id}`}
        className={cn(
          'overflow-hidden',
          animated && 'transition-all duration-300 ease-in-out',
          isOpen && 'border-t border-border/60'
        )}
        style={{
          maxHeight: animated ? contentHeight : isOpen ? 'auto' : '0px',
        }}>
        <div ref={contentRef} className={getContentClasses()}>
          {typeof item.content === 'string' ? (
            <p className="leading-relaxed">{item.content}</p>
          ) : (
            item.content
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Accordion principal
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      $size = 'default',
      $iconPosition = 'right',
      $colorScheme = 'default',
      $custom,
      items = [],
      allowMultiple = false,
      allowToggle = true,
      animated = true,
      showIcons = true,
      showBadges = true,
      customChevron,
      openItems: controlledOpenItems,
      onItemToggle,
      onOpenChange,
      ariaLabel,
      ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    // Estado interno para items abiertos
    const [internalOpenItems, setInternalOpenItems] = useState<string[]>(() => {
      if (controlledOpenItems) {
        return controlledOpenItems;
      }
      return items
        .filter((item) => item.isOpen && !item.disabled)
        .map((item) => item.id);
    });

    // Usar estado controlado o interno
    const openItems = controlledOpenItems ?? internalOpenItems;

    const handleItemToggle = (itemId: string) => {
      const item = items.find((i) => i.id === itemId);
      if (!item || item.disabled) return;

      const isCurrentlyOpen = openItems.includes(itemId);
      const newIsOpen = !isCurrentlyOpen;

      // Si no se permite toggle y ya está abierto, no hacer nada
      if (!allowToggle && isCurrentlyOpen) return;

      let newOpenItems: string[];

      if (newIsOpen) {
        // Abrir item
        newOpenItems = allowMultiple ? [...openItems, itemId] : [itemId];
      } else {
        // Cerrar item
        newOpenItems = openItems.filter((id) => id !== itemId);
      }

      // Actualizar estado interno si no hay control externo
      if (!controlledOpenItems) {
        setInternalOpenItems(newOpenItems);
      }

      // Llamar callbacks
      onItemToggle?.(itemId, newIsOpen);
      onOpenChange?.(newOpenItems);
    };

    // Sincronizar con items.isOpen cuando cambian
    useEffect(() => {
      if (!controlledOpenItems) {
        const defaultOpenItems = items
          .filter((item) => item.isOpen && !item.disabled)
          .map((item) => item.id);

        setInternalOpenItems(defaultOpenItems);
      }
    }, [items, controlledOpenItems]);

    // Clases del contenedor principal
    const getContainerClasses = () => {
      return cn(
        'w-full border border-border rounded-lg overflow-hidden shadow-sm',
        colorSchemes[$colorScheme].background
      );
    };

    return (
      <div
        ref={ref}
        className={cn(getContainerClasses(), className, $custom)}
        role="group"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openItems.includes(item.id)}
            onToggle={() => handleItemToggle(item.id)}
            size={$size}
            iconPosition={$iconPosition}
            animated={animated}
            showIcons={showIcons}
            showBadges={showBadges}
            customChevron={customChevron}
            colorScheme={$colorScheme}
          />
        ))}

        {items.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            <p className="text-sm">No items to display</p>
          </div>
        )}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export { Accordion };

