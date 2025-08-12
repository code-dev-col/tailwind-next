import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface ListItemProps extends BaseProps {
  /**
   * Contenido del item
   */
  children?: React.ReactNode;

  /**
   * Variante visual del item
   */
  $variant?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Tamaño del item
   */
  $size?: 'sm' | 'md' | 'lg';

  /**
   * Clases adicionales de Tailwind
   */
  $custom?: string;

  /**
   * Si el item está activo/seleccionado
   */
  $active?: boolean;

  /**
   * Si el item es clickeable
   */
  $clickable?: boolean;

  /**
   * Handler para clicks
   */
  onClick?: () => void;
}

const listItemVariants = {
  base: [
    'relative',
    'transition-colors',
    'duration-200',
    'leading-relaxed',
    'tracking-tight',
  ].join(' '),

  variants: {
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
    },

    size: {
      sm: 'text-sm py-1 px-2',
      md: 'text-base py-2 px-3',
      lg: 'text-lg py-3 px-4',
    },

    state: {
      default: '',
      active: 'bg-primary/10 text-primary font-medium',
      clickable: 'hover:bg-muted/50 cursor-pointer',
    },
  },

  defaultVariants: {
    variant: 'default' as const,
    size: 'md' as const,
  },
};

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      children,
      $variant = 'default',
      $size = 'md',
      $custom,
      $active = false,
      $clickable = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const getStateClasses = () => {
      if ($active) return listItemVariants.variants.state.active;
      if ($clickable || onClick)
        return listItemVariants.variants.state.clickable;
      return listItemVariants.variants.state.default;
    };

    return (
      <li
        ref={ref}
        className={cn(
          listItemVariants.base,
          listItemVariants.variants.variant[$variant],
          listItemVariants.variants.size[$size],
          getStateClasses(),
          className,
          $custom
        )}
        onClick={onClick}
        role={$clickable || onClick ? 'button' : undefined}
        tabIndex={$clickable || onClick ? 0 : undefined}
        {...props}>
        {children}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem, type ListItemProps };

