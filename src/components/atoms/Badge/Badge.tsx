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
    | 'success'
    | 'warning'
    | 'outline'
    | 'custom';

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
  success: {
    base: 'bg-green-500 text-white border-green-500',
    hover: 'hover:bg-green-600',
    focus: 'focus:ring-green-500/20',
  },
  warning: {
    base: 'bg-yellow-500 text-white border-yellow-500',
    hover: 'hover:bg-yellow-600',
    focus: 'focus:ring-yellow-500/20',
  },
  outline: {
    base: 'bg-transparent text-foreground border-border',
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus:ring-accent/20',
  },
  custom: {
    base: '', // Vacío para personalización externa
    hover: '',
    focus: '',
  },
};

const badgeVariants = {
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',

  size: {
    sm: 'px-1.5 py-0.5 text-xs',
    default: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  },
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $custom,
      children,
      ...props
    },
    ref
  ) => {
    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];
    const sizeClasses = badgeVariants.size[$size];

    // Si hay $custom, le damos prioridad sobre todo
    const combinedClasses = $custom
      ? cn(
          badgeVariants.base,
          sizeClasses, // Mantenemos el tamaño
          className,
          $custom // $custom sobrescribe las variantes
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

