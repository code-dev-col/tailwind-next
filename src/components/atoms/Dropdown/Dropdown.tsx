import React from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps<T extends Record<string, any> = any> extends BaseProps {
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
  placeholder?: string;
  disabled?: boolean;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const dropdownVariants = {
  base: 'flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none bg-background cursor-pointer',
  variants: {
    variant: {
      default: 'border-input hover:border-primary/50 focus:shadow-md',
      destructive:
        'border-destructive hover:border-destructive/70 focus:ring-destructive focus:shadow-md',
      ghost:
        'border-transparent bg-accent hover:bg-accent/80 focus:bg-background focus:border-input focus:shadow-md',
    },
    size: {
      default: 'h-10 px-3 py-2 text-sm',
      sm: 'h-9 px-3 py-1 text-xs',
      lg: 'h-11 px-4 py-2 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
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

const DropdownComponent = <T extends Record<string, any> = any>(
  {
    className,
    $variant,
    $size,
    $custom,
    $store,
    storeKey,
    $storeString,
    options,
    placeholder = 'Seleccionar...',
    value: controlledValue,
    onChange: controlledOnChange,
    ...props
  }: DropdownProps<T>,
  ref: React.Ref<HTMLSelectElement>
) => {
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
  const finalValue = storeValue ?? stringStoreValue ?? controlledValue ?? '';
  const finalSetter = storeSetter ?? stringStoreSetter;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    if (finalSetter) {
      finalSetter(newValue);
    }

    if (controlledOnChange) {
      controlledOnChange(newValue, e);
    }
  };

  return (
    <div className="relative">
      <select
        className={cn(
          dropdownVariants.base,
          dropdownVariants.variants.variant[$variant || 'default'],
          dropdownVariants.variants.size[$size || 'default'],
          className,
          $custom
        )}
        value={finalValue}
        onChange={handleChange}
        ref={ref}
        {...props}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Icono de chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

const Dropdown = React.forwardRef(DropdownComponent) as <
  T extends Record<string, any> = any,
>(
  props: DropdownProps<T> & { ref?: React.Ref<HTMLSelectElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(Dropdown as any).displayName = 'Dropdown';

export { Dropdown, type DropdownProps, type DropdownOption };

