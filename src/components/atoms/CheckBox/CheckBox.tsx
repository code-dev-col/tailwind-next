import React from 'react';
import { useStore } from 'zustand';
import type { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface CheckBoxProps<T extends Record<string, any> = any> extends BaseProps {
  $variant?: 'default' | 'destructive' | 'ghost';
  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;
  // Nuevo patrón storeKey (preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;
  // Patrón legacy para compatibilidad
  $storeString?: string;
  id?: string;
  name?: string;
  value?: string; // Valor opcional para checkboxes
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean; // Estado indeterminado
  label?: string;
  description?: string;
  onChange?: (
    checked: boolean,
    value?: string,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const checkBoxVariants = {
  base: 'peer h-4 w-4 shrink-0 rounded-sm border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  variants: {
    variant: {
      default:
        'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:border-primary/80 focus-visible:shadow-md',
      destructive:
        'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground hover:border-destructive/80 focus-visible:ring-destructive focus-visible:shadow-md',
      ghost:
        'border-muted data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground hover:border-primary/50 focus-visible:shadow-md',
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

const CheckBoxComponent = <T extends Record<string, any> = any>(
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
    indeterminate = false,
    checked: controlledChecked,
    onChange: controlledOnChange,
    id,
    ...props
  }: CheckBoxProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  // Generar ID único si no se proporciona
  const checkboxId = id || React.useId();

  // Patrón storeKey (nuevo y preferido)
  const storeValue =
    $store && storeKey
      ? $store((state) => {
          const stateValue = state[storeKey];
          // Manejar tanto arrays como booleanos
          if (value && Array.isArray(stateValue)) {
            return stateValue.includes(value);
          }
          return Boolean(stateValue);
        })
      : undefined;

  const storeSetter =
    $store && storeKey
      ? $store((state) => {
          const setterName =
            `set${String(storeKey).charAt(0).toUpperCase()}${String(storeKey).slice(1)}` as keyof T;
          return state[setterName] as (value: any) => void;
        })
      : undefined;

  // Patrón string store (actual - para compatibilidad)
  const zustandStore = $storeString ? getZustandStore($storeString) : null;
  const stringStoreValue = zustandStore
    ? useStore(zustandStore, (state: any) => {
        // Para checkboxes, el store puede manejar arrays o boolean
        if (value && Array.isArray(state.value)) {
          return state.value.includes(value);
        }
        return Boolean(state.value);
      })
    : undefined;
  const stringStoreSetter = zustandStore
    ? useStore(zustandStore, (state: any) => state.setValue)
    : undefined;

  // Determinar valor y setter finales
  const finalIsChecked =
    storeValue ?? stringStoreValue ?? controlledChecked ?? false;
  const finalSetter = storeSetter ?? stringStoreSetter; // Ref interno para manejar indeterminate state
  const internalRef = React.useRef<HTMLInputElement>(null);
  const combinedRef = ref || internalRef;

  // Efecto para manejar estado indeterminado
  React.useEffect(() => {
    if (combinedRef && 'current' in combinedRef && combinedRef.current) {
      combinedRef.current.indeterminate = indeterminate;
    }
  }, [combinedRef, indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;

    if (finalSetter) {
      if (value) {
        // Manejo de arrays para múltiples checkboxes
        // Para el patrón storeKey, necesitamos obtener el estado actual
        if ($store && storeKey) {
          const currentState = $store.getState();
          const currentValue = Array.isArray(currentState[storeKey])
            ? currentState[storeKey]
            : [];

          const newValue = newChecked
            ? [...currentValue, value]
            : (currentValue as any[]).filter((v: string) => v !== value);
          finalSetter(newValue);
        } else if (zustandStore) {
          // Para el patrón legacy
          const currentValue = Array.isArray(zustandStore.getState().value)
            ? zustandStore.getState().value
            : [];

          const newValue = newChecked
            ? [...currentValue, value]
            : currentValue.filter((v: string) => v !== value);
          finalSetter(newValue);
        }
      } else {
        // Checkbox simple (boolean)
        finalSetter(newChecked);
      }
    }

    if (controlledOnChange) {
      controlledOnChange(newChecked, value, e);
    }
  };
  return (
    <div className="flex items-start space-x-2">
      <div className="relative">
        <input
          type="checkbox"
          className={cn(
            checkBoxVariants.base,
            checkBoxVariants.variants.variant[$variant || 'default'],
            checkBoxVariants.variants.size[$size || 'default'],
            className,
            $custom
          )}
          id={checkboxId}
          value={value}
          checked={finalIsChecked}
          onChange={handleChange}
          data-state={
            indeterminate
              ? 'indeterminate'
              : finalIsChecked
                ? 'checked'
                : 'unchecked'
          }
          ref={combinedRef}
          {...props}
        />

        {/* Icono de check cuando está checked */}
        {(finalIsChecked || indeterminate) && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none text-current',
              finalIsChecked && 'text-primary-foreground',
              $variant === 'destructive' &&
                finalIsChecked &&
                'text-destructive-foreground',
              $variant === 'ghost' && finalIsChecked && 'text-accent-foreground'
            )}>
            {indeterminate ? (
              // Icono de estado indeterminado (línea horizontal)
              <svg
                className={cn(
                  'fill-current',
                  $size === 'sm' && 'h-2 w-2',
                  $size === 'lg' && 'h-3 w-3',
                  $size === 'default' && 'h-2.5 w-2.5'
                )}
                viewBox="0 0 16 16">
                <path d="M4 8h8v1H4z" />
              </svg>
            ) : (
              ''
            )}
          </div>
        )}
      </div>

      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
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

const CheckBox = React.forwardRef(CheckBoxComponent) as <
  T extends Record<string, any> = any,
>(
  props: CheckBoxProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(CheckBox as any).displayName = 'CheckBox';

export { CheckBox, type CheckBoxProps };

