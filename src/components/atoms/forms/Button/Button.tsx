import { BaseProps } from '@/types';
import React from 'react';
import { cn } from '@/utils/cn';
import { IconType } from 'react-icons';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

// 🎨 Sistema de esquemas de color con theme.css
const colorSchemes = {
  default: {
    base: 'bg-primary text-primary-foreground border-primary',
    hover: 'hover:bg-primary/90',
    focus: 'focus-visible:ring-primary/20',
    disabled: 'disabled:opacity-50',
  },
  secondary: {
    base: 'bg-secondary text-secondary-foreground border-secondary',
    hover: 'hover:bg-secondary/80',
    focus: 'focus-visible:ring-secondary/20',
    disabled: 'disabled:opacity-50',
  },
  destructive: {
    base: 'bg-destructive text-destructive-foreground border-destructive',
    hover: 'hover:bg-destructive/90',
    focus: 'focus-visible:ring-destructive/20',
    disabled: 'disabled:opacity-50',
  },
  accent: {
    base: 'bg-accent text-accent-foreground border-accent',
    hover: 'hover:bg-accent/90',
    focus: 'focus-visible:ring-accent/20',
    disabled: 'disabled:opacity-50',
  },
  muted: {
    base: 'bg-muted text-muted-foreground border-muted',
    hover: 'hover:bg-muted/80',
    focus: 'focus-visible:ring-muted/20',
    disabled: 'disabled:opacity-50',
  },
  minimal: {
    base: 'bg-transparent text-foreground border-transparent',
    hover: 'hover:bg-foreground/10',
    focus: 'focus-visible:ring-foreground/20',
    disabled: 'disabled:opacity-50',
  },
  outline: {
    base: 'bg-transparent text-foreground border-border',
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus-visible:ring-accent/20',
    disabled: 'disabled:opacity-50',
  },
  ghost: {
    base: 'bg-transparent text-foreground border-transparent',
    hover: 'hover:bg-accent hover:text-accent-foreground',
    focus: 'focus-visible:ring-accent/20',
    disabled: 'disabled:opacity-50',
  },
  link: {
    base: 'bg-transparent text-primary border-transparent underline-offset-4',
    hover: 'hover:underline',
    focus: 'focus-visible:ring-primary/20',
    disabled: 'disabled:opacity-50',
  },
  custom: {
    base: '', // Vacío para personalización externa
    hover: '',
    focus: '',
    disabled: 'disabled:opacity-50',
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'custom';

  $size?: ButtonSize;
  $asChild?: boolean;
  $iconLeft?: IconType;
  $iconRight?: IconType;
  $custom?: string;
}

const buttonVariants = {
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  },
};

export function Button({
  className = '',
  $colorScheme = 'default',
  $size = 'default',
  children,
  $custom,
  $iconLeft,
  $iconRight,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm';

  // Obtener esquema de color activo
  const currentColorScheme = colorSchemes[$colorScheme];
  const sizeClasses = buttonVariants.size[$size];

  // Obtener el tamaño del icono basado en el tamaño del botón
  const getIconSize = () => {
    switch ($size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-5 h-5';
      case 'icon':
        return 'w-4 h-4';
      default:
        return 'w-4 h-4';
    }
  };

  const iconClasses = getIconSize();

  // Si hay $custom, le damos prioridad sobre todo
  const combinedClasses = $custom
    ? cn(
        baseClasses,
        sizeClasses, // Mantenemos el tamaño
        className,
        $custom // $custom sobrescribe las variantes
      )
    : cn(
        baseClasses,
        currentColorScheme.base,
        currentColorScheme.hover,
        currentColorScheme.focus,
        currentColorScheme.disabled,
        sizeClasses,
        className
      );

  return (
    <button className={combinedClasses} {...props}>
      {$iconLeft && (
        <$iconLeft className={cn(iconClasses, children ? 'mr-2' : '')} />
      )}
      {children}
      {$iconRight && (
        <$iconRight className={cn(iconClasses, children ? 'ml-2' : '')} />
      )}
    </button>
  );
}

