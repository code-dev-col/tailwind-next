import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface AvatarProps extends BaseProps {
  $variant?: 'default' | 'circle' | 'square';
  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl';
  $custom?: string;
  src?: string;
  alt?: string;
  fallback?: string;
  onClick?: () => void;
}

const avatarVariants = {
  base: 'inline-flex items-center justify-center font-normal text-foreground overflow-hidden shadow-sm border border-border bg-muted transition-all duration-200',
  variants: {
    variant: {
      default: 'rounded-md',
      circle: 'rounded-full',
      square: 'rounded-none',
    },
    size: {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      default: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-20 w-20 text-2xl',
    },
  },
  defaultVariants: {
    variant: 'circle',
    size: 'default',
  },
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      $variant,
      $size,
      $custom,
      src,
      alt,
      fallback,
      onClick,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const [imgLoaded, setImgLoaded] = React.useState(false);

    const isClickable = Boolean(onClick);

    // Función para generar iniciales del fallback
    const getInitials = (name?: string) => {
      if (!name) return '?';
      return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

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
          avatarVariants.base,
          avatarVariants.variants.variant[$variant || 'circle'],
          avatarVariants.variants.size[$size || 'default'],
          isClickable &&
            'cursor-pointer hover:shadow-md hover:scale-105 active:scale-95',
          className,
          $custom
        )}
        onClick={onClick}
        ref={ref}
        {...props}>
        {src && !imgError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imgLoaded ? 'block' : 'none' }}
          />
        ) : null}

        {(!src || imgError || !imgLoaded) && (
          <span className="select-none">{getInitials(fallback)}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, type AvatarProps };

