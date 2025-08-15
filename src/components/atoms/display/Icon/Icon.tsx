import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

interface IconProps extends BaseProps {
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';
  $size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  $custom?: string;
  icon: IconType;
  onClick?: () => void;
}

// Color schemes using theme.css variables
const colorSchemes = {
  default: {
    text: 'text-foreground',
    hover: 'hover:text-foreground/80',
  },
  secondary: {
    text: 'text-secondary',
    hover: 'hover:text-secondary/80',
  },
  destructive: {
    text: 'text-destructive',
    hover: 'hover:text-destructive/80',
  },
  accent: {
    text: 'text-accent-foreground',
    hover: 'hover:text-accent-foreground/80',
  },
  muted: {
    text: 'text-muted-foreground',
    hover: 'hover:text-foreground',
  },
  minimal: {
    text: 'text-muted-foreground/70',
    hover: 'hover:text-muted-foreground',
  },
  custom: {
    text: '',
    hover: '',
  },
};

const iconVariants = {
  base: 'inline-flex items-center justify-center transition-colors duration-200 shrink-0',
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      default: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    },
  },
  defaultVariants: {
    colorScheme: 'default',
    size: 'default',
  },
};

const Icon = React.forwardRef<HTMLDivElement, IconProps>(
  (
    {
      className,
      $colorScheme = 'default',
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

    // Get color scheme classes
    const colorSchemeClasses = colorSchemes[$colorScheme];

    return (
      <div
        className={cn(
          iconVariants.base,
          // Apply color scheme classes
          colorSchemeClasses.text,
          colorSchemeClasses.hover,
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

