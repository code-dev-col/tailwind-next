import { BaseProps } from '@/types';
import React from 'react';
import { cn } from '@/utils/cn';
import { IconType } from 'react-icons';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

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
    | 'custom';

  // Legacy variant support (mapped to colorScheme automatically)
  $variant?: ButtonVariant;
  $size?: ButtonSize;
  $asChild?: boolean;
  $iconLeft?: IconType;
  $iconRight?: IconType;
}

const buttonVariants = {
  // Legacy variant support (mantener para backward compatibility)
  variant: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive:
      'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  },
  // Variantes especiales que no tienen equivalente en colorSchemes
  special: {
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground bg-transparent',
    link: 'text-primary underline-offset-4 hover:underline bg-transparent border-transparent',
  },
};

export function Button({
  className = '',
  $colorScheme = 'default',
  $variant = 'default',
  $size = 'default',
  children,
  $custom,
  $iconLeft,
  $iconRight,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm';

  // Determinar esquema de color final (con backward compatibility)
  const finalColorScheme = React.useMemo(() => {
    // Prioridad: $colorScheme (si no es default) > legacy $variant > default
    if ($colorScheme !== 'default') return $colorScheme;

    // Mapeo de legacy variants a colorSchemes
    const legacyMap: Record<string, keyof typeof colorSchemes> = {
      default: 'default',
      primary: 'default',
      secondary: 'secondary',
      destructive: 'destructive',
      accent: 'accent',
    };

    return legacyMap[$variant] || 'default';
  }, [$colorScheme, $variant]);

  // Obtener esquema de color activo
  const currentColorScheme = colorSchemes[finalColorScheme];

  // Determinar si usar variantes especiales (outline, ghost, link)
  const isSpecialVariant = ['outline', 'ghost', 'link'].includes($variant);

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
    : isSpecialVariant
      ? cn(
          baseClasses,
          buttonVariants.special[
            $variant as keyof typeof buttonVariants.special
          ],
          sizeClasses,
          className
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

