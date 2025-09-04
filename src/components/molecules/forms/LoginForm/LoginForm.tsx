import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { FiEye, FiEyeOff, FiUser, FiLock, FiMail } from 'react-icons/fi';

// Importar todos los Atoms necesarios
import { Container } from '../../../atoms/layout/Container';
import { Divider } from '../../../atoms/layout/Divider';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { Input } from '../../../atoms/forms/Input';
import { Label } from '../../../atoms/forms/Label';
import { CheckBox } from '../../../atoms/forms/CheckBox';
import { Icon } from '../../../atoms/display/Icon';

// Tipos específicos para LoginForm
type LoginVariant = 'default' | 'compact' | 'card' | 'minimal';
type LoginSize = 'default' | 'sm' | 'lg';

interface LoginFormProps<T extends Record<string, any> = any>
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

  $size?: LoginSize;
  $variant?: LoginVariant;
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;
  emailStoreKey?: keyof T;
  passwordStoreKey?: keyof T;
  rememberMeStoreKey?: keyof T;

  // Props del formulario
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  passwordLabel?: string;
  rememberMeLabel?: string;
  submitLabel?: string;
  forgotPasswordLabel?: string;

  // Configuración visual
  $showTitle?: boolean;
  $showSubtitle?: boolean;
  $showRememberMe?: boolean;
  $showForgotPassword?: boolean;
  $showPasswordToggle?: boolean;
  $showIcons?: boolean;

  // Props de seguridad y validación
  $emailSecurity?:
    | 'form'
    | 'search'
    | 'email'
    | 'username'
    | 'comment'
    | 'critical';
  $passwordSecurity?:
    | 'form'
    | 'search'
    | 'email'
    | 'username'
    | 'comment'
    | 'critical';

  // Estados del formulario
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  success?: string;

  // Callbacks
  onSubmit?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onForgotPassword?: () => void;
  onEmailChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onRememberMeChange?: (checked: boolean) => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border',
    header: 'text-card-foreground',
    subtitle: 'text-muted-foreground',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-primary hover:text-primary/80',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20',
    header: 'text-secondary',
    subtitle: 'text-secondary/80',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-secondary hover:text-secondary/80',
  },
  destructive: {
    container: 'bg-destructive/5 border-destructive/20',
    header: 'text-destructive-foreground',
    subtitle: 'text-destructive/80',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-destructive hover:text-destructive/80',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20',
    header: 'text-accent-foreground',
    subtitle: 'text-accent/80',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-accent hover:text-accent/80',
  },
  muted: {
    container: 'bg-muted border-muted-foreground/20',
    header: 'text-muted-foreground',
    subtitle: 'text-muted-foreground/80',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-muted-foreground hover:text-foreground',
  },
  minimal: {
    container: 'bg-transparent border-transparent',
    header: 'text-foreground',
    subtitle: 'text-muted-foreground',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-primary hover:text-primary/80',
  },
  ghost: {
    container: 'bg-accent/5 border-transparent',
    header: 'text-foreground',
    subtitle: 'text-muted-foreground',
    error: 'text-destructive',
    success: 'text-success',
    link: 'text-primary hover:text-primary/80',
  },
  custom: {
    container: '',
    header: '',
    subtitle: '',
    error: '',
    success: '',
    link: '',
  },
};

const loginFormVariants = {
  base: 'relative w-full max-w-md mx-auto transition-all duration-200',
  variants: {
    variant: {
      default: 'rounded-lg border shadow-sm p-6',
      compact: 'rounded-md border shadow-sm p-4',
      card: 'rounded-xl border shadow-lg p-8',
      minimal: 'p-0',
    },
    size: {
      default: 'space-y-4',
      sm: 'space-y-3',
      lg: 'space-y-6',
    },
  },
  defaultVariants: {
    variant: 'default' as const,
    size: 'default' as const,
  },
};

const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      emailStoreKey,
      passwordStoreKey,
      rememberMeStoreKey,
      title = 'Iniciar Sesión',
      subtitle = 'Ingresa tus credenciales para acceder',
      emailLabel = 'Email',
      passwordLabel = 'Contraseña',
      rememberMeLabel = 'Recordarme',
      submitLabel = 'Ingresar',
      forgotPasswordLabel = '¿Olvidaste tu contraseña?',
      $showTitle = true,
      $showSubtitle = true,
      $showRememberMe = true,
      $showForgotPassword = true,
      $showPasswordToggle = true,
      $showIcons = true,
      $emailSecurity = 'form',
      $passwordSecurity = 'form',
      loading = false,
      disabled = false,
      error,
      success,
      onSubmit,
      onForgotPassword,
      onEmailChange,
      onPasswordChange,
      onRememberMeChange,
      ...props
    },
    ref
  ) => {
    // Estados locales
    const [showPassword, setShowPassword] = React.useState(false);

    // Store integration
    const emailValue =
      $store && emailStoreKey
        ? $store((state) => state[emailStoreKey] as string)
        : '';
    const passwordValue =
      $store && passwordStoreKey
        ? $store((state) => state[passwordStoreKey] as string)
        : '';
    const rememberMeValue =
      $store && rememberMeStoreKey
        ? $store((state) => state[rememberMeStoreKey] as boolean)
        : false;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Handlers
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!loading && !disabled && onSubmit) {
        onSubmit({
          email: emailValue,
          password: passwordValue,
          rememberMe: rememberMeValue,
        });
      }
    };

    const handleForgotPassword = () => {
      if (!loading && !disabled && onForgotPassword) {
        onForgotPassword();
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Container
        className={cn(
          loginFormVariants.base,
          loginFormVariants.variants.variant[$variant],
          currentColorScheme.container,
          disabled && 'opacity-50 cursor-not-allowed',
          className,
          $custom
        )}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          className={cn(loginFormVariants.variants.size[$size], 'w-full')}
          {...props}>
          {/* Header */}
          {($showTitle || $showSubtitle) && (
            <Container className="text-center space-y-2">
              {$showTitle && (
                <Text
                  $size="xl"
                  $weight="semibold"
                  className={currentColorScheme.header}>
                  {title}
                </Text>
              )}
              {$showSubtitle && (
                <Text $size="sm" className={currentColorScheme.subtitle}>
                  {subtitle}
                </Text>
              )}
            </Container>
          )}

          {/* Mensajes de estado */}
          {error && (
            <Container className="text-center">
              <Text
                $size="sm"
                className={cn(currentColorScheme.error, 'font-medium')}>
                {error}
              </Text>
            </Container>
          )}

          {success && (
            <Container className="text-center">
              <Text
                $size="sm"
                className={cn(currentColorScheme.success, 'font-medium')}>
                {success}
              </Text>
            </Container>
          )}

          {/* Separador visual si hay header */}
          {($showTitle || $showSubtitle || error || success) && (
            <Divider $variant="solid" />
          )}

          {/* Campo Email */}
          <Container className="space-y-2">
            <Label htmlFor="login-email" $size={$size}>
              <Container $display="flex" $alignItems="center" $gap="gap-2">
                {$showIcons && (
                  <Icon
                    icon={FiMail}
                    $size="sm"
                    className={currentColorScheme.subtitle}
                  />
                )}
                {emailLabel}
              </Container>
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="usuario@ejemplo.com"
              $store={$store}
              storeKey={emailStoreKey}
              $colorScheme={$colorScheme}
              $size={$size}
              $security={$emailSecurity}
              disabled={loading || disabled}
              onChange={(e) => onEmailChange?.(e.target.value)}
            />
          </Container>

          {/* Campo Contraseña */}
          <Container className="space-y-2">
            <Label htmlFor="login-password" $size={$size}>
              <Container $display="flex" $alignItems="center" $gap="gap-2">
                {$showIcons && (
                  <Icon
                    icon={FiLock}
                    $size="sm"
                    className={currentColorScheme.subtitle}
                  />
                )}
                {passwordLabel}
              </Container>
            </Label>
            <Container className="relative">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                $store={$store}
                storeKey={passwordStoreKey}
                $colorScheme={$colorScheme}
                $size={$size}
                $security={$passwordSecurity}
                disabled={loading || disabled}
                onChange={(e) => onPasswordChange?.(e.target.value)}
                className={$showPasswordToggle ? 'pr-10' : ''}
              />
              {$showPasswordToggle && (
                <Button
                  type="button"
                  $colorScheme="ghost"
                  $size="sm"
                  onClick={togglePasswordVisibility}
                  disabled={loading || disabled}
                  className="absolute right-0 top-0 h-full px-3"
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }>
                  <Icon
                    icon={showPassword ? FiEyeOff : FiEye}
                    $size="sm"
                    className={currentColorScheme.subtitle}
                  />
                </Button>
              )}
            </Container>
          </Container>

          {/* Remember Me y Forgot Password */}
          {($showRememberMe || $showForgotPassword) && (
            <Container
              $display="flex"
              $justifyContent="between"
              $alignItems="center">
              {$showRememberMe && (
                <CheckBox
                  $store={$store}
                  storeKey={rememberMeStoreKey}
                  $colorScheme={$colorScheme}
                  $size={$size === 'lg' ? 'default' : 'sm'}
                  disabled={loading || disabled}
                  label={rememberMeLabel}
                  onChange={(checked) => onRememberMeChange?.(checked)}
                />
              )}

              {$showForgotPassword && (
                <Button
                  type="button"
                  $colorScheme="link"
                  $size="sm"
                  onClick={handleForgotPassword}
                  disabled={loading || disabled}
                  className={cn(currentColorScheme.link, 'p-0 h-auto')}>
                  {forgotPasswordLabel}
                </Button>
              )}
            </Container>
          )}

          {/* Botón Submit */}
          <Button
            type="submit"
            $colorScheme={$colorScheme}
            $size={$size}
            disabled={disabled || !emailValue || !passwordValue || loading}
            className="w-full">
            {loading ? 'Ingresando...' : submitLabel}
          </Button>
        </form>
      </Container>
    );
  }
);

LoginForm.displayName = 'LoginForm';

export { LoginForm, type LoginFormProps, type LoginVariant, type LoginSize };

