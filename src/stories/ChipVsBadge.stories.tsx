import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/atoms/feedback/Badge/Badge';
import { Chip, ChipGroup } from '../components/atoms/Chip/Chip';
import {
  FiStar,
  FiTag,
  FiUser,
  FiShoppingCart,
  FiClock,
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiInfo,
  FiHeart,
  FiMessageSquare,
  FiSettings,
  FiTrendingUp,
} from 'react-icons/fi';

const meta: Meta<any> = {
  title: 'Documentation/Chip vs Badge',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comparación entre componentes Chip y Badge: cuándo usar cada uno y sus diferencias principales.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentComparison: Story = {
  render: () => (
    <div className="space-y-12 max-w-6xl">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Chip vs Badge: ¿Cuándo usar cada uno?
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Ambos componentes muestran información pequeña y concisa, pero tienen
          propósitos y comportamientos diferentes.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <FiTag className="text-white" size={16} />
            </div>
            <h2 className="text-xl font-semibold text-blue-900">Chip/Tag</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-blue-800">Propósito:</strong>
              <p className="text-blue-700">
                Elementos interactivos para filtrar, seleccionar o categorizar
                contenido
              </p>
            </div>

            <div>
              <strong className="text-blue-800">Comportamiento:</strong>
              <p className="text-blue-700">
                Clickeable, removible, seleccionable
              </p>
            </div>

            <div>
              <strong className="text-blue-800">Estados:</strong>
              <p className="text-blue-700">
                Activo/Inactivo, Seleccionado, Hover, Disabled
              </p>
            </div>

            <div>
              <strong className="text-blue-800">Casos de uso:</strong>
              <ul className="text-blue-700 list-disc list-inside space-y-1">
                <li>Filtros de búsqueda</li>
                <li>Tags de posts/artículos</li>
                <li>Habilidades en perfiles</li>
                <li>Categorías seleccionables</li>
                <li>Keywords de productos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <FiStar className="text-white" size={16} />
            </div>
            <h2 className="text-xl font-semibold text-purple-900">Badge</h2>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-purple-800">Propósito:</strong>
              <p className="text-purple-700">
                Indicadores de estado, notificaciones o metadatos
              </p>
            </div>

            <div>
              <strong className="text-purple-800">Comportamiento:</strong>
              <p className="text-purple-700">
                Solo visual, no interactivo por defecto
              </p>
            </div>

            <div>
              <strong className="text-purple-800">Estados:</strong>
              <p className="text-purple-700">
                Solo variantes de color para diferentes tipos
              </p>
            </div>

            <div>
              <strong className="text-purple-800">Casos de uso:</strong>
              <ul className="text-purple-700 list-disc list-inside space-y-1">
                <li>Estados de proceso (Activo, Pendiente)</li>
                <li>Contadores de notificaciones</li>
                <li>Niveles/Rankings</li>
                <li>Indicadores de estado</li>
                <li>Versiones/Etiquetas de release</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Examples */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-center">
          Ejemplos Visuales
        </h3>

        {/* Interactive vs Non-Interactive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-700">
              🔄 Chips (Interactivos)
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Filtros clickeables:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="React" $variant="primary" $clickable />
                  <Chip label="TypeScript" $variant="secondary" $clickable />
                  <Chip label="Next.js" $variant="accent" $clickable />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Tags removibles:</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Frontend" $variant="success" $removable />
                  <Chip label="Backend" $variant="warning" $removable />
                  <Chip label="DevOps" $variant="destructive" $removable />
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Seleccionables:</p>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    label="JavaScript"
                    $variant="primary"
                    $selectable
                    $selected
                  />
                  <Chip label="Python" $variant="primary" $selectable />
                  <Chip label="Go" $variant="primary" $selectable />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-700">
              📊 Badges (Informativos)
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Estados de proceso:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge $variant="success">Activo</Badge>
                  <Badge $variant="warning">Pendiente</Badge>
                  <Badge $variant="destructive">Inactivo</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Versiones y releases:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge $variant="default">v2.1.0</Badge>
                  <Badge $variant="secondary">Beta</Badge>
                  <Badge $variant="outline">LTS</Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Niveles y prioridades:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge $variant="destructive">Alta</Badge>
                  <Badge $variant="warning">Media</Badge>
                  <Badge $variant="success">Baja</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real World Scenarios */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-center">
          Escenarios del Mundo Real
        </h3>

        {/* E-commerce Product */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiShoppingCart /> Producto de E-commerce
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">MacBook Pro 16" M3</h5>
              <div className="flex gap-2">
                <Badge $variant="success">En Stock</Badge>
                <Badge $variant="warning">Últimas 3 unidades</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Filtrar por características:
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip label="16GB RAM" $variant="outline" $selectable />
                <Chip label="512GB SSD" $variant="outline" $selectable />
                <Chip
                  label="Space Gray"
                  $variant="outline"
                  $selectable
                  $selected
                />
                <Chip label="Español" $variant="outline" $selectable />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Etiquetas del producto:
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip label="Apple" $variant="secondary" $clickable />
                <Chip label="Laptop" $variant="secondary" $clickable />
                <Chip label="Profesional" $variant="secondary" $clickable />
                <Chip label="2024" $variant="secondary" $clickable />
              </div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiUser /> Perfil de Usuario
          </h4>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div>
                <h5 className="font-medium">Juan Desarrollador</h5>
                <div className="flex gap-2 mt-1">
                  <Badge $variant="success">Premium</Badge>
                  <Badge $variant="secondary">Nivel 5</Badge>
                  <Badge $variant="outline">Verificado</Badge>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Habilidades editables:
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip label="React" $variant="primary" $removable />
                <Chip label="TypeScript" $variant="primary" $removable />
                <Chip label="Node.js" $variant="primary" $removable />
                <Chip
                  label="Agregar"
                  $variant="outline"
                  $clickable
                  $icon={<FiX />}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiSettings /> Dashboard de Administración
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Estados de Servicios</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Gateway</span>
                  <Badge $variant="success">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Base de Datos</span>
                  <Badge $variant="warning">Mantenimiento</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">CDN</span>
                  <Badge $variant="destructive">Offline</Badge>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Filtros de Logs</h5>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="Errores"
                  $variant="destructive"
                  $selectable
                  $icon={<FiAlertTriangle />}
                />
                <Chip label="Advertencias" $variant="warning" $selectable />
                <Chip label="Info" $variant="secondary" $selectable $selected />
                <Chip label="Debug" $variant="outline" $selectable />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Matrix */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border">
        <h3 className="text-2xl font-semibold text-center mb-6">
          🤔 ¿Cuál elegir?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-blue-700 mb-4">
              ✅ Usa CHIP cuando:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>
                  El usuario puede interactuar (click, selección, eliminación)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>Necesitas filtrar o categorizar contenido</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>El contenido es editable (tags, habilidades)</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>Representas opciones múltiples seleccionables</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>
                  Necesitas mostrar un grupo de elementos relacionados
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-purple-700 mb-4">
              ✅ Usa BADGE cuando:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>Solo necesitas mostrar información (estado, nivel)</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>Indicas status o progreso de algo</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>Muestras contadores (notificaciones, mensajes)</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>Etiquetas versiones, releases o metadata</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck
                  className="text-green-500 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <span>El contenido es fijo y no cambia frecuentemente</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-2">
            💡 Regla práctica:
          </h5>
          <p className="text-sm text-gray-600">
            Si el usuario puede <strong>hacer algo</strong> con el elemento →{' '}
            <span className="text-blue-600 font-semibold">Chip</span>
            <br />
            Si solo necesitas <strong>mostrar información</strong> →{' '}
            <span className="text-purple-600 font-semibold">Badge</span>
          </p>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
          <FiAlertTriangle /> Errores Comunes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-red-700 mb-2">
              ❌ NO hagas esto:
            </h4>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Usar Chip para mostrar solo estados fijos</li>
              <li>• Usar Badge para elementos que se pueden eliminar</li>
              <li>• Mezclar ambos para la misma función</li>
              <li>• Hacer Badges clickeables sin razón</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              ✅ SÍ haz esto:
            </h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• Usar Chip para filtros y tags interactivos</li>
              <li>• Usar Badge para estados y metadatos</li>
              <li>• Ser consistente en toda la aplicación</li>
              <li>• Considerar el contexto de uso</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SideBySideComparison: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <h2 className="text-2xl font-semibold text-center">
        Comparación Lado a Lado
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chip Examples */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-blue-700 border-b border-blue-200 pb-2">
            Chip - Interactivo
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Filtros de búsqueda</h4>
              <div className="flex gap-2">
                <Chip
                  label="Frontend"
                  $variant="primary"
                  $selectable
                  $selected
                />
                <Chip label="Backend" $variant="primary" $selectable />
                <Chip label="Fullstack" $variant="primary" $selectable />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click para seleccionar/deseleccionar
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tags editables</h4>
              <div className="flex gap-2">
                <Chip label="React" $variant="secondary" $removable />
                <Chip label="Vue" $variant="secondary" $removable />
                <Chip label="Angular" $variant="secondary" $removable />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click en X para eliminar
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Categorías clickeables</h4>
              <div className="flex gap-2">
                <Chip
                  label="Tecnología"
                  $variant="accent"
                  $clickable
                  $count={156}
                />
                <Chip label="Diseño" $variant="accent" $clickable $count={89} />
                <Chip
                  label="Marketing"
                  $variant="accent"
                  $clickable
                  $count={234}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Click para navegar a la categoría
              </p>
            </div>
          </div>
        </div>

        {/* Badge Examples */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-purple-700 border-b border-purple-200 pb-2">
            Badge - Informativo
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Estados de usuario</h4>
              <div className="flex gap-2">
                <Badge $variant="success">Activo</Badge>
                <Badge $variant="warning">Ausente</Badge>
                <Badge $variant="destructive">Offline</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Solo información de estado
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Versiones de software</h4>
              <div className="flex gap-2">
                <Badge $variant="default">v3.2.1</Badge>
                <Badge $variant="secondary">Beta</Badge>
                <Badge $variant="outline">LTS</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Metadata fijo, no interactivo
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Prioridades y niveles</h4>
              <div className="flex gap-2">
                <Badge $variant="destructive">Crítico</Badge>
                <Badge $variant="warning">Alto</Badge>
                <Badge $variant="success">Bajo</Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Indicadores visuales de importancia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
        <h4 className="font-semibold text-center mb-4">📝 Resumen Clave</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <strong className="text-blue-700">Chip = Acción</strong>
            <p className="text-blue-600">El usuario puede hacer algo</p>
          </div>
          <div className="text-center">
            <strong className="text-purple-700">Badge = Información</strong>
            <p className="text-purple-600">Solo muestra datos/estado</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

