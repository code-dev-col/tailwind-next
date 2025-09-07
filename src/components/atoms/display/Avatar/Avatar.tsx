import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import type { UseBoundStore, StoreApi } from 'zustand';

interface AvatarProps<T extends Record<string, any> = any> extends BaseProps {
  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Variants
  $variant?: 'default' | 'circle' | 'square';
  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';

  // Theme.css color scheme
  $colorScheme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  // Content
  src?: string;
  alt?: string;
  fallback?: string;

  // Interactions
  onClick?: () => void;

  // Status indicators
  $status?: 'online' | 'away' | 'busy' | 'offline' | 'none';
  $statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  // Styling
  $custom?: string;
}

/**
 * Generate fallback initials from name or email
 */
const generateFallback = (name?: string): string => {
  if (!name) return '?';

  // If it looks like an email, use the part before @
  if (name.includes('@')) {
    name = name.split('@')[0];
  }

  // Split by spaces and take first letter of each word, max 2
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

// 🎨 Sistema de esquemas de color con theme.css (usando variables :root sincronizadas)
const colorSchemes = {
  default: {
    base: 'bg-muted/10 text-muted-foreground border-border',
    hover: 'hover:bg-muted/15',
    disabled: 'opacity-50',
  },
  primary: {
    base: 'bg-primary/10 text-primary border-primary/20',
    hover: 'hover:bg-primary/15',
    disabled: 'opacity-50',
  },
  secondary: {
    base: 'bg-secondary/10 text-secondary border-secondary/20',
    hover: 'hover:bg-secondary/15',
    disabled: 'opacity-50',
  },
  destructive: {
    base: 'bg-destructive/10 text-destructive border-destructive/20',
    hover: 'hover:bg-destructive/15',
    disabled: 'opacity-50',
  },
  accent: {
    base: 'bg-accent/10 text-accent border-accent/20',
    hover: 'hover:bg-accent/15',
    disabled: 'opacity-50',
  },
  muted: {
    base: 'bg-muted text-muted-foreground border-border',
    hover: 'hover:bg-muted/80',
    disabled: 'opacity-50',
  },
  minimal: {
    base: 'bg-transparent text-foreground/70 border-transparent',
    hover: 'hover:bg-muted/10',
    disabled: 'opacity-50',
  },
  custom: {
    base: '',
    hover: '',
    disabled: '',
  },
};

// Variant configurations using Tailwind classes
const avatarVariants = {
  base: 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none border shadow-sm',
  baseWithOverflow: 'overflow-hidden', // Only apply overflow when no status indicator

  // Size variants
  size: {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    default: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
  },

  // Shape variants
  variant: {
    default: 'rounded-md',
    circle: 'rounded-full',
    square: 'rounded-none',
  },

  // Interactive states
  interactive:
    'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm',

  // Status indicator styles
  status: {
    base: 'absolute border-2 border-background rounded-full',
    size: {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      default: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4',
      '2xl': 'w-5 h-5',
    },
    position: {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
    },
    color: {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
      offline: 'bg-gray-400',
      none: '',
    },
  },
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps<any>>(
  (
    {
      className,
      $store,
      storeKey,
      $variant = 'circle',
      $size = 'default',
      $colorScheme = 'default',
      src,
      alt,
      fallback,
      onClick,
      $status = 'none',
      $statusPosition = 'bottom-right',
      $custom,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const [imgLoaded, setImgLoaded] = React.useState(false);

    // Store integration - get value from store if available
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Use store value as src if available, otherwise use fallback for text
    const finalSrc =
      storeValue && storeValue.startsWith('http') ? storeValue : src;
    const finalFallback = storeValue || fallback;

    const isClickable = Boolean(onClick);
    const hasStatus = $status !== 'none';

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    const handleImageLoad = () => {
      setImgLoaded(true);
      setImgError(false);
    };

    const handleImageError = () => {
      setImgError(true);
      setImgLoaded(false);
    };

    return (
      <div
        className={cn(
          // Base styles
          avatarVariants.base,

          // Apply overflow-hidden only when no status indicator
          !hasStatus && avatarVariants.baseWithOverflow,

          // Aplicar esquema de color
          currentColorScheme.base,
          currentColorScheme.hover,

          // Size
          avatarVariants.size[$size],

          // Shape
          avatarVariants.variant[$variant],

          // Interactive states
          isClickable && avatarVariants.interactive,

          // Position relative for status indicator
          hasStatus && 'relative',

          // Custom classes
          className,
          $custom
        )}
        onClick={onClick}
        ref={ref}
        {...props}>
        {/* Image rendering */}
        {finalSrc && !imgError ? (
          <img
            src={finalSrc}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imgLoaded ? 'block' : 'none' }}
          />
        ) : null}

        {/* Fallback text */}
        {(!finalSrc || imgError || !imgLoaded) && (
          <span className="pointer-events-none">
            {generateFallback(finalFallback)}
          </span>
        )}

        {/* Status indicator */}
        {hasStatus && (
          <div
            className={cn(
              avatarVariants.status.base,
              avatarVariants.status.size[$size],
              avatarVariants.status.position[$statusPosition],
              avatarVariants.status.color[$status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, type AvatarProps };
