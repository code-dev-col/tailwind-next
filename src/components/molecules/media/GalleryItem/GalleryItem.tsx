import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Importar TODOS los Atoms necesarios (Layout + Others)
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Center } from '../../../atoms/layout/Center';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { Icon } from '../../../atoms/display/Icon';
import { Image } from '../../../atoms/media/Image';
import { FiEye, FiHeart, FiDownload } from 'react-icons/fi';

interface GalleryItemProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del molecule
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  showOverlay?: boolean;

  // Callbacks
  onClick?: () => void;
  onView?: () => void;
  onLike?: () => void;
  onDownload?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    overlay: 'bg-black/60',
    icon: 'text-white',
  },
  primary: {
    container: 'bg-primary/10 border-primary/20',
    text: 'text-primary',
    overlay: 'bg-primary/80',
    icon: 'text-primary-foreground',
  },
  secondary: {
    container: 'bg-secondary/10 border-secondary/20',
    text: 'text-secondary',
    overlay: 'bg-secondary/80',
    icon: 'text-secondary-foreground',
  },
  accent: {
    container: 'bg-accent/10 border-accent/20',
    text: 'text-accent',
    overlay: 'bg-accent/80',
    icon: 'text-accent-foreground',
  },
  destructive: {
    container: 'bg-destructive/10 border-destructive/20',
    text: 'text-destructive',
    overlay: 'bg-destructive/80',
    icon: 'text-destructive-foreground',
  },
  muted: {
    container: 'bg-muted border-muted',
    text: 'text-muted-foreground',
    overlay: 'bg-muted/80',
    icon: 'text-muted-foreground',
  },
  minimal: {
    container: 'bg-transparent',
    text: 'text-foreground',
    overlay: 'bg-foreground/60',
    icon: 'text-white',
  },
  custom: {
    container: '',
    text: '',
    overlay: '',
    icon: '',
  },
};

const galleryItemVariants = {
  base: 'relative rounded-lg overflow-hidden shadow-sm group transition-all duration-300',
  variants: {
    size: {
      sm: 'w-48 h-48',
      default: 'w-64 h-64',
      lg: 'w-80 h-80',
    },
    variant: {
      default: '',
      compact: 'rounded-md',
      detailed: 'rounded-xl shadow-lg',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const GalleryItem = React.forwardRef<HTMLDivElement, GalleryItemProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      src,
      alt,
      title,
      subtitle,
      showOverlay = true,
      onClick,
      onView,
      onLike,
      onDownload,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    return (
      <Container
        ref={ref}
        className={cn(
          galleryItemVariants.base,
          galleryItemVariants.variants.size[$size],
          galleryItemVariants.variants.variant[$variant],
          currentColorScheme.container,
          'hover:shadow-xl',
          className,
          $custom
        )}
        onClick={onClick}
        {...props}>
        <Image
          src={src}
          alt={alt || title || 'Gallery item'}
          $fill
          $objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {showOverlay && (
          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              currentColorScheme.overlay
            )}
          />
        )}

        {/* Texto siempre visible cuando showOverlay es false */}
        {!showOverlay && (title || subtitle) && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            {title && (
              <Text $weight="bold" className="text-white">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text $size="sm" className="text-white/80">
                {subtitle}
              </Text>
            )}
          </div>
        )}

        {/* Texto con hover cuando showOverlay es true */}
        {showOverlay && (title || subtitle) && (
          <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {title && (
              <Text $weight="bold" className={cn(currentColorScheme.icon)}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                $size="sm"
                className={cn(currentColorScheme.icon, 'opacity-80')}>
                {subtitle}
              </Text>
            )}
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onView && (
            <Button $size="icon" $colorScheme="minimal" onClick={onView}>
              <Icon icon={FiEye} className={currentColorScheme.icon} />
            </Button>
          )}
          {onLike && (
            <Button $size="icon" $colorScheme="minimal" onClick={onLike}>
              <Icon icon={FiHeart} className={currentColorScheme.icon} />
            </Button>
          )}
          {onDownload && (
            <Button $size="icon" $colorScheme="minimal" onClick={onDownload}>
              <Icon icon={FiDownload} className={currentColorScheme.icon} />
            </Button>
          )}
        </div>
      </Container>
    );
  }
);

GalleryItem.displayName = 'GalleryItem';

export { GalleryItem, type GalleryItemProps };

