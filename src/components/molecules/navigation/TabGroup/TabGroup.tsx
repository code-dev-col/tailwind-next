import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';

// Importar Atoms necesarios
import { Container } from '../../../atoms/layout/Container';
import { Separator } from '../../../atoms/layout/Separator';
import { Badge } from '../../../atoms/feedback/Badge';

// Tipos para el tab individual
interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

interface TabGroupProps<T extends Record<string, any> = any> extends BaseProps {
  // Sistema de esquemas de color con theme.css
  $colorScheme?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';

  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'pills' | 'underline' | 'boxed';
  $orientation?: 'horizontal' | 'vertical';
  $custom?: string;

  // Patrón storeKey
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Props específicas del TabGroup
  tabs: TabItem[];
  activeTabId?: string;
  defaultActiveTab?: string;
  showContent?: boolean;
  fullWidth?: boolean;

  // Layout y presentación
  $justify?: 'start' | 'center' | 'end' | 'between';
  $spacing?: 'compact' | 'default' | 'comfortable';
  $showSeparator?: boolean;

  // Callbacks
  onTabChange?: (tabId: string, tab: TabItem) => void;
  onTabClick?: (tabId: string, tab: TabItem) => void;

  // Etiquetas de accesibilidad
  ariaLabel?: string;
  ariaLabelledBy?: string;

  // Estados
  $loading?: boolean;
  $disabled?: boolean;

  // Clases personalizadas
  $containerClassName?: string;
  $tabsClassName?: string;
  $contentClassName?: string;
}

// Esquemas de color usando theme.css variables (siguiendo patrón Button/Input)
const colorSchemes = {
  default: {
    base: 'bg-card border-border',
    text: 'text-primary', // Tab activo usa primary para destacar
    hover: 'hover:bg-muted/50',
    focus: 'focus-visible:ring-ring/20',
    activeRing: 'ring-2 ring-ring/20 ring-offset-2',
  },
  primary: {
    base: 'bg-primary border-primary',
    text: 'text-primary', // Tab activo usa primary para destacar
    hover: 'hover:bg-primary/10',
    focus: 'focus-visible:ring-primary/20',
    activeRing: 'ring-2 ring-primary/20 ring-offset-2',
  },
  secondary: {
    base: 'bg-secondary border-secondary',
    text: 'text-secondary', // Tab activo usa secondary
    hover: 'hover:bg-secondary/10',
    focus: 'focus-visible:ring-secondary/20',
    activeRing: 'ring-2 ring-secondary/20 ring-offset-2',
  },
  destructive: {
    base: 'bg-destructive border-destructive',
    text: 'text-destructive', // Tab activo usa destructive
    hover: 'hover:bg-destructive/10',
    focus: 'focus-visible:ring-destructive/20',
    activeRing: 'ring-2 ring-destructive/20 ring-offset-2',
  },
  accent: {
    base: 'bg-accent border-accent',
    text: 'text-accent', // Tab activo usa accent
    hover: 'hover:bg-accent/10',
    focus: 'focus-visible:ring-accent/20',
    activeRing: 'ring-2 ring-accent/20 ring-offset-2',
  },
  muted: {
    base: 'bg-muted border-muted',
    text: 'text-foreground', // Tab activo usa foreground para contraste
    hover: 'hover:bg-muted/80',
    focus: 'focus-visible:ring-muted/20',
    activeRing: 'ring-2 ring-muted/20 ring-offset-2',
  },
  minimal: {
    base: 'bg-transparent border-transparent',
    text: 'text-foreground', // Tab activo usa foreground
    hover: 'hover:bg-foreground/10',
    focus: 'focus-visible:ring-foreground/20',
    activeRing: 'ring-2 ring-foreground/20 ring-offset-2',
  },
  custom: {
    base: '',
    text: '',
    hover: '',
    focus: '',
    activeRing: '',
  },
} as const;

const tabGroupVariants = {
  // Base para elementos del TabGroup (siguiendo patrón Button exacto)
  tabBase:
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',

  container: {
    base: 'w-full',
    orientations: {
      horizontal: 'flex flex-col',
      vertical: 'flex flex-row gap-4',
    },
  },

  tabList: {
    base: 'flex transition-all duration-200',
    orientations: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    justifications: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
    variants: {
      default: '', // Sin border-b
      pills: 'bg-muted/30 p-1 rounded-lg',
      underline: '', // Sin border-b-2
      boxed: 'border border-border rounded-t-lg',
    },
    spacing: {
      compact: 'gap-1',
      default: 'gap-2',
      comfortable: 'gap-4',
    },
  },

  tab: {
    sizes: {
      sm: 'h-8 px-3 text-xs',
      default: 'h-9 px-4 text-sm',
      lg: 'h-10 px-6 text-base',
    },
    variants: {
      default: 'hover:bg-muted/50',
      pills:
        'rounded-md hover:bg-muted/50 data-[state=active]:bg-background data-[state=active]:shadow-sm',
      underline: 'hover:bg-muted/50 data-[state=active]:font-medium',
      boxed:
        'border border-transparent rounded-t-lg hover:bg-muted/50 data-[state=active]:border-border data-[state=active]:bg-background',
    },
  },

  content: {
    base: 'transition-all duration-200',
    variants: {
      default: 'p-4 border-t-0',
      pills: 'p-4 mt-2',
      underline: 'p-4 mt-2',
      boxed: 'p-4 border border-t-0 border-border rounded-b-lg bg-background',
    },
  },
};

const TabGroup = React.forwardRef<HTMLDivElement, TabGroupProps>(
  (
    {
      className,
      tabs,
      activeTabId,
      defaultActiveTab,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $orientation = 'horizontal',
      $justify = 'start',
      $spacing = 'default',
      $showSeparator = true,
      showContent = true,
      fullWidth = false,
      $custom,
      $store,
      storeKey,
      onTabChange,
      onTabClick,
      ariaLabel = 'Grupo de pestañas',
      ariaLabelledBy,
      $loading = false,
      $disabled = false,
      $containerClassName,
      $tabsClassName,
      $contentClassName,
      ...props
    },
    ref
  ) => {
    // Estado interno para el tab activo
    const [internalActiveTab, setInternalActiveTab] = React.useState(
      defaultActiveTab || tabs[0]?.id || ''
    );

    // Store integration
    const storeActiveTab =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Determinar el tab activo final
    const finalActiveTab = activeTabId || storeActiveTab || internalActiveTab;

    // Encontrar el tab activo y su contenido
    const activeTab = tabs.find((tab) => tab.id === finalActiveTab);
    const activeContent = activeTab?.content;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Handler para cambio de tab
    const handleTabClick = React.useCallback(
      (tabId: string, tab: TabItem) => {
        if ($disabled || tab.disabled || $loading) return;

        // Actualizar estado interno
        setInternalActiveTab(tabId);

        // Ejecutar callbacks
        onTabClick?.(tabId, tab);
        onTabChange?.(tabId, tab);

        // Actualizar store si está presente
        if ($store && storeKey) {
          const setState = $store.getState() as any;
          if (
            typeof setState[
              `set${
                String(storeKey).charAt(0).toUpperCase() +
                String(storeKey).slice(1)
              }`
            ] === 'function'
          ) {
            setState[
              `set${
                String(storeKey).charAt(0).toUpperCase() +
                String(storeKey).slice(1)
              }`
            ](tabId);
          }
        }

        // Manejar navegación con href
        if (tab.href && typeof window !== 'undefined') {
          window.location.href = tab.href;
        }
      },
      [$disabled, $loading, onTabClick, onTabChange, $store, storeKey]
    );

    // Clases del contenedor principal
    const containerClasses = cn(
      tabGroupVariants.container.base,
      tabGroupVariants.container.orientations[$orientation],
      className,
      $containerClassName,
      $custom
    );

    // Clases de la lista de tabs
    const tabListClasses = cn(
      tabGroupVariants.tabList.base,
      tabGroupVariants.tabList.orientations[$orientation],
      tabGroupVariants.tabList.justifications[$justify],
      tabGroupVariants.tabList.variants[$variant],
      tabGroupVariants.tabList.spacing[$spacing],
      fullWidth && $orientation === 'horizontal' ? 'w-full' : '',
      $tabsClassName
    );

    // Clases del contenido
    const contentClasses = cn(
      tabGroupVariants.content.base,
      tabGroupVariants.content.variants[$variant],
      $contentClassName
    );

    return (
      <Container ref={ref} className={containerClasses} {...props}>
        {/* Lista de Tabs */}
        <Container
          as="div"
          role="tablist"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-orientation={$orientation}
          className={tabListClasses}>
          {tabs.map((tab) => {
            const isActive = tab.id === finalActiveTab;
            const isDisabled = $disabled || tab.disabled || $loading;

            // Clases del tab individual (siguiendo patrón Dropdown exacto)
            const tabClasses = cn(
              tabGroupVariants.tabBase, // Base con focus-visible:ring-ring
              tabGroupVariants.tab.sizes[$size],
              tabGroupVariants.tab.variants[$variant],
              'text-muted-foreground', // Color base de texto
              currentColorScheme.hover, // Hover del colorScheme
              currentColorScheme.focus, // ← Focus específico del colorScheme (sobrescribe base)
              isActive && [
                'data-[state=active]', // Data attribute para CSS
                currentColorScheme.text, // Texto activo del colorScheme
                currentColorScheme.activeRing, // ← Ring activo del colorScheme
              ],
              fullWidth && $orientation === 'horizontal' ? 'flex-1' : ''
            );

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                disabled={isDisabled}
                data-state={isActive ? 'active' : 'inactive'}
                className={tabClasses}
                onClick={() => handleTabClick(tab.id, tab)}>
                {/* Contenido del tab */}
                <Container
                  $display="flex"
                  $alignItems="center"
                  $gap="gap-2"
                  className="relative">
                  {/* Icon opcional */}
                  {tab.icon && (
                    <Container className="flex-shrink-0">{tab.icon}</Container>
                  )}

                  {/* Label del tab */}
                  <Container className="flex-shrink-0">{tab.label}</Container>

                  {/* Badge opcional */}
                  {tab.badge && (
                    <Badge
                      $colorScheme={
                        isActive && $colorScheme !== 'primary'
                          ? $colorScheme
                          : 'muted'
                      }
                      $size="sm"
                      className="ml-1">
                      {tab.badge}
                    </Badge>
                  )}

                  {/* Indicador de carga */}
                  {$loading && isActive && (
                    <Container className="absolute -top-1 -right-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                    </Container>
                  )}
                </Container>
              </button>
            );
          })}
        </Container>

        {/* Separador opcional - Deshabilitado para diseño limpio */}
        {/* {$showSeparator &&
          $variant === 'default' &&
          $orientation === 'horizontal' && (
            <Separator
              $orientation="horizontal"
              $colorScheme={
                $colorScheme === 'primary' ? 'default' : $colorScheme
              }
              className="w-full"
            />
          )} */}

        {/* Contenido del tab activo */}
        {showContent && activeContent && (
          <Container
            role="tabpanel"
            id={`tabpanel-${finalActiveTab}`}
            aria-labelledby={`tab-${finalActiveTab}`}
            tabIndex={0}
            className={contentClasses}>
            {activeContent}
          </Container>
        )}
      </Container>
    );
  }
);

TabGroup.displayName = 'TabGroup';

export { TabGroup, type TabGroupProps, type TabItem };

