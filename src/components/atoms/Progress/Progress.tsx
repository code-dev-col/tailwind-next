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

  // Theme.css color scheme system
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'outline'
    | 'ghost'
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

// CSS-in-JS hook for self-contained Progress styles
const useProgressStyles = () => {
  React.useEffect(() => {
    const styleId = 'progress-component-styles';

    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .progress-track {
        background-color: hsl(var(--muted));
        transition: all 200ms ease-in-out;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        transition: all 300ms ease-out;
        position: relative;
      }

      .progress-fill-striped {
        background-image: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 0.25rem,
          rgba(255,255,255,0.2) 0.25rem,
          rgba(255,255,255,0.2) 0.5rem
        );
      }

      .progress-fill-animated {
        animation: progress-pulse 1.5s ease-in-out infinite;
      }

      @keyframes progress-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }

      .progress-fill-default {
        background-color: hsl(var(--primary));
      }

      .progress-fill-secondary {
        background-color: hsl(var(--secondary));
      }

      .progress-fill-destructive {
        background-color: hsl(var(--destructive));
      }

      .progress-fill-accent {
        background-color: hsl(var(--accent));
      }

      .progress-fill-muted {
        background-color: hsl(var(--muted-foreground));
      }

      .progress-fill-minimal {
        background-color: hsl(var(--border));
      }

      .progress-fill-outline {
        background-color: transparent;
        border: 2px solid hsl(var(--border));
      }

      .progress-fill-ghost {
        background-color: hsl(var(--muted) / 0.5);
      }

      .progress-circular-track {
        fill: none;
        stroke: hsl(var(--muted));
        transition: all 200ms ease-in-out;
      }

      .progress-circular-fill {
        fill: none;
        stroke-linecap: round;
        transition: all 300ms ease-out;
      }

      .progress-circular-fill-default {
        stroke: hsl(var(--primary));
      }

      .progress-circular-fill-secondary {
        stroke: hsl(var(--secondary));
      }

      .progress-circular-fill-destructive {
        stroke: hsl(var(--destructive));
      }

      .progress-circular-fill-accent {
        stroke: hsl(var(--accent));
      }

      .progress-circular-fill-muted {
        stroke: hsl(var(--muted-foreground));
      }

      .progress-circular-fill-minimal {
        stroke: hsl(var(--border));
      }

      .progress-circular-fill-outline {
        stroke: hsl(var(--border));
        stroke-width: 2px;
        stroke-dasharray: 4, 4;
      }

      .progress-circular-fill-ghost {
        stroke: hsl(var(--muted-foreground) / 0.5);
      }

      .progress-label {
        color: hsl(var(--foreground));
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      .progress-description {
        color: hsl(var(--muted-foreground));
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }

      .progress-value {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 500;
        color: hsl(var(--foreground));
      }

      .progress-sm { height: 0.5rem; }
      .progress-default { height: 0.75rem; }
      .progress-lg { height: 1rem; }

      .progress-rounded { border-radius: 9999px; }
      .progress-square { border-radius: 0; }

      .progress-text-sm { font-size: 0.75rem; }
      .progress-text-default { font-size: 0.875rem; }
      .progress-text-lg { font-size: 1rem; }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
};

// Map legacy $variant to new $colorScheme
const getColorScheme = (
  $colorScheme?: ProgressProps['$colorScheme']
): NonNullable<ProgressProps['$colorScheme']> => {
  return $colorScheme || 'default';
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
    // Initialize CSS-in-JS styles
    useProgressStyles();

    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Value calculation
    const value = storeValue ?? controlledValue ?? 0;
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));

    // Get the final color scheme
    const colorScheme = getColorScheme($colorScheme);

    // Circular progress calculations
    const radius = ($circularSize - $strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Common props
    const commonProps = {
      ref,
      className: cn(
        'relative',
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
          style={{ width: $circularSize, height: $circularSize }}>
          <svg
            className="transform -rotate-90"
            width={$circularSize}
            height={$circularSize}>
            {/* Background track */}
            <circle
              cx={$circularSize / 2}
              cy={$circularSize / 2}
              r={radius}
              strokeWidth={$strokeWidth}
              className="progress-circular-track"
            />
            {/* Progress fill */}
            <circle
              cx={$circularSize / 2}
              cy={$circularSize / 2}
              r={radius}
              strokeWidth={$strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className={cn(
                'progress-circular-fill',
                `progress-circular-fill-${colorScheme}`
              )}
            />
          </svg>

          {/* Center content */}
          {($showValue || $showPercentage) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={cn(
                  'font-medium relative',
                  $size === 'sm' && 'progress-text-sm',
                  $size === 'default' && 'progress-text-default',
                  $size === 'lg' && 'progress-text-lg'
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
            'progress-track',
            `progress-${$size}`,
            $shape === 'rounded' && 'progress-rounded',
            $shape === 'square' && 'progress-square'
          )}>
          {/* Fill */}
          <div
            className={cn(
              'progress-fill',
              `progress-fill-${colorScheme}`,
              $shape === 'rounded' && 'progress-rounded',
              $shape === 'square' && 'progress-square',
              $striped && 'progress-fill-striped',
              $animated && 'progress-fill-animated'
            )}
            style={{
              width: `${percentage}%`,
            }}
          />

          {/* Value overlay */}
          {($showValue || $showPercentage) && (
            <div
              className={cn(
                'progress-value',
                $size === 'sm' && 'progress-text-sm',
                $size === 'default' && 'progress-text-default',
                $size === 'lg' && 'progress-text-lg'
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
                'progress-label',
                $size === 'sm' && 'progress-text-sm',
                $size === 'default' && 'progress-text-default',
                $size === 'lg' && 'progress-text-lg'
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
            <div className="progress-description">{description}</div>
          )}
        </div>
      );
    }

    return progressElement;
  }
);

Progress.displayName = 'Progress';

export { Progress, type ProgressProps };

