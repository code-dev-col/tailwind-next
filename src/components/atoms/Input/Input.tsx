import React, { useState } from 'react';
import { useStore } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import { Text } from '../Text';
import {
  validateInputSecurity,
  useSecurityValidation,
  getSecurityPreset,
  type SecurityOptions,
} from '../../../utils/security';

interface InputProps<T extends Record<string, any> = any> extends BaseProps {
  $variant?: 'default' | 'destructive' | 'ghost';
  $size?: 'default' | 'sm' | 'lg';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Patrón string store (actual - para compatibilidad)
  $storeString?: string;

  // Funcionalidades existentes
  $maxCharacters?: number; // Máximo de caracteres con contador

  // Nuevas funcionalidades de seguridad
  $security?:
    | SecurityOptions
    | keyof typeof import('../../../utils/security').SECURITY_PRESETS;
  $sanitizeOnChange?: boolean; // Auto-sanitizar en onChange (por defecto false)
  $showSecurityWarnings?: boolean; // Mostrar advertencias de seguridad (por defecto false)
  $blockUnsafeInput?: boolean; // Bloquear input inseguro completamente (por defecto false)

  // Props normales
  id?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecurityThreat?: (threats: string[], value: string) => void;
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

const InputComponent = <T extends Record<string, any> = any>(
  {
    className,
    $variant,
    $size,
    $custom,
    $store,
    storeKey,
    $storeString,
    $maxCharacters,
    $security,
    $sanitizeOnChange = false,
    $showSecurityWarnings = false,
    $blockUnsafeInput = false,
    type = 'text',
    value: controlledValue,
    onChange: controlledOnChange,
    onSecurityThreat,
    maxLength,
    ...props
  }: InputProps<T>,
  ref: React.Ref<HTMLInputElement>
) => {
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);

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

  // Configuración de seguridad
  const securityOptions: SecurityOptions =
    typeof $security === 'string'
      ? getSecurityPreset($security)
      : $security || { level: 'basic' };

  // Validación de seguridad en tiempo real
  const securityValidation = useSecurityValidation(finalValue, securityOptions);

  // Lógica para maxCharacters
  const effectiveMaxLength = $maxCharacters || maxLength;
  const currentLength = finalValue.length;
  const isOverLimit = effectiveMaxLength
    ? currentLength > effectiveMaxLength
    : false;

  // Determinar si hay amenazas de seguridad
  const hasSecurityThreats = securityValidation.hasThreats;
  const shouldShowSecurityVariant =
    hasSecurityThreats && ($showSecurityWarnings || $blockUnsafeInput);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // Validar seguridad antes de procesar
    if ($security) {
      const validation = validateInputSecurity(newValue, securityOptions);

      // Si hay amenazas de seguridad
      if (!validation.isValid) {
        // Disparar callback de amenaza si existe
        if (onSecurityThreat) {
          onSecurityThreat(validation.threats, newValue);
        }

        // Actualizar warnings para mostrar
        if ($showSecurityWarnings) {
          setSecurityWarnings(validation.threats);
        }

        // Si está configurado para bloquear input inseguro, no procesar
        if ($blockUnsafeInput) {
          return;
        }

        // Si está configurado para sanitizar, usar el valor sanitizado
        if ($sanitizeOnChange) {
          newValue = validation.sanitized;
        }
      } else {
        // Limpiar warnings si el input es válido
        setSecurityWarnings([]);
      }
    }

    // Aplicar límite de caracteres si está definido
    if (effectiveMaxLength && newValue.length > effectiveMaxLength) {
      newValue = newValue.slice(0, effectiveMaxLength);
    }

    if (finalSetter) {
      finalSetter(newValue);
    }

    if (controlledOnChange) {
      // Crear un nuevo evento con el valor procesado
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: newValue },
      } as React.ChangeEvent<HTMLInputElement>;
      controlledOnChange(syntheticEvent);
    }
  };

  // Determinar variante del input basada en estado
  const getInputVariant = () => {
    if (shouldShowSecurityVariant) return 'destructive';
    if (isOverLimit) return 'destructive';
    return $variant || 'default';
  };

  const inputElement = (
    <input
      type={type}
      className={cn(
        inputVariants.base,
        inputVariants.variants.variant[getInputVariant()],
        inputVariants.variants.size[$size || 'default'],
        className,
        $custom
      )}
      value={finalValue}
      onChange={handleChange}
      maxLength={effectiveMaxLength}
      ref={ref}
      {...props}
    />
  );

  // Construir elementos adicionales
  const additionalElements = [];

  // Contador de caracteres
  if (effectiveMaxLength) {
    additionalElements.push(
      <div key="char-counter" className="flex justify-end">
        <Text
          $size="xs"
          $variant={isOverLimit ? 'destructive' : 'muted'}
          className="tabular-nums">
          {currentLength}/{effectiveMaxLength}
        </Text>
      </div>
    );
  }

  // Advertencias de seguridad
  if ($showSecurityWarnings && securityWarnings.length > 0) {
    additionalElements.push(
      <div key="security-warnings" className="space-y-1">
        {securityWarnings.map((warning, index) => (
          <Text
            key={index}
            $size="xs"
            $variant="destructive"
            className="flex items-center gap-1">
            <span className="text-red-500">⚠️</span>
            {warning}
          </Text>
        ))}
      </div>
    );
  }

  // Si no hay elementos adicionales, devolver solo el input
  if (additionalElements.length === 0) {
    return inputElement;
  }

  // Si hay elementos adicionales, envolver con contenedor
  return (
    <div className="w-full">
      {inputElement}
      <div className="mt-1 space-y-1">{additionalElements}</div>
    </div>
  );
};

const Input = React.forwardRef(InputComponent) as <
  T extends Record<string, any> = any,
>(
  props: InputProps<T> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement;

// Asignar displayName para debugging
(Input as any).displayName = 'Input';

export { Input, type InputProps };

