import React from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface TextAreaProps<T extends Record<string, any> = any> extends BaseProps {
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
  readOnly?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const textAreaVariants = {
  base: 'flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical transition-all duration-200',
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
      default: 'min-h-[80px] px-3 py-2 text-sm',
      sm: 'min-h-[60px] px-3 py-2 text-xs',
      lg: 'min-h-[120px] px-4 py-3 text-base',
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

const TextAreaComponent = <T extends Record<string, any> = any>(
  {
    className,
    $variant,
    $size,
    $custom,
    $store,
    storeKey,
    $storeString,
    rows = 4,
    value: controlledValue,
    onChange: controlledOnChange,
    ...props
  }: TextAreaProps<T>,
  ref: React.Ref<HTMLTextAreaElement>
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (finalSetter) {
      finalSetter(newValue);
    }

    if (controlledOnChange) {
      controlledOnChange(e);
    }
  };

  return (
    <textarea
      className={cn(
        textAreaVariants.base,
        textAreaVariants.variants.variant[$variant || 'default'],
        textAreaVariants.variants.size[$size || 'default'],
        className,
        $custom
      )}
      rows={rows}
      value={finalValue}
      onChange={handleChange}
      ref={ref}
      {...props}
    />
  );
};

const TextArea = React.forwardRef(TextAreaComponent) as <
  T extends Record<string, any> = any,
>(
  props: TextAreaProps<T> & { ref?: React.Ref<HTMLTextAreaElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(TextArea as any).displayName = 'TextArea';

export { TextArea, type TextAreaProps };

