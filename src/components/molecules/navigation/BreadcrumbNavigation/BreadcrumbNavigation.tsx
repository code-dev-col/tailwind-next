import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { Breadcrumb } from '../../../atoms/navigation/Breadcrumb/Breadcrumb';
import { Button } from '../../../atoms/forms/Button/Button';
import {
  FiChevronLeft,
  FiHome,
  FiRefreshCw,
  FiShare2,
  FiMoreVertical,
  FiCopy,
  FiBookmark,
  FiPrinter,
} from 'react-icons/fi';
import { Container } from '@/components/atoms/layout/Container';

// Tipos para el breadcrumb navigation
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrentPage?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}

interface BreadcrumbAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'accent'
    | 'muted'
    | 'minimal'
    | 'outline'
    | 'ghost'
    | 'link'
    | 'custom';
}

interface BreadcrumbNavigationProps extends BaseProps {
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

  // Variantes del breadcrumb
  $variant?: 'default' | 'pills' | 'arrows' | 'slash' | 'dots' | 'minimal';
  $size?: 'sm' | 'default' | 'lg';

  // Layout del componente molecule
  $layout?: 'default' | 'centered' | 'split' | 'compact' | 'card';
  $direction?: 'horizontal' | 'vertical';

  // Navegación y acciones
  $showBackButton?: boolean;
  $showHomeButton?: boolean;
  $showActions?: boolean;
  $showShare?: boolean;
  $showRefresh?: boolean;
  $showMore?: boolean;
  actions?: BreadcrumbAction[];

  // Callbacks
  onBack?: () => void;
  onHome?: () => void;
  onShare?: () => void;
  onRefresh?: () => void;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  onNavigate?: (href: string) => void;

  // Configuración del breadcrumb interno
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
  $showCurrentPage?: boolean;

  // Integración con store
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;

  // Personalización
  $custom?: string;
  $containerClassName?: string;
  $headerClassName?: string;
  $breadcrumbClassName?: string;
  $actionsClassName?: string;

  // Textos personalizables
  backButtonLabel?: string;
  homeButtonLabel?: string;
  shareButtonLabel?: string;
  refreshButtonLabel?: string;
  moreButtonLabel?: string;

  // Accesibilidad
  ariaLabel?: string;
  backButtonAriaLabel?: string;
  homeButtonAriaLabel?: string;

  // Estado
  $loading?: boolean;
  $disabled?: boolean;
}

// Esquemas de color basados en theme.css
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    subtitle: 'text-muted-foreground',
    border: 'border-border',
    background: 'bg-card',
    hover: 'hover:bg-muted/50',
    focus: 'focus:ring-ring/20',
  },
  primary: {
    container: 'bg-primary/5 border-primary/20',
    text: 'text-primary',
    subtitle: 'text-primary/80',
    border: 'border-primary/20',
    background: 'bg-primary/5',
    hover: 'hover:bg-primary/10',
    focus: 'focus:ring-primary/20',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20',
    text: 'text-secondary',
    subtitle: 'text-secondary/80',
    border: 'border-secondary/20',
    background: 'bg-secondary/5',
    hover: 'hover:bg-secondary/10',
    focus: 'focus:ring-secondary/20',
  },
  destructive: {
    container: 'bg-destructive/5 border-destructive/20',
    text: 'text-destructive',
    subtitle: 'text-destructive/80',
    border: 'border-destructive/20',
    background: 'bg-destructive/5',
    hover: 'hover:bg-destructive/10',
    focus: 'focus:ring-destructive/20',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20',
    text: 'text-accent',
    subtitle: 'text-accent/80',
    border: 'border-accent/20',
    background: 'bg-accent/5',
    hover: 'hover:bg-accent/10',
    focus: 'focus:ring-accent/20',
  },
  muted: {
    container: 'bg-muted/50 border-muted',
    text: 'text-muted-foreground',
    subtitle: 'text-muted-foreground/80',
    border: 'border-muted',
    background: 'bg-muted/50',
    hover: 'hover:bg-muted/70',
    focus: 'focus:ring-muted/20',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground',
    subtitle: 'text-foreground/70',
    border: 'border-transparent',
    background: 'bg-transparent',
    hover: 'hover:bg-foreground/5',
    focus: 'focus:ring-foreground/20',
  },
  custom: {
    container: '',
    text: '',
    subtitle: '',
    border: '',
    background: '',
    hover: '',
    focus: '',
  },
} as const;

const layoutVariants = {
  base: 'w-full py-4 transition-all duration-200',
  layouts: {
    default: 'flex flex-col gap-4',
    centered: 'flex flex-col items-center gap-4 text-center',
    split: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4',
    compact: 'flex items-center gap-2',
    card: 'px-4 py-2 rounded-lg border flex flex-col gap-4',
  },
  directions: {
    horizontal: 'flex-row items-center',
    vertical: 'flex-col items-start',
  },
  sizes: {
    sm: 'text-sm gap-2',
    default: 'text-base gap-4',
    lg: 'text-lg gap-6',
  },
};

// Acciones predeterminadas
const getDefaultActions = (
  onShare?: () => void,
  onRefresh?: () => void
): BreadcrumbAction[] => [
  {
    label: 'Compartir',
    icon: <FiShare2 />,
    onClick: onShare || (() => console.log('Share clicked')),
    $colorScheme: 'default',
  },
  {
    label: 'Copiar enlace',
    icon: <FiCopy />,
    onClick: () => {
      if (typeof window !== 'undefined') {
        navigator.clipboard?.writeText(window.location.href);
      }
    },
    $colorScheme: 'default',
  },
  {
    label: 'Guardar',
    icon: <FiBookmark />,
    onClick: () => console.log('Bookmark clicked'),
    $colorScheme: 'default',
  },
  {
    label: 'Imprimir',
    icon: <FiPrinter />,
    onClick: () => {
      if (typeof window !== 'undefined') {
        window.print();
      }
    },
    $colorScheme: 'default',
  },
  {
    label: 'Actualizar',
    icon: <FiRefreshCw />,
    onClick: onRefresh || (() => window.location.reload()),
    $colorScheme: 'default',
  },
];

const BreadcrumbNavigation = React.forwardRef<
  HTMLElement,
  BreadcrumbNavigationProps
>(
  (
    {
      className,
      items,
      $colorScheme = 'default',
      $variant = 'default',
      $size = 'default',
      $layout = 'default',
      $direction = 'horizontal',
      $showBackButton = false,
      $showHomeButton = false,
      $showActions = false,
      $showShare = false,
      $showRefresh = false,
      $showMore = false,
      actions,
      onBack,
      onHome,
      onShare,
      onRefresh,
      onItemClick,
      onNavigate,
      $separator = 'chevron',
      $customSeparator,
      $showIcons = true,
      $maxItems = 0,
      $collapsible = true,
      $showCurrentPage = true,
      $store,
      storeKey,
      $custom,
      $containerClassName,
      $headerClassName,
      $breadcrumbClassName,
      $actionsClassName,
      backButtonLabel = 'Atrás',
      homeButtonLabel = 'Inicio',
      shareButtonLabel = 'Compartir',
      refreshButtonLabel = 'Actualizar',
      moreButtonLabel = 'Más opciones',
      ariaLabel = 'Navegación de ruta',
      backButtonAriaLabel = 'Ir a la página anterior',
      homeButtonAriaLabel = 'Ir al inicio',
      $loading = false,
      $disabled = false,
      ...props
    },
    ref
  ) => {
    const [showMoreActions, setShowMoreActions] = React.useState(false);
    const moreActionsRef = React.useRef<HTMLDivElement>(null);

    // Integración con store
    const storeItems =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;
    const finalItems = storeItems || items;

    // Cerrar menú de más acciones al hacer click fuera
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          moreActionsRef.current &&
          !moreActionsRef.current.contains(event.target as Node)
        ) {
          setShowMoreActions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handlers
    const handleBack = React.useCallback(() => {
      if (onBack) {
        onBack();
      } else if (typeof window !== 'undefined') {
        window.history.back();
      }
    }, [onBack]);

    const handleHome = React.useCallback(() => {
      if (onHome) {
        onHome();
      } else if (onNavigate) {
        onNavigate('/');
      } else if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }, [onHome, onNavigate]);

    const handleShare = React.useCallback(() => {
      if (onShare) {
        onShare();
      } else if (typeof navigator !== 'undefined' && navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
    }, [onShare]);

    const handleRefresh = React.useCallback(() => {
      if (onRefresh) {
        onRefresh();
      } else if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }, [onRefresh]);

    // Generar acciones
    const finalActions = React.useMemo(() => {
      if (actions) return actions;

      const defaultActions: BreadcrumbAction[] = [];

      if ($showShare) {
        defaultActions.push(getDefaultActions(onShare, onRefresh)[0]);
      }

      if ($showRefresh) {
        defaultActions.push(getDefaultActions(onShare, onRefresh)[4]);
      }

      if ($showMore) {
        defaultActions.push(
          ...getDefaultActions(onShare, onRefresh).slice(1, 4)
        );
      }

      return defaultActions;
    }, [actions, $showShare, $showRefresh, $showMore, onShare, onRefresh]);

    // Clases CSS
    const colors = colorSchemes[$colorScheme];

    const containerClasses = cn(
      layoutVariants.base,
      layoutVariants.layouts[$layout],
      layoutVariants.sizes[$size],
      $layout === 'card' ? cn(colors.container, colors.border) : '',
      $direction === 'vertical' ? layoutVariants.directions.vertical : '',
      className,
      $containerClassName,
      $custom
    );

    const headerClasses = cn(
      'flex items-center gap-2',
      $layout === 'split' ? 'justify-between' : '',
      $headerClassName
    );

    const actionsClasses = cn('flex items-center gap-2', $actionsClassName);

    return (
      <Container
        ref={ref}
        as="nav"
        aria-label={ariaLabel}
        className={containerClasses}
        {...props}>
        {/* Header con botones de navegación */}
        {($showBackButton || $showHomeButton || $showActions) && (
          <Container className={headerClasses}>
            <Container className="flex items-center gap-2">
              {$showBackButton && (
                <Button
                  $colorScheme="ghost"
                  $size={$size}
                  onClick={handleBack}
                  disabled={$disabled || $loading}
                  aria-label={backButtonAriaLabel}
                  className="flex items-center gap-2">
                  <FiChevronLeft className="w-4 h-4" />
                  {$size !== 'sm' && <span>{backButtonLabel}</span>}
                </Button>
              )}

              {$showHomeButton && (
                <Button
                  $colorScheme="ghost"
                  $size={$size}
                  onClick={handleHome}
                  disabled={$disabled || $loading}
                  aria-label={homeButtonAriaLabel}
                  className="flex items-center gap-2">
                  <FiHome className="w-4 h-4" />
                  {$size !== 'sm' && <span>{homeButtonLabel}</span>}
                </Button>
              )}
            </Container>

            {/* Acciones del header */}
            {$showActions && finalActions.length > 0 && (
              <Container className={actionsClasses}>
                {finalActions.slice(0, 2).map((action, index) => (
                  <Button
                    key={index}
                    $colorScheme="ghost"
                    $size={$size}
                    onClick={action.onClick}
                    disabled={$disabled || $loading}
                    aria-label={action.label}
                    className="flex items-center gap-2">
                    {action.icon}
                    {$size === 'lg' && <span>{action.label}</span>}
                  </Button>
                ))}

                {/* Botón "Más" con menú desplegable */}
                {finalActions.length > 2 && (
                  <Container
                    className="relative"
                    ref={moreActionsRef}
                    $position="relative">
                    <Button
                      $colorScheme="ghost"
                      $size={$size}
                      onClick={() => setShowMoreActions(!showMoreActions)}
                      disabled={$disabled || $loading}
                      aria-label={moreButtonLabel}
                      aria-expanded={showMoreActions}
                      aria-haspopup="true">
                      <FiMoreVertical className="w-4 h-4" />
                    </Button>

                    {/* Menú desplegable */}
                    {showMoreActions && (
                      <Container
                        $position="absolute"
                        $top="100%"
                        $right="0"
                        $margin="mt-2"
                        $padding="py-1"
                        $minWidth="180px"
                        $borderRadius="rounded-lg"
                        $boxShadow="shadow-lg"
                        $zIndex={50}
                        className={cn(
                          colors.container,
                          colors.border,
                          'border'
                        )}>
                        {finalActions.slice(2).map((action, index) => (
                          <button
                            key={index + 2}
                            onClick={() => {
                              action.onClick();
                              setShowMoreActions(false);
                            }}
                            disabled={$disabled || $loading}
                            className={cn(
                              'w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors',
                              colors.text,
                              colors.hover,
                              $disabled && 'opacity-50 cursor-not-allowed'
                            )}>
                            {action.icon}
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </Container>
                    )}
                  </Container>
                )}
              </Container>
            )}
          </Container>
        )}

        {/* Breadcrumb principal */}
        <Container className={$breadcrumbClassName}>
          <Breadcrumb
            items={finalItems}
            $colorScheme={$colorScheme}
            $variant={$variant}
            $size={$size}
            $separator={$separator}
            $customSeparator={$customSeparator}
            $showIcons={$showIcons}
            $maxItems={$maxItems}
            $collapsible={$collapsible}
            $showCurrentPage={$showCurrentPage}
            onItemClick={onItemClick}
            onNavigate={onNavigate}
            $store={$store}
            storeKey={storeKey}
            ariaLabel={ariaLabel}
          />
        </Container>

        {/* Acciones adicionales en layout vertical */}
        {$direction === 'vertical' &&
          $showActions &&
          finalActions.length > 0 && (
            <Container
              className={cn(actionsClasses, 'justify-start flex-wrap')}>
              {finalActions.map((action, index) => (
                <Button
                  key={index}
                  $colorScheme="outline"
                  $size="sm"
                  onClick={action.onClick}
                  disabled={$disabled || $loading}
                  className="flex items-center gap-2">
                  {action.icon}
                  <span>{action.label}</span>
                </Button>
              ))}
            </Container>
          )}
      </Container>
    );
  }
);

BreadcrumbNavigation.displayName = 'BreadcrumbNavigation';

export {
  BreadcrumbNavigation,
  type BreadcrumbNavigationProps,
  type BreadcrumbAction,
  type BreadcrumbItem,
};

