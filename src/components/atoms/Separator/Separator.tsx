import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface SeparatorProps extends BaseProps {
  $variant?: 'default' | 'dashed' | 'dotted' | 'thick' | 'gradient';
  $orientation?: 'horizontal' | 'vertical';
  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;
}

const separatorVariants = {
  base: 'shrink-0 bg-border transition-colors duration-200',
  variants: {
    variant: {
      default: 'bg-border',
      dashed: 'border-dashed bg-transparent border-t border-border',
      dotted: 'border-dotted bg-transparent border-t border-border',
      thick: 'bg-border',
      gradient: 'bg-gradient-to-r from-transparent via-border to-transparent',
    },
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    orientation: 'horizontal',
    size: 'default',
  },
};

// Función para obtener clases de tamaño según orientación
const getSizeClasses = (orientation: string, size: string) => {
  if (orientation === 'horizontal') {
    switch (size) {
      case 'sm':
        return 'h-[0.5px]';
      case 'lg':
        return 'h-[2px]';
      default:
        return 'h-[1px]';
    }
  } else {
    switch (size) {
      case 'sm':
        return 'w-[0.5px]';
      case 'lg':
        return 'w-[2px]';
      default:
        return 'w-[1px]';
    }
  }
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, $variant, $orientation, $size, $custom, ...props }, ref) => {
    const currentOrientation = $orientation || 'horizontal';
    const currentSize = $size || 'default';
    const currentVariant = $variant || 'default';

    // Para variantes con border, no usar bg
    const useBorder = ['dashed', 'dotted'].includes(currentVariant);

    return (
      <div
        className={cn(
          separatorVariants.base,
          !useBorder && separatorVariants.variants.variant[currentVariant],
          separatorVariants.variants.orientation[currentOrientation],
          getSizeClasses(currentOrientation, currentSize),
          useBorder && separatorVariants.variants.variant[currentVariant],
          currentVariant === 'thick' &&
            getSizeClasses(currentOrientation, 'lg'),
          className,
          $custom
        )}
        role="separator"
        aria-orientation={currentOrientation}
        ref={ref}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator, type SeparatorProps };

