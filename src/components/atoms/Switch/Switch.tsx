import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import type { UseBoundStore, StoreApi } from 'zustand';

interface SwitchProps<T extends Record<string, any> = any> extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Design variants
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';
  $size?: 'sm' | 'default' | 'lg';
  $custom?: string;

  // Content
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;

  // Layout
  labelPosition?: 'left' | 'right';

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;
}

// Color schemes using theme.css variables
const colorSchemes = {
  default: {
    unchecked: 'bg-gray-300',
    checked: 'data-[checked]:bg-foreground',
  },
  secondary: {
    unchecked: 'bg-gray-300',
    checked: 'data-[checked]:bg-secondary',
  },
  destructive: {
    unchecked: 'bg-gray-300',
    checked: 'data-[checked]:bg-destructive',
  },
  accent: {
    unchecked: 'bg-gray-300',
    checked: 'data-[checked]:bg-accent',
  },
  muted: {
    unchecked: 'bg-muted',
    checked: 'data-[checked]:bg-muted-foreground',
  },
  minimal: {
    unchecked: 'bg-gray-200',
    checked: 'data-[checked]:bg-gray-500',
  },
  custom: {
    unchecked: '',
    checked: '',
  },
};

const switchVariants = {
  base: 'relative inline-flex items-center rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  track: {
    base: 'relative inline-flex shrink-0 border-2 border-transparent rounded-full transition-colors duration-200 ease-in-out',
    variants: {
      size: {
        sm: 'h-5 w-9',
        default: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
  },
  thumb: {
    base: 'pointer-events-none inline-block rounded-full bg-white ring-0 transition-transform duration-200 ease-in-out',
    variants: {
      size: {
        sm: 'h-4 w-4 translate-x-0 data-[checked]:translate-x-4',
        default: 'h-5 w-5 translate-x-0 data-[checked]:translate-x-5',
        lg: 'h-6 w-6 translate-x-0 data-[checked]:translate-x-7',
      },
    },
  },
  label: {
    base: 'text-sm font-medium text-gray-700 cursor-pointer select-none',
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
  iconContainer: {
    base: 'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
  },
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      $store,
      storeKey,
      $colorScheme = 'default',
      $size = 'default',
      $custom,
      label,
      description,
      icon,
      checkedIcon,
      uncheckedIcon,
      labelPosition = 'right',
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

    const storeSetValue =
      $store && storeKey
        ? $store((state) => {
            const setterName = `set${String(storeKey).charAt(0).toUpperCase()}${String(storeKey).slice(1)}`;
            return (state as any)[setterName];
          })
        : undefined;

    // State management
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);

    const isControlled =
      controlledChecked !== undefined || storeValue !== undefined;
    const checked = storeValue ?? controlledChecked ?? internalChecked;

    const handleToggle = React.useCallback(() => {
      if (disabled) return;

      const newChecked = !checked;

      if (storeSetValue) {
        storeSetValue(newChecked);
      } else if (onChange) {
        onChange(newChecked);
      } else if (!isControlled) {
        setInternalChecked(newChecked);
      }
    }, [checked, disabled, storeSetValue, onChange, isControlled]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    // Get color scheme classes
    const colorSchemeClasses = colorSchemes[$colorScheme];

    const switchElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        id={id}
        className={cn(switchVariants.base, className, $custom)}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        {...props}>
        <span
          className={cn(
            switchVariants.track.base,
            // Apply color scheme classes
            colorSchemeClasses.unchecked,
            colorSchemeClasses.checked,
            switchVariants.track.variants.size[$size]
          )}
          data-checked={checked || undefined}>
          <span
            className={cn(
              switchVariants.thumb.base,
              switchVariants.thumb.variants.size[$size]
            )}
            data-checked={checked || undefined}>
            {/* Icon rendering */}
            {(icon || checkedIcon || uncheckedIcon) && (
              <>
                {checkedIcon && (
                  <span
                    className={cn(
                      switchVariants.iconContainer.base,
                      switchVariants.iconContainer.variants.size[$size],
                      checked ? 'opacity-100' : 'opacity-0'
                    )}>
                    {checkedIcon}
                  </span>
                )}
                {uncheckedIcon && (
                  <span
                    className={cn(
                      switchVariants.iconContainer.base,
                      switchVariants.iconContainer.variants.size[$size],
                      !checked ? 'opacity-100' : 'opacity-0'
                    )}>
                    {uncheckedIcon}
                  </span>
                )}
                {icon && !checkedIcon && !uncheckedIcon && (
                  <span
                    className={cn(
                      switchVariants.iconContainer.base,
                      switchVariants.iconContainer.variants.size[$size]
                    )}>
                    {icon}
                  </span>
                )}
              </>
            )}
          </span>
        </span>
      </button>
    );

    // Label and description wrapper
    if (label || description) {
      const labelElement = label && (
        <div
          className={cn(
            switchVariants.label.base,
            switchVariants.label.variants.size[$size]
          )}
          onClick={!disabled ? handleToggle : undefined}>
          {label}
        </div>
      );

      const descriptionElement = description && (
        <div className={switchVariants.description.base}>{description}</div>
      );

      return (
        <div className="flex items-start gap-3">
          {labelPosition === 'left' && (
            <div className="flex flex-col">
              {labelElement}
              {descriptionElement}
            </div>
          )}
          {switchElement}
          {labelPosition === 'right' && (
            <div className="flex flex-col">
              {labelElement}
              {descriptionElement}
            </div>
          )}
        </div>
      );
    }

    return switchElement;
  }
);

Switch.displayName = 'Switch';

export { Switch, type SwitchProps };

