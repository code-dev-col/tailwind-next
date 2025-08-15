import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { useSwitchExamples } from '../../../../stores/switchExamples.store';
import {
  FiSun,
  FiMoon,
  FiBell,
  FiMapPin,
  FiSave,
  FiRefreshCw,
  FiCheck,
  FiX,
} from 'react-icons/fi';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado controlado del switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Estado inicial del switch (no controlado)',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el switch está deshabilitado',
    },
    $colorScheme: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'accent'],
      description: 'Variante visual del switch',
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Tamaño del switch',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del switch',
    },
    description: {
      control: 'text',
      description: 'Descripción adicional',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Posición de la etiqueta',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Switch
      $store={useSwitchExamples}
      storeKey="defaultExample"
      label="Switch básico"
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Switch $colorScheme="default" defaultChecked label="Primary" />
        <Switch $colorScheme="secondary" defaultChecked label="Secondary" />
        <Switch $colorScheme="destructive" defaultChecked label="Destructive" />
        <Switch $colorScheme="accent" defaultChecked label="Accent" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-8">
        <Switch $size="sm" defaultChecked label="Small" />
        <Switch $size="default" defaultChecked label="Default" />
        <Switch $size="lg" defaultChecked label="Large" />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Switch
          $colorScheme="default"
          defaultChecked
          label="Con icono único"
          icon={<FiCheck className="text-white" />}
        />

        <Switch
          $colorScheme="accent"
          defaultChecked
          label="Iconos diferentes"
          checkedIcon={<FiCheck className="text-white text-xs" />}
          uncheckedIcon={<FiX className="text-gray-400 text-xs" />}
        />
      </div>
    </div>
  ),
};

export const LightDarkMode: Story = {
  render: () => {
    const { lightDarkMode, setLightDarkMode } = useSwitchExamples();

    return (
      <div
        className={`p-8 rounded-2xl transition-all duration-500 ${
          lightDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}>
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">
              Modo {lightDarkMode ? 'Oscuro' : 'Claro'}
            </h3>
            <p
              className={`text-sm ${lightDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Cambia entre modos claro y oscuro con un switch interactivo
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Switch
              $colorScheme="default"
              $size="lg"
              checked={lightDarkMode}
              onChange={setLightDarkMode}
              checkedIcon={<FiMoon className="text-white" />}
              uncheckedIcon={<FiSun className="text-yellow-500" />}
              label={lightDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
              description="Alternar entre temas claro y oscuro"
              $custom={`
                ${lightDarkMode ? 'shadow-lg shadow-blue-500/20' : 'shadow-lg shadow-yellow-500/20'}
                transition-all duration-300
              `}
            />
          </div>

          <div
            className={`p-4 rounded-lg ${
              lightDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-sm`}>
            <h4 className="font-semibold mb-2">Panel de ejemplo</h4>
            <p
              className={`text-sm ${lightDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Este contenido se adapta automáticamente al tema seleccionado,
              demostrando cómo el switch puede controlar el estado de toda la
              interfaz.
            </p>

            <div className="mt-4 space-y-2">
              <div
                className={`h-2 rounded ${lightDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full w-3/4 bg-primary rounded"></div>
              </div>
              <div
                className={`h-2 rounded ${lightDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full w-1/2 bg-secondary rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Configuración
      </h3>

      <div className="space-y-6">
        <Switch
          $store={useSwitchExamples}
          storeKey="notificationsEnabled"
          $colorScheme="default"
          label="Notificaciones"
          description="Recibir notificaciones push"
          icon={<FiBell className="text-white text-xs" />}
        />

        <Switch
          $store={useSwitchExamples}
          storeKey="locationEnabled"
          $colorScheme="secondary"
          label="Ubicación"
          description="Permitir acceso a la ubicación"
          icon={<FiMapPin className="text-white text-xs" />}
        />

        <Switch
          $store={useSwitchExamples}
          storeKey="autoSave"
          $colorScheme="accent"
          label="Guardado automático"
          description="Guardar cambios automáticamente"
          icon={<FiSave className="text-white text-xs" />}
        />

        <Switch
          $store={useSwitchExamples}
          storeKey="syncEnabled"
          $colorScheme="default"
          label="Sincronización"
          description="Sincronizar datos en la nube"
          icon={<FiRefreshCw className="text-white text-xs" />}
        />
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => useSwitchExamples.getState().clearAllSwitch()}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          Restablecer todas las configuraciones
        </button>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">Estados Básicos</h4>
        <div className="grid grid-cols-2 gap-4">
          <Switch label="Desactivado" defaultChecked={false} />
          <Switch label="Activado" defaultChecked={true} />
          <Switch label="Deshabilitado (Off)" disabled defaultChecked={false} />
          <Switch label="Deshabilitado (On)" disabled defaultChecked={true} />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Con Etiquetas</h4>
        <div className="space-y-4">
          <Switch
            label="Posición derecha (default)"
            description="Etiqueta en el lado derecho del switch"
            defaultChecked
          />
          <Switch
            label="Posición izquierda"
            description="Etiqueta en el lado izquierdo del switch"
            labelPosition="left"
            defaultChecked
          />
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const {
      clearAllSwitch,
      defaultExample,
      sizeExample,
      notificationsEnabled,
      locationEnabled,
      autoSave,
      syncEnabled,
      lightDarkMode,
    } = useSwitchExamples();

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Switch
            $store={useSwitchExamples}
            storeKey="defaultExample"
            label="Ejemplo interactivo"
            description="Conectado al store global"
          />

          <Switch
            $store={useSwitchExamples}
            storeKey="sizeExample"
            $colorScheme="default"
            label="Otro ejemplo"
            description="También conectado al store"
          />
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">Estado actual del store:</h5>
          <pre className="text-xs text-gray-600 bg-white p-2 rounded overflow-auto">
            {JSON.stringify(
              {
                defaultExample,
                sizeExample,
                notificationsEnabled,
                locationEnabled,
                autoSave,
                syncEnabled,
                lightDarkMode,
              },
              null,
              2
            )}
          </pre>
        </div>

        <button
          onClick={clearAllSwitch}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors">
          Limpiar todos los switches
        </button>
      </div>
    );
  },
};

export const GradientEffects: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Efectos de Gradiente - Switch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre cómo el componente Switch se integra con gradientes y
            efectos modernos sin comprometer su forma natural
          </p>
        </div>

        {/* Gradient Background Switches */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Switches con Fondos de Gradiente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100">
              <Switch
                $colorScheme="default"
                defaultChecked
                label="Switch Principal"
                description="En fondo de gradiente azul-púrpura"
                $custom="shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
              <Switch
                $colorScheme="secondary"
                $size="lg"
                defaultChecked
                checkedIcon={<FiCheck className="text-white" />}
                uncheckedIcon={<FiX className="text-gray-400" />}
                label="Switch con Iconos"
                description="En fondo de gradiente verde"
                $custom="shadow-lg hover:shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </section>

        {/* Enhanced Light/Dark Mode */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Modo Claro/Oscuro Mejorado
          </h3>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl">
            <div className="max-w-md mx-auto space-y-6">
              <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-md text-center">
                <Switch
                  $store={useSwitchExamples}
                  storeKey="lightDarkMode"
                  $colorScheme="default"
                  $size="lg"
                  checkedIcon={<FiMoon className="text-white" />}
                  uncheckedIcon={<FiSun className="text-yellow-500" />}
                  label="Alternar Tema"
                  description="Cambia entre modo claro y oscuro"
                  $custom="shadow-md hover:shadow-lg transition-all duration-300"
                />
              </div>

              <div
                className={`p-6 rounded-xl transition-all duration-500 border ${
                  useSwitchExamples((state) => state.lightDarkMode)
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700 shadow-xl'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md'
                }`}>
                <h4 className="font-semibold mb-2">Panel Adaptativo</h4>
                <p className="text-sm opacity-80 mb-4">
                  Este panel cambia automáticamente según el estado del switch
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className={`p-3 rounded-lg text-center text-xs font-medium transition-all duration-300 ${
                      useSwitchExamples((state) => state.lightDarkMode)
                        ? 'bg-gray-700 text-gray-300 border border-gray-600'
                        : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                    }`}>
                    Elemento 1
                  </div>
                  <div
                    className={`p-3 rounded-lg text-center text-xs font-medium transition-all duration-300 ${
                      useSwitchExamples((state) => state.lightDarkMode)
                        ? 'bg-gray-700 text-gray-300 border border-gray-600'
                        : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                    }`}>
                    Elemento 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stylized Settings Panel */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Panel de Configuración Estilizado
          </h3>
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-2xl">
            <div className="max-w-2xl mx-auto">
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Configuraciones de Usuario
                </h4>
                <p className="text-sm text-gray-600">
                  Gestiona tus preferencias con switches elegantes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <Switch
                    $store={useSwitchExamples}
                    storeKey="notificationsEnabled"
                    $colorScheme="default"
                    label="Notificaciones"
                    description="Alertas y recordatorios"
                    checkedIcon={<FiBell className="text-white text-xs" />}
                    uncheckedIcon={<FiBell className="text-gray-400 text-xs" />}
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <Switch
                    $store={useSwitchExamples}
                    storeKey="locationEnabled"
                    $colorScheme="secondary"
                    label="Ubicación"
                    description="Servicios de geolocalización"
                    checkedIcon={<FiMapPin className="text-white text-xs" />}
                    uncheckedIcon={
                      <FiMapPin className="text-gray-400 text-xs" />
                    }
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <Switch
                    $store={useSwitchExamples}
                    storeKey="autoSave"
                    $colorScheme="accent"
                    label="Auto-guardado"
                    description="Guardar cambios automáticamente"
                    checkedIcon={<FiSave className="text-white text-xs" />}
                    uncheckedIcon={<FiSave className="text-gray-400 text-xs" />}
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <Switch
                    $store={useSwitchExamples}
                    storeKey="syncEnabled"
                    $colorScheme="default"
                    label="Sincronización"
                    description="Sync con la nube"
                    checkedIcon={<FiRefreshCw className="text-white text-xs" />}
                    uncheckedIcon={
                      <FiRefreshCw className="text-gray-400 text-xs" />
                    }
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => useSwitchExamples.getState().clearAllSwitch()}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                  Restablecer Configuraciones
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Switch Variations */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Variaciones Avanzadas
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-700 mb-6">
                Tamaños con Efectos
              </h4>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                  <Switch
                    $size="sm"
                    $colorScheme="default"
                    defaultChecked
                    label="Switch Pequeño"
                    description="Con fondo de gradiente cálido"
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                  <Switch
                    $size="default"
                    $colorScheme="secondary"
                    defaultChecked
                    label="Switch Estándar"
                    description="Con fondo de gradiente frío"
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                  <Switch
                    $size="lg"
                    $colorScheme="accent"
                    defaultChecked
                    label="Switch Grande"
                    description="Con fondo de gradiente vibrante"
                    $custom="shadow-sm hover:shadow-md transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-700 mb-6">
                Estados Estilizados
              </h4>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                  <Switch
                    $colorScheme="default"
                    defaultChecked
                    label="Estado Activo"
                    description="Switch completamente funcional"
                    $custom="shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
                  <Switch
                    $colorScheme="destructive"
                    disabled
                    label="Estado Deshabilitado"
                    description="Switch no interactivo"
                    $custom="opacity-60"
                  />
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
                  <Switch
                    $colorScheme="accent"
                    defaultChecked
                    label="Con Animación Especial"
                    description="Efectos de hover mejorados"
                    $custom="shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Guía de Implementación
          </h3>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Clases CSS Recomendadas
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      shadow-sm hover:shadow-md
                    </code>
                    <span className="text-gray-600">Sombras suaves</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      transition-all duration-300
                    </code>
                    <span className="text-gray-600">Transiciones fluidas</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      transform hover:scale-105
                    </code>
                    <span className="text-gray-600">Efectos de escala</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                      bg-gradient-to-r
                    </code>
                    <span className="text-gray-600">Fondos con gradiente</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Mejores Prácticas
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Usa gradientes sutiles para fondos de contenedor</li>
                  <li>• Evita efectos neumórficos en switches</li>
                  <li>• Aplica sombras suaves al switch mismo</li>
                  <li>• Usa transiciones para mejor UX</li>
                  <li>• Mantén la forma natural del switch</li>
                  <li>• Combina iconos para mejor feedback</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

