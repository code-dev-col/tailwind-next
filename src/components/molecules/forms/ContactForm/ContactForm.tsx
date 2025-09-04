import React from 'react';
import { cn } from '../../../../utils/cn';
import type { BaseProps } from '../../../../types';
import { StoreApi, UseBoundStore } from 'zustand';
import { HiPaperAirplane, HiXMark } from 'react-icons/hi2';

// Importar Atoms necesarios
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { Input } from '../../../atoms/forms/Input';
import { TextArea } from '../../../atoms/forms/TextArea';
import { Label } from '../../../atoms/forms/Label';
import { Icon } from '../../../atoms/display/Icon';

interface ContactFormProps<T extends Record<string, any> = any>
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
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  $custom?: string;

  // Patrón storeKey (nuevo y preferido)
  $store?: UseBoundStore<StoreApi<T>>;

  // Configuración del formulario
  title?: string;
  description?: string;
  nameLabel?: string;
  emailLabel?: string;
  messageLabel?: string;
  submitText?: string;
  resetText?: string;

  // Placeholders
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messagePlaceholder?: string;

  // Configuración de campos
  showNameField?: boolean;
  showEmailField?: boolean;
  showMessageField?: boolean;
  showResetButton?: boolean;

  // Validación y estado
  disabled?: boolean;
  loading?: boolean;
  nameRequired?: boolean;
  emailRequired?: boolean;
  messageRequired?: boolean;

  // Store keys para los campos
  nameStoreKey?: keyof T;
  emailStoreKey?: keyof T;
  messageStoreKey?: keyof T;

  // Callbacks
  onSubmit?: (data: {
    name?: string;
    email?: string;
    message?: string;
  }) => void | Promise<void>;
  onReset?: () => void;
  onChange?: (field: string, value: string) => void;
}

// Esquemas de color usando theme.css variables
const colorSchemes = {
  default: {
    container: 'bg-card border-border text-card-foreground',
    header: 'text-card-foreground',
    description: 'text-muted-foreground',
    field: 'bg-background',
  },
  secondary: {
    container: 'bg-secondary/5 border-secondary/20 text-secondary-foreground',
    header: 'text-secondary',
    description: 'text-secondary/70',
    field: 'bg-secondary/5',
  },
  destructive: {
    container:
      'bg-destructive/5 border-destructive/20 text-destructive-foreground',
    header: 'text-destructive',
    description: 'text-destructive/70',
    field: 'bg-destructive/5',
  },
  accent: {
    container: 'bg-accent/5 border-accent/20 text-accent-foreground',
    header: 'text-accent',
    description: 'text-accent/70',
    field: 'bg-accent/5',
  },
  muted: {
    container: 'bg-muted border-muted-foreground/20 text-muted-foreground',
    header: 'text-muted-foreground',
    description: 'text-muted-foreground/70',
    field: 'bg-muted/50',
  },
  minimal: {
    container: 'bg-transparent border-foreground/10 text-foreground',
    header: 'text-foreground',
    description: 'text-foreground/60',
    field: 'bg-foreground/5',
  },
  custom: {
    container: '',
    header: '',
    description: '',
    field: '',
  },
} as const;

const contactFormVariants = {
  base: 'relative rounded-lg border shadow-sm transition-all duration-200',
  variants: {
    size: {
      default: 'p-6',
      sm: 'p-4',
      lg: 'p-8',
    },
    variant: {
      default: 'space-y-6',
      compact: 'space-y-4',
      detailed: 'space-y-8',
      minimal: 'space-y-4 border-0 shadow-none',
    },
  },
  defaultVariants: {
    colorScheme: 'default' as const,
    size: 'default' as const,
    variant: 'default' as const,
  },
};

const ContactForm = React.forwardRef<HTMLDivElement, ContactFormProps>(
  (
    {
      className,
      $colorScheme = 'default',
      $size = 'default',
      $variant = 'default',
      $custom,
      $store,
      title = 'Contáctanos',
      description,
      nameLabel = 'Nombre completo',
      emailLabel = 'Correo electrónico',
      messageLabel = 'Mensaje',
      submitText = 'Enviar mensaje',
      resetText = 'Limpiar',
      namePlaceholder = 'Tu nombre completo',
      emailPlaceholder = 'tu@email.com',
      messagePlaceholder = 'Escribe tu mensaje aquí...',
      showNameField = true,
      showEmailField = true,
      showMessageField = true,
      showResetButton = true,
      disabled = false,
      loading = false,
      nameRequired = true,
      emailRequired = true,
      messageRequired = true,
      nameStoreKey = 'contactName' as keyof any,
      emailStoreKey = 'contactEmail' as keyof any,
      messageStoreKey = 'contactMessage' as keyof any,
      onSubmit,
      onReset,
      onChange,
      ...props
    },
    ref
  ) => {
    // Estados locales para valores si no hay store
    const [localName, setLocalName] = React.useState('');
    const [localEmail, setLocalEmail] = React.useState('');
    const [localMessage, setLocalMessage] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Store integration
    const storeName =
      $store && nameStoreKey
        ? $store((state) => state[nameStoreKey])
        : undefined;
    const storeEmail =
      $store && emailStoreKey
        ? $store((state) => state[emailStoreKey])
        : undefined;
    const storeMessage =
      $store && messageStoreKey
        ? $store((state) => state[messageStoreKey])
        : undefined;

    const storeSetName =
      $store && nameStoreKey
        ? $store((state) => {
            const setterName = `set${
              String(nameStoreKey).charAt(0).toUpperCase() +
              String(nameStoreKey).slice(1)
            }`;
            return (state as any)[setterName];
          })
        : undefined;

    const storeSetEmail =
      $store && emailStoreKey
        ? $store((state) => {
            const setterName = `set${
              String(emailStoreKey).charAt(0).toUpperCase() +
              String(emailStoreKey).slice(1)
            }`;
            return (state as any)[setterName];
          })
        : undefined;

    const storeSetMessage =
      $store && messageStoreKey
        ? $store((state) => {
            const setterName = `set${
              String(messageStoreKey).charAt(0).toUpperCase() +
              String(messageStoreKey).slice(1)
            }`;
            return (state as any)[setterName];
          })
        : undefined;

    // Valores finales
    const finalName = storeName ?? localName;
    const finalEmail = storeEmail ?? localEmail;
    const finalMessage = storeMessage ?? localMessage;

    // Obtener esquema de color activo
    const currentColorScheme = colorSchemes[$colorScheme];

    // Handlers
    const handleNameChange = (value: string) => {
      if (storeSetName) {
        storeSetName(value);
      } else {
        setLocalName(value);
      }
      if (onChange) {
        onChange('name', value);
      }
    };

    const handleEmailChange = (value: string) => {
      if (storeSetEmail) {
        storeSetEmail(value);
      } else {
        setLocalEmail(value);
      }
      if (onChange) {
        onChange('email', value);
      }
    };

    const handleMessageChange = (value: string) => {
      if (storeSetMessage) {
        storeSetMessage(value);
      } else {
        setLocalMessage(value);
      }
      if (onChange) {
        onChange('message', value);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (disabled || loading || isSubmitting) return;

      // Validación básica
      if (nameRequired && showNameField && !finalName.trim()) {
        alert('El nombre es requerido');
        return;
      }

      if (emailRequired && showEmailField && !finalEmail.trim()) {
        alert('El email es requerido');
        return;
      }

      if (messageRequired && showMessageField && !finalMessage.trim()) {
        alert('El mensaje es requerido');
        return;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit({
            name: showNameField ? finalName : undefined,
            email: showEmailField ? finalEmail : undefined,
            message: showMessageField ? finalMessage : undefined,
          });
        } catch (error) {
          console.error('Error al enviar formulario:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    const handleReset = () => {
      if (storeSetName) storeSetName('');
      if (storeSetEmail) storeSetEmail('');
      if (storeSetMessage) storeSetMessage('');

      setLocalName('');
      setLocalEmail('');
      setLocalMessage('');

      if (onReset) {
        onReset();
      }
    };

    const isFormDisabled = disabled || loading || isSubmitting;

    return (
      <div
        ref={ref}
        className={cn(
          contactFormVariants.base,
          currentColorScheme.container,
          contactFormVariants.variants.size[$size],
          contactFormVariants.variants.variant[$variant],
          className,
          $custom
        )}
        {...props}>
        {/* Header */}
        {(title || description) && (
          <Container className="text-center space-y-2">
            {title && (
              <Text
                as="h2"
                $size={$size === 'lg' ? 'xl' : $size === 'sm' ? 'lg' : 'xl'}
                $weight="semibold"
                className={currentColorScheme.header}>
                {title}
              </Text>
            )}
            {description && (
              <Text
                as="p"
                $size="sm"
                className={currentColorScheme.description}>
                {description}
              </Text>
            )}
          </Container>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Nombre */}
          {showNameField && (
            <Container className="space-y-2">
              <Label
                htmlFor="contact-name"
                $size={$size}
                $variant={nameRequired ? 'required' : 'default'}
                className={currentColorScheme.header}>
                {nameLabel}
              </Label>
              <Input
                id="contact-name"
                type="text"
                $colorScheme={$colorScheme}
                $size={$size}
                placeholder={namePlaceholder}
                value={finalName}
                onChange={(e) => handleNameChange(e.target.value)}
                disabled={isFormDisabled}
                $security="form"
                className={currentColorScheme.field}
              />
            </Container>
          )}

          {/* Campo Email */}
          {showEmailField && (
            <Container className="space-y-2">
              <Label
                htmlFor="contact-email"
                $size={$size}
                $variant={emailRequired ? 'required' : 'default'}
                className={currentColorScheme.header}>
                {emailLabel}
              </Label>
              <Input
                id="contact-email"
                type="email"
                $colorScheme={$colorScheme}
                $size={$size}
                placeholder={emailPlaceholder}
                value={finalEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
                disabled={isFormDisabled}
                $security="form"
                className={currentColorScheme.field}
              />
            </Container>
          )}

          {/* Campo Mensaje */}
          {showMessageField && (
            <Container className="space-y-2">
              <Label
                htmlFor="contact-message"
                $size={$size}
                $variant={messageRequired ? 'required' : 'default'}
                className={currentColorScheme.header}>
                {messageLabel}
              </Label>
              <TextArea
                id="contact-message"
                $colorScheme={$colorScheme}
                $size={$size}
                placeholder={messagePlaceholder}
                value={finalMessage}
                onChange={(e) => handleMessageChange(e.target.value)}
                disabled={isFormDisabled}
                $security="form"
                rows={
                  $variant === 'compact' ? 3 : $variant === 'detailed' ? 6 : 4
                }
                className={currentColorScheme.field}
              />
            </Container>
          )}

          {/* Botones */}
          <Container
            $display="flex"
            $gap={$size === 'sm' ? 'gap-2' : 'gap-3'}
            $justifyContent="between"
            className="pt-2">
            {showResetButton && (
              <Button
                type="button"
                $colorScheme="outline"
                $size={$size}
                onClick={handleReset}
                disabled={
                  isFormDisabled || (!finalName && !finalEmail && !finalMessage)
                }>
                <Icon icon={HiXMark} $size="xs" className="mr-1" />
                {resetText}
              </Button>
            )}

            <Button
              type="submit"
              $colorScheme={$colorScheme}
              $size={$size}
              disabled={isFormDisabled}
              className="ml-auto">
              {isSubmitting ? 'Enviando...' : submitText}
            </Button>
          </Container>
        </form>
      </div>
    );
  }
);

ContactForm.displayName = 'ContactForm';

export { ContactForm, type ContactFormProps };

