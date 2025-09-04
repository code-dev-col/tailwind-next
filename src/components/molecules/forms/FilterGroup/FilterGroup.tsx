import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { HiChevronDown, HiChevronUp, HiXMark, HiCheck } from 'react-icons/hi2';

// Importar Atoms necesarios
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { CheckBox } from '../../../atoms/forms/CheckBox';
import { Dropdown } from '../../../atoms/forms/Dropdown';
import { Label } from '../../../atoms/forms/Label';
import { Icon } from '../../../atoms/display/Icon';

// Tipos para las opciones de filtro
interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FilterDropdownConfig {
  id: string;
  label?: string;
  placeholder?: string;
  options: FilterOption[];
  storeKey?: string;
  disabled?: boolean;
}

interface FilterCheckboxConfig {
  id: string;
  label: string;
  value: string;
  storeKey?: string;
  disabled?: boolean;
  description?: string;
}

interface FilterGroupProps<T extends Record<string, any> = any>
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
  $variant?: 'default' | 'compact' | 'inline' | 'sidebar';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;

  // Configuración de filtros
  title?: string;
  description?: string;
  dropdowns?: FilterDropdownConfig[];
  checkboxes?: FilterCheckboxConfig[];

  // Opciones de visualización
  showClearAll?: boolean;
  showApplyButton?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;

  // Callbacks
  onClearAll?: () => void;
  onApply?: () => void;
  onToggleCollapse?: (collapsed: boolean) => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border text-card-foreground',
    header: 'text-card-foreground',
    description: 'text-muted-foreground',
    section: 'bg-muted/20',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20 text-secondary-foreground',
    header: 'text-secondary',
    description: 'text-secondary/70',
    section: 'bg-secondary/10',
  },
  destructive: {
    container:
      'bg-destructive/5 border-destructive/20 text-destructive-foreground',
    header: 'text-destructive',
    description: 'text-destructive/70',
    section: 'bg-destructive/10',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20 text-accent-foreground',
    header: 'text-accent',
    description: 'text-accent/70',
    section: 'bg-accent/10',
  },
  muted: {
    container: 'bg-muted border-muted-foreground/20 text-muted-foreground',
    header: 'text-muted-foreground',
    description: 'text-muted-foreground/70',
    section: 'bg-muted-foreground/5',
  },
  minimal: {
    container: 'bg-transparent border-foreground/10 text-foreground',
    header: 'text-foreground',
    description: 'text-foreground/60',
    section: 'bg-foreground/5',
  },
  custom: {
    container: '',
    header: '',
    description: '',
    section: '',
  },
} as const;

const filterGroupVariants = {
  base: 'relative rounded-lg border shadow-sm transition-all duration-200',
  variants: {
    size: {
      default: 'p-4',
      sm: 'p-3',
      lg: 'p-6',
    },
    variant: {
      default: 'space-y-4',
      compact: 'space-y-2',
      inline: 'space-y-3',
      sidebar: 'space-y-3 max-w-xs',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const FilterGroup = React.forwardRef<HTMLDivElement, FilterGroupProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      title,
      description,
      dropdowns = [],
      checkboxes = [],
      showClearAll = true,
      showApplyButton = false,
      collapsible = false,
      defaultCollapsed = false,
      onClearAll,
      onApply,
      onToggleCollapse,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Manejar colapso
    const handleToggleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      if (onToggleCollapse) {
        onToggleCollapse(newCollapsed);
      }
    };

    // Limpiar todos los filtros
    const handleClearAll = () => {
      if ($store) {
        // Limpiar dropdowns
        dropdowns.forEach((dropdown) => {
          if (dropdown.storeKey) {
            const setterName = `set${
              dropdown.storeKey.charAt(0).toUpperCase() +
              dropdown.storeKey.slice(1)
            }`;
            const state = $store.getState() as any;
            const setter = state[setterName];
            if (typeof setter === 'function') {
              setter('');
            }
          }
        });

        // Limpiar checkboxes
        checkboxes.forEach((checkbox) => {
          if (checkbox.storeKey) {
            const setterName = `set${
              checkbox.storeKey.charAt(0).toUpperCase() +
              checkbox.storeKey.slice(1)
            }`;
            const state = $store.getState() as any;
            const setter = state[setterName];
            if (typeof setter === 'function') {
              setter(false);
            }
          }
        });
      }

      if (onClearAll) {
        onClearAll();
      }
    };
    return (
      <div
        ref={ref}
        className={cn(
          filterGroupVariants.base,
          currentColorScheme.container,
          filterGroupVariants.variants.size[$size],
          filterGroupVariants.variants.variant[$variant],
          className,
          $custom
        )}
        {...props}>
        {/* Header con título y controles */}
        {(title || collapsible) && (
          <Container
            $display="flex"
            $justifyContent="between"
            $alignItems="center"
            className="mb-4">
            <Container>
              {title && (
                <Text
                  as="h4"
                  $size={$size === 'lg' ? 'lg' : $size === 'sm' ? 'sm' : 'base'}
                  className={currentColorScheme.header}>
                  {title}
                </Text>
              )}
              {description && (
                <Text
                  as="p"
                  $size="sm"
                  className={cn('mt-1', currentColorScheme.description)}>
                  {description}
                </Text>
              )}
            </Container>

            {collapsible && (
              <Button
                $colorScheme="ghost"
                $size="sm"
                onClick={handleToggleCollapse}
                className="p-1">
                <Icon
                  icon={isCollapsed ? HiChevronDown : HiChevronUp}
                  $size="sm"
                />
              </Button>
            )}
          </Container>
        )}

        {/* Contenido de filtros (colapsable) */}
        {!isCollapsed && (
          <Container className="space-y-4">
            {/* Sección de Dropdowns */}
            {dropdowns.length > 0 && (
              <Container
                className={cn('rounded-md p-3', currentColorScheme.section)}>
                <div
                  className={cn(
                    'grid gap-3',
                    $variant === 'inline'
                      ? `grid-cols-${Math.min(dropdowns.length, 4)}`
                      : 'grid-cols-1'
                  )}>
                  {dropdowns.map((dropdown) => (
                    <Container key={dropdown.id} className="space-y-1">
                      {dropdown.label && (
                        <Label
                          htmlFor={dropdown.id}
                          $size={$size}
                          className={currentColorScheme.header}>
                          {dropdown.label}
                        </Label>
                      )}
                      <Dropdown
                        id={dropdown.id}
                        $colorScheme={$colorScheme}
                        $size={$size}
                        $store={$store}
                        storeKey={dropdown.storeKey as keyof typeof $store}
                        placeholder={dropdown.placeholder}
                        options={dropdown.options}
                        disabled={dropdown.disabled}
                      />
                    </Container>
                  ))}
                </div>
              </Container>
            )}

            {/* Separador entre secciones */}
            {dropdowns.length > 0 && checkboxes.length > 0 && (
              <hr className="border-border" />
            )}

            {/* Sección de Checkboxes */}
            {checkboxes.length > 0 && (
              <Container
                className={cn('rounded-md p-3', currentColorScheme.section)}>
                <div
                  className={cn(
                    'grid gap-3',
                    $variant === 'inline'
                      ? `grid-cols-${Math.min(checkboxes.length, 3)}`
                      : 'grid-cols-1'
                  )}>
                  {checkboxes.map((checkbox) => (
                    <CheckBox
                      key={checkbox.id}
                      id={checkbox.id}
                      $colorScheme={$colorScheme}
                      $size={$size}
                      $store={$store}
                      storeKey={checkbox.storeKey as keyof typeof $store}
                      label={checkbox.label}
                      description={checkbox.description}
                      value={checkbox.value}
                      disabled={checkbox.disabled}
                    />
                  ))}
                </div>
              </Container>
            )}

            {/* Botones de acción */}
            {(showClearAll || showApplyButton) && (
              <>
                <hr className="border-border" />
                <Container
                  $display="flex"
                  $gap={$size === 'sm' ? 'gap-2' : 'gap-3'}
                  $justifyContent={$variant === 'sidebar' ? 'start' : 'end'}
                  className="pt-2">
                  {showClearAll && (
                    <Button
                      $colorScheme="outline"
                      $size={$size}
                      onClick={handleClearAll}>
                      <Icon icon={HiXMark} $size="xs" className="mr-1" />
                      Limpiar Todo
                    </Button>
                  )}

                  {showApplyButton && (
                    <Button
                      $colorScheme="default"
                      $size={$size}
                      onClick={onApply}>
                      <Icon icon={HiCheck} $size="xs" className="mr-1" />
                      Aplicar Filtros
                    </Button>
                  )}
                </Container>
              </>
            )}
          </Container>
        )}
      </div>
    );
  }
);

FilterGroup.displayName = 'FilterGroup';

export {
  FilterGroup,
  type FilterGroupProps,
  type FilterOption,
  type FilterDropdownConfig,
  type FilterCheckboxConfig,
};

