import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { FiSearch, FiX, FiLoader } from 'react-icons/fi';

// Importar todos los Atoms necesarios
import { Container } from '../../../atoms/layout/Container';
import { Input, type InputProps } from '../../../atoms/forms/Input';
import { Button } from '../../../atoms/forms/Button';
import { Icon } from '../../../atoms/display/Icon';

// Tipos específicos para SearchBox
type SearchVariant = 'default' | 'compact' | 'fullWidth';
type SearchSize = 'default' | 'sm' | 'lg';

interface SearchBoxProps<T extends Record<string, any> = any>
  extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'ghost'
    | 'custom';

  $size?: SearchSize;
  $variant?: SearchVariant;
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del SearchBox
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  loading?: boolean;

  // Configuración visual
  $showSearchIcon?: boolean;
  $showClearButton?: boolean;
  $iconPosition?: 'left' | 'right';

  // Props del Input interno
  inputProps?: Partial<InputProps<T>>;

  // Callbacks específicos de búsqueda
  onSearch?: (query: string) => void;
  onClear?: () => void;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// Esquemas de color usando theme.css variables (corregido para SearchBox)
const colorSchemes = {
  default: {
    base: 'border-primary/30 bg-background',
    hover: 'hover:border-primary/50',
    focus: 'focus-within:ring-primary/20',
    text: 'text-foreground',
    placeholder: 'placeholder:text-muted-foreground',
    searchButton: 'default' as const,
    clearButton: 'ghost' as const,
  },
  secondary: {
    base: 'border-secondary/30 bg-secondary/5',
    hover: 'hover:border-secondary/50',
    focus: 'focus-within:ring-secondary/20',
    text: 'text-secondary-foreground',
    placeholder: 'placeholder:text-secondary/60',
    searchButton: 'secondary' as const,
    clearButton: 'ghost' as const,
  },
  destructive: {
    base: 'border-destructive/30 bg-destructive/5',
    hover: 'hover:border-destructive/50',
    focus: 'focus-within:ring-destructive/20',
    text: 'text-destructive-foreground',
    placeholder: 'placeholder:text-destructive/60',
    searchButton: 'destructive' as const,
    clearButton: 'ghost' as const,
  },
  accent: {
    base: 'border-accent/30 bg-accent/5',
    hover: 'hover:border-accent/50',
    focus: 'focus-within:ring-accent/20',
    text: 'text-accent-foreground',
    placeholder: 'placeholder:text-accent/60',
    searchButton: 'secondary' as const,
    clearButton: 'ghost' as const,
  },
  muted: {
    base: 'border-muted-foreground/30 bg-muted/10',
    hover: 'hover:border-muted-foreground/50',
    focus: 'focus-within:ring-muted-foreground/20',
    text: 'text-muted-foreground',
    placeholder: 'placeholder:text-muted-foreground/60',
    searchButton: 'outline' as const,
    clearButton: 'ghost' as const,
  },
  minimal: {
    base: 'border-transparent bg-transparent',
    hover: 'hover:border-foreground/20',
    focus: 'focus-within:ring-foreground/10',
    text: 'text-foreground',
    placeholder: 'placeholder:text-foreground/40',
    searchButton: 'ghost' as const,
    clearButton: 'ghost' as const,
  },
  ghost: {
    base: 'border-transparent bg-accent/5',
    hover: 'hover:bg-accent/10 hover:border-accent/20',
    focus:
      'focus-within:ring-accent/10 focus-within:bg-background focus-within:border-input',
    text: 'text-foreground',
    placeholder: 'placeholder:text-muted-foreground',
    searchButton: 'ghost' as const,
    clearButton: 'ghost' as const,
  },
  custom: {
    base: '', // Vacío para personalización externa
    hover: '',
    focus: '',
    text: '',
    placeholder: '',
    searchButton: 'default' as const,
    clearButton: 'ghost' as const,
  },
};

const searchBoxVariants = {
  base: 'relative flex items-center rounded-md border transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2',

  variants: {
    size: {
      default: 'min-h-[40px]',
      sm: 'min-h-[32px]',
      lg: 'min-h-[48px]',
    },
    variant: {
      default: 'max-w-md',
      compact: 'max-w-xs',
      fullWidth: 'w-full',
    },
  },

  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const SearchBox = React.forwardRef<HTMLDivElement, SearchBoxProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      placeholder = 'Buscar...',
      value,
      disabled = false,
      loading = false,
      $showSearchIcon = true,
      $showClearButton = true,
      $iconPosition = 'left',
      inputProps = {},
      onSearch,
      onClear,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    const finalValue = storeValue ?? value ?? '';

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Actualizar el store si está configurado
      if ($store && storeKey) {
        const setter = `set${
          String(storeKey).charAt(0).toUpperCase() + String(storeKey).slice(1)
        }`;
        const storeState = $store.getState();
        if (typeof storeState[setter] === 'function') {
          storeState[setter](newValue);
        }
      }

      // Llamar a los callbacks
      onChange?.(newValue);
      inputProps.onChange?.(e);
    };

    const handleSearch = () => {
      if (!disabled && !loading) {
        onSearch?.(finalValue);
      }
    };

    const handleClear = () => {
      if (!disabled && !loading) {
        // Limpiar el store si está configurado
        if ($store && storeKey) {
          const setter = `set${
            String(storeKey).charAt(0).toUpperCase() + String(storeKey).slice(1)
          }`;
          const storeState = $store.getState();
          if (typeof storeState[setter] === 'function') {
            storeState[setter]('');
          }
        }

        // Llamar a los callbacks
        onChange?.('');
        onClear?.();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    };

    // Determinar si mostrar botón clear
    const showClearButton =
      $showClearButton && finalValue.length > 0 && !disabled;

    return (
      <div
        ref={ref}
        className={cn(
          searchBoxVariants.base,
          currentColorScheme.base,
          currentColorScheme.hover,
          currentColorScheme.focus,
          searchBoxVariants.variants.size[$size],
          searchBoxVariants.variants.variant[$variant],
          disabled && 'opacity-50 cursor-not-allowed',
          loading && 'opacity-70',
          className,
          $custom
        )}
        {...props}>
        {/* Search Icon - Izquierda */}
        {$showSearchIcon && $iconPosition === 'left' && (
          <Container className="flex items-center pl-3 pr-1">
            <Icon
              icon={FiSearch}
              $size={$size === 'lg' ? 'lg' : 'sm'}
              className="text-muted-foreground"
            />
          </Container>
        )}

        {/* Input Field */}
        <Input
          {...inputProps}
          $store={$store}
          storeKey={storeKey}
          value={finalValue}
          placeholder={placeholder}
          disabled={disabled}
          $colorScheme="custom" // Forzar custom para evitar estilos del Input
          $size={$size}
          className={cn(
            'flex-1 border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            currentColorScheme.text,
            currentColorScheme.placeholder,
            $showSearchIcon && $iconPosition === 'left' && 'pl-2',
            $showSearchIcon && $iconPosition === 'right' && 'pr-2',
            (!$showSearchIcon || showClearButton) && 'pr-1',
            inputProps.className
          )}
          onChange={handleInputChange}
          // Pasar eventos nativos usando el spread de inputProps si están definidos
          {...(onFocus && { onFocus })}
          {...(onBlur && { onBlur })}
          {...(handleKeyDown && { onKeyDown: handleKeyDown })}
        />

        {/* Clear Button */}
        {showClearButton && (
          <Container className="flex items-center px-1">
            <Button
              $colorScheme={currentColorScheme.clearButton}
              $size={$size === 'lg' ? 'default' : 'sm'}
              onClick={handleClear}
              disabled={disabled || loading}
              className="h-auto p-1 hover:bg-muted/50"
              aria-label="Limpiar búsqueda">
              <Icon
                icon={FiX}
                $size="xs"
                className="text-muted-foreground hover:text-foreground"
              />
            </Button>
          </Container>
        )}

        {/* Search Icon - Derecha */}
        {$showSearchIcon && $iconPosition === 'right' && (
          <Container className="flex items-center px-3">
            <Button
              $colorScheme={currentColorScheme.clearButton}
              $size={$size === 'lg' ? 'default' : 'sm'}
              onClick={handleSearch}
              disabled={disabled || loading || !finalValue.trim()}
              className="h-auto p-2"
              aria-label="Buscar">
              <Icon
                icon={loading ? FiLoader : FiSearch}
                $size={$size === 'lg' ? 'lg' : 'sm'}
                className={cn(loading && 'animate-spin')}
              />
            </Button>
          </Container>
        )}

        {/* Search Button - Para variante compact sin icon derecho */}
        {!$showSearchIcon && $variant === 'compact' && (
          <Container className="flex items-center px-2">
            <Button
              $colorScheme={currentColorScheme.searchButton}
              $size="sm"
              onClick={handleSearch}
              disabled={disabled || loading || !finalValue.trim()}
              className="h-auto py-1 px-2 text-xs">
              {loading ? (
                <Icon icon={FiLoader} $size="xs" className="animate-spin" />
              ) : (
                'Buscar'
              )}
            </Button>
          </Container>
        )}
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';

export { SearchBox, type SearchBoxProps, type SearchVariant, type SearchSize };

