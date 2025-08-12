import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

// Importar spinners de react-spinners
import {
  BounceLoader,
  ClipLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SyncLoader,
  BeatLoader,
  CircleLoader,
  ClimbingBoxLoader,
  BarLoader,
  SquareLoader,
} from 'react-spinners';

export type SpinnerType =
  | 'bounce'
  | 'clip'
  | 'dot'
  | 'fade'
  | 'grid'
  | 'hash'
  | 'moon'
  | 'pacman'
  | 'propagate'
  | 'pulse'
  | 'ring'
  | 'rise'
  | 'rotate'
  | 'scale'
  | 'sync'
  | 'beat'
  | 'circle'
  | 'climbing'
  | 'bar'
  | 'square';

interface SpinnerProps extends BaseProps {
  /**
   * Tipo de spinner a mostrar
   */
  $type?: SpinnerType;

  /**
   * Color del spinner (puede ser cualquier color CSS válido)
   */
  $color?: string;

  /**
   * Tamaño predefinido del spinner
   */
  $size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Ancho personalizado del spinner
   */
  $width?: number | string;

  /**
   * Alto personalizado del spinner
   */
  $height?: number | string;

  /**
   * Si está cargando (controla la visibilidad)
   */
  $loading?: boolean;

  /**
   * Velocidad de la animación (algunos spinners lo soportan)
   */
  $speedMultiplier?: number;

  /**
   * Texto de carga opcional
   */
  $loadingText?: string;

  /**
   * Posición del texto respecto al spinner
   */
  $textPosition?: 'top' | 'bottom' | 'left' | 'right';

  /**
   * Centrar el spinner en su contenedor
   */
  $centered?: boolean;

  /**
   * Overlay de fondo (útil para loading states)
   */
  $overlay?: boolean;

  /**
   * Clases adicionales de Tailwind
   */
  $custom?: string;
}

const spinnerSizes = {
  xs: { size: 16, barHeight: 2 },
  sm: { size: 24, barHeight: 3 },
  md: { size: 32, barHeight: 4 },
  lg: { size: 48, barHeight: 6 },
  xl: { size: 64, barHeight: 8 },
  '2xl': { size: 96, barHeight: 12 },
};

// Mapeo de componentes de spinner
const SpinnerComponents = {
  bounce: BounceLoader,
  clip: ClipLoader,
  dot: DotLoader,
  fade: FadeLoader,
  grid: GridLoader,
  hash: HashLoader,
  moon: MoonLoader,
  pacman: PacmanLoader,
  propagate: PropagateLoader,
  pulse: PulseLoader,
  ring: RingLoader,
  rise: RiseLoader,
  rotate: RotateLoader,
  scale: ScaleLoader,
  sync: SyncLoader,
  beat: BeatLoader,
  circle: CircleLoader,
  climbing: ClimbingBoxLoader,
  bar: BarLoader,
  square: SquareLoader,
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      className,
      $type = 'clip',
      $color = 'hsl(var(--primary))',
      $size = 'md',
      $width,
      $height,
      $loading = true,
      $speedMultiplier = 1,
      $loadingText,
      $textPosition = 'bottom',
      $centered = false,
      $overlay = false,
      $custom,
      ...props
    },
    ref
  ) => {
    // Si no está cargando, no renderizar nada
    if (!$loading) {
      return null;
    }

    // Obtener el componente de spinner
    const SpinnerComponent = SpinnerComponents[$type];

    // Calcular tamaño
    const sizeConfig = spinnerSizes[$size];
    const finalWidth = $width || sizeConfig.size;
    const finalHeight = $height || sizeConfig.size;

    // Props para el spinner
    const spinnerProps = {
      loading: $loading,
      color: $color,
      size: $type === 'bar' ? undefined : finalWidth,
      width: $type === 'bar' ? finalWidth : undefined,
      height: $type === 'bar' ? sizeConfig.barHeight : finalHeight,
      speedMultiplier: $speedMultiplier,
    };

    // Clases del contenedor
    const containerClasses = cn(
      'inline-flex items-center justify-center',
      $centered && 'w-full h-full',
      $overlay && [
        'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm',
        'flex items-center justify-center',
      ],
      $loadingText && {
        'flex-col space-y-2':
          $textPosition === 'top' || $textPosition === 'bottom',
        'flex-row space-x-3':
          $textPosition === 'left' || $textPosition === 'right',
      },
      className,
      $custom
    );

    // Clases del texto
    const textClasses = cn('text-sm text-muted-foreground', {
      'order-first': $textPosition === 'top' || $textPosition === 'left',
      'order-last': $textPosition === 'bottom' || $textPosition === 'right',
    });

    const renderSpinner = () => <SpinnerComponent {...spinnerProps} />;

    const renderText = () =>
      $loadingText && <span className={textClasses}>{$loadingText}</span>;

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {($textPosition === 'top' || $textPosition === 'left') && renderText()}
        {renderSpinner()}
        {($textPosition === 'bottom' || $textPosition === 'right') &&
          renderText()}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner, type SpinnerProps };

