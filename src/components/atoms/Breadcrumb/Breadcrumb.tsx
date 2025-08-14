import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';
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

  // Variantes visuales
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

const breadcrumbVariants = {
  container: {
    base: 'flex items-center space-x-1 text-sm',
    variants: {
      default: 'text-gray-600',
      pills: 'text-gray-700',
      arrows: 'text-gray-600',
      slash: 'text-gray-600',
      dots: 'text-gray-600',
      minimal: 'text-gray-500',
    },
    sizes: {
      sm: 'text-xs space-x-0.5',
      default: 'text-sm space-x-1',
      lg: 'text-base space-x-2',
    },
  },

  item: {
    base: 'inline-flex items-center gap-1 transition-all duration-200 focus:outline-none',
    interactive: 'hover:text-blue-600 focus:text-blue-600 cursor-pointer',
    nonInteractive: 'cursor-default',
    currentPage: 'font-medium text-gray-900 cursor-default',

    variants: {
      default: 'hover:text-blue-600',
      pills: 'px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-700',
      arrows: 'hover:text-blue-600',
      slash: 'hover:text-blue-600',
      dots: 'hover:text-blue-600',
      minimal: 'hover:text-gray-700',
    },

    sizes: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },

  separator: {
    base: 'flex items-center text-gray-400 select-none',
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
    base: 'inline-flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded cursor-pointer transition-colors',
    dropdown:
      'absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[150px] py-1',
    dropdownItem:
      'block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors',
  },

  homeIcon: {
    base: 'flex items-center justify-center w-4 h-4',
  },

  defaultVariants: {
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

        const itemClasses = cn(
          breadcrumbVariants.item.base,
          breadcrumbVariants.item.variants[$variant],
          breadcrumbVariants.item.sizes[$size],
          {
            [breadcrumbVariants.item.interactive]: isClickable,
            [breadcrumbVariants.item.nonInteractive]:
              !isClickable && !isCurrentPage,
            [breadcrumbVariants.item.currentPage]: isCurrentPage,
          },
          isCurrentPage ? $currentPageClassName : $itemClassName
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
        $variant,
        $size,
        $showIcons,
        $itemClassName,
        $currentPageClassName,
        handleItemClick,
      ]
    );

    // Clases CSS
    const containerClasses = cn(
      breadcrumbVariants.container.base,
      breadcrumbVariants.container.variants[$variant],
      breadcrumbVariants.container.sizes[$size],
      className,
      $custom
    );

    const separatorClasses = cn(
      breadcrumbVariants.separator.base,
      breadcrumbVariants.separator.variants[$variant],
      breadcrumbVariants.separator.sizes[$size],
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
                        className={breadcrumbVariants.collapsedIndicator.base}
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
                          className={
                            breadcrumbVariants.collapsedIndicator.dropdown
                          }>
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
                                className={
                                  breadcrumbVariants.collapsedIndicator
                                    .dropdownItem
                                }>
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

