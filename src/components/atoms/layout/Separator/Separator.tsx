import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

interface SeparatorProps extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $variant?: 'default' | 'dashed' | 'dotted' | 'thick' | 'gradient';
  $orientation?: 'horizontal' | 'vertical';
  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    line: 'bg-border border-border',
    gradient: 'from-transparent via-border to-transparent',
  },
  secondary: {
    line: 'bg-secondary/30 border-secondary/30',
    gradient: 'from-transparent via-secondary/30 to-transparent',
  },
  destructive: {
    line: 'bg-destructive/30 border-destructive/30',
    gradient: 'from-transparent via-destructive/30 to-transparent',
  },
  accent: {
    line: 'bg-accent/30 border-accent/30',
    gradient: 'from-transparent via-accent/30 to-transparent',
  },
  muted: {
    line: 'bg-muted-foreground/30 border-muted-foreground/30',
    gradient: 'from-transparent via-muted-foreground/30 to-transparent',
  },
  minimal: {
    line: 'bg-foreground/20 border-foreground/20',
    gradient: 'from-transparent via-foreground/20 to-transparent',
  },
  custom: {
    line: '',
    gradient: '',
  },
} as const;

const separatorVariants = {
  base: 'shrink-0 transition-colors duration-200',
  variants: {
    variant: {
      default: '', // Se aplicará el color del scheme
      dashed: 'border-dashed bg-transparent border-t',
      dotted: 'border-dotted bg-transparent border-t',
      thick: '', // Se aplicará el color del scheme con thickness
      gradient: 'bg-gradient-to-r', // Se completará con colors del scheme
    },
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    colorScheme: 'default',
    variant: 'default',
    orientation: 'horizontal',
    size: 'default',
  },
};

// Función para obtener clases de tamaño según orientación
const getSizeClasses = (orientation: string, size: string) => {
  if (orientation === 'horizontal') {
    switch (size) {
      case 'sm':
        return 'h-[0.5px]';
      case 'lg':
        return 'h-[2px]';
      default:
        return 'h-[1px]';
    }
  } else {
    switch (size) {
      case 'sm':
        return 'w-[0.5px]';
      case 'lg':
        return 'w-[2px]';
      default:
        return 'w-[1px]';
    }
  }
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $variant = 'default',
      $orientation = 'horizontal',
      $size = 'default',
      $custom,
      ...props
    },
    ref
  ) => {
    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Para variantes con border, no usar bg
    const useBorder = ['dashed', 'dotted'].includes($variant);

    // Construir clases de color según la variante
    const getColorClasses = () => {
      if ($variant === 'gradient') {
        return currentColorScheme.gradient;
      }
      return currentColorScheme.line;
    };

    return (
      <div
        className={cn(
          separatorVariants.base,
          separatorVariants.variants.variant[$variant],
          separatorVariants.variants.orientation[$orientation],
          getSizeClasses($orientation, $size),
          getColorClasses(),
          $variant === 'thick' && getSizeClasses($orientation, 'lg'),
          className,
          $custom
        )}
        role="separator"
        aria-orientation={$orientation}
        ref={ref}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator, type SeparatorProps };
