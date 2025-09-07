import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

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

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

// 🎨 Sistema de esquemas de color con theme.css
const colorSchemes = {
  default: {
    base: 'bg-primary border-primary',
    hover: 'hover:bg-primary/80',
    focus: 'focus:ring-primary/20',
    text: 'text-white',
  },
  secondary: {
    base: 'bg-secondary border-secondary',
    hover: 'hover:bg-secondary/80',
    focus: 'focus:ring-secondary/20',
    text: 'text-white',
  },
  destructive: {
    base: 'bg-destructive border-destructive',
    hover: 'hover:bg-destructive/80',
    focus: 'focus:ring-destructive/20',
    text: 'text-white',
  },
  accent: {
    base: 'bg-accent border-accent',
    hover: 'hover:bg-accent/80',
    focus: 'focus:ring-accent/20',
    text: 'text-white',
  },
  muted: {
    base: 'bg-muted border-muted',
    hover: 'hover:bg-muted/80',
    focus: 'focus:ring-muted/20',
    text: 'text-muted-foreground',
  },
  minimal: {
    base: 'bg-transparent border-transparent',
    hover: 'hover:bg-foreground/10',
    focus: 'focus:ring-foreground/20',
    text: 'text-foreground/70',
  },
  success: {
    base: 'bg-success border-success',
    hover: 'hover:bg-success/80',
    focus: 'focus:ring-success/20',
    text: 'text-white',
  },
  warning: {
    base: 'bg-warning border-warning',
    hover: 'hover:bg-warning/80',
    focus: 'focus:ring-warning/20',
    text: 'text-white',
  },
  outline: {
    base: 'bg-transparent border-border',
    hover: 'hover:bg-accent hover:text-white',
    focus: 'focus:ring-accent/20',
    text: 'text-foreground',
  },
  custom: {
    base: '', // Vacío para personalización externa
    hover: '',
    focus: '',
    text: '',
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
      onClick,
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
          currentColorScheme.text,
          sizeClasses,
          className
        );

    return (
      <div
        className={combinedClasses}
        ref={ref}
        onClick={onClick}
        style={onClick ? { cursor: 'pointer' } : undefined}
        {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };
