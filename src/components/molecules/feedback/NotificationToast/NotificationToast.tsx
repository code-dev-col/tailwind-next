import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import {
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiX,
} from 'react-icons/fi';

// Layout Atoms
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Center } from '../../../atoms/layout/Center';
import { Divider } from '../../../atoms/layout/Divider';

// Display & Feedback Atoms
import { Text } from '../../../atoms/display/Text';
import { Icon } from '../../../atoms/display/Icon';

// Form Atoms
import { Button } from '../../../atoms/forms/Button';

interface NotificationToastProps<T extends Record<string, any> = any>
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
  $variant?: 'default' | 'compact' | 'detailed' | 'floating';
  $custom?: string;

  // Store integration (patrón storeKey)
  $store?: UseBoundStore<StoreApi<T>>;
  storeKey?: keyof T;

  // Contenido principal
  title?: string;
  message?: string;

  // Tipo de notificación (mapea a iconos y colores)
  type?: 'info' | 'success' | 'warning' | 'error';

  // Estado y comportamiento
  isVisible?: boolean;
  isClosable?: boolean;
  showCloseButton?: boolean;

  // Auto-dismiss
  duration?: number; // en milisegundos, 0 = no auto-dismiss

  // Posicionamiento y animación
  $position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  $animated?: boolean;
  $animationType?: 'slide' | 'fade' | 'bounce';

  // Acciones adicionales
  actions?: Array<{
    id: string;
    label: string;
    $colorScheme?:
      | 'default'
      | 'secondary'
      | 'destructive'
      | 'accent'
      | 'minimal';
    onClick?: () => void;
  }>;

  // Callbacks
  onClose?: () => void;
  onActionClick?: (actionId: string) => void;
  onShow?: () => void;
  onHide?: () => void;
}

// Configuración por tipo de notificación
const notificationTypeConfig = {
  info: {
    icon: FiInfo,
    colorScheme: 'default' as const,
    defaultTitle: 'Información',
  },
  success: {
    icon: FiCheckCircle,
    colorScheme: 'secondary' as const,
    defaultTitle: 'Éxito',
  },
  warning: {
    icon: FiAlertTriangle,
    colorScheme: 'accent' as const,
    defaultTitle: 'Advertencia',
  },
  error: {
    icon: FiXCircle,
    colorScheme: 'destructive' as const,
    defaultTitle: 'Error',
  },
};

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    text: 'text-card-foreground',
    textSecondary: 'text-muted-foreground',
    icon: 'text-foreground',
    closeButton: 'text-muted-foreground hover:text-foreground',
    shadow: 'shadow-lg',
    focus: 'focus-visible:ring-ring/20',
  },
  secondary: {
    container: 'bg-secondary/80 border-secondary/20',
    text: 'text-secondary-foreground',
    textSecondary: 'text-card-foreground',
    icon: 'text-destructive-foreground',
    closeButton: 'text-secondary/70 hover:text-secondary',
    shadow: 'shadow-lg shadow-secondary/10',
    focus: 'focus-visible:ring-secondary/20',
  },
  destructive: {
    container: 'bg-destructive/80 border-destructive/20',
    text: 'text-destructive-foreground',
    textSecondary: 'text-destructive-foreground',
    icon: 'text-destructive-foreground',
    closeButton: 'text-destructive/70 hover:text-destructive',
    shadow: 'shadow-lg shadow-destructive/10',
    focus: 'focus-visible:ring-destructive/20',
  },
  accent: {
    container: 'bg-accent/80 border-accent/20',
    text: 'text-accent-foreground',
    textSecondary: 'text-card-foreground',
    icon: 'text-destructive-foreground',
    closeButton: 'text-accent/70 hover:text-accent',
    shadow: 'shadow-lg shadow-accent/10',
    focus: 'focus-visible:ring-accent/20',
  },
  muted: {
    container: 'bg-muted border-muted',
    text: 'text-muted-foreground',
    textSecondary: 'text-muted-foreground/70',
    icon: 'text-muted-foreground',
    closeButton: 'text-muted-foreground/70 hover:text-muted-foreground',
    shadow: 'shadow-md',
    focus: 'focus-visible:ring-muted/20',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    text: 'text-foreground',
    textSecondary: 'text-foreground/70',
    icon: 'text-foreground/80',
    closeButton: 'text-foreground/50 hover:text-foreground/80',
    shadow: 'shadow-sm',
    focus: 'focus-visible:ring-foreground/20',
  },
  custom: {
    container: '',
    text: '',
    textSecondary: '',
    icon: '',
    closeButton: '',
    shadow: '',
    focus: '',
  },
};

// Variantes de posicionamiento
const positionVariants = {
  'top-right': 'fixed top-4 right-4 z-50',
  'top-left': 'fixed top-4 left-4 z-50',
  'bottom-right': 'fixed bottom-4 right-4 z-50',
  'bottom-left': 'fixed bottom-4 left-4 z-50',
  'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
  'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50',
};

// Animaciones
const animationVariants = {
  slide: {
    enter: 'transform transition-all duration-300 ease-out',
    'top-right': 'translate-x-full opacity-0',
    'top-left': '-translate-x-full opacity-0',
    'bottom-right': 'translate-x-full opacity-0',
    'bottom-left': '-translate-x-full opacity-0',
    'top-center': '-translate-y-full opacity-0',
    'bottom-center': 'translate-y-full opacity-0',
    show: 'translate-x-0 translate-y-0 opacity-100',
    hide: 'translate-x-full opacity-0',
  },
  fade: {
    enter: 'transition-opacity duration-300 ease-out',
    hide: 'opacity-0',
    show: 'opacity-100',
  },
  bounce: {
    enter: 'animate-bounce transition-all duration-500 ease-out',
    hide: 'scale-75 opacity-0',
    show: 'scale-100 opacity-100',
  },
};

const notificationToastVariants = {
  base: 'relative rounded-lg border backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  variants: {
    size: {
      sm: 'p-3 min-w-[280px] max-w-[320px]',
      default: 'p-4 min-w-[320px] max-w-[400px]',
      lg: 'p-5 min-w-[400px] max-w-[500px]',
    },
    variant: {
      default: '',
      compact: 'p-3',
      detailed: 'space-y-3',
      floating: 'backdrop-blur-md bg-opacity-95',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
    position: 'top-right' as const,
    animated: true,
    animationType: 'slide' as const,
  },
};

const NotificationToast = React.forwardRef<
  HTMLDivElement,
  NotificationToastProps
>(
  (
    {
      className,
      $colorScheme,
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      storeKey,
      title,
      message = '',
      type = 'info',
      isVisible = true,
      isClosable = true,
      showCloseButton = true,
      duration = 5000,
      $position = 'top-right',
      $animated = true,
      $animationType = 'slide',
      actions = [],
      onClose,
      onActionClick,
      onShow,
      onHide,
      ...props
    },
    ref
  ) => {
    // Store integration
    const storeValue =
      $store && storeKey ? $store((state) => state[storeKey]) : undefined;

    // Configuración del tipo de notificación
    const typeConfig = notificationTypeConfig[type];
    const finalColorScheme = $colorScheme || typeConfig.colorScheme;
    const finalTitle = title || typeConfig.defaultTitle;

    // Obtener esquema de color activo
    const currentColorScheme =
      colorSchemes[finalColorScheme] || colorSchemes.default;

    // Estado interno para controlar visibilidad y animaciones
    const [internalVisible, setInternalVisible] = React.useState(isVisible);
    const [isAnimating, setIsAnimating] = React.useState(false);

    // Auto-dismiss timer
    React.useEffect(() => {
      if (isVisible && duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [isVisible, duration]);

    // Callbacks de ciclo de vida
    React.useEffect(() => {
      if (isVisible && onShow) {
        onShow();
      }
    }, [isVisible, onShow]);

    // Manejo del cierre
    const handleClose = React.useCallback(() => {
      if (!isClosable) return;

      setIsAnimating(true);

      // Animar salida
      setTimeout(
        () => {
          setInternalVisible(false);
          if (onClose) onClose();
          if (onHide) onHide();
          setIsAnimating(false);
        },
        $animated ? 300 : 0
      );
    }, [isClosable, onClose, onHide, $animated]);

    // Manejo de acciones
    const handleActionClick = (actionId: string) => {
      if (onActionClick) {
        onActionClick(actionId);
      }

      // Encontrar la acción y ejecutar su callback
      const action = actions.find((a) => a.id === actionId);
      if (action?.onClick) {
        action.onClick();
      }
    };

    // Si no es visible, no renderizar
    if (!isVisible && !internalVisible) {
      return null;
    }

    return (
      <Container
        ref={ref}
        className={cn(
          notificationToastVariants.base,
          currentColorScheme.container,
          currentColorScheme.shadow,
          currentColorScheme.focus,
          notificationToastVariants.variants.size[$size],
          notificationToastVariants.variants.variant[$variant],
          $position && positionVariants[$position],
          $animated && !isAnimating && animationVariants[$animationType]?.show,
          $animated && isAnimating && animationVariants[$animationType]?.hide,
          className,
          $custom
        )}
        {...props}>
        {/* Layout principal */}
        <Container $display="flex" $alignItems="start" $gap="gap-3">
          {/* Icono del tipo */}
          <Container className="flex-shrink-0 pt-0.5">
            <Icon
              icon={typeConfig.icon}
              $size="default"
              className={cn('w-5 h-5', currentColorScheme.icon)}
            />
          </Container>

          {/* Contenido principal */}
          <Container className="flex-1 min-w-0">
            {/* Título */}
            {finalTitle && (
              <Text
                $size={$size === 'sm' ? 'sm' : $size === 'lg' ? 'base' : 'sm'}
                $weight="semibold"
                className={cn('leading-tight', currentColorScheme.text)}>
                {finalTitle}
              </Text>
            )}

            {/* Mensaje */}
            {message && (
              <Text
                $size={$size === 'sm' ? 'xs' : 'sm'}
                className={cn(
                  'leading-relaxed',
                  finalTitle ? 'mt-1' : '',
                  currentColorScheme.textSecondary
                )}>
                {message}
              </Text>
            )}

            {/* Acciones */}
            {actions.length > 0 && (
              <Container
                $display="flex"
                $alignItems="center"
                $gap="gap-2"
                className="mt-3 flex-wrap">
                {actions.map((action) => (
                  <Button
                    key={action.id}
                    $colorScheme={action.$colorScheme || 'minimal'}
                    $size="sm"
                    onClick={() => handleActionClick(action.id)}
                    className="text-xs px-2 py-1">
                    {action.label}
                  </Button>
                ))}
              </Container>
            )}
          </Container>

          {/* Botón de cerrar */}
          {isClosable && showCloseButton && (
            <Container className="flex-shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className={cn(
                  'inline-flex items-center justify-center rounded-md p-1.5 transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  currentColorScheme.closeButton,
                  currentColorScheme.focus
                )}
                aria-label="Cerrar notificación">
                <Icon icon={FiX} className="w-4 h-4" />
              </button>
            </Container>
          )}
        </Container>
      </Container>
    );
  }
);

NotificationToast.displayName = 'NotificationToast';

export { NotificationToast, type NotificationToastProps };

