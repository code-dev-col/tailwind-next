import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import {
  FiChevronRight,
  FiChevronDown,
  FiHome,
  FiMoreHorizontal,
  FiSlash,
} from 'react-icons/fi';

// Tipos para el breadcrumb
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}

interface BreadcrumbProps extends BaseProps {
  // Items del breadcrumb
  items: BreadcrumbItem[];

  // Esquemas de color basados en theme.css
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'custom';
  $variant?: 'default' | 'pills' | 'arrows' | 'slash' | 'dots' | 'minimal';
  $size?: 'sm' | 'default' | 'lg';

  // Configuración
  $separator?:
    | 'chevron'
    | 'arrow'
    | 'slash'
    | 'dot'
    | 'pipe'
    | 'custom'
    | React.ReactNode;
  $customSeparator?: React.ReactNode | string;
  $showIcons?: boolean;
  $maxItems?: number;
  $collapsible?: boolean;
  $showHome?: boolean;
  $homeIcon?: React.ReactNode;
  $showCurrentPage?: boolean;

  // Callbacks
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  onNavigate?: (href: string) => void;

  // Integración con store
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;

  // Personalización
  $custom?: string;
  $itemClassName?: string;
  $separatorClassName?: string;
  $currentPageClassName?: string;

  // Accesibilidad
  ariaLabel?: string;

  // Renderizado personalizado
  renderItem?: (
    item: BreadcrumbItem,
    index: number,
    isLast: boolean
  ) => React.ReactNode;
  renderSeparator?: (index: number) => React.ReactNode;
}

// Esquemas de color basados en theme.css
const colorSchemes = {
  default: {
    container: 'text-muted-foreground',
    item: 'text-muted-foreground hover:text-primary',
    currentPage: 'text-foreground font-medium',
    separator: 'text-muted-foreground/50',
    pillsHover: 'hover:bg-primary/10 hover:text-primary',
    dropdown: 'hover:bg-primary/10 hover:text-primary',
    dropdownBg: 'bg-card border-border',
    dropdownItem:
      'text-card-foreground hover:bg-muted/50 hover:text-card-foreground',
  },
  secondary: {
    container: 'text-secondary/80',
    item: 'text-secondary/80 hover:text-secondary',
    currentPage: 'text-secondary font-medium',
    separator: 'text-secondary/40',
    pillsHover: 'hover:bg-secondary/10 hover:text-secondary',
    dropdown: 'hover:bg-secondary/10 hover:text-secondary',
    dropdownBg: 'bg-card border-secondary/20',
    dropdownItem:
      'text-secondary/90 hover:bg-secondary/10 hover:text-secondary',
  },
  destructive: {
    container: 'text-destructive/80',
    item: 'text-destructive/80 hover:text-destructive',
    currentPage: 'text-destructive font-medium',
    separator: 'text-destructive/40',
    pillsHover: 'hover:bg-destructive/10 hover:text-destructive',
    dropdown: 'hover:bg-destructive/10 hover:text-destructive',
    dropdownBg: 'bg-card border-destructive/20',
    dropdownItem:
      'text-destructive/90 hover:bg-destructive/10 hover:text-destructive',
  },
  accent: {
    container: 'text-accent/80',
    item: 'text-accent/80 hover:text-accent',
    currentPage: 'text-accent font-medium',
    separator: 'text-accent/40',
    pillsHover: 'hover:bg-accent/10 hover:text-accent',
    dropdown: 'hover:bg-accent/10 hover:text-accent',
    dropdownBg: 'bg-card border-accent/20',
    dropdownItem: 'text-accent/90 hover:bg-accent/10 hover:text-accent',
  },
  muted: {
    container: 'text-muted-foreground/80',
    item: 'text-muted-foreground/80 hover:text-muted-foreground',
    currentPage: 'text-muted-foreground font-medium',
    separator: 'text-muted-foreground/30',
    pillsHover: 'hover:bg-muted/30 hover:text-muted-foreground',
    dropdown: 'hover:bg-muted/30 hover:text-muted-foreground',
    dropdownBg: 'bg-muted/50 border-muted',
    dropdownItem:
      'text-muted-foreground hover:bg-muted/30 hover:text-muted-foreground',
  },
  minimal: {
    container: 'text-foreground/60',
    item: 'text-foreground/60 hover:text-foreground',
    currentPage: 'text-foreground font-medium',
    separator: 'text-border',
    pillsHover: 'hover:bg-border hover:text-foreground',
    dropdown: 'hover:bg-border hover:text-foreground',
    dropdownBg: 'bg-background border-border',
    dropdownItem: 'text-foreground/80 hover:bg-border hover:text-foreground',
  },
  custom: {
    container: 'text-muted-foreground',
    item: 'text-muted-foreground hover:text-primary',
    currentPage: 'text-foreground font-medium',
    separator: 'text-muted-foreground/50',
    pillsHover: 'hover:bg-primary/10 hover:text-primary',
    dropdown: 'hover:bg-primary/10 hover:text-primary',
    dropdownBg: 'bg-card border-border',
    dropdownItem:
      'text-card-foreground hover:bg-muted/50 hover:text-card-foreground',
  },
} as const;

const breadcrumbVariants = {
  container: {
    base: 'flex items-center space-x-1 text-sm',
    sizes: {
      sm: 'text-xs space-x-0.5',
      default: 'text-sm space-x-1',
      lg: 'text-base space-x-2',
    },
  },

  item: {
    base: 'inline-flex items-center gap-1 transition-all duration-200 focus:outline-none',
    interactive: 'cursor-pointer',
    nonInteractive: 'cursor-default',

    variants: {
      default: '',
      pills: 'px-2 py-1 rounded-md',
      arrows: '',
      slash: '',
      dots: '',
      minimal: '',
    },

    sizes: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },

  separator: {
    base: 'flex items-center select-none',
    variants: {
      default: 'mx-1',
      pills: 'mx-0.5',
      arrows: 'mx-1',
      slash: 'mx-1',
      dots: 'mx-2',
      minimal: 'mx-1',
    },
    sizes: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },

  collapsedIndicator: {
    base: 'inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer transition-colors',
    dropdown:
      'absolute top-full left-0 mt-1 rounded-md shadow-lg z-10 min-w-[150px] py-1',
    dropdownItem: 'block w-full text-left px-3 py-2 text-sm transition-colors',
  },

  homeIcon: {
    base: 'flex items-center justify-center w-4 h-4',
  },

  defaultVariants: {
    colorScheme: 'default' as const,
    variant: 'default' as const,
    size: 'default' as const,
    separator: 'chevron' as const,
  },
};

// Separadores predefinidos
const separatorIcons = {
  chevron: <FiChevronRight />,
  arrow: <FiChevronRight />,
  slash: <FiSlash />,
  dot: <span>•</span>,
  pipe: <span>|</span>,
};

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      items,
      $colorScheme = 'default',
      $variant = 'default',
      $size = 'default',
      $separator = 'chevron',
      $customSeparator,
      $showIcons = true,
      $maxItems = 0,
      $collapsible = true,
      $showHome = false,
      $homeIcon = <FiHome />,
      $showCurrentPage = true,
      onItemClick,
      onNavigate,
      $store,
      storeKey,
      $custom,
      $itemClassName,
      $separatorClassName,
      $currentPageClassName,
      ariaLabel = 'Breadcrumb navigation',
      renderItem,
      renderSeparator,
      ...props
    },
    ref
  ) => {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const dropdownRef = React.useRef<HTMLLIElement>(null);

    // Integración con store
    const storeItems =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;
    const finalItems = storeItems || items;

    // Procesar items
    const processedItems = React.useMemo(() => {
      let processedItems = [...finalItems];

      // Añadir Home si está habilitado
      if (
        $showHome &&
        processedItems.length > 0 &&
        processedItems[0].label !== 'Home'
      ) {
        processedItems.unshift({
          label: 'Home',
          href: '/',
          icon: $homeIcon,
        });
      }

      // Filtrar página actual si no se debe mostrar
      if (!$showCurrentPage) {
        processedItems = processedItems.filter((item) => !item.isCurrentPage);
      }

      return processedItems;
    }, [finalItems, $showHome, $homeIcon, $showCurrentPage]);

    // Lógica de colapso
    const { visibleItems, collapsedItems } = React.useMemo(() => {
      if (
        !$collapsible ||
        $maxItems === 0 ||
        processedItems.length <= $maxItems
      ) {
        return { visibleItems: processedItems, collapsedItems: [] };
      }

      // Siempre mostrar el primer y último item
      const firstItem = processedItems[0];
      const lastItems = processedItems.slice(-($maxItems - 2)); // Reservar espacio para "..." y primer item
      const collapsedItems = processedItems.slice(
        1,
        processedItems.length - ($maxItems - 2)
      );

      return {
        visibleItems: [firstItem, ...lastItems],
        collapsedItems,
      };
    }, [processedItems, $collapsible, $maxItems]);

    // Cerrar dropdown al hacer click fuera
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Manejar click en item
    const handleItemClick = React.useCallback(
      (item: BreadcrumbItem, index: number) => {
        if (item.onClick) {
          item.onClick();
        } else if (item.href && onNavigate) {
          onNavigate(item.href);
        }

        onItemClick?.(item, index);

        // Actualizar store si está conectado
        if ($store && storeKey && item.href) {
          // Lógica para actualizar navegación en store si es necesario
        }
      },
      [onItemClick, onNavigate, $store, storeKey]
    );

    // Obtener separador
    const getSeparator = React.useCallback(
      (index: number) => {
        if (renderSeparator) {
          return renderSeparator(index);
        }

        if ($separator === 'custom' && $customSeparator) {
          return typeof $customSeparator === 'string' ? (
            <span>{$customSeparator}</span>
          ) : (
            $customSeparator
          );
        }

        if (React.isValidElement($separator)) {
          return $separator;
        }

        return (
          separatorIcons[$separator as keyof typeof separatorIcons] ||
          separatorIcons.chevron
        );
      },
      [renderSeparator, $separator, $customSeparator]
    );

    // Renderizar item individual
    const renderBreadcrumbItem = React.useCallback(
      (item: BreadcrumbItem, index: number, isLast: boolean) => {
        if (renderItem) {
          return renderItem(item, index, isLast);
        }

        const isClickable =
          item.isClickable !== false &&
          (item.href || item.onClick) &&
          !item.isCurrentPage;
        const isCurrentPage = item.isCurrentPage;

        // Usar colorSchemes para los estilos
        const colors = colorSchemes[$colorScheme];

        const itemClasses = cn(
          breadcrumbVariants.item.base,
          breadcrumbVariants.item.variants[$variant],
          breadcrumbVariants.item.sizes[$size],
          {
            [breadcrumbVariants.item.interactive]: isClickable,
            [breadcrumbVariants.item.nonInteractive]:
              !isClickable && !isCurrentPage,
          },
          // Aplicar colores según el estado
          isCurrentPage
            ? cn(colors.currentPage, $currentPageClassName)
            : cn(
                colors.item,
                $variant === 'pills' ? colors.pillsHover : '',
                $itemClassName
              )
        );

        const content = (
          <>
            {$showIcons && item.icon && (
              <span className={breadcrumbVariants.homeIcon.base}>
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </>
        );

        if (isClickable) {
          return (
            <button
              key={index}
              onClick={() => handleItemClick(item, index)}
              className={itemClasses}
              aria-current={isCurrentPage ? 'page' : undefined}>
              {content}
            </button>
          );
        }

        return (
          <span
            key={index}
            className={itemClasses}
            aria-current={isCurrentPage ? 'page' : undefined}>
            {content}
          </span>
        );
      },
      [
        renderItem,
        $colorScheme,
        $variant,
        $size,
        $showIcons,
        $itemClassName,
        $currentPageClassName,
        handleItemClick,
      ]
    );

    // Clases CSS
    const colors = colorSchemes[$colorScheme];

    const containerClasses = cn(
      breadcrumbVariants.container.base,
      breadcrumbVariants.container.sizes[$size],
      colors.container,
      className,
      $custom
    );

    const separatorClasses = cn(
      breadcrumbVariants.separator.base,
      breadcrumbVariants.separator.variants[$variant],
      breadcrumbVariants.separator.sizes[$size],
      colors.separator,
      $separatorClassName
    );

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={containerClasses}
        {...props}>
        <ol className="flex items-center space-x-1">
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;

            return (
              <React.Fragment key={index}>
                {/* Mostrar collapsed items si es el segundo elemento y hay items colapsados */}
                {index === 1 && collapsedItems.length > 0 && (
                  <>
                    <li className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={cn(
                          breadcrumbVariants.collapsedIndicator.base,
                          colors.dropdown
                        )}
                        aria-label="Show collapsed items"
                        aria-expanded={showDropdown}
                        aria-haspopup="true">
                        <FiMoreHorizontal />
                        <FiChevronDown
                          className={cn(
                            'w-3 h-3 transition-transform',
                            showDropdown && 'rotate-180'
                          )}
                        />
                      </button>

                      {/* Dropdown con items colapsados */}
                      {showDropdown && (
                        <div
                          className={cn(
                            breadcrumbVariants.collapsedIndicator.dropdown,
                            colors.dropdownBg
                          )}>
                          {collapsedItems.map(
                            (collapsedItem, collapsedIndex) => (
                              <button
                                key={collapsedIndex}
                                onClick={() => {
                                  handleItemClick(
                                    collapsedItem,
                                    collapsedIndex + 1
                                  );
                                  setShowDropdown(false);
                                }}
                                className={cn(
                                  breadcrumbVariants.collapsedIndicator
                                    .dropdownItem,
                                  colors.dropdownItem
                                )}>
                                <div className="flex items-center gap-2">
                                  {$showIcons && collapsedItem.icon && (
                                    <span className="w-4 h-4">
                                      {collapsedItem.icon}
                                    </span>
                                  )}
                                  {collapsedItem.label}
                                </div>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </li>

                    {/* Separador después del dropdown */}
                    <li className={separatorClasses} aria-hidden="true">
                      {getSeparator(index)}
                    </li>
                  </>
                )}

                {/* Item principal */}
                <li>{renderBreadcrumbItem(item, index, isLast)}</li>

                {/* Separador (solo si no es el último item) */}
                {!isLast && (
                  <li className={separatorClasses} aria-hidden="true">
                    {getSeparator(index)}
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// Componente de utilidad para crear breadcrumbs dinámicamente
interface BreadcrumbBuilderProps extends Omit<BreadcrumbProps, 'items'> {
  // Construir desde path
  path?: string;
  basePath?: string;

  // Construir desde array de strings
  segments?: string[];

  // Mapear función para crear items
  mapSegment?: (
    segment: string,
    index: number,
    isLast: boolean
  ) => BreadcrumbItem;

  // Auto-generar desde URL actual
  useCurrentUrl?: boolean;
  urlExclusions?: string[]; // Segmentos a excluir
}

const BreadcrumbBuilder = React.forwardRef<HTMLElement, BreadcrumbBuilderProps>(
  (
    {
      path,
      basePath = '',
      segments,
      mapSegment,
      useCurrentUrl = false,
      urlExclusions = [],
      ...breadcrumbProps
    },
    ref
  ) => {
    // Generar items automáticamente
    const items = React.useMemo(() => {
      let pathSegments: string[] = [];

      if (useCurrentUrl && typeof window !== 'undefined') {
        pathSegments = window.location.pathname
          .split('/')
          .filter((segment) => segment && !urlExclusions.includes(segment));
      } else if (path) {
        pathSegments = path.split('/').filter((segment) => segment);
      } else if (segments) {
        pathSegments = segments;
      }

      return pathSegments.map((segment, index, array) => {
        const isLast = index === array.length - 1;
        const href = basePath + '/' + array.slice(0, index + 1).join('/');

        if (mapSegment) {
          return mapSegment(segment, index, isLast);
        }

        return {
          label:
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, ' '),
          href: isLast ? undefined : href,
          isCurrentPage: isLast,
        };
      });
    }, [path, basePath, segments, mapSegment, useCurrentUrl, urlExclusions]);

    return <Breadcrumb ref={ref} items={items} {...breadcrumbProps} />;
  }
);

BreadcrumbBuilder.displayName = 'BreadcrumbBuilder';

export {
  Breadcrumb,
  BreadcrumbBuilder,
  type BreadcrumbProps,
  type BreadcrumbBuilderProps,
  type BreadcrumbItem,
};

