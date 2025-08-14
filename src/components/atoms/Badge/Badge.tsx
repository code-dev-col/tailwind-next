import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface BadgeProps extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  // Legacy variant support (mapped to colorScheme automatically)
  $variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'outline';
  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;
  children: React.ReactNode;
}

// 🎨 Sistema de esquemas de color con theme.css
const colorSchemes = {
  default: {
    base: 'bg-primary text-primary-foreground border-primary',
    hover: 'hover:bg-primary/80',
    focus: 'focus:ring-primary/20',
  },
  secondary: {
    base: 'bg-secondary text-secondary-foreground border-secondary',
    hover: 'hover:bg-secondary/80',
    focus: 'focus:ring-secondary/20',
  },
  destructive: {
    base: 'bg-destructive text-destructive-foreground border-destructive',
    hover: 'hover:bg-destructive/80',
    focus: 'focus:ring-destructive/20',
  },
  accent: {
    base: 'bg-accent text-accent-foreground border-accent',
    hover: 'hover:bg-accent/80',
    focus: 'focus:ring-accent/20',
  },
  muted: {
    base: 'bg-muted text-muted-foreground border-muted',
    hover: 'hover:bg-muted/80',
    focus: 'focus:ring-muted/20',
  },
  minimal: {
    base: 'bg-transparent text-foreground border-transparent',
    hover: 'hover:bg-foreground/10',
    focus: 'focus:ring-foreground/20',
  },
  custom: {
    base: '', // Vacío para personalización externa
    hover: '',
    focus: '',
  },
};

const badgeVariants = {
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',

  // Legacy variant support (mantener para backward compatibility)
  variants: {
    variant: {
      default:
        'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary:
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      success: 'border-transparent bg-green-500 text-white hover:bg-green-600', // Legacy hardcoded
      warning:
        'border-transparent bg-yellow-500 text-white hover:bg-yellow-600', // Legacy hardcoded
      outline:
        'border-border text-foreground hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-xs',
      default: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },

  // Variantes especiales que no tienen equivalente directo en colorSchemes
  special: {
    success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
    warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
    outline:
      'border-border text-foreground hover:bg-accent hover:text-accent-foreground',
  },

  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $variant = 'default',
      $size,
      $custom,
      children,
      ...props
    },
    ref
  ) => {
    // Determinar esquema de color final (con backward compatibility)
    const finalColorScheme = React.useMemo(() => {
      // Prioridad: $colorScheme (si no es default) > legacy $variant > default
      if ($colorScheme !== 'default') return $colorScheme;

      // Mapeo de legacy variants a colorSchemes
      const legacyMap: Record<string, keyof typeof colorSchemes> = {
        default: 'default',
        secondary: 'secondary',
        destructive: 'destructive',
        accent: 'accent',
      };

      return legacyMap[$variant] || 'default';
    }, [$colorScheme, $variant]);

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[finalColorScheme];

    // Determinar si usar variantes especiales (success, warning, outline)
    const isSpecialVariant = ['success', 'warning', 'outline'].includes(
      $variant
    );

    const sizeClasses = badgeVariants.variants.size[$size || 'default'];

    // Si hay $custom, le damos prioridad sobre todo
    const combinedClasses = $custom
      ? cn(
          badgeVariants.base,
          sizeClasses, // Mantenemos el tamaño
          className,
          $custom // $custom sobrescribe las variantes
        )
      : isSpecialVariant
        ? cn(
            badgeVariants.base,
            badgeVariants.special[
              $variant as keyof typeof badgeVariants.special
            ],
            sizeClasses,
            className
          )
        : cn(
            badgeVariants.base,
            'border-transparent', // Border común para badges
            currentColorScheme.base,
            currentColorScheme.hover,
            currentColorScheme.focus,
            sizeClasses,
            className
          );

    return (
      <div className={combinedClasses} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };

