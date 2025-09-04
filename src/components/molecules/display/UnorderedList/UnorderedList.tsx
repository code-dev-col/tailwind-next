import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

interface UnorderedListProps extends BaseProps {
  /**
   * Contenido de la lista (ListItems)
   */
  children?: React.ReactNode;

  /**
   * Estilos inline
   */
  style?: React.CSSProperties;

  /**
   * Variante visual de la lista
   */
  $variant?: 'default' | 'minimal' | 'spaced' | 'compact';

  /**
   * Tamaño general de la lista
   */
  $size?: 'sm' | 'md' | 'lg';

  /**
   * Espaciado personalizado
   */
  $spacing?: 'tight' | 'normal' | 'loose';

  /**
   * Marcador personalizado (emoji, símbolo ASCII, etc.)
   */
  $marker?: string;

  /**
   * Color del marcador
   */
  $markerColor?: 'default' | 'primary' | 'secondary' | 'accent';

  /**
   * Clases adicionales de Tailwind
   */
  $custom?: string;

  /**
   * Si debe mostrar marcadores
   */
  $showMarkers?: boolean;
}

const unorderedListVariants = {
  base: ['list-none', 'space-y-0'].join(' '),

  variants: {
    variant: {
      default: 'pl-0',
      minimal: 'pl-0 space-y-1',
      spaced: 'pl-0 space-y-4',
      compact: 'pl-0 space-y-0.5',
    },

    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },

    spacing: {
      tight: 'space-y-1',
      normal: 'space-y-2',
      loose: 'space-y-4',
    },

    markerColor: {
      default: '[&>li]:before:text-foreground',
      primary: '[&>li]:before:text-primary',
      secondary: '[&>li]:before:text-secondary',
      accent: '[&>li]:before:text-accent',
    },
  },

  defaultVariants: {
    variant: 'default' as const,
    size: 'md' as const,
    spacing: 'normal' as const,
    markerColor: 'default' as const,
  },
};

const UnorderedList = React.forwardRef<HTMLUListElement, UnorderedListProps>(
  (
    {
      className,
      children,
      $variant = 'default',
      $size = 'md',
      $spacing = 'normal',
      $marker = '•',
      $markerColor = 'default',
      $custom,
      $showMarkers = true,
      style,
      ...props
    },
    ref
  ) => {
    const markerStyles = $showMarkers
      ? ({
          '--marker-content': `"${$marker}"`,
        } as React.CSSProperties)
      : {};

    const markerClasses = $showMarkers
      ? '[&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:content-[var(--marker-content)]'
      : '';

    return (
      <ul
        ref={ref}
        className={cn(
          unorderedListVariants.base,
          unorderedListVariants.variants.variant[$variant],
          unorderedListVariants.variants.size[$size],
          unorderedListVariants.variants.spacing[$spacing],
          unorderedListVariants.variants.markerColor[$markerColor],
          markerClasses,
          className,
          $custom
        )}
        style={{ ...markerStyles, ...style }}
        {...props}>
        {children}
      </ul>
    );
  }
);

UnorderedList.displayName = 'UnorderedList';

export { UnorderedList, type UnorderedListProps };
