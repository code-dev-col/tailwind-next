import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import type { UseBoundStore, StoreApi } from 'zustand';

interface ProgressProps<T extends Record<string, any> = any> extends BaseProps {
  value?: number;
  max?: number;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Theme.css color scheme system
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'success'
    | 'warning'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;

  // Style options
  $shape?: 'rounded' | 'square' | 'circular';
  $striped?: boolean;
  $animated?: boolean;
  $showValue?: boolean;
  $showPercentage?: boolean;

  // Content
  label?: string;
  description?: string;

  // Circular progress specific
  $strokeWidth?: number;
  $circularSize?: number;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;
}

// Configuración de variantes usando theme.css
const progressVariants = {
  base: 'relative overflow-hidden transition-all duration-200 ease-in-out',

  // Tamaños usando theme.css tokens
  size: {
    sm: 'h-2',
    default: 'h-3',
    lg: 'h-4',
  },

  // Formas usando theme.css radii
  shape: {
    rounded: 'rounded-full',
    square: 'rounded-none',
    circular: 'rounded-full',
  },

  // Track (fondo) usando theme.css colors
  track: {
    default: 'bg-muted',
    secondary: 'bg-secondary/20',
    destructive: 'bg-destructive/20',
    accent: 'bg-accent/20',
    success: 'bg-success/20',
    warning: 'bg-warning/20',
    muted: 'bg-muted/50',
    minimal: 'bg-foreground/10',
    custom: '',
  },

  // Fill (progreso) usando theme.css colors
  fill: {
    default: 'bg-primary',
    secondary: 'bg-secondary',
    destructive: 'bg-destructive',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    muted: 'bg-muted-foreground',
    minimal: 'bg-foreground/80',
    custom: '',
  },

  // Stroke colors para progreso circular
  stroke: {
    default: 'stroke-primary',
    secondary: 'stroke-secondary',
    destructive: 'stroke-destructive',
    accent: 'stroke-accent',
    success: 'stroke-success',
    warning: 'stroke-warning',
    muted: 'stroke-muted-foreground',
    minimal: 'stroke-foreground/80',
    custom: '',
  },

  // Text colors usando theme.css
  text: {
    default: 'text-foreground',
    secondary: 'text-secondary-foreground',
    destructive: 'text-foreground',
    accent: 'text-accent-foreground',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    muted: 'text-muted-foreground',
    minimal: 'text-foreground',
    custom: 'text-foreground',
  },
};

// Animaciones usando Tailwind CSS
const progressAnimations = {
  striped:
    'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_1rem] animate-[slide_1s_ease-in-out_infinite]',
  pulse: 'animate-pulse',
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value: controlledValue,
      max = 100,
      $store,
      storeKey,
      $colorScheme = 'default',
      $size = 'default',
      $custom,
      $shape = 'rounded',
      $striped = false,
      $animated = false,
      $showValue = false,
      $showPercentage = false,
      label,
      description,
      $strokeWidth = 8,
      $circularSize = 120,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      id,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Value calculation
    const value = storeValue ?? controlledValue ?? 0;
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    // Circular progress calculations
    const radius = ($circularSize - $strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Common props
    const commonProps = {
      ref,
      className: cn(
        $shape === 'circular'
          ? 'inline-flex items-center justify-center'
          : 'w-full',
        className,
        $custom
      ),
      role: 'progressbar',
      'aria-valuenow': value,
      'aria-valuemin': 0,
      'aria-valuemax': max,
      'aria-label': ariaLabel || label,
      'aria-describedby': ariaDescribedBy,
      id,
      ...props,
    };

    // Render circular progress
    if ($shape === 'circular') {
      return (
        <div
          {...commonProps}
          className={cn(
            'relative inline-flex items-center justify-center',
            className,
            $custom
          )}
          style={{ width: $circularSize, height: $circularSize }}>
          <svg
            className="transform -rotate-90"
            width={$circularSize}
            height={$circularSize}>
            {/* Background track usando theme.css */}
            <circle
              cx={$circularSize / 2}
              cy={$circularSize / 2}
              r={radius}
              strokeWidth={$strokeWidth}
              fill="none"
              className={cn(
                'transition-all duration-200 ease-in-out',
                'stroke-muted/30' // Color consistente para el track circular
              )}
            />
            {/* Progress fill usando theme.css */}
            <circle
              cx={$circularSize / 2}
              cy={$circularSize / 2}
              r={radius}
              strokeWidth={$strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                'transition-all duration-300 ease-out',
                progressVariants.stroke[$colorScheme] || 'stroke-primary', // Usar stroke predefinido
                $animated && 'animate-pulse'
              )}
            />
          </svg>

          {/* Center content - Posicionado absoluto respecto al contenedor del SVG */}
          {($showValue || $showPercentage) && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                width: $circularSize,
                height: $circularSize,
                top: 0,
                left: 0,
              }}>
              <span
                className={cn(
                  'font-medium text-center',
                  progressVariants.text[$colorScheme],
                  $size === 'sm' && 'text-xs',
                  $size === 'default' && 'text-sm',
                  $size === 'lg' && 'text-base'
                )}>
                {$showPercentage ? `${Math.round(percentage)}%` : value}
              </span>
            </div>
          )}
        </div>
      );
    }

    // Render linear progress
    const progressElement = (
      <div {...commonProps}>
        {/* Track usando theme.css */}
        <div
          className={cn(
            progressVariants.base,
            progressVariants.size[$size],
            progressVariants.shape[$shape],
            progressVariants.track[$colorScheme]
          )}>
          {/* Fill usando theme.css */}
          <div
            className={cn(
              'h-full transition-all duration-300 ease-out',
              progressVariants.shape[$shape],
              progressVariants.fill[$colorScheme],
              $striped && progressAnimations.striped,
              $animated && progressAnimations.pulse
            )}
            style={{
              width: `${percentage}%`,
            }}
          />

          {/* Value overlay */}
          {($showValue || $showPercentage) && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                'font-medium',
                progressVariants.text[$colorScheme],
                $size === 'sm' && 'text-xs',
                $size === 'default' && 'text-sm',
                $size === 'lg' && 'text-base'
              )}>
              {$showPercentage ? `${Math.round(percentage)}%` : value}
            </div>
          )}
        </div>
      </div>
    );

    // Wrap with label and description if provided
    if (label || description) {
      return (
        <div className="w-full space-y-2">
          {label && (
            <div
              className={cn(
                'flex items-center justify-between',
                'font-medium',
                progressVariants.text[$colorScheme],
                $size === 'sm' && 'text-sm',
                $size === 'default' && 'text-base',
                $size === 'lg' && 'text-lg'
              )}>
              <span>{label}</span>
              {($showValue || $showPercentage) && (
                <span className="text-muted-foreground">
                  {$showPercentage
                    ? `${Math.round(percentage)}%`
                    : `${value}/${max}`}
                </span>
              )}
            </div>
          )}
          {progressElement}
          {description && (
            <div className="text-xs text-muted-foreground">{description}</div>
          )}
        </div>
      );
    }

    return progressElement;
  }
);

Progress.displayName = 'Progress';

export { Progress, type ProgressProps };

