import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import type { UseBoundStore, StoreApi } from 'zustand';

interface ProgressProps<T extends Record<string, any> = any> extends BaseProps {
  value?: number;
  max?: number;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Design variants
  $variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'success'
    | 'warning';
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

const progressVariants = {
  container: {
    base: 'relative',
    linear: 'w-full overflow-hidden',
    circular: 'relative inline-flex items-center justify-center',
  },
  track: {
    base: 'bg-gray-200 transition-colors duration-200',
    variants: {
      size: {
        sm: 'h-2',
        default: 'h-3',
        lg: 'h-4',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-none',
      },
    },
  },
  fill: {
    base: 'h-full transition-all duration-300 ease-out',
    variants: {
      variant: {
        default: 'bg-gray-500',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        accent: 'bg-accent',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-none',
      },
      striped: {
        true: 'bg-gradient-to-r bg-[length:1rem_1rem]',
        false: '',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
    },
  },
  label: {
    base: 'text-sm font-medium text-gray-700 mb-2',
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
  },
  description: {
    base: 'text-xs text-gray-500 mt-1',
  },
  value: {
    base: 'absolute inset-0 flex items-center justify-center text-xs font-medium',
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-xs',
        lg: 'text-sm',
      },
    },
  },
  circular: {
    svg: 'transform -rotate-90',
    track: 'fill-none stroke-gray-200',
    fill: 'fill-none stroke-current transition-all duration-300 ease-out',
  },
};

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value: controlledValue,
      max = 100,
      $store,
      storeKey,
      $variant = 'default',
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
        progressVariants.container.base,
        $shape === 'circular'
          ? progressVariants.container.circular
          : progressVariants.container.linear,
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
          style={{ width: $circularSize, height: $circularSize }}>
          <svg
            className={progressVariants.circular.svg}
            width={$circularSize}
            height={$circularSize}>
            {/* Background track */}
            <circle
              cx={$circularSize / 2}
              cy={$circularSize / 2}
              r={radius}
              strokeWidth={$strokeWidth}
              className={progressVariants.circular.track}
            />
            {/* Progress fill */}
            <circle
              cx={$circularSize / 2}
              cy={$circularSize / 2}
              r={radius}
              strokeWidth={$strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={cn(
                progressVariants.circular.fill,
                progressVariants.fill.variants.variant[$variant]
              )}
            />
          </svg>

          {/* Center content */}
          {($showValue || $showPercentage) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  progressVariants.value.base,
                  progressVariants.value.variants.size[$size],
                  'relative'
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
        {/* Track */}
        <div
          className={cn(
            progressVariants.track.base,
            progressVariants.track.variants.size[$size],
            progressVariants.track.variants.shape[$shape]
          )}>
          {/* Fill */}
          <div
            className={cn(
              progressVariants.fill.base,
              progressVariants.fill.variants.variant[$variant],
              progressVariants.fill.variants.shape[$shape],
              $striped && progressVariants.fill.variants.striped.true,
              $animated && progressVariants.fill.variants.animated.true
            )}
            style={{
              width: `${percentage}%`,
              ...($striped && {
                backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 0.25rem,
                rgba(255,255,255,0.2) 0.25rem,
                rgba(255,255,255,0.2) 0.5rem
              )`,
              }),
            }}
          />

          {/* Value overlay */}
          {($showValue || $showPercentage) && (
            <div
              className={cn(
                progressVariants.value.base,
                progressVariants.value.variants.size[$size]
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
        <div className="w-full">
          {label && (
            <div
              className={cn(
                progressVariants.label.base,
                progressVariants.label.variants.size[$size]
              )}>
              {label}
              {($showValue || $showPercentage) && (
                <span className="float-right">
                  {$showPercentage
                    ? `${Math.round(percentage)}%`
                    : `${value}/${max}`}
                </span>
              )}
            </div>
          )}
          {progressElement}
          {description && (
            <div className={progressVariants.description.base}>
              {description}
            </div>
          )}
        </div>
      );
    }

    return progressElement;
  }
);

Progress.displayName = 'Progress';

export { Progress, type ProgressProps };

