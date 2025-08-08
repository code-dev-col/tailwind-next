import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface SkeletonProps extends BaseProps {
  $variant?: 'default' | 'rounded' | 'circular' | 'text' | 'button';
  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  $custom?: string;
  $width?: string;
  $height?: string;
  $animate?: boolean;
  style?: React.CSSProperties;
}

const skeletonVariants = {
  base: 'bg-muted transition-all duration-200',
  variants: {
    variant: {
      default: 'rounded-md',
      rounded: 'rounded-lg',
      circular: 'rounded-full',
      text: 'rounded-sm h-4',
      button: 'rounded-md h-10',
    },
    size: {
      xs: 'h-3',
      sm: 'h-4',
      default: 'h-5',
      lg: 'h-6',
      xl: 'h-8',
    },
    animate: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    animate: true,
  },
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      $variant,
      $size,
      $custom,
      $width,
      $height,
      $animate = true,
      style,
      ...props
    },
    ref
  ) => {
    const currentVariant = $variant || 'default';
    const currentSize = $size || 'default';

    // Determinar dimensiones
    const getDimensions = () => {
      if ($width || $height) {
        return {
          width: $width || 'auto',
          height: $height || 'auto',
        };
      }

      // Dimensiones predefinidas según variante
      switch (currentVariant) {
        case 'circular':
          const circularSize = {
            xs: '24px',
            sm: '32px',
            default: '40px',
            lg: '48px',
            xl: '64px',
          }[currentSize];
          return { width: circularSize, height: circularSize };

        case 'text':
          return { width: '100%', height: 'auto' };

        case 'button':
          const buttonWidth = {
            xs: '60px',
            sm: '80px',
            default: '120px',
            lg: '160px',
            xl: '200px',
          }[currentSize];
          return { width: buttonWidth, height: '40px' };

        default:
          const defaultWidth = {
            xs: '40px',
            sm: '60px',
            default: '80px',
            lg: '120px',
            xl: '160px',
          }[currentSize];
          return { width: defaultWidth, height: 'auto' };
      }
    };

    const dimensions = getDimensions();
    const combinedStyle = {
      ...style,
      ...dimensions,
    };

    return (
      <div
        className={cn(
          skeletonVariants.base,
          skeletonVariants.variants.variant[currentVariant],
          // Solo aplicar height de size si no es circular o button
          !['circular', 'button'].includes(currentVariant) &&
            skeletonVariants.variants.size[currentSize],
          $animate && skeletonVariants.variants.animate.true,
          className,
          $custom
        )}
        style={combinedStyle}
        ref={ref}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton, type SkeletonProps };

