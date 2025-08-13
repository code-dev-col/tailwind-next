import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useInputExamplesStore } from '../../../stores/inputExamples.store';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Input placeholder="Default input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Destructive</label>
        <Input $variant="destructive" placeholder="Error input" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Ghost</label>
        <Input $variant="ghost" placeholder="Ghost input" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="w-60">
        <label className="text-xs font-medium mb-1 block">Small</label>
        <Input $size="sm" placeholder="Small input" />
      </div>
      <div className="w-80">
        <label className="text-sm font-medium mb-2 block">Default</label>
        <Input placeholder="Default input" />
      </div>
      <div className="w-96">
        <label className="text-base font-medium mb-2 block">Large</label>
        <Input $size="lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const WithGradients: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Sunset Gradient Border
        </label>
        <Input
          placeholder="Sunset input"
          $custom="border-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Ocean Gradient Border
        </label>
        <Input
          placeholder="Ocean input"
          $custom="border-2 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Forest Gradient Border
        </label>
        <Input
          placeholder="Forest input"
          $custom="border-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Cosmic Gradient Border
        </label>
        <Input
          placeholder="Cosmic input"
          $custom="border-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-border border-transparent shadow-md hover:shadow-lg"
        />
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <div>
        <label className="text-sm font-medium mb-2 block">Email</label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Password</label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Number</label>
        <Input type="number" placeholder="Enter number" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Search</label>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
};

export const WithStoreKey: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4 w-80">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            Patrón StoreKey - Conexión automática al store
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Los componentes se conectan automáticamente usando $store y storeKey
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Username con storeKey
          </label>
          <Input
            $store={useInputExamplesStore}
            storeKey="usernameInput"
            placeholder="Ingresa tu username..."
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Email con storeKey
          </label>
          <Input
            type="email"
            $store={useInputExamplesStore}
            storeKey="emailInput"
            placeholder="tu@ejemplo.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Nombre con storeKey
          </label>
          <Input
            $store={useInputExamplesStore}
            storeKey="nameInput"
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">🔄 StoreKey Pattern:</p>
          <div className="space-y-1 text-xs">
            <p>• Conexión automática sin value/onChange</p>
            <p>• Estado sincronizado automáticamente</p>
            <p>• Menos código, menos errores</p>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() =>
              useInputExamplesStore.getState().setUsernameInput('john_doe')
            }
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
            Set Username
          </button>
          <button
            onClick={() =>
              useInputExamplesStore.getState().setEmailInput('john@example.com')
            }
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
            Set Email
          </button>
          <button
            onClick={() =>
              useInputExamplesStore.getState().setNameInput('Juan Pérez')
            }
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
            Set Nombre
          </button>
          <button
            onClick={() => {
              useInputExamplesStore.getState().setUsernameInput('');
              useInputExamplesStore.getState().setEmailInput('');
              useInputExamplesStore.getState().setNameInput('');
            }}
            className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80">
            Clear All
          </button>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <label className="text-sm font-medium mb-2 block">Normal</label>
        <Input placeholder="Normal state" />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Disabled</label>
        <Input placeholder="Disabled state" disabled />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">With Value</label>
        <Input value="Pre-filled value" readOnly />
      </div>
    </div>
  ),
};

export const CharacterCounter: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Contador de Caracteres con StoreKey
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Solo patrón storeKey - sin acceso manual al store
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Sin límite</label>
          <Input placeholder="Este input no tiene límite de caracteres" />
          <p className="text-xs text-muted-foreground mt-1">
            Sin contador ni restricciones
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Límite de 30 caracteres con storeKey
          </label>
          <Input
            $maxCharacters={30}
            placeholder="Máximo 30 caracteres..."
            $store={useInputExamplesStore}
            storeKey="limitedInput"
          />
          <p className="text-xs text-muted-foreground mt-1">
            El contador aparece automáticamente usando storeKey
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Límite corto - 15 caracteres
          </label>
          <Input
            $maxCharacters={15}
            placeholder="Solo 15 chars"
            $store={useInputExamplesStore}
            storeKey="shortLimitInput"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Se vuelve rojo cuando excedes el límite
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Email con límite de 50
          </label>
          <Input
            type="email"
            $maxCharacters={50}
            placeholder="tu-email@ejemplo.com"
            $store={useInputExamplesStore}
            storeKey="emailLimitInput"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Prueba con un email largo para ver el comportamiento
          </p>
        </div>
      </div>

      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-xs font-medium mb-1">
          🔢 Características del contador con storeKey:
        </p>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• Conexión automática al store con $store y storeKey</li>
          <li>• Aparece automáticamente cuando se define $maxCharacters</li>
          <li>• Previene escritura más allá del límite</li>
          <li>• Cambia a rojo cuando se excede (visual)</li>
          <li>• Usa fuente tabular para evitar saltos</li>
          <li>• SIN acceso manual al store - solo storeKey</li>
        </ul>
      </div>
    </div>
  ),
};

export const CounterVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Contador en Diferentes Variantes
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Default con contador
          </label>
          <Input
            $variant="default"
            $maxCharacters={25}
            placeholder="Variante default"
            $store={useInputExamplesStore}
            storeKey="basicInput"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Destructive con contador
          </label>
          <Input
            $variant="destructive"
            $maxCharacters={25}
            placeholder="Variante destructive"
            $store={useInputExamplesStore}
            storeKey="passwordInput"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Ghost con contador
          </label>
          <Input
            $variant="ghost"
            $maxCharacters={25}
            placeholder="Variante ghost"
            $store={useInputExamplesStore}
            storeKey="searchInput"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-medium mb-1">✨ Integración perfecta:</p>
        <p className="text-xs text-muted-foreground">
          El contador se adapta automáticamente al color de la variante cuando
          se excede el límite usando solo storeKey.
        </p>
      </div>
    </div>
  ),
};

export const SecurityFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <div>
        <h3 className="text-lg font-semibold mb-4">
          🔒 Funcionalidades de Seguridad con StoreKey
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Protección automática usando solo patrón storeKey
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Seguridad básica (mostrar advertencias)
          </label>
          <Input
            $security="form"
            $showSecurityWarnings={true}
            placeholder="Intenta escribir: &lt;script&gt; o ' OR 1=1"
            $store={useInputExamplesStore}
            storeKey="securityBasicInput"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Detecta patrones SQL y XSS, muestra advertencias
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Sanitización automática
          </label>
          <Input
            $security="form"
            $sanitizeOnChange={true}
            placeholder="Los caracteres peligrosos se escapan automáticamente"
            $store={useInputExamplesStore}
            storeKey="securitySanitizeInput"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Limpia el input automáticamente al escribir usando storeKey
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Bloqueo de input inseguro
          </label>
          <Input
            $security="username"
            $blockUnsafeInput={true}
            $showSecurityWarnings={true}
            placeholder="Intenta escribir caracteres peligrosos"
            $store={useInputExamplesStore}
            storeKey="securityBlockInput"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Bloquea completamente el input inseguro
          </p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-xs font-medium mb-2">
          🛡️ Protecciones implementadas con storeKey:
        </p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• Conexión automática al store sin props value/onChange</p>
          <p>• Detección de inyecciones SQL</p>
          <p>• Prevención de ataques XSS</p>
          <p>• Sanitización automática de caracteres</p>
          <p>• Validación en tiempo real</p>
          <p>• Presets de seguridad predefinidos</p>
          <p>• Solo patrón storeKey - sin hooks manuales</p>
        </div>
      </div>
    </div>
  ),
};

export const NeumorphicEffects: Story = {
  render: () => (
    <div className="p-8 bg-background max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Inputs Neumórficos</h2>
          <p className="text-muted-foreground">
            Campos de entrada con efectos neumórficos para una UI moderna y
            táctil
          </p>
        </div>

        {/* Inputs Básicos Neumórficos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Estilos Neumórficos Básicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Input Hundido (Inner)
              </label>
              <Input
                placeholder="Efecto hundido..."
                $custom="shadow-neumorphic-inner focus:shadow-neumorphic-inner-soft transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Input Elevado</label>
              <Input
                placeholder="Efecto elevado..."
                $custom="shadow-neumorphic focus:shadow-neumorphic-soft transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Variantes de Sombra */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Variantes de Sombra</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sombra Suave</label>
              <Input
                placeholder="Sombra suave..."
                $custom="shadow-neumorphic-soft focus:shadow-neumorphic transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sombra Intensa</label>
              <Input
                placeholder="Sombra intensa..."
                $custom="shadow-neumorphic focus:shadow-neumorphic-inner transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Inputs con Gradientes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Con Gradientes de Fondo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Gradiente Primary</label>
              <div className="p-4 bg-gradient-primary rounded-lg">
                <Input
                  placeholder="Input sobre gradiente..."
                  $custom="shadow-neumorphic-inner bg-background/90 backdrop-blur-sm focus:bg-background transition-all duration-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gradiente Secondary</label>
              <div className="p-4 bg-gradient-secondary rounded-lg">
                <Input
                  placeholder="Input sobre gradiente..."
                  $custom="shadow-neumorphic-inner bg-background/90 backdrop-blur-sm focus:bg-background transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Estados de Formulario */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Estados de Formulario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700">
                  Estado Válido
                </label>
                <Input
                  placeholder="Entrada válida"
                  value="texto@valido.com"
                  $custom="shadow-neumorphic-inner border-green-300 focus:border-green-500 bg-green-50/50 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-red-700">
                  Estado Error
                </label>
                <Input
                  placeholder="Entrada con error"
                  value="texto-invalido"
                  $custom="shadow-neumorphic-inner border-red-300 focus:border-red-500 bg-red-50/50 transition-all duration-200"
                />
                <p className="text-xs text-red-600">
                  Este campo contiene errores
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700">
                  Estado Focus
                </label>
                <Input
                  placeholder="Campo enfocado"
                  $custom="shadow-neumorphic-inner-soft border-blue-400 ring-2 ring-blue-200 bg-blue-50/30 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">
                  Estado Disabled
                </label>
                <Input
                  placeholder="Campo deshabilitado"
                  disabled
                  $custom="shadow-neumorphic-inner-soft opacity-60 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Formulario Completo */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Formulario Neumórfico Completo
          </h3>
          <div className="bg-muted/30 p-6 rounded-2xl shadow-neumorphic">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                    placeholder="Tu nombre..."
                    $custom="shadow-neumorphic-inner focus:shadow-neumorphic-inner-soft transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Apellido</label>
                  <Input
                    placeholder="Tu apellido..."
                    $custom="shadow-neumorphic-inner focus:shadow-neumorphic-inner-soft transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  $custom="shadow-neumorphic-inner focus:shadow-neumorphic-inner-soft transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje</label>
                <textarea
                  placeholder="Escribe tu mensaje aquí..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background shadow-neumorphic-inner focus:shadow-neumorphic-inner-soft focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-200 resize-none"
                />
              </div>

              <button className="w-full px-4 py-2 bg-gradient-primary text-white rounded-md shadow-neumorphic hover:shadow-neumorphic-soft transition-all duration-200 font-medium">
                Enviar Formulario
              </button>
            </div>
          </div>
        </div>

        {/* Información de Implementación */}
        <div className="bg-muted/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">
            Clases para Inputs Neumórficos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Sombras Recomendadas:</h4>
              <ul className="space-y-1 text-muted-foreground font-mono">
                <li>• shadow-neumorphic-inner (hundido)</li>
                <li>• shadow-neumorphic-inner-soft (suave)</li>
                <li>• focus:shadow-neumorphic-inner-soft</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Transiciones:</h4>
              <ul className="space-y-1 text-muted-foreground font-mono">
                <li>• transition-all duration-200</li>
                <li>• focus:ring-2 ring-ring/20</li>
                <li>• backdrop-blur-sm (con gradientes)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demuestra el uso de efectos neumórficos en inputs para crear una experiencia de formulario moderna y táctil.',
      },
    },
  },
};

