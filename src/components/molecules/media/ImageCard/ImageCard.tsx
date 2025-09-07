import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Importar Atoms necesarios
import { Container } from '../../../atoms/layout/Container';
import { Badge } from '../../../atoms/feedback/Badge';
import { Image } from '../../../atoms/media/Image';
import { Text } from '../../../atoms/display/Text';
import { Divider } from '../../../atoms/layout/Divider';

interface ImageCardProps<T extends Record<string, any> = any>
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

  $size?: 'sm' | 'default' | 'lg';
  $variant?: 'default' | 'overlay' | 'compact' | 'detailed';
  $custom?: string;

  // Patrón storeKey
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del ImageCard
  title?: string;
  description?: string;
  src: string;
  alt?: string;

  // Configuración de imagen
  $aspect?: 'square' | '16/9' | '4/3' | '3/2' | '2/1' | 'auto';
  $objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  $objectPosition?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

  // Badge opcional
  badgeText?: string;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  // Configuración visual
  showBadge?: boolean;
  showOverlay?: boolean;
  showDivider?: boolean;
  enableHover?: boolean;
  loading?: boolean;

  // Contenido adicional
  action?: React.ReactNode;
  footerContent?: React.ReactNode;

  // Callbacks
  onClick?: () => void;
  onImageLoad?: () => void;
  onImageError?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    overlay: 'bg-black/60',
    hover: 'hover:shadow-lg hover:scale-[1.02]',
    focus: 'focus-visible:ring-ring/20',
  },
  primary: {
    container: 'bg-primary/5 border-primary/20',
    text: 'text-primary',
    textSecondary: 'text-primary/70',
    overlay: 'bg-primary/80',
    hover: 'hover:shadow-lg hover:bg-primary/10 hover:scale-[1.02]',
    focus: 'focus-visible:ring-primary/20',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20',
    text: 'text-secondary',
    textSecondary: 'text-secondary/70',
    overlay: 'bg-secondary/80',
    hover: 'hover:shadow-lg hover:bg-secondary/10 hover:scale-[1.02]',
    focus: 'focus-visible:ring-secondary/20',
  },
  destructive: {
    container: 'bg-destructive/5 border-destructive/20',
    text: 'text-destructive',
    textSecondary: 'text-destructive/70',
    overlay: 'bg-destructive/80',
    hover: 'hover:shadow-lg hover:bg-destructive/10 hover:scale-[1.02]',
    focus: 'focus-visible:ring-destructive/20',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20',
    text: 'text-accent',
    textSecondary: 'text-accent/70',
    overlay: 'bg-accent/80',
    hover: 'hover:shadow-lg hover:bg-accent/10 hover:scale-[1.02]',
    focus: 'focus-visible:ring-accent/20',
  },
  muted: {
    container: 'bg-muted border-muted',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    overlay: 'bg-muted/80',
    hover: 'hover:shadow-md hover:bg-muted/80 hover:scale-[1.01]',
    focus: 'focus-visible:ring-muted/20',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground',
    textSecondary: 'text-foreground/70',
    overlay: 'bg-foreground/60',
    hover: 'hover:bg-foreground/5 hover:scale-[1.01]',
    focus: 'focus-visible:ring-foreground/20',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    overlay: '',
    hover: '',
    focus: '',
  },
};

const badgePositions = {
  'top-left': 'top-2 left-2',
  'top-right': 'top-2 right-2',
  'bottom-left': 'bottom-2 left-2',
  'bottom-right': 'bottom-2 right-2',
};

const imageCardVariants = {
  base: 'relative rounded-lg border overflow-hidden transition-all duration-300',
  interactiveBase:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  variants: {
    size: {
      sm: 'max-w-xs',
      default: 'max-w-sm',
      lg: 'max-w-md',
    },
    variant: {
      default: 'shadow-sm',
      overlay: 'shadow-md group',
      compact: 'shadow-none',
      detailed: 'shadow-md',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      title,
      description,
      src,
      alt = 'Imagen',
      $aspect = 'auto',
      $objectFit = 'cover',
      $objectPosition = 'center',
      badgeText,
      badgePosition = 'top-right',
      showBadge = false,
      showOverlay = false,
      showDivider = true,
      enableHover = true,
      loading = false,
      action,
      footerContent,
      onClick,
      onImageLoad,
      onImageError,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Determinar si es interactivo
    const isInteractive = onClick !== undefined;

    return (
      <Container
        ref={ref}
        className={cn(
          imageCardVariants.base,
          currentColorScheme.container,
          imageCardVariants.variants.size[$size],
          imageCardVariants.variants.variant[$variant],
          enableHover && currentColorScheme.hover,
          isInteractive && 'cursor-pointer',
          isInteractive && imageCardVariants.interactiveBase,
          isInteractive && currentColorScheme.focus,
          className,
          $custom
        )}
        onClick={isInteractive ? onClick : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        {...props}>
        {/* Contenedor de Imagen */}
        <Container
          className={cn(
            'relative',
            // Altura mínima para el estado de loading
            loading && 'min-h-48',
            $size === 'sm' && loading && 'min-h-32',
            $size === 'lg' && loading && 'min-h-64'
          )}>
          {/* Imagen Principal */}
          <Image
            src={src}
            alt={alt}
            $aspect={$aspect}
            $objectFit={$objectFit}
            $objectPosition={$objectPosition}
            $variant={$variant === 'overlay' ? 'default' : 'default'}
            className={cn(
              'w-full',
              // Cuando está en loading, asegurar que ocupe toda la altura
              loading && 'h-full',
              $variant === 'overlay' && 'group-hover:scale-105'
            )}
            $showSkeleton={loading}
            onImageLoad={onImageLoad}
            onImageError={onImageError}
          />

          {/* Badge opcional */}
          {showBadge && badgeText && (
            <Container
              className={cn('absolute z-10', badgePositions[badgePosition])}>
              <Badge
                $colorScheme={
                  $colorScheme === 'primary' ? 'accent' : $colorScheme
                }
                $size="sm"
                className="shadow-sm">
                {badgeText}
              </Badge>
            </Container>
          )}

          {/* Overlay con efecto hover para variante overlay */}
          {($variant === 'overlay' || showOverlay) && (
            <Container
              className={cn(
                'absolute inset-0 flex flex-col justify-end p-4',
                $variant === 'overlay'
                  ? 'opacity-0 group-hover:opacity-100'
                  : 'bg-gradient-to-t from-black/70 to-transparent',
                'transition-opacity duration-300'
              )}>
              {title && (
                <Text
                  $size={
                    $size === 'sm' ? 'base' : $size === 'lg' ? 'lg' : 'base'
                  }
                  $weight="semibold"
                  className="text-white mb-1">
                  {title}
                </Text>
              )}

              {description && (
                <Text $size="sm" className="text-white/90 line-clamp-2">
                  {description}
                </Text>
              )}
            </Container>
          )}
        </Container>

        {/* Contenido de texto (solo para variantes que no son overlay) */}
        {$variant !== 'overlay' && (title || description) && (
          <Container
            className={cn(
              'p-4',
              $variant === 'compact' && 'p-3',
              $variant === 'detailed' && 'p-6'
            )}>
            {/* Título */}
            {title && (
              <Text
                $size={$size === 'sm' ? 'base' : $size === 'lg' ? 'lg' : 'base'}
                $weight="semibold"
                className={cn(currentColorScheme.text, 'line-clamp-2 mb-1')}>
                {title}
              </Text>
            )}

            {/* Descripción */}
            {description && (
              <Text
                $size={$size === 'sm' ? 'xs' : 'sm'}
                className={cn(
                  currentColorScheme.textSecondary,
                  $variant === 'detailed' ? 'line-clamp-3' : 'line-clamp-2'
                )}>
                {description}
              </Text>
            )}
          </Container>
        )}

        {/* Separador opcional */}
        {showDivider && (title || description) && (action || footerContent) && (
          <Divider className="" $colorScheme="muted" />
        )}

        {/* Contenido del footer (botones, acciones, etc.) */}
        {(action || footerContent) && (
          <Container
            className={cn(
              'p-4',
              $variant === 'compact' && 'p-3',
              $variant === 'detailed' && 'p-6'
            )}>
            {action}
            {footerContent}
          </Container>
        )}

        {/* Para debug: mostrar valor del store */}
        {process.env.NODE_ENV === 'development' && storeValue && (
          <Container className="absolute bottom-0 right-0 p-1 bg-black/80 text-white text-xs rounded-tl">
            {String(storeValue)}
          </Container>
        )}
      </Container>
    );
  }
);

ImageCard.displayName = 'ImageCard';

export { ImageCard, type ImageCardProps };

