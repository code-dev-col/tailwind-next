import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface IconProps extends BaseProps {
  $variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';
  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  $custom?: string;
  icon: IconType;
  onClick?: () => void;
}

const iconVariants = {
  base: 'inline-flex items-center justify-center transition-colors duration-200 shrink-0',
  variants: {
    variant: {
      default: 'text-foreground hover:text-foreground/80',
      primary: 'text-primary hover:text-primary/80',
      secondary: 'text-secondary-foreground hover:text-secondary-foreground/80',
      destructive: 'text-destructive hover:text-destructive/80',
      ghost: 'text-muted-foreground hover:text-foreground',
    },
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      default: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  (
    {
      className,
      $variant,
      $size,
      $custom,
      icon: IconComponent,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = Boolean(onClick);
    const currentSize = $size || 'default';

    return (
      <div
        className={cn(
          iconVariants.base,
          iconVariants.variants.variant[$variant || 'default'],
          isClickable && 'cursor-pointer hover:scale-110 active:scale-95',
          className,
          $custom
        )}
        onClick={onClick}
        ref={ref}
        {...props}>
        <IconComponent
          className={cn(iconVariants.variants.size[currentSize])}
        />
      </div>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon, type IconProps };

