import React from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface RadioButtonProps<T extends Record<string, any> = any>
  extends BaseProps {
  $variant?: 'default' | 'destructive' | 'ghost';
  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Patrón string store (actual - para compatibilidad)
  $storeString?: string;

  // Props normales
  id?: string;
  name?: string;
  value: string; // Valor requerido para radio buttons
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  description?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const radioButtonVariants = {
  base: 'aspect-square h-4 w-4 rounded-full border shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  variants: {
    variant: {
      default:
        'border-primary text-primary hover:border-primary/80 focus-visible:shadow-md',
      destructive:
        'border-destructive text-destructive hover:border-destructive/80 focus-visible:ring-destructive focus-visible:shadow-md',
      ghost:
        'border-muted text-muted-foreground hover:border-primary/50 hover:text-primary focus-visible:shadow-md',
    },
    size: {
      default: 'h-4 w-4',
      sm: 'h-3 w-3',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

const labelVariants = {
  base: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
  sizes: {
    default: 'text-sm',
    sm: 'text-xs',
    lg: 'text-base',
  },
};

// Función helper para obtener el store
const getZustandStore = (storeName: string) => {
  if (typeof window !== 'undefined') {
    const globalStores = (window as any).__zustand_stores || {};
    return globalStores[storeName];
  }
  return null;
};

const RadioButtonComponent = <T extends Record<string, any> = any>(
  {
    className,
    $variant,
    $size,
    $custom,
    $store,
    storeKey,
    $storeString,
    value,
    label,
    description,
    checked: controlledChecked,
    onChange: controlledOnChange,
    id,
    ...props
  }: RadioButtonProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  // Generar ID único si no se proporciona
  const radioId = id || React.useId();

  // Patrón storeKey (nuevo y preferido)
  const storeValue =
    $store && storeKey
      ? $store((state) => state[storeKey] as string)
      : undefined;

  const storeSetter =
    $store && storeKey
      ? $store((state) => {
          const setterName =
            `set${String(storeKey).charAt(0).toUpperCase()}${String(storeKey).slice(1)}` as keyof T;
          return state[setterName] as (value: string) => void;
        })
      : undefined;

  // Patrón string store (actual - para compatibilidad)
  const zustandStore = $storeString ? getZustandStore($storeString) : null;
  const stringStoreValue = zustandStore
    ? useStore(zustandStore, (state: any) => state.value || '')
    : undefined;
  const stringStoreSetter = zustandStore
    ? useStore(zustandStore, (state: any) => state.setValue)
    : undefined;

  // Determinar valor y setter finales
  const finalValue = storeValue ?? stringStoreValue;
  const finalSetter = storeSetter ?? stringStoreSetter;

  // Determinar si está checked
  const isChecked =
    finalValue !== undefined
      ? finalValue === value
      : controlledChecked || false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (finalSetter) {
        finalSetter(value);
      }

      if (controlledOnChange) {
        controlledOnChange(value, e);
      }
    }
  };

  return (
    <div className="flex items-start space-x-2">
      <div className="relative">
        <input
          type="radio"
          className={cn(
            radioButtonVariants.base,
            radioButtonVariants.variants.variant[$variant || 'default'],
            radioButtonVariants.variants.size[$size || 'default'],
            'peer',
            className,
            $custom
          )}
          id={radioId}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />

        {/* Indicador visual cuando está checked */}
        {isChecked && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none',
              $size === 'sm' && 'inset-[2px]',
              $size === 'lg' && 'inset-[3px]',
              $size === 'default' && 'inset-[3px]'
            )}>
            <div
              className={cn(
                'rounded-full bg-current',
                $size === 'sm' && 'h-1.5 w-1.5',
                $size === 'lg' && 'h-2.5 w-2.5',
                $size === 'default' && 'h-2 w-2'
              )}
            />
          </div>
        )}
      </div>

      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                labelVariants.base,
                labelVariants.sizes[$size || 'default']
              )}>
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn(
                'text-muted-foreground',
                $size === 'sm' && 'text-xs',
                $size === 'lg' && 'text-sm',
                $size === 'default' && 'text-xs'
              )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const RadioButton = React.forwardRef(RadioButtonComponent) as <
  T extends Record<string, any> = any,
>(
  props: RadioButtonProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(RadioButton as any).displayName = 'RadioButton';

export { RadioButton, type RadioButtonProps };

