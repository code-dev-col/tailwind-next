import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import {
  useInputExamples,
  useExamplesStore,
} from '../../../stores/examplesStore';

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

export const WithZustandStore: Story = {
  render: () => {
    const {
      basicInput,
      setBasicInput,
      emailInput,
      setEmailInput,
      nameInput,
      setNameInput,
    } = useInputExamples();

    const { getInputCount } = useExamplesStore();

    return (
      <div className="flex flex-col gap-4 w-80">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800">
            Campos activos en el store: {getInputCount()}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Estos valores se mantienen sincronizados globalmente usando slices
            de Zustand
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Input básico con store
          </label>
          <Input
            value={basicInput}
            onChange={(e) => setBasicInput(e.target.value)}
            placeholder="Escribe algo..."
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Email con store
          </label>
          <Input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Nombre con store
          </label>
          <Input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Tu nombre"
          />
        </div>

        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">Valores del Store:</p>
          <div className="space-y-1 text-xs">
            <div>
              <strong>Básico:</strong> {basicInput || '(vacío)'}
            </div>
            <div>
              <strong>Email:</strong> {emailInput || '(vacío)'}
            </div>
            <div>
              <strong>Nombre:</strong> {nameInput || '(vacío)'}
            </div>
          </div>
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

export const WithStoreKey: Story = {
  render: () => {
    const { usernameInput, setUsernameInput, emailInput, setEmailInput } =
      useInputExamples();

    return (
      <div className="flex flex-col gap-4 w-80">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Username con store integrado
          </label>
          <Input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Ingresa tu username..."
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Email con store integrado
          </label>
          <Input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="tu@ejemplo.com"
          />
        </div>

        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">Valores actuales:</p>
          <div className="space-y-1 text-xs">
            <div>
              <strong>Username:</strong> {usernameInput || '(vacío)'}
            </div>
            <div>
              <strong>Email:</strong> {emailInput || '(vacío)'}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setUsernameInput('john_doe')}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
            Set Username
          </button>
          <button
            onClick={() => setEmailInput('john@example.com')}
            className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
            Set Email
          </button>
          <button
            onClick={() => {
              setUsernameInput('');
              setEmailInput('');
            }}
            className="px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-muted/80">
            Clear All
          </button>
        </div>
      </div>
    );
  },
};

export const CharacterCounter: Story = {
  render: () => {
    const {
      limitedInput,
      setLimitedInput,
      shortLimitInput,
      setShortLimitInput,
      emailLimitInput,
      setEmailLimitInput,
    } = useInputExamples();

    return (
      <div className="flex flex-col gap-6 w-96">
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Contador de Caracteres en Input
          </h3>
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
              Límite de 30 caracteres con store
            </label>
            <Input
              $maxCharacters={30}
              placeholder="Máximo 30 caracteres..."
              value={limitedInput}
              onChange={(e) => setLimitedInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              El contador aparece automáticamente
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Límite corto - 15 caracteres
            </label>
            <Input
              $maxCharacters={15}
              placeholder="Solo 15 chars"
              value={shortLimitInput}
              onChange={(e) => setShortLimitInput(e.target.value)}
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
              value={emailLimitInput}
              onChange={(e) => setEmailLimitInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Prueba con un email largo para ver el comportamiento
            </p>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-xs font-medium mb-1">
            🔢 Características del contador:
          </p>
          <ul className="text-xs text-purple-700 space-y-1">
            <li>• Aparece automáticamente cuando se define $maxCharacters</li>
            <li>• Previene escritura más allá del límite</li>
            <li>• Cambia a rojo cuando se excede (visual)</li>
            <li>• Usa fuente tabular para evitar saltos</li>
          </ul>
        </div>
      </div>
    );
  },
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
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs font-medium mb-1">✨ Integración perfecta:</p>
        <p className="text-xs text-muted-foreground">
          El contador se adapta automáticamente al color de la variante cuando
          se excede el límite.
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
          🔒 Funcionalidades de Seguridad
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Protección automática contra inyecciones SQL y XSS
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
          />
          <p className="text-xs text-muted-foreground mt-1">
            Limpia el input automáticamente al escribir
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
          />
          <p className="text-xs text-muted-foreground mt-1">
            Bloquea completamente el input inseguro
          </p>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-xs font-medium mb-2">
          🛡️ Protecciones implementadas:
        </p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>• Detección de inyecciones SQL</p>
          <p>• Prevención de ataques XSS</p>
          <p>• Sanitización automática de caracteres</p>
          <p>• Validación en tiempo real</p>
          <p>• Presets de seguridad predefinidos</p>
        </div>
      </div>
    </div>
  ),
};

