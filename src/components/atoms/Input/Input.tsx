import React from 'react';
import { useStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface InputProps extends BaseProps {
  $variant?: 'default' | 'destructive' | 'ghost';
  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;
  $store?: string; // Nombre del store de Zustand
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputVariants = {
  base: 'flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  variants: {
    variant: {
      default:
        'border-input bg-background hover:border-primary/50 focus-visible:shadow-md',
      destructive:
        'border-destructive bg-background hover:border-destructive/70 focus-visible:ring-destructive focus-visible:shadow-md',
      ghost:
        'border-transparent bg-accent hover:bg-accent/80 focus-visible:bg-background focus-visible:border-input focus-visible:shadow-md',
    },
    size: {
      default: 'h-10 px-3 py-2',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-11 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
};

// Función helper para obtener el store
const getZustandStore = (storeName: string) => {
  // Buscar el store en el objeto global (patron común en Zustand)
  if (typeof window !== 'undefined') {
    const globalStores = (window as any).__zustand_stores || {};
    return globalStores[storeName];
  }
  return null;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      $variant,
      $size,
      $custom,
      $store,
      type = 'text',
      value: controlledValue,
      onChange: controlledOnChange,
      ...props
    },
    ref
  ) => {
    // Manejo de estado con Zustand si se proporciona $store
    const zustandStore = $store ? getZustandStore($store) : null;
    const storeValue = zustandStore
      ? useStore(zustandStore, (state: any) => state.value || '')
      : '';
    const setStoreValue = zustandStore
      ? useStore(zustandStore, (state: any) => state.setValue)
      : null;

    // Determinar valor y handler según si usa store o es controlado
    const inputValue = $store ? storeValue : controlledValue || '';
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ($store && setStoreValue) {
        setStoreValue(e.target.value);
      }
      if (controlledOnChange) {
        controlledOnChange(e);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          inputVariants.base,
          inputVariants.variants.variant[$variant || 'default'],
          inputVariants.variants.size[$size || 'default'],
          className,
          $custom
        )}
        value={inputValue}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, type InputProps };

