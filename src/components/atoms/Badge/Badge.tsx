import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface BadgeProps extends BaseProps {
  $variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'outline';
  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;
  children: React.ReactNode;
}

const badgeVariants = {
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    variant: {
      default:
        'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
      secondary:
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
      warning:
        'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
      outline:
        'border-border text-foreground hover:bg-accent hover:text-accent-foreground',
    },
    size: {
      sm: 'px-1.5 py-0.5 text-xs',
      default: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, $variant, $size, $custom, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          badgeVariants.base,
          badgeVariants.variants.variant[$variant || 'default'],
          badgeVariants.variants.size[$size || 'default'],
          className,
          $custom
        )}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };

