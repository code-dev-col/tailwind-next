import React, { useState } from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

// Tipos para Next.js Image props
interface NextImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  unoptimized?: boolean;
  loader?: (props: { src: string; width: number; quality?: number }) => string;
  onLoad?: () => void;
  onError?: () => void;
}

interface ImageProps
  extends BaseProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /**
   * URL de la imagen
   */
  src: string;

  /**
   * Texto alternativo para accesibilidad
   */
  alt: string;

  /**
   * Ancho de la imagen
   */
  width?: number;

  /**
   * Alto de la imagen
   */
  height?: number;

  /**
   * Relación de aspecto predefinida
   */
  $aspect?: 'square' | '16/9' | '4/3' | '3/2' | '2/1' | 'auto';

  /**
   * Modo de ajuste de la imagen
   */
  $objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /**
   * Posición del objeto
   */
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

  /**
   * Modo de carga
   */
  $loading?: 'lazy' | 'eager';

  /**
   * Variante visual del contenedor
   */
  $variant?:
    | 'default'
    | 'rounded'
    | 'circle'
    | 'square'
    | 'bordered'
    | 'overflow';

  /**
   * Tamaño predefinido
   */
  $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Contenido de fallback cuando la imagen falla al cargar
   */
  $fallback?: React.ReactNode;

  /**
   * Mostrar skeleton mientras carga
   */
  $showSkeleton?: boolean;

  /**
   * Si la imagen debe llenar el contenedor padre
   */
  $fill?: boolean;

  /**
   * Usar Next.js Image automáticamente (por defecto true)
   */
  $useNextImage?: boolean;

  /**
   * Props adicionales para Next.js Image
   */
  $nextProps?: Partial<NextImageProps>;

  /**
   * Clases adicionales de Tailwind
   */
  $custom?: string;

  /**
   * Si debe tener fondo transparente (sin bg-muted)
   */
  $transparent?: boolean;

  /**
   * Callback cuando la imagen carga exitosamente
   */
  onImageLoad?: () => void;

  /**
   * Callback cuando la imagen falla al cargar
   */
  onImageError?: () => void;
}

const imageVariants = {
  base: ['transition-all', 'duration-300'].join(' '),

  variants: {
    variant: {
      default: 'rounded-md shadow-sm',
      rounded: 'rounded-lg shadow-md',
      circle: 'rounded-full shadow-md',
      square: 'rounded-none shadow-sm',
      bordered: 'rounded-md border-2 border-border shadow-sm',
      overflow: 'rounded-none', // Sin shadow ni border para overflow
    },

    size: {
      xs: 'w-8 h-8',
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
      xl: 'w-32 h-32',
      '2xl': 'w-48 h-48',
    },

    aspect: {
      square: 'aspect-square',
      '16/9': 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
      '2/1': 'aspect-[2/1]',
      auto: '',
    },

    objectFit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      'scale-down': 'object-scale-down',
    },

    objectPosition: {
      center: 'object-center',
      top: 'object-top',
      bottom: 'object-bottom',
      left: 'object-left',
      right: 'object-right',
      'top-left': 'object-left-top',
      'top-right': 'object-right-top',
      'bottom-left': 'object-left-bottom',
      'bottom-right': 'object-right-bottom',
    },

    fill: {
      true: 'w-full h-full',
      false: '',
    },
  },

  defaultVariants: {
    variant: 'default' as const,
    objectFit: 'cover' as const,
    objectPosition: 'center' as const,
    loading: 'lazy' as const,
    fill: false as const,
  },
};

// Detectar automáticamente si Next.js Image está disponible
const detectNextImage = (): React.ComponentType<any> | null => {
  try {
    const NextImage = require('next/image').default;
    return NextImage;
  } catch {
    return null;
  }
};

// Componente Skeleton para loading
const ImageSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'animate-pulse bg-muted w-full h-full min-h-[12rem]',
      className
    )}
  />
);

// Componente de Fallback por defecto
const DefaultFallback: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'flex items-center justify-center bg-muted text-muted-foreground w-full h-full min-h-[12rem]',
      className
    )}>
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      width,
      height,
      $aspect = 'auto',
      $objectFit = 'cover',
      $objectPosition = 'center',
      $loading = 'lazy',
      $variant = 'default',
      $size,
      $fallback,
      $showSkeleton = true,
      $fill = false,
      $useNextImage = true,
      $nextProps = {},
      $custom,
      $transparent = false,
      onImageLoad,
      onImageError,
      style,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Detectar Next.js Image
    const NextImage = detectNextImage();
    const shouldUseNextImage = $useNextImage && NextImage && !hasError;

    // Debug temporal para verificar $transparent
    if (process.env.NODE_ENV === 'development' && $transparent) {
      console.log('🔍 Image with $transparent=true:', {
        src,
        $transparent,
        alt,
      });
    }

    // Clases del contenedor
    const containerClasses = cn(
      imageVariants.base,
      imageVariants.variants.variant[$variant],
      $size && imageVariants.variants.size[$size],
      $aspect !== 'auto' && imageVariants.variants.aspect[$aspect],
      $fill && imageVariants.variants.fill.true,
      'relative overflow-hidden',
      // Aplicar bg-muted solo si no es transparente
      !$transparent && 'bg-muted',
      className,
      $custom
    );

    // Clases de la imagen
    const imageClasses = cn(
      'w-full h-full transition-opacity duration-300',
      imageVariants.variants.objectFit[$objectFit],
      imageVariants.variants.objectPosition[$objectPosition],
      isLoading && shouldUseNextImage ? 'opacity-0' : 'opacity-100'
    );

    // Handlers
    const handleLoad = () => {
      setIsLoading(false);
      onImageLoad?.();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onImageError?.();
    };

    // Props base para imagen
    const baseImageProps = {
      alt,
      className: imageClasses,
      onLoad: handleLoad,
      onError: handleError,
      loading: $loading,
      ...props,
    };

    // Renderizar contenido
    const renderContent = () => {
      // Mostrar fallback si hay error
      if (hasError) {
        return $fallback || <DefaultFallback className={imageClasses} />;
      }

      // Usar Next.js Image
      if (shouldUseNextImage) {
        const nextImageProps = {
          src,
          alt,
          width: width || ($fill ? undefined : 400),
          height: height || ($fill ? undefined : 300),
          fill: $fill,
          className: imageClasses,
          onLoad: handleLoad,
          onError: handleError,
          ...$nextProps,
        };

        return <NextImage {...nextImageProps} />;
      }

      // Imagen HTML estándar
      return (
        <img
          ref={ref}
          src={src}
          width={width}
          height={height}
          style={style}
          {...baseImageProps}
        />
      );
    };

    return (
      <div className={containerClasses}>
        {/* Skeleton mientras carga */}
        {isLoading && $showSkeleton && !hasError && (
          <ImageSkeleton className="absolute inset-0" />
        )}

        {/* Imagen */}
        {renderContent()}
      </div>
    );
  }
);

Image.displayName = 'Image';

export { Image, type ImageProps, type NextImageProps };
