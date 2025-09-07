import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import type { IconType } from 'react-icons';

// Importar Atoms necesarios para el Molecule
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Icon } from '../../../atoms/display/Icon';

interface MenuItemProps<T extends Record<string, any> = any> extends BaseProps {
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
  $variant?: 'default' | 'compact' | 'withIcon' | 'withShortcut';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del MenuItem
  label: string;
  icon?: IconType;
  shortcut?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isDangerous?: boolean;

  // Callbacks
  onClick?: (event: React.MouseEvent) => void;
  onSelect?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
}

// Esquemas de color usando theme.css variables con focus ring
const colorSchemes = {
  default: {
    container: 'bg-card border-transparent hover:bg-muted/50',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    icon: 'text-muted-foreground',
    shortcut: 'text-muted-foreground/70',
    active: 'bg-primary/10 text-primary',
    focus: 'focus-visible:ring-ring/20',
    dangerous: 'hover:bg-destructive/10 hover:text-destructive',
  },
  secondary: {
    container: 'bg-secondary/5 border-transparent hover:bg-secondary/10',
    text: 'text-secondary',
    textSecondary: 'text-secondary/70',
    icon: 'text-secondary/80',
    shortcut: 'text-secondary/60',
    active: 'bg-secondary/20 text-secondary',
    focus: 'focus-visible:ring-secondary/20',
    dangerous: 'hover:bg-destructive/10 hover:text-destructive',
  },
  accent: {
    container: 'bg-accent/5 border-transparent hover:bg-accent/10',
    text: 'text-accent',
    textSecondary: 'text-accent/70',
    icon: 'text-accent/80',
    shortcut: 'text-accent/60',
    active: 'bg-accent/20 text-accent',
    focus: 'focus-visible:ring-accent/20',
    dangerous: 'hover:bg-destructive/10 hover:text-destructive',
  },
  destructive: {
    container: 'bg-destructive/5 border-transparent hover:bg-destructive/10',
    text: 'text-destructive',
    textSecondary: 'text-destructive/70',
    icon: 'text-destructive/80',
    shortcut: 'text-destructive/60',
    active: 'bg-destructive/20 text-destructive',
    focus: 'focus-visible:ring-destructive/20',
    dangerous: 'bg-destructive/10 text-destructive',
  },
  muted: {
    container: 'bg-muted/20 border-transparent hover:bg-muted/30',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    icon: 'text-muted-foreground/80',
    shortcut: 'text-muted-foreground/60',
    active: 'bg-muted/40 text-muted-foreground',
    focus: 'focus-visible:ring-muted/20',
    dangerous: 'hover:bg-destructive/10 hover:text-destructive',
  },
  minimal: {
    container: 'bg-transparent border-transparent hover:bg-foreground/5',
    text: 'text-foreground',
    textSecondary: 'text-foreground/70',
    icon: 'text-foreground/60',
    shortcut: 'text-foreground/50',
    active: 'bg-foreground/10 text-foreground',
    focus: 'focus-visible:ring-foreground/20',
    dangerous: 'hover:bg-destructive/10 hover:text-destructive',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    icon: '',
    shortcut: '',
    active: '',
    focus: '',
    dangerous: '',
  },
};

const menuItemVariants = {
  base: [
    'relative w-full text-left group transition-all duration-200 rounded-md',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'border cursor-pointer select-none',
    'active:scale-[0.98]',
  ].join(' '),

  disabled: ['opacity-50 cursor-not-allowed pointer-events-none'].join(' '),

  variants: {
    size: {
      sm: 'px-2 py-1.5 min-h-[2rem] text-sm',
      default: 'px-3 py-2 min-h-[2.5rem]',
      lg: 'px-4 py-3 min-h-[3rem] text-lg',
    },
    variant: {
      default: 'flex items-center justify-between gap-3',
      compact: 'flex items-center gap-2',
      withIcon: 'flex items-center gap-3',
      withShortcut: 'flex items-center justify-between gap-4',
    },
  },

  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,

      // Props específicas
      label,
      icon,
      shortcut,
      isActive = false,
      isDisabled = false,
      isDangerous = false,

      // Callbacks
      onClick,
      onSelect,
      onHover,
      onFocus,

      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Override props with store data if available
    const finalLabel = storeValue?.label || label;
    const finalIcon = storeValue?.icon || icon;
    const finalShortcut = storeValue?.shortcut || shortcut;
    const finalIsActive = storeValue?.isActive ?? isActive;
    const finalIsDisabled = storeValue?.isDisabled ?? isDisabled;
    const finalIsDangerous = storeValue?.isDangerous ?? isDangerous;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Determinar variant automáticamente si no se especifica
    const effectiveVariant = (() => {
      if ($variant !== 'default') return $variant;
      if (finalIcon && finalShortcut) return 'withShortcut';
      if (finalIcon) return 'withIcon';
      if (finalShortcut) return 'withShortcut';
      return 'default';
    })();

    // Clases dinámicas
    const containerClasses = cn(
      menuItemVariants.base,
      currentColorScheme.container,
      currentColorScheme.focus, // Focus ring pattern
      menuItemVariants.variants.size[$size],
      menuItemVariants.variants.variant[effectiveVariant],
      finalIsDisabled && menuItemVariants.disabled,
      finalIsActive && currentColorScheme.active,
      finalIsDangerous && currentColorScheme.dangerous,
      className,
      $custom
    );

    // Event handlers
    const handleClick = (event: React.MouseEvent) => {
      if (finalIsDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
      onSelect?.();
    };

    const handleMouseEnter = () => {
      if (!finalIsDisabled) {
        onHover?.();
      }
    };

    const handleFocus = () => {
      if (!finalIsDisabled) {
        onFocus?.();
      }
    };

    // Keyboard support
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (finalIsDisabled) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect?.();
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={finalIsDisabled}
        className={containerClasses}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        role="menuitem"
        aria-disabled={finalIsDisabled}
        aria-current={finalIsActive ? 'true' : undefined}
        {...props}>
        {/* Content Container */}
        <Container
          $display="flex"
          $alignItems="center"
          $gap={effectiveVariant === 'compact' ? 'gap-2' : 'gap-3'}
          className="w-full">
          {/* Icon */}
          {finalIcon && (
            <Icon
              icon={finalIcon}
              className={cn(
                'shrink-0',
                currentColorScheme.icon,
                finalIsActive && currentColorScheme.text,
                finalIsDangerous && 'group-hover:text-destructive',
                $size === 'sm'
                  ? 'w-4 h-4'
                  : $size === 'lg'
                  ? 'w-6 h-6'
                  : 'w-5 h-5'
              )}
            />
          )}

          {/* Label */}
          <Text
            $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'lg' : 'base'}
            $weight={finalIsActive ? 'semibold' : 'medium'}
            className={cn(
              'flex-1 text-left truncate',
              currentColorScheme.text,
              finalIsActive && currentColorScheme.text,
              finalIsDangerous && 'group-hover:text-destructive'
            )}>
            {finalLabel}
          </Text>

          {/* Shortcut */}
          {finalShortcut && (
            <Container
              className={cn(
                'shrink-0 px-2 py-0.5 rounded bg-muted/50 border',
                'font-mono text-xs',
                currentColorScheme.shortcut,
                finalIsActive && currentColorScheme.textSecondary
              )}>
              <Text
                $size="xs"
                $weight="medium"
                className="font-mono leading-none">
                {finalShortcut}
              </Text>
            </Container>
          )}
        </Container>
      </button>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export { MenuItem, type MenuItemProps };

