import React from 'react';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Importar todos los Atoms necesarios
import { Container } from '../../atoms/layout/Container';
import { Grid } from '../../atoms/layout/Grid';
import { Divider } from '../../atoms/layout/Divider';
import { Text } from '../../atoms/display/Text';
import { Label } from '../../atoms/forms/Label';
import { Input, type InputProps } from '../../atoms/forms/Input';
import { TextArea, type TextAreaProps } from '../../atoms/forms/TextArea';
import { Dropdown, type DropdownProps } from '../../atoms/forms/Dropdown';

// Tipos de campo soportados
type FieldType = 'input' | 'textarea' | 'dropdown';
type LayoutType = 'vertical' | 'horizontal' | 'grid';

interface FormFieldProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $layout?: LayoutType;
  $custom?: string;

  // Props específicas para layout Grid
  $gridGap?: string; // Gap del grid (ej: '1rem', 'gap-4')
  $gridMaxItemWidth?: string; // Ancho máximo de items (ej: '8rem', 'max-w-sm')
  $gridAutoRows?: string; // Altura automática de filas (ej: '6rem')
  $gridJustifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly';
  $gridAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del FormField
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  $fieldType?: FieldType;

  // Props específicas según el tipo de campo
  inputProps?: Partial<InputProps<T>>;
  textAreaProps?: Partial<TextAreaProps<T>>;
  dropdownProps?: Partial<DropdownProps<T>>;

  // Estados del field
  $disabled?: boolean;
  $loading?: boolean;
  $showSeparator?: boolean;
  separatorText?: string;

  // Callbacks
  onFieldChange?: (value: string) => void;
  onFieldFocus?: () => void;
  onFieldBlur?: () => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    label: 'text-card-foreground',
    helperText: 'text-muted-foreground',
    errorText: 'text-destructive',
    separator: 'border-border',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20',
    label: 'text-secondary',
    helperText: 'text-secondary/70',
    errorText: 'text-destructive',
    separator: 'border-secondary/20',
  },
  destructive: {
    container: 'bg-destructive/5 border-destructive/20',
    label: 'text-destructive',
    helperText: 'text-destructive/70',
    errorText: 'text-destructive',
    separator: 'border-destructive/20',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20',
    label: 'text-accent',
    helperText: 'text-accent/70',
    errorText: 'text-destructive',
    separator: 'border-accent/20',
  },
  muted: {
    container: 'bg-muted/10 border-muted',
    label: 'text-muted-foreground',
    helperText: 'text-muted-foreground/70',
    errorText: 'text-destructive',
    separator: 'border-muted',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    label: 'text-foreground',
    helperText: 'text-foreground/60',
    errorText: 'text-destructive',
    separator: 'border-border',
  },
  custom: {
    container: '',
    label: '',
    helperText: '',
    errorText: '',
    separator: '',
  },
};

const formFieldVariants = {
  base: 'w-full transition-all duration-200',

  variants: {
    size: {
      default: 'space-y-2',
      sm: 'space-y-1.5',
      lg: 'space-y-3',
    },
    layout: {
      vertical: 'flex flex-col',
      horizontal: 'flex flex-row items-start gap-4',
      grid: '', // No aplicar clases grid aquí, las maneja el componente Grid
    },
  },

  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    layout: 'vertical' as const,
  },
};

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $layout = 'vertical',
      $custom,
      $store,
      storeKey,
      label,
      helperText,
      errorText,
      required = false,
      $fieldType = 'input',
      inputProps = {},
      textAreaProps = {},
      dropdownProps = {},
      $disabled = false,
      $loading = false,
      $showSeparator = false,
      separatorText,
      // Props específicas para Grid
      $gridGap = '1rem',
      $gridMaxItemWidth,
      $gridAutoRows,
      $gridJustifyContent = 'start',
      $gridAlignItems = 'start',
      onFieldChange,
      onFieldFocus,
      onFieldBlur,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Determinar si hay error (errorText presente)
    const hasError = Boolean(errorText);
    const finalColorScheme = hasError ? 'destructive' : $colorScheme;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[finalColorScheme];

    // Handlers unificados
    const handleChange = (value: string) => {
      onFieldChange?.(value);
    };

    // Renderizar el campo según el tipo
    const renderField = () => {
      const commonProps = {
        $store,
        storeKey,
        $colorScheme: finalColorScheme,
        $size,
        $disabled: $disabled || $loading,
        onFocus: onFieldFocus,
        onBlur: onFieldBlur,
      };

      switch ($fieldType) {
        case 'textarea':
          return (
            <TextArea
              {...commonProps}
              {...textAreaProps}
              onChange={(e) => {
                handleChange(e.target.value);
                textAreaProps.onChange?.(e);
              }}
            />
          );

        case 'dropdown':
          return (
            <Dropdown
              {...commonProps}
              options={dropdownProps.options || []}
              {...dropdownProps}
              onChange={(value, e) => {
                handleChange(value);
                dropdownProps.onChange?.(value, e);
              }}
            />
          );

        case 'input':
        default:
          return (
            <Input
              {...commonProps}
              {...inputProps}
              onChange={(e) => {
                handleChange(e.target.value);
                inputProps.onChange?.(e);
              }}
            />
          );
      }
    };

    // Renderizar layout según configuración
    const renderContent = () => {
      const labelElement = label && (
        <Label
          $variant={required ? 'required' : 'default'}
          $size={$size}
          className={currentColorScheme.label}>
          {label}
        </Label>
      );

      const fieldElement = renderField();

      const helperElement = helperText && !hasError && (
        <Text
          $size={$size === 'lg' ? 'sm' : 'xs'}
          className={currentColorScheme.helperText}>
          {helperText}
        </Text>
      );

      const errorElement = errorText && (
        <Text
          $size={$size === 'lg' ? 'sm' : 'xs'}
          className={currentColorScheme.errorText}>
          {errorText}
        </Text>
      );

      switch ($layout) {
        case 'horizontal':
          return (
            <Container
              $display="flex"
              $alignItems="start"
              $gap="gap-4"
              className="w-full">
              <Container className="flex-shrink-0 min-w-[120px]">
                {labelElement}
              </Container>
              <Container className="flex-1 space-y-1">
                {fieldElement}
                {helperElement}
                {errorElement}
              </Container>
            </Container>
          );

        case 'grid':
          return (
            <Grid
              $gap={$gridGap}
              $maxGridWidth="100%" // Usar todo el ancho disponible
              $maxItemWidth={$gridMaxItemWidth}
              $justifyContent={$gridJustifyContent}
              $alignItems={$gridAlignItems}
              className={cn(
                // Grid responsivo por defecto: horizontal en desktop, vertical en móvil
                'grid-cols-1',
                'md:grid-cols-[auto_1fr]', // Label auto-width, campo flexible
                'w-full'
              )}
              $custom={cn(
                'mx-0', // Remover el centrado automático
                $gridAutoRows ? `[grid-auto-rows:${$gridAutoRows}]` : ''
              )}>
              <Container className="md:min-w-[120px]">{labelElement}</Container>
              <Container className="space-y-1">
                {fieldElement}
                {helperElement}
                {errorElement}
              </Container>
            </Grid>
          );

        case 'vertical':
        default:
          return (
            <Container className="w-full space-y-2">
              {labelElement}
              {fieldElement}
              {helperElement}
              {errorElement}
            </Container>
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          formFieldVariants.base,
          currentColorScheme.container,
          formFieldVariants.variants.size[$size],
          // Solo aplicar layout si no es vertical ni grid (que se manejan internamente)
          $layout !== 'vertical' &&
            $layout !== 'grid' &&
            formFieldVariants.variants.layout[$layout],
          hasError && 'ring-1 ring-destructive/20 rounded-md p-3',
          $loading && 'opacity-70 pointer-events-none',
          className,
          $custom
        )}
        {...props}>
        {renderContent()}

        {$showSeparator && (
          <Divider
            className={cn('mt-4', currentColorScheme.separator)}
            text={separatorText}
          />
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField, type FormFieldProps, type FieldType, type LayoutType };

