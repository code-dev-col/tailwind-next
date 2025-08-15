import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';

interface LabelProps extends BaseProps {
  $variant?: 'default' | 'required' | 'optional' | 'disabled';
  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

const labelVariants = {
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200',
  variants: {
    variant: {
      default: 'text-foreground',
      required:
        "text-foreground after:content-['*'] after:ml-0.5 after:text-destructive",
      optional:
        "text-muted-foreground after:content-['(optional)'] after:ml-1 after:text-xs after:font-normal",
      disabled: 'text-muted-foreground cursor-not-allowed opacity-70',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    { className, $variant, $size, $custom, children, htmlFor, ...props },
    ref
  ) => {
    return (
      <label
        htmlFor={htmlFor}
        className={cn(
          labelVariants.base,
          labelVariants.variants.variant[$variant || 'default'],
          labelVariants.variants.size[$size || 'default'],
          className,
          $custom
        )}
        ref={ref}
        {...props}>
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label, type LabelProps };

