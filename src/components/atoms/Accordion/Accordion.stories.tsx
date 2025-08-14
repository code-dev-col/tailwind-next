import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { useAccordionExamples } from '../../../stores/accordionExamples.store';
import {
  IoDocumentText,
  IoSettings,
  IoNotifications,
  IoShield,
  IoHeart,
  IoCard,
  IoPerson,
  IoHelpCircle,
  IoCloud,
  IoLockClosed,
  IoEye,
  IoCode,
  IoGlobe,
  IoMail,
  IoTerminal,
  IoKey,
  IoServer,
  IoStorefront,
  IoAnalytics,
  IoBug,
  IoRocket,
  IoCheckmarkCircle,
  IoWarning,
  IoInformation,
} from 'react-icons/io5';

const meta: Meta<typeof Accordion> = {
  title: 'Atoms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: [
        'default',
        'bordered',
        'separated',
        'flat',
        'shadow',
        'minimal',
      ],
      description: 'Variante visual del accordion',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del accordion',
    },
    $colorScheme: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'accent',
        'muted',
        'minimal',
        'custom',
      ],
      description: 'Esquema de color basado en theme.css',
    },
    $iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posición del icono chevron',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Permite abrir múltiples items simultáneamente',
    },
    animated: {
      control: 'boolean',
      description: 'Habilita animaciones',
    },
    showIcons: {
      control: 'boolean',
      description: 'Muestra iconos en los items',
    },
    showBadges: {
      control: 'boolean',
      description: 'Muestra badges en los items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo funcionales con contenido rico
const faqItems = [
  {
    id: 'faq-1',
    title: '¿Cómo restablezco mi contraseña?',
    content: (
      <div className="space-y-3">
        <p>Para restablecer tu contraseña, sigue estos pasos:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Ve a la página de inicio de sesión</li>
          <li>Haz clic en "¿Olvidaste tu contraseña?"</li>
          <li>Ingresa tu dirección de correo electrónico</li>
          <li>Revisa tu bandeja de entrada y sigue las instrucciones</li>
        </ol>
        <div className="flex items-center gap-2 mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <IoInformation className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <p className="text-sm text-blue-800 dark:text-blue-200">
            El enlace de restablecimiento expira en 24 horas por seguridad.
          </p>
        </div>
      </div>
    ),
    icon: <IoLockClosed className="w-5 h-5" />,
    badge: 'Frecuente',
  },
  {
    id: 'faq-2',
    title: '¿Qué métodos de pago aceptan?',
    content: (
      <div className="space-y-4">
        <p>Aceptamos múltiples métodos de pago para tu conveniencia:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <IoCard className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-medium text-white">Tarjetas de Crédito</h4>
              <p className="text-sm text-white">
                Visa, MasterCard, American Express
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <IoGlobe className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium text-white">PayPal</h4>
              <p className="text-sm text-white">Pago seguro y rápido</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
          <IoCheckmarkCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-200">
            Todos los pagos están protegidos con cifrado SSL de 256 bits.
          </p>
        </div>
      </div>
    ),
    icon: <IoCard className="w-5 h-5" />,
    badge: '💳',
  },
  {
    id: 'faq-3',
    title: '¿Puedo cancelar mi suscripción en cualquier momento?',
    content: (
      <div className="space-y-3">
        <p>¡Por supuesto! Puedes cancelar tu suscripción cuando quieras:</p>
        <div className="bg-black dark:bg-black border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <IoWarning className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200">
                Importante
              </h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 mt-2 space-y-1">
                <li>
                  • Tu acceso continúa hasta el final del período de facturación
                </li>
                <li>• No hay tarifas de cancelación</li>
                <li>• Puedes reactivar tu cuenta en cualquier momento</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Para cancelar: Ve a Configuración → Suscripción → Cancelar Plan
        </p>
      </div>
    ),
    icon: <IoCheckmarkCircle className="w-5 h-5" />,
  },
];

const settingsItems = [
  {
    id: 'profile',
    title: 'Perfil de Usuario',
    content: (
      <div className="space-y-4">
        <p>Gestiona tu información personal y preferencias de cuenta:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <IoPerson className="w-4 h-4" />
              Información Personal
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground ml-6">
              <li>• Nombre y apellidos</li>
              <li>• Dirección de correo</li>
              <li>• Número de teléfono</li>
              <li>• Foto de perfil</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <IoGlobe className="w-4 h-4" />
              Preferencias
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground ml-6">
              <li>• Idioma de interfaz</li>
              <li>• Zona horaria</li>
              <li>• Tema (claro/oscuro)</li>
              <li>• Formato de fecha</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    icon: <IoPerson className="w-5 h-5" />,
    badge: 'Editado',
  },
  {
    id: 'security',
    title: 'Seguridad y Privacidad',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <IoKey className="w-4 h-4" />
              Autenticación
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <IoCheckmarkCircle className="w-4 h-4 text-green-600" />
                <span>Contraseña segura</span>
              </li>
              <li className="flex items-center gap-2">
                <IoWarning className="w-4 h-4 text-amber-600" />
                <span>2FA no configurado</span>
              </li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <IoEye className="w-4 h-4" />
              Privacidad
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <IoCheckmarkCircle className="w-4 h-4 text-green-600" />
                <span>Perfil privado</span>
              </li>
              <li className="flex items-center gap-2">
                <IoCheckmarkCircle className="w-4 h-4 text-green-600" />
                <span>Cookies esenciales</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    icon: <IoShield className="w-5 h-5" />,
    badge: 'Importante',
  },
  {
    id: 'notifications',
    title: 'Notificaciones',
    content: (
      <div className="space-y-4">
        <p>Personaliza cómo y cuándo recibes notificaciones:</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <IoMail className="w-5 h-5 text-blue-600" />
              <span>Notificaciones por email</span>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <IoNotifications className="w-5 h-5 text-purple-600" />
              <span>Notificaciones push</span>
            </div>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    icon: <IoNotifications className="w-5 h-5" />,
    badge: 3,
  },
];

const developmentItems = [
  {
    id: 'api',
    title: 'API Documentation',
    content: (
      <div className="space-y-4">
        <p>Documentación completa para integrar con nuestra API:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              REST API
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Endpoints RESTful para todas las operaciones principales
            </p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
              GraphQL
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Consultas flexibles con GraphQL
            </p>
          </div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <code className="text-sm">
            curl -X GET "https://api.example.com/v1/users" \<br />
            -H "Authorization: Bearer YOUR_TOKEN"
          </code>
        </div>
      </div>
    ),
    icon: <IoCode className="w-5 h-5" />,
    badge: 'v2.1',
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    content: (
      <div className="space-y-4">
        <p>Configurar webhooks para recibir notificaciones en tiempo real:</p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">user.created</span>
            <span className="text-sm text-muted-foreground ml-auto">
              Activo
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="font-medium">payment.succeeded</span>
            <span className="text-sm text-muted-foreground ml-auto">
              Inactivo
            </span>
          </div>
        </div>
      </div>
    ),
    icon: <IoServer className="w-5 h-5" />,
    badge: 'Nuevo',
  },
  {
    id: 'testing',
    title: 'Entorno de Pruebas',
    content: (
      <div className="space-y-4">
        <p>Herramientas para testing y debugging:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
            <IoTerminal className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h4 className="font-medium">CLI Tools</h4>
            <p className="text-xs text-muted-foreground">
              Herramientas de línea de comandos
            </p>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <IoBug className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-medium">Debugging</h4>
            <p className="text-xs text-muted-foreground">
              Logs y trazas detalladas
            </p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <IoAnalytics className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium">Analytics</h4>
            <p className="text-xs text-muted-foreground">
              Métricas de rendimiento
            </p>
          </div>
        </div>
      </div>
    ),
    icon: <IoBug className="w-5 h-5" />,
  },
];

const productItems = [
  {
    id: 'features',
    title: '🚀 Características Principales',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium">Funcionalidades Core</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <IoRocket className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Rendimiento ultra-rápido</span>
              </li>
              <li className="flex items-center gap-2">
                <IoCloud className="w-4 h-4 text-green-600" />
                <span className="text-sm">Sincronización en la nube</span>
              </li>
              <li className="flex items-center gap-2">
                <IoShield className="w-4 h-4 text-purple-600" />
                <span className="text-sm">Seguridad avanzada</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium">Integraciones</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <IoStorefront className="w-4 h-4 text-orange-600" />
                <span className="text-sm">E-commerce platforms</span>
              </li>
              <li className="flex items-center gap-2">
                <IoMail className="w-4 h-4 text-red-600" />
                <span className="text-sm">Email marketing</span>
              </li>
              <li className="flex items-center gap-2">
                <IoAnalytics className="w-4 h-4 text-indigo-600" />
                <span className="text-sm">Analytics tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    icon: <IoRocket className="w-5 h-5" />,
    badge: 'Popular',
  },
  {
    id: 'pricing',
    title: '💰 Planes y Precios',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-bold text-center">Básico</h4>
            <p className="text-2xl font-bold text-center my-2">$9/mes</p>
            <ul className="text-sm space-y-1">
              <li>✓ 5 proyectos</li>
              <li>✓ 10GB almacenamiento</li>
              <li>✓ Soporte por email</li>
            </ul>
          </div>
          <div className="p-4 border-2 border-blue-500 rounded-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
              Recomendado
            </div>
            <h4 className="font-bold text-center">Pro</h4>
            <p className="text-2xl font-bold text-center my-2">$29/mes</p>
            <ul className="text-sm space-y-1">
              <li>✓ Proyectos ilimitados</li>
              <li>✓ 100GB almacenamiento</li>
              <li>✓ Soporte prioritario</li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <h4 className="font-bold text-center">Enterprise</h4>
            <p className="text-2xl font-bold text-center my-2">$99/mes</p>
            <ul className="text-sm space-y-1">
              <li>✓ Todo de Pro</li>
              <li>✓ 1TB almacenamiento</li>
              <li>✓ Soporte 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    icon: <IoCard className="w-5 h-5" />,
    badge: 'Oferta',
  },
];

export const Default: Story = {
  args: {
    items: faqItems,
    $variant: 'default',
    $size: 'default',
    $colorScheme: 'default',
    allowMultiple: false,
    animated: true,
    showIcons: true,
    showBadges: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default - FAQ</h3>
        <Accordion
          items={faqItems.slice(0, 2)}
          $variant="default"
          $colorScheme="default"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Bordered - Configuraciones
        </h3>
        <Accordion
          items={settingsItems.slice(0, 2)}
          $variant="bordered"
          $colorScheme="secondary"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Separated - Desarrollo</h3>
        <Accordion
          items={developmentItems.slice(0, 2)}
          $variant="separated"
          $colorScheme="accent"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Shadow - Producto</h3>
        <Accordion
          items={productItems}
          $variant="shadow"
          $colorScheme="destructive"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal - Simple</h3>
        <Accordion
          items={faqItems.slice(0, 2)}
          $variant="minimal"
          $colorScheme="minimal"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-3xl">
      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Small - FAQ Compacto
        </h3>
        <Accordion
          items={faqItems.slice(0, 2)}
          $size="sm"
          $variant="bordered"
          $colorScheme="default"
        />
      </div>

      <div>
        <h3 className="text-base font-medium mb-3 text-muted-foreground">
          Default - Configuraciones
        </h3>
        <Accordion
          items={settingsItems.slice(0, 2)}
          $size="default"
          $variant="bordered"
          $colorScheme="secondary"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-muted-foreground">
          Large - Documentación Desarrollador
        </h3>
        <Accordion
          items={developmentItems.slice(0, 2)}
          $size="lg"
          $variant="bordered"
          $colorScheme="accent"
        />
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-3xl">
      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Default (Primary) - FAQ General
        </h3>
        <Accordion
          items={faqItems.slice(0, 2)}
          $variant="separated"
          $colorScheme="default"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Secondary (Turquesa) - Configuraciones de Usuario
        </h3>
        <Accordion
          items={settingsItems.slice(0, 2)}
          $variant="separated"
          $colorScheme="secondary"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Accent (Violeta) - Documentación API
        </h3>
        <Accordion
          items={developmentItems.slice(0, 2)}
          $variant="separated"
          $colorScheme="accent"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Destructive (Coral) - Alertas y Advertencias
        </h3>
        <Accordion
          items={[
            {
              id: 'warning-1',
              title: '⚠️ Configuración de Seguridad Requerida',
              content: (
                <div className="space-y-3">
                  <p>
                    Tu cuenta necesita configuraciones adicionales de seguridad:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Activar autenticación de dos factores</li>
                    <li>Revisar dispositivos conectados</li>
                    <li>Actualizar contraseña si es necesario</li>
                  </ul>
                </div>
              ),
              icon: <IoWarning className="w-5 h-5" />,
              badge: 'Urgente',
            },
          ]}
          $variant="separated"
          $colorScheme="destructive"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Muted (Neutro) - Información Complementaria
        </h3>
        <Accordion
          items={[
            {
              id: 'info-1',
              title: 'Información Adicional',
              content:
                'Detalles adicionales que pueden ser útiles pero no son críticos para la experiencia principal.',
              icon: <IoInformation className="w-5 h-5" />,
            },
          ]}
          $variant="separated"
          $colorScheme="muted"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">
          Minimal (Transparente) - Integración Sutil
        </h3>
        <Accordion
          items={faqItems.slice(0, 1)}
          $variant="minimal"
          $colorScheme="minimal"
        />
      </div>
    </div>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { clearAllAccordion } = useAccordionExamples();

    return (
      <div className="space-y-4 w-full max-w-3xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Accordion con Store - Panel de Control
          </h3>
          <button
            onClick={clearAllAccordion}
            className="px-3 py-1 bg-muted text-muted-foreground hover:bg-muted/80 rounded text-sm transition-colors">
            Limpiar Todo
          </button>
        </div>

        <Accordion
          items={[
            {
              id: 'store1',
              title: '📊 Dashboard Analytics',
              content: (
                <div className="space-y-3">
                  <p>Vista general de métricas y rendimiento:</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                      <p className="text-2xl font-bold text-blue-600">1.2k</p>
                      <p className="text-xs">Usuarios activos</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded">
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                      <p className="text-xs">Uptime</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded">
                      <p className="text-2xl font-bold text-purple-600">24ms</p>
                      <p className="text-xs">Latencia promedio</p>
                    </div>
                  </div>
                </div>
              ),
              icon: <IoAnalytics className="w-5 h-5" />,
              badge: 'Live',
            },
            {
              id: 'store2',
              title: '⚙️ Configuración del Sistema',
              content: (
                <div className="space-y-3">
                  <p>Configuraciones avanzadas del sistema:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm">Modo mantenimiento</span>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm">Auto-backup</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                      <span className="text-sm">SSL certificado</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ),
              icon: <IoSettings className="w-5 h-5" />,
              badge: 3,
            },
          ]}
          $variant="bordered"
          $colorScheme="accent"
          allowMultiple={true}
        />

        <div className="mt-4 p-3 bg-muted/50 rounded text-sm">
          <p className="text-muted-foreground">
            💡 Estado conservado: Los items abiertos se mantienen en el store
            global de Zustand
          </p>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Múltiples Abiertos - Centro de Ayuda
        </h3>
        <Accordion
          items={faqItems}
          $variant="separated"
          $colorScheme="secondary"
          allowMultiple={true}
          animated={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Iconos a la Izquierda - Documentación API
        </h3>
        <Accordion
          items={developmentItems}
          $variant="bordered"
          $colorScheme="accent"
          $iconPosition="left"
          allowMultiple={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Sin Animación - Lista Compacta
        </h3>
        <Accordion
          items={[
            {
              id: 'quick1',
              title: 'Acceso Rápido 1',
              content:
                'Contenido que se muestra sin animación para acceso inmediato.',
              icon: <IoRocket className="w-5 h-5" />,
            },
            {
              id: 'quick2',
              title: 'Acceso Rápido 2',
              content:
                'Información disponible al instante sin efectos de transición.',
              icon: <IoCheckmarkCircle className="w-5 h-5" />,
            },
          ]}
          $variant="flat"
          $colorScheme="muted"
          animated={false}
        />
      </div>
    </div>
  ),
};

export const WithCustomization: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Sin Iconos ni Badges - Contenido Limpio
        </h3>
        <Accordion
          items={[
            {
              id: 'clean1',
              title: 'Diseño Minimalista',
              content: (
                <div className="space-y-2">
                  <p>
                    Interfaz limpia sin distracciones visuales, enfocada
                    completamente en el contenido.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ideal para documentación técnica o contenido académico donde
                    la legibilidad es prioritaria.
                  </p>
                </div>
              ),
            },
            {
              id: 'clean2',
              title: 'Texto Puro',
              content:
                'Contenido sin elementos visuales adicionales, perfecto para lecturas largas o información densa.',
            },
          ]}
          $variant="separated"
          $colorScheme="default"
          showIcons={false}
          showBadges={false}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Con Clases Personalizadas - Estilo Premium
        </h3>
        <Accordion
          items={productItems}
          $variant="bordered"
          $colorScheme="secondary"
          $custom="shadow-lg border-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          Uso en Tarjeta - Integración Contextual
        </h3>
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="mb-4">
            <h4 className="font-semibold text-lg">Panel de Usuario</h4>
            <p className="text-sm text-muted-foreground">
              Configuraciones integradas en el contexto de la tarjeta
            </p>
          </div>
          <Accordion
            items={settingsItems.slice(0, 2)}
            $variant="minimal"
            $colorScheme="minimal"
          />
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    items: faqItems,
    $variant: 'default',
    $size: 'default',
    $colorScheme: 'default',
    $iconPosition: 'right',
    allowMultiple: false,
    allowToggle: true,
    animated: true,
    animationDuration: 'normal',
    showIcons: true,
    showBadges: true,
    roundedCorners: true,
  },
  parameters: {
    layout: 'centered',
  },
};




