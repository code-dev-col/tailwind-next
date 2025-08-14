import React from 'react';
import { UseBoundStore, StoreApi } from 'zustand';
import { cn } from '../../../utils/cn';
import type { BaseProps } from '../../../types';

interface TooltipProps extends BaseProps {
  // Contenido del tooltip
  content: React.ReactNode;
  children: React.ReactNode;

  // Posicionamiento
  $position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';

  // Variantes de estilo
  $variant?:
    | 'default'
    | 'dark'
    | 'light'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning';
  $size?: 'sm' | 'default' | 'lg';

  // Comportamiento
  $trigger?: 'hover' | 'click' | 'focus' | 'manual';
  $disabled?: boolean;
  $showArrow?: boolean;
  $multiline?: boolean;

  // Timing
  $delay?: number;
  $hideDelay?: number;

  // Callbacks
  onShow?: () => void;
  onHide?: () => void;
  onToggle?: (visible: boolean) => void;

  // Control manual
  $visible?: boolean;
  $defaultVisible?: boolean;

  // Integración con store
  $store?: UseBoundStore<StoreApi<any>>;
  storeKey?: string;

  // Personalización
  $custom?: string;
  $contentClassName?: string;
  $offset?: number;
  $maxWidth?: string;
}

const tooltipVariants = {
  base: 'absolute z-50 px-3 py-2 text-sm font-medium rounded-md shadow-lg pointer-events-none transition-all duration-200 ease-in-out transform',

  variants: {
    variant: {
      default: 'bg-gray-900 text-white border border-gray-700',
      dark: 'bg-black text-white border border-gray-800',
      light: 'bg-white text-gray-900 border border-gray-200 shadow-md',
      primary: 'bg-blue-600 text-white border border-blue-700',
      secondary: 'bg-purple-600 text-white border border-purple-700',
      destructive: 'bg-red-600 text-white border border-red-700',
      success: 'bg-green-600 text-white border border-green-700',
      warning: 'bg-yellow-600 text-white border border-yellow-700',
    },
    size: {
      sm: 'px-2 py-1 text-xs',
      default: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    },
  },

  arrow: {
    base: 'absolute w-2 h-2 transform rotate-45',
    variants: {
      default: 'bg-gray-900 border-gray-700',
      dark: 'bg-black border-gray-800',
      light: 'bg-white border-gray-200',
      primary: 'bg-blue-600 border-blue-700',
      secondary: 'bg-purple-600 border-purple-700',
      destructive: 'bg-red-600 border-red-700',
      success: 'bg-green-600 border-green-700',
      warning: 'bg-yellow-600 border-yellow-700',
    },
  },

  positions: {
    top: {
      tooltip: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      arrow: 'top-full left-1/2 transform -translate-x-1/2 border-t border-l',
    },
    bottom: {
      tooltip: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      arrow:
        'bottom-full left-1/2 transform -translate-x-1/2 border-b border-r',
    },
    left: {
      tooltip: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      arrow: 'left-full top-1/2 transform -translate-y-1/2 border-l border-t',
    },
    right: {
      tooltip: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
      arrow: 'right-full top-1/2 transform -translate-y-1/2 border-r border-b',
    },
    'top-start': {
      tooltip: 'bottom-full left-0 mb-2',
      arrow: 'top-full left-3 border-t border-l',
    },
    'top-end': {
      tooltip: 'bottom-full right-0 mb-2',
      arrow: 'top-full right-3 border-t border-l',
    },
    'bottom-start': {
      tooltip: 'top-full left-0 mt-2',
      arrow: 'bottom-full left-3 border-b border-r',
    },
    'bottom-end': {
      tooltip: 'top-full right-0 mt-2',
      arrow: 'bottom-full right-3 border-b border-r',
    },
  },

  states: {
    visible: 'opacity-100 scale-100',
    hidden: 'opacity-0 scale-95 pointer-events-none',
    multiline: 'whitespace-pre-line',
    singleline: 'whitespace-nowrap',
  },

  defaultVariants: {
    variant: 'default' as const,
    size: 'default' as const,
    position: 'top' as const,
  },
};

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      content,
      children,
      $position = 'top',
      $variant = 'default',
      $size = 'default',
      $trigger = 'hover',
      $disabled = false,
      $showArrow = true,
      $multiline = false,
      $delay = 300,
      $hideDelay = 150,
      onShow,
      onHide,
      onToggle,
      $visible,
      $defaultVisible = false,
      $store,
      storeKey,
      $custom,
      $contentClassName,
      $offset = 0,
      $maxWidth = 'max-w-xs',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState($defaultVisible);
    const [isHovering, setIsHovering] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const showTimeoutRef = React.useRef<NodeJS.Timeout>();
    const hideTimeoutRef = React.useRef<NodeJS.Timeout>();
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Control manual vs automático
    const actualVisible = $visible !== undefined ? $visible : isVisible;

    // Integración con store para estado
    const storeVisible =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    React.useEffect(() => {
      if (storeVisible !== undefined) {
        setIsVisible(Boolean(storeVisible));
      }
    }, [storeVisible]);

    // Limpiar timeouts al desmontar
    React.useEffect(() => {
      return () => {
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      };
    }, []);

    // Funciones de show/hide con delays
    const showTooltip = React.useCallback(() => {
      if ($disabled) return;

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = undefined;
      }

      if ($delay > 0) {
        showTimeoutRef.current = setTimeout(() => {
          setIsVisible(true);
          onShow?.();
          onToggle?.(true);

          if ($store && storeKey) {
            const {
              [`set${storeKey.charAt(0).toUpperCase() + storeKey.slice(1)}`]:
                setter,
            } = ($store as any).getState();
            if (setter) setter(true);
          }
        }, $delay);
      } else {
        setIsVisible(true);
        onShow?.();
        onToggle?.(true);
      }
    }, [$disabled, $delay, onShow, onToggle, $store, storeKey]);

    const hideTooltip = React.useCallback(() => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = undefined;
      }

      if ($hideDelay > 0) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          onHide?.();
          onToggle?.(false);

          if ($store && storeKey) {
            const {
              [`set${storeKey.charAt(0).toUpperCase() + storeKey.slice(1)}`]:
                setter,
            } = ($store as any).getState();
            if (setter) setter(false);
          }
        }, $hideDelay);
      } else {
        setIsVisible(false);
        onHide?.();
        onToggle?.(false);
      }
    }, [$hideDelay, onHide, onToggle, $store, storeKey]);

    // Handlers para diferentes triggers
    const handleMouseEnter = React.useCallback(() => {
      if ($trigger === 'hover') {
        setIsHovering(true);
        showTooltip();
      }
    }, [$trigger, showTooltip]);

    const handleMouseLeave = React.useCallback(() => {
      if ($trigger === 'hover') {
        setIsHovering(false);
        hideTooltip();
      }
    }, [$trigger, hideTooltip]);

    const handleFocus = React.useCallback(() => {
      if ($trigger === 'focus') {
        setIsFocused(true);
        showTooltip();
      }
    }, [$trigger, showTooltip]);

    const handleBlur = React.useCallback(() => {
      if ($trigger === 'focus') {
        setIsFocused(false);
        hideTooltip();
      }
    }, [$trigger, hideTooltip]);

    const handleClick = React.useCallback(() => {
      if ($trigger === 'click') {
        if (actualVisible) {
          hideTooltip();
        } else {
          showTooltip();
        }
      }
    }, [$trigger, actualVisible, showTooltip, hideTooltip]);

    // Cerrar tooltip al hacer click fuera (solo para trigger click)
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          $trigger === 'click' &&
          actualVisible &&
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          hideTooltip();
        }
      };

      if ($trigger === 'click') {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [$trigger, actualVisible, hideTooltip]);

    // Clases CSS para el tooltip
    const tooltipClasses = cn(
      tooltipVariants.base,
      tooltipVariants.variants.variant[$variant],
      tooltipVariants.variants.size[$size],
      tooltipVariants.positions[$position].tooltip,
      {
        [tooltipVariants.states.visible]: actualVisible && !$disabled,
        [tooltipVariants.states.hidden]: !actualVisible || $disabled,
        [tooltipVariants.states.multiline]: $multiline,
        [tooltipVariants.states.singleline]: !$multiline,
      },
      $maxWidth,
      $contentClassName,
      $custom
    );

    // Clases CSS para la flecha
    const arrowClasses = cn(
      tooltipVariants.arrow.base,
      tooltipVariants.arrow.variants[$variant],
      tooltipVariants.positions[$position].arrow,
      {
        [tooltipVariants.states.visible]:
          actualVisible && !$disabled && $showArrow,
        [tooltipVariants.states.hidden]:
          !actualVisible || $disabled || !$showArrow,
      }
    );

    return (
      <div
        ref={containerRef}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        {...props}>
        {/* Elemento trigger */}
        <div className="inline-block">{children}</div>

        {/* Tooltip content */}
        <div
          ref={ref}
          className={tooltipClasses}
          role="tooltip"
          aria-hidden={!actualVisible}
          style={{
            marginTop: $position.includes('bottom') ? $offset : undefined,
            marginBottom: $position.includes('top') ? $offset : undefined,
            marginLeft: $position.includes('right') ? $offset : undefined,
            marginRight: $position.includes('left') ? $offset : undefined,
          }}>
          {content}

          {/* Arrow */}
          {$showArrow && <div className={arrowClasses} />}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

// Componente de utilidad para múltiples tooltips
interface TooltipGroupProps extends BaseProps {
  tooltips: Array<{
    id: string;
    content: React.ReactNode;
    children: React.ReactNode;
    $position?: TooltipProps['$position'];
    $variant?: TooltipProps['$variant'];
    $trigger?: TooltipProps['$trigger'];
  }>;

  // Props globales para todos los tooltips
  $variant?: TooltipProps['$variant'];
  $size?: TooltipProps['$size'];
  $trigger?: TooltipProps['$trigger'];
  $delay?: number;
  $showArrow?: boolean;

  // Layout
  $gap?: 'sm' | 'default' | 'lg';
  $direction?: 'horizontal' | 'vertical';

  // Callbacks
  onTooltipShow?: (id: string) => void;
  onTooltipHide?: (id: string) => void;
}

const TooltipGroup = React.forwardRef<HTMLDivElement, TooltipGroupProps>(
  (
    {
      className,
      tooltips,
      $variant = 'default',
      $size = 'default',
      $trigger = 'hover',
      $delay = 300,
      $showArrow = true,
      $gap = 'default',
      $direction = 'horizontal',
      onTooltipShow,
      onTooltipHide,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      sm: 'gap-2',
      default: 'gap-4',
      lg: 'gap-6',
    };

    const directionClasses = {
      horizontal: 'flex flex-row',
      vertical: 'flex flex-col',
    };

    const groupClasses = cn(
      directionClasses[$direction],
      gapClasses[$gap],
      'items-center',
      className
    );

    return (
      <div ref={ref} className={groupClasses} {...props}>
        {tooltips.map((tooltip) => (
          <Tooltip
            key={tooltip.id}
            content={tooltip.content}
            $position={tooltip.$position}
            $variant={tooltip.$variant || $variant}
            $size={$size}
            $trigger={tooltip.$trigger || $trigger}
            $delay={$delay}
            $showArrow={$showArrow}
            onShow={() => onTooltipShow?.(tooltip.id)}
            onHide={() => onTooltipHide?.(tooltip.id)}>
            {tooltip.children}
          </Tooltip>
        ))}
      </div>
    );
  }
);

TooltipGroup.displayName = 'TooltipGroup';

export { Tooltip, TooltipGroup, type TooltipProps, type TooltipGroupProps };

