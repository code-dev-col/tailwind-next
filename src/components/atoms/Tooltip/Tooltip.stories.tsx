import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipGroup } from './Tooltip';
import { useTooltipExamples } from '../../../stores/tooltipExamples.store';
import { cn } from '../../../utils/cn';
import {
  FiInfo,
  FiHelpCircle,
  FiUser,
  FiSettings,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiTrendingUp,
  FiHeart,
  FiStar,
  FiBookmark,
  FiShare,
  FiDownload,
  FiEdit,
  FiTrash,
  FiSave,
  FiCopy,
  FiExternalLink,
} from 'react-icons/fi';
import {
  AiOutlineQuestionCircle,
  AiOutlineWarning,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import {
  BiUser,
  BiCog,
  BiLockAlt,
  BiShield,
  BiCreditCard,
} from 'react-icons/bi';

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Tooltip avanzado con múltiples tipos de trigger, posicionamiento inteligente, variantes de estilo y integración completa con Zustand. Incluye soporte para hover, click, focus, control manual y TooltipGroup para múltiples tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    $position: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
      ],
      description: 'Posición del tooltip relativa al elemento trigger',
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
      description: 'Esquema de color del tooltip usando theme.css variables',
    },
    $trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'Tipo de interacción para mostrar el tooltip',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia por defecto
export const Default: Story = {
  render: () => (
    <Tooltip content="Este es un tooltip básico" $showArrow>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
        Hover me
      </button>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip básico con trigger de hover y flecha.',
      },
    },
  },
};

// Esquemas de color usando theme.css
export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center justify-center">
      <Tooltip
        content="Tooltip por defecto con theme.css"
        $colorScheme="default"
        $showArrow>
        <button className="px-3 py-2 bg-card text-card-foreground border border-border rounded">
          Default
        </button>
      </Tooltip>
      <Tooltip
        content="Tooltip secundario turquesa pastel"
        $colorScheme="secondary"
        $showArrow>
        <button className="px-3 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded">
          Secondary
        </button>
      </Tooltip>
      <Tooltip
        content="Tooltip destructivo coral suave"
        $colorScheme="destructive"
        $showArrow>
        <button className="px-3 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded">
          Destructive
        </button>
      </Tooltip>
      <Tooltip
        content="Tooltip de acento violeta rosado"
        $colorScheme="accent"
        $showArrow>
        <button className="px-3 py-2 bg-accent/10 text-accent border border-accent/20 rounded">
          Accent
        </button>
      </Tooltip>
      <Tooltip
        content="Tooltip silenciado con grises neutros"
        $colorScheme="muted"
        $showArrow>
        <button className="px-3 py-2 bg-muted text-muted-foreground border border-border rounded">
          Muted
        </button>
      </Tooltip>
      <Tooltip
        content="Tooltip minimal transparente"
        $colorScheme="minimal"
        $showArrow>
        <button className="px-3 py-2 border border-border text-foreground rounded">
          Minimal
        </button>
      </Tooltip>
      <Tooltip
        content="Tooltip custom - personalizable"
        $colorScheme="custom"
        $custom="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
        $showArrow>
        <button className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded">
          Custom
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Diferentes esquemas de color usando las variables CSS de theme.css con paleta pastel.',
      },
    },
  },
};

// Posiciones
export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-12 p-12">
      {/* Fila superior */}
      <Tooltip content="Top Start" $position="top-start" $showArrow>
        <button className="px-3 py-2 bg-indigo-500 text-white rounded text-sm">
          Top Start
        </button>
      </Tooltip>
      <Tooltip content="Top Center" $position="top" $showArrow>
        <button className="px-3 py-2 bg-indigo-500 text-white rounded text-sm">
          Top
        </button>
      </Tooltip>
      <Tooltip content="Top End" $position="top-end" $showArrow>
        <button className="px-3 py-2 bg-indigo-500 text-white rounded text-sm">
          Top End
        </button>
      </Tooltip>

      {/* Fila central */}
      <Tooltip content="Left Side" $position="left" $showArrow>
        <button className="px-3 py-2 bg-cyan-500 text-white rounded text-sm">
          Left
        </button>
      </Tooltip>
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500">Posiciones</span>
      </div>
      <Tooltip content="Right Side" $position="right" $showArrow>
        <button className="px-3 py-2 bg-cyan-500 text-white rounded text-sm">
          Right
        </button>
      </Tooltip>

      {/* Fila inferior */}
      <Tooltip content="Bottom Start" $position="bottom-start" $showArrow>
        <button className="px-3 py-2 bg-emerald-500 text-white rounded text-sm">
          Bottom Start
        </button>
      </Tooltip>
      <Tooltip content="Bottom Center" $position="bottom" $showArrow>
        <button className="px-3 py-2 bg-emerald-500 text-white rounded text-sm">
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Bottom End" $position="bottom-end" $showArrow>
        <button className="px-3 py-2 bg-emerald-500 text-white rounded text-sm">
          Bottom End
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Todas las posiciones disponibles para el tooltip: 8 posiciones con alineaciones precisas.',
      },
    },
  },
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Tooltip content="Tooltip pequeño" $size="sm" $showArrow>
        <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
          Small
        </button>
      </Tooltip>
      <Tooltip content="Tooltip tamaño por defecto" $size="default" $showArrow>
        <button className="px-3 py-2 bg-blue-500 text-white rounded">
          Default
        </button>
      </Tooltip>
      <Tooltip content="Tooltip grande con más contenido" $size="lg" $showArrow>
        <button className="px-4 py-3 bg-blue-500 text-white rounded text-lg">
          Large
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños de tooltip disponibles.',
      },
    },
  },
};

// Tipos de trigger
export const TriggerTypes: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Tooltip content="Aparece al hacer hover" $trigger="hover" $showArrow>
        <button className="px-3 py-2 bg-green-500 text-white rounded">
          Hover
        </button>
      </Tooltip>
      <Tooltip
        content="Aparece al hacer click (click fuera para cerrar)"
        $trigger="click"
        $showArrow>
        <button className="px-3 py-2 bg-orange-500 text-white rounded">
          Click
        </button>
      </Tooltip>
      <Tooltip
        content="Aparece al enfocar con Tab o click"
        $trigger="focus"
        $showArrow>
        <button className="px-3 py-2 bg-purple-500 text-white rounded">
          Focus
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Diferentes tipos de trigger: hover (mouseover), click (toggle), y focus (teclado/accesibilidad).',
      },
    },
  },
};

// Con iconos
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Tooltip
        content="Información adicional sobre este elemento"
        $colorScheme="default"
        $showArrow>
        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
          <FiInfo size={20} />
        </button>
      </Tooltip>

      <Tooltip
        content="¿Necesitas ayuda? Haz click para obtener soporte"
        $colorScheme="accent"
        $trigger="click"
        $showArrow>
        <button className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors">
          <FiHelpCircle size={20} />
        </button>
      </Tooltip>

      <Tooltip
        content="Configuración de usuario"
        $colorScheme="secondary"
        $position="left"
        $showArrow>
        <button className="p-2 text-purple-500 hover:bg-purple-50 rounded-full transition-colors">
          <FiSettings size={20} />
        </button>
      </Tooltip>

      <Tooltip
        content="Perfil de usuario"
        $colorScheme="muted"
        $position="bottom"
        $showArrow>
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
          <FiUser size={20} />
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips con iconos usando react-icons, muy común en interfaces modernas.',
      },
    },
  },
};

// Contenido multilínea
export const Multiline: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <Tooltip
        content="Esta es la primera línea\nEsta es la segunda línea\nY esta es la tercera línea con más texto"
        $multiline
        $showArrow
        $maxWidth="max-w-sm">
        <button className="px-4 py-2 bg-indigo-500 text-white rounded">
          Multilínea con \n
        </button>
      </Tooltip>

      <Tooltip
        content={
          <div>
            <div className="font-semibold mb-1">Título del Tooltip</div>
            <div className="text-sm">
              Descripción detallada con múltiples líneas de información
              importante.
            </div>
            <div className="mt-2 pt-2 border-t border-white/20">
              <span className="text-xs opacity-80">
                Tip: Usa Ctrl+C para copiar
              </span>
            </div>
          </div>
        }
        $colorScheme="muted"
        $size="lg"
        $maxWidth="max-w-md"
        $showArrow>
        <button className="px-4 py-2 bg-gray-700 text-white rounded">
          Contenido JSX
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips con contenido multilínea y elementos JSX complejos.',
      },
    },
  },
};

// Control con store
export const WithStore: Story = {
  render: () => {
    const {
      hoveredTooltip,
      clickedTooltip,
      focusedTooltip,
      clearAllTooltips,
      setShowArrow,
      showArrow,
    } = useTooltipExamples();

    return (
      <div className="space-y-6">
        <div className="flex gap-4 items-center">
          <Tooltip
            content="Tooltip controlado por store (hover)"
            $store={useTooltipExamples}
            storeKey="hoveredTooltip"
            $showArrow={showArrow}>
            <button className="px-3 py-2 bg-blue-500 text-white rounded">
              Hover Store
            </button>
          </Tooltip>

          <Tooltip
            content="Tooltip controlado por store (click)"
            $store={useTooltipExamples}
            storeKey="clickedTooltip"
            $trigger="click"
            $colorScheme="secondary"
            $showArrow={showArrow}>
            <button className="px-3 py-2 bg-purple-500 text-white rounded">
              Click Store
            </button>
          </Tooltip>

          <Tooltip
            content="Tooltip controlado por store (focus)"
            $store={useTooltipExamples}
            storeKey="focusedTooltip"
            $trigger="focus"
            $colorScheme="accent"
            $showArrow={showArrow}>
            <button className="px-3 py-2 bg-green-500 text-white rounded">
              Focus Store
            </button>
          </Tooltip>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Estado del Store:</h4>
          <div className="text-sm space-y-1">
            <div>
              Hover Tooltip:{' '}
              <span className="font-mono">{hoveredTooltip.toString()}</span>
            </div>
            <div>
              Click Tooltip:{' '}
              <span className="font-mono">{clickedTooltip.toString()}</span>
            </div>
            <div>
              Focus Tooltip:{' '}
              <span className="font-mono">{focusedTooltip.toString()}</span>
            </div>
            <div>
              Show Arrow:{' '}
              <span className="font-mono">{showArrow.toString()}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={clearAllTooltips}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm">
              Clear All
            </button>
            <button
              onClick={() => setShowArrow(!showArrow)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm">
              Toggle Arrows
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips integrados con Zustand store para control de estado global.',
      },
    },
  },
};

// Tooltip Group
export const TooltipGroupExample: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="font-medium mb-4">
          Grupo Horizontal - Iconos de Redes Sociales
        </h4>
        <TooltipGroup
          $colorScheme="muted"
          $trigger="hover"
          $gap="default"
          $direction="horizontal"
          tooltips={[
            {
              id: 'email',
              content: 'Enviar correo electrónico',
              children: (
                <button className="p-2 text-blue-500 hover:bg-blue-50 rounded">
                  <FiMail size={20} />
                </button>
              ),
              $position: 'top',
            },
            {
              id: 'phone',
              content: 'Llamar por teléfono',
              children: (
                <button className="p-2 text-green-500 hover:bg-green-50 rounded">
                  <FiPhone size={20} />
                </button>
              ),
              $position: 'top',
            },
            {
              id: 'location',
              content: 'Ver ubicación en mapa',
              children: (
                <button className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <FiMapPin size={20} />
                </button>
              ),
              $position: 'top',
            },
            {
              id: 'share',
              content: 'Compartir enlace',
              children: (
                <button className="p-2 text-purple-500 hover:bg-purple-50 rounded">
                  <FiShare size={20} />
                </button>
              ),
              $position: 'top',
            },
          ]}
        />
      </div>

      <div>
        <h4 className="font-medium mb-4">
          Grupo Vertical - Acciones de Usuario
        </h4>
        <TooltipGroup
          $colorScheme="default"
          $trigger="hover"
          $gap="sm"
          $direction="vertical"
          tooltips={[
            {
              id: 'edit',
              content: 'Editar información',
              children: (
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <FiEdit size={18} />
                </button>
              ),
              $position: 'right',
            },
            {
              id: 'save',
              content: 'Guardar cambios',
              children: (
                <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                  <FiSave size={18} />
                </button>
              ),
              $position: 'right',
            },
            {
              id: 'copy',
              content: 'Copiar al portapapeles',
              children: (
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <FiCopy size={18} />
                </button>
              ),
              $position: 'right',
            },
            {
              id: 'delete',
              content: 'Eliminar elemento',
              children: (
                <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <FiTrash size={18} />
                </button>
              ),
              $position: 'right',
              $colorScheme: 'destructive',
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TooltipGroup permite agrupar múltiples tooltips con configuración compartida.',
      },
    },
  },
};

// Estados y configuraciones avanzadas
export const AdvancedFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Delays Personalizados</h4>
        <div className="flex gap-4">
          <Tooltip content="Delay rápido (100ms)" $delay={100} $showArrow>
            <button className="px-3 py-2 bg-green-500 text-white rounded">
              Fast
            </button>
          </Tooltip>
          <Tooltip content="Delay normal (300ms)" $delay={300} $showArrow>
            <button className="px-3 py-2 bg-blue-500 text-white rounded">
              Normal
            </button>
          </Tooltip>
          <Tooltip content="Delay lento (800ms)" $delay={800} $showArrow>
            <button className="px-3 py-2 bg-orange-500 text-white rounded">
              Slow
            </button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Sin Flecha</h4>
        <div className="flex gap-4">
          <Tooltip content="Tooltip sin flecha" $showArrow={false}>
            <button className="px-3 py-2 bg-gray-500 text-white rounded">
              No Arrow
            </button>
          </Tooltip>
          <Tooltip content="Tooltip con flecha" $showArrow={true}>
            <button className="px-3 py-2 bg-gray-700 text-white rounded">
              With Arrow
            </button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Estados Especiales</h4>
        <div className="flex gap-4">
          <Tooltip content="Este tooltip está deshabilitado" $disabled>
            <button
              disabled
              className="px-3 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
              Disabled
            </button>
          </Tooltip>
          <Tooltip
            content="Tooltip con offset personalizado"
            $offset={10}
            $position="bottom"
            $showArrow>
            <button className="px-3 py-2 bg-indigo-500 text-white rounded">
              Custom Offset
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Características avanzadas: delays personalizados, sin flecha, estados deshabilitados y offsets.',
      },
    },
  },
};

// Casos de uso reales
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Barra de herramientas */}
      <div>
        <h4 className="font-medium mb-4">Barra de Herramientas</h4>
        <div className="flex gap-1 p-2 bg-gray-100 rounded-lg">
          <Tooltip
            content="Nuevo archivo (Ctrl+N)"
            $position="bottom"
            $size="sm">
            <button className="p-2 hover:bg-white rounded">
              <FiEdit size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Guardar (Ctrl+S)" $position="bottom" $size="sm">
            <button className="p-2 hover:bg-white rounded">
              <FiSave size={16} />
            </button>
          </Tooltip>
          <Tooltip content="Copiar (Ctrl+C)" $position="bottom" $size="sm">
            <button className="p-2 hover:bg-white rounded">
              <FiCopy size={16} />
            </button>
          </Tooltip>
          <div className="w-px bg-gray-300 mx-1"></div>
          <Tooltip content="Descargar archivo" $position="bottom" $size="sm">
            <button className="p-2 hover:bg-white rounded">
              <FiDownload size={16} />
            </button>
          </Tooltip>
          <Tooltip
            content="Abrir en nueva ventana"
            $position="bottom"
            $size="sm">
            <button className="p-2 hover:bg-white rounded">
              <FiExternalLink size={16} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Tarjeta de perfil */}
      <div>
        <h4 className="font-medium mb-4">Tarjeta de Perfil</h4>
        <div className="p-4 bg-white border border-gray-200 rounded-lg max-w-sm">
          <div className="flex items-center gap-3">
            <Tooltip
              content={
                <div>
                  <div className="font-semibold">Juan Pérez</div>
                  <div className="text-sm opacity-90">
                    Desarrollador Frontend
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    Último acceso: hace 2 horas
                  </div>
                </div>
              }
              $colorScheme="muted"
              $maxWidth="max-w-xs"
              $position="right">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                JP
              </div>
            </Tooltip>

            <div className="flex-1">
              <h5 className="font-medium">Juan Pérez</h5>
              <p className="text-sm text-gray-600">Frontend Developer</p>
            </div>

            <div className="flex gap-1">
              <Tooltip content="Marcar como favorito" $size="sm">
                <button className="p-1 text-gray-400 hover:text-yellow-500">
                  <FiStar size={16} />
                </button>
              </Tooltip>
              <Tooltip content="Enviar mensaje" $size="sm">
                <button className="p-1 text-gray-400 hover:text-blue-500">
                  <FiMail size={16} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard stats */}
      <div>
        <h4 className="font-medium mb-4">Dashboard - Estadísticas</h4>
        <div className="grid grid-cols-4 gap-4">
          <Tooltip
            content="Total de usuarios registrados en la plataforma"
            $colorScheme="default"
            $position="top">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-help">
              <div className="flex items-center justify-between">
                <span className="text-blue-600">Usuarios</span>
                <FiUser className="text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-900 mt-2">1,234</div>
            </div>
          </Tooltip>

          <Tooltip
            content="Ingresos totales del mes actual"
            $colorScheme="accent"
            $position="top">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg cursor-help">
              <div className="flex items-center justify-between">
                <span className="text-green-600">Ingresos</span>
                <FiTrendingUp className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-900 mt-2">
                $45,678
              </div>
            </div>
          </Tooltip>

          <Tooltip
            content="Número de pedidos procesados hoy"
            $colorScheme="destructive"
            $position="top">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg cursor-help">
              <div className="flex items-center justify-between">
                <span className="text-yellow-600">Pedidos</span>
                <FiCalendar className="text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-900 mt-2">89</div>
            </div>
          </Tooltip>

          <Tooltip
            content="Tiempo promedio de respuesta del sistema"
            $colorScheme="secondary"
            $position="top">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg cursor-help">
              <div className="flex items-center justify-between">
                <span className="text-purple-600">Tiempo</span>
                <FiClock className="text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-900 mt-2">
                234ms
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplos de uso real: barras de herramientas, tarjetas de perfil y dashboards con tooltips informativos.',
      },
    },
  },
};

// Interactivo con todas las opciones
export const Interactive: Story = {
  render: () => {
    const {
      interactivePosition,
      interactiveColorScheme,
      interactiveTrigger,
      interactiveSize,
      showArrow,
      multilineContent,
      customDelay,
      isDisabled,
      setInteractivePosition,
      setInteractiveColorScheme,
      setInteractiveTrigger,
      setInteractiveSize,
      setShowArrow,
      setMultilineContent,
      setCustomDelay,
      setIsDisabled,
      clearAllTooltips,
    } = useTooltipExamples();

    const positions = [
      'top',
      'bottom',
      'left',
      'right',
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
    ] as const;
    const colorSchemes = [
      'default',
      'secondary',
      'destructive',
      'accent',
      'muted',
      'minimal',
      'custom',
    ] as const;
    const triggers = ['hover', 'click', 'focus'] as const;
    const sizes = ['sm', 'default', 'lg'] as const;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Posición</label>
            <select
              value={interactivePosition}
              onChange={(e) => setInteractivePosition(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Esquema de Color
            </label>
            <select
              value={interactiveColorScheme}
              onChange={(e) => setInteractiveColorScheme(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {colorSchemes.map((colorScheme) => (
                <option key={colorScheme} value={colorScheme}>
                  {colorScheme}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Trigger</label>
            <select
              value={interactiveTrigger}
              onChange={(e) => setInteractiveTrigger(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {triggers.map((trigger) => (
                <option key={trigger} value={trigger}>
                  {trigger}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tamaño</label>
            <select
              value={interactiveSize}
              onChange={(e) => setInteractiveSize(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded">
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Delay (ms)</label>
            <input
              type="number"
              value={customDelay}
              onChange={(e) => setCustomDelay(Number(e.target.value))}
              min="0"
              max="2000"
              step="100"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showArrow}
                onChange={(e) => setShowArrow(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Mostrar flecha</span>
            </label>
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={multilineContent}
                onChange={(e) => setMultilineContent(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Multilínea</span>
            </label>
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Deshabilitado</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center p-8">
          <Tooltip
            content={
              multilineContent
                ? 'Esta es la primera línea\nEsta es la segunda línea\nY esta es la tercera línea con más contenido'
                : 'Tooltip interactivo personalizable'
            }
            $position={interactivePosition}
            $colorScheme={interactiveColorScheme}
            $trigger={interactiveTrigger}
            $size={interactiveSize}
            $showArrow={showArrow}
            $multiline={multilineContent}
            $delay={customDelay}
            $disabled={isDisabled}
            $maxWidth="max-w-xs">
            <button
              className={cn(
                'px-6 py-3 font-medium rounded-lg transition-colors',
                isDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              )}
              disabled={isDisabled}>
              Tooltip Personalizado
            </button>
          </Tooltip>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAllTooltips}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Reset Configuración
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">Configuración Actual:</h5>
          <div className="text-sm space-y-1">
            <div>
              Posición:{' '}
              <code className="bg-white px-1 rounded">
                {interactivePosition}
              </code>
            </div>
            <div>
              Esquema de Color:{' '}
              <code className="bg-white px-1 rounded">
                {interactiveColorScheme}
              </code>
            </div>
            <div>
              Trigger:{' '}
              <code className="bg-white px-1 rounded">
                {interactiveTrigger}
              </code>
            </div>
            <div>
              Tamaño:{' '}
              <code className="bg-white px-1 rounded">{interactiveSize}</code>
            </div>
            <div>
              Delay:{' '}
              <code className="bg-white px-1 rounded">{customDelay}ms</code>
            </div>
            <div>
              Opciones:
              {showArrow && (
                <span className="bg-green-100 text-green-800 px-1 mx-1 rounded text-xs">
                  Arrow
                </span>
              )}
              {multilineContent && (
                <span className="bg-blue-100 text-blue-800 px-1 mx-1 rounded text-xs">
                  Multiline
                </span>
              )}
              {isDisabled && (
                <span className="bg-red-100 text-red-800 px-1 mx-1 rounded text-xs">
                  Disabled
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ejemplo interactivo completo que permite probar todas las configuraciones del tooltip.',
      },
    },
  },
};

