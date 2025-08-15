import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CheckBox } from '.';
import { Container } from '../../layout/Container';
import { Button } from '../Button';
import { Text } from '../../display/Text';
import { Label } from '../Label';
import { useCheckboxExamplesStore } from '../../../../stores/checkboxExamples.store';

// Store simple para demostrar theme.css colors
import { create } from 'zustand';

interface ThemeColorDemoStore {
  // Esquemas de color theme.css
  defaultOption: boolean;
  setDefaultOption: (value: boolean) => void;

  secondaryOption: boolean;
  setSecondaryOption: (value: boolean) => void;

  destructiveOption: boolean;
  setDestructiveOption: (value: boolean) => void;

  accentOption: boolean;
  setAccentOption: (value: boolean) => void;

  mutedOption: boolean;
  setMutedOption: (value: boolean) => void;

  minimalOption: boolean;
  setMinimalOption: (value: boolean) => void;

  // Array para múltiples opciones
  preferences: string[];
  setPreferences: (value: string[]) => void;

  // Utilities
  clearAll: () => void;
}

const useThemeColorDemoStore = create<ThemeColorDemoStore>((set) => ({
  defaultOption: true,
  setDefaultOption: (value) => set({ defaultOption: value }),

  secondaryOption: false,
  setSecondaryOption: (value) => set({ secondaryOption: value }),

  destructiveOption: false,
  setDestructiveOption: (value) => set({ destructiveOption: value }),

  accentOption: false,
  setAccentOption: (value) => set({ accentOption: value }),

  mutedOption: false,
  setMutedOption: (value) => set({ mutedOption: value }),

  minimalOption: false,
  setMinimalOption: (value) => set({ minimalOption: value }),

  preferences: ['theme-colors', 'responsive-design'],
  setPreferences: (value) => set({ preferences: value }),

  clearAll: () =>
    set({
      defaultOption: false,
      secondaryOption: false,
      destructiveOption: false,
      accentOption: false,
      mutedOption: false,
      minimalOption: false,
      preferences: [],
    }),
}));

const meta: Meta<typeof CheckBox> = {
  title: 'Atoms/Forms/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
      description: 'Esquema de color usando theme.css',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamaño del checkbox',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del checkbox',
    },
    description: {
      control: 'text',
      description: 'Descripción adicional',
    },
    checked: {
      control: 'boolean',
      description: 'Si el checkbox está marcado',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Estado indeterminado del checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el checkbox está deshabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story básica para Storybook controls
export const Default: Story = {
  args: {
    $colorScheme: 'default',
    $size: 'default',
    label: 'Acepto los términos y condiciones',
    description: 'Checkbox básico con controles de Storybook',
    checked: false,
  },
};

// Store principal con todos los tipos de datos
export const WithStoreKey: Story = {
  render: () => {
    const store = useCheckboxExamplesStore();
    const {
      acceptTerms,
      newsletter,
      notifications,
      marketing,
      interests,
      skills,
      clearAllCheckboxes,
      getCheckedCount,
    } = store;

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold" className="mb-4">
          Patrón StoreKey - Completo
        </Text>

        {/* Checkboxes Básicos (Boolean) */}
        <div>
          <Label className="mb-3 block text-gray-700">
            Configuración Básica
          </Label>
          <div className="space-y-3">
            <CheckBox
              $colorScheme="default"
              $store={useCheckboxExamplesStore}
              storeKey="acceptTerms"
              label="Acepto términos y condiciones"
              description={`Estado: ${acceptTerms ? 'Aceptado' : 'No aceptado'}`}
            />

            <CheckBox
              $colorScheme="secondary"
              $store={useCheckboxExamplesStore}
              storeKey="newsletter"
              label="Newsletter semanal"
              description={`Estado: ${newsletter ? 'Suscrito' : 'No suscrito'}`}
            />

            <CheckBox
              $colorScheme="accent"
              $store={useCheckboxExamplesStore}
              storeKey="notifications"
              label="Notificaciones push"
              description={`Estado: ${notifications ? 'Activadas' : 'Desactivadas'}`}
            />

            <CheckBox
              $colorScheme="destructive"
              $store={useCheckboxExamplesStore}
              storeKey="marketing"
              label="Emails de marketing"
              description={`Estado: ${marketing ? 'Habilitado' : 'Deshabilitado'}`}
            />
          </div>
        </div>

        {/* Checkboxes Múltiples (Arrays) */}
        <div>
          <Label className="mb-3 block text-gray-700">
            Selección Múltiple - Intereses
          </Label>
          <div className="space-y-2">
            {[
              { value: 'web-development', label: 'Desarrollo Web' },
              { value: 'mobile-development', label: 'Desarrollo Móvil' },
              { value: 'data-science', label: 'Ciencia de Datos' },
              { value: 'ai-ml', label: 'IA y Machine Learning' },
            ].map(({ value, label }) => (
              <CheckBox
                key={value}
                $colorScheme="default"
                $size="sm"
                value={value}
                $store={useCheckboxExamplesStore}
                storeKey="interests"
                label={label}
              />
            ))}
          </div>
          <Text $size="xs" className="text-gray-500 mt-2">
            Seleccionados: {interests.join(', ') || 'Ninguno'}
          </Text>
        </div>

        <div>
          <Label className="mb-3 block text-gray-700">
            Selección Múltiple - Habilidades
          </Label>
          <div className="space-y-2">
            {[
              { value: 'javascript', label: 'JavaScript' },
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue.js' },
              { value: 'angular', label: 'Angular' },
            ].map(({ value, label }) => (
              <CheckBox
                key={value}
                $colorScheme="secondary"
                $size="sm"
                value={value}
                $store={useCheckboxExamplesStore}
                storeKey="skills"
                label={label}
              />
            ))}
          </div>
          <Text $size="xs" className="text-gray-500 mt-2">
            Seleccionadas: {skills.join(', ') || 'Ninguna'}
          </Text>
        </div>

        {/* Estado y Controles */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <Text $size="sm" $weight="medium">
            Estado del Store:
          </Text>
          <Text $size="sm" className="text-gray-600">
            Total checkboxes marcados: <strong>{getCheckedCount()}</strong>
          </Text>

          <Button
            $size="sm"
            $colorScheme="destructive"
            onClick={clearAllCheckboxes}
            className="w-full">
            Limpiar Todo
          </Button>
        </div>

        <div className="text-xs text-gray-500 bg-white p-3 rounded border">
          <p>
            <strong>💡 Patrón StoreKey:</strong>
          </p>
          <p>
            • Boolean:{' '}
            <code>$store={`{useStore}`} storeKey="propertyName"</code>
          </p>
          <p>
            • Array:{' '}
            <code>
              value="item" $store={`{useStore}`} storeKey="arrayProperty"
            </code>
          </p>
        </div>
      </Container>
    );
  },
};

// Demostración específica de colores theme.css
export const ThemeColorSchemes: Story = {
  render: () => {
    const store = useThemeColorDemoStore();
    const {
      defaultOption,
      secondaryOption,
      destructiveOption,
      accentOption,
      mutedOption,
      minimalOption,
      preferences,
      clearAll,
    } = store;

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold" className="mb-4">
          Esquemas de Color theme.css
        </Text>

        <div className="space-y-4">
          {/* Cada esquema de color */}
          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-indigo-700">
              Default (Primary) - hsl(245 65% 65%)
            </Text>
            <CheckBox
              $colorScheme="default"
              $store={useThemeColorDemoStore}
              storeKey="defaultOption"
              label="Opción principal del sistema"
              description={`Color indigo-lavanda • Estado: ${defaultOption ? 'Activo' : 'Inactivo'}`}
            />
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-cyan-700">
              Secondary - hsl(195 60% 55%)
            </Text>
            <CheckBox
              $colorScheme="secondary"
              $store={useThemeColorDemoStore}
              storeKey="secondaryOption"
              label="Opción secundaria"
              description={`Color turquesa pastel • Estado: ${secondaryOption ? 'Activo' : 'Inactivo'}`}
            />
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-red-700">
              Destructive - hsl(358 65% 58%)
            </Text>
            <CheckBox
              $colorScheme="destructive"
              $store={useThemeColorDemoStore}
              storeKey="destructiveOption"
              label="Acción destructiva"
              description={`Color coral suave • Estado: ${destructiveOption ? 'Activo' : 'Inactivo'}`}
            />
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-purple-700">
              Accent - hsl(270 50% 75%)
            </Text>
            <CheckBox
              $colorScheme="accent"
              $store={useThemeColorDemoStore}
              storeKey="accentOption"
              label="Elemento destacado"
              description={`Color violeta rosado • Estado: ${accentOption ? 'Activo' : 'Inactivo'}`}
            />
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
              Muted - hsl(215 16% 47%)
            </Text>
            <CheckBox
              $colorScheme="muted"
              $store={useThemeColorDemoStore}
              storeKey="mutedOption"
              label="Opción silenciada"
              description={`Color gris neutro • Estado: ${mutedOption ? 'Activo' : 'Inactivo'}`}
            />
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-900">
              Minimal - hsl(222 84% 5%)
            </Text>
            <CheckBox
              $colorScheme="minimal"
              $store={useThemeColorDemoStore}
              storeKey="minimalOption"
              label="Estilo minimalista"
              description={`Color foreground • Estado: ${minimalOption ? 'Activo' : 'Inactivo'}`}
            />
          </div>

          {/* Array ejemplo con diferentes colores */}
          <div>
            <Text $size="sm" $weight="medium" className="mb-3 text-gray-700">
              Múltiple - Preferencias de Diseño
            </Text>
            <div className="space-y-2">
              <CheckBox
                $colorScheme="default"
                value="theme-colors"
                $store={useThemeColorDemoStore}
                storeKey="preferences"
                label="Usar colores del tema"
              />
              <CheckBox
                $colorScheme="secondary"
                value="responsive-design"
                $store={useThemeColorDemoStore}
                storeKey="preferences"
                label="Diseño responsivo"
              />
              <CheckBox
                $colorScheme="accent"
                value="dark-mode"
                $store={useThemeColorDemoStore}
                storeKey="preferences"
                label="Modo oscuro"
              />
              <CheckBox
                $colorScheme="destructive"
                value="high-contrast"
                $store={useThemeColorDemoStore}
                storeKey="preferences"
                label="Alto contraste"
              />
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Seleccionadas: {preferences.join(', ') || 'Ninguna'}
            </Text>
          </div>
        </div>

        {/* Control de estado */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <Text $size="sm" $weight="medium" className="mb-2">
            Variables CSS del tema:
          </Text>
          <div className="text-xs text-gray-600 space-y-1">
            <p>--primary: 245 65% 65% (indigo-lavanda)</p>
            <p>--secondary: 195 60% 55% (turquesa pastel)</p>
            <p>--destructive: 358 65% 58% (coral suave)</p>
            <p>--accent: 270 50% 75% (violeta rosado)</p>
            <p>--muted-foreground: 215 16% 47% (gris neutro)</p>
            <p>--foreground: 222 84% 5% (casi negro)</p>
          </div>

          <Button
            $size="sm"
            $colorScheme="outline"
            onClick={clearAll}
            className="w-full mt-3">
            Limpiar Colores
          </Button>
        </div>

        <div className="text-xs text-gray-500 bg-white p-3 rounded border">
          <p>
            <strong>🎨 theme.css Integration:</strong>
          </p>
          <p>
            Todos los colores provienen de variables CSS definidas en theme.css,
            garantizando consistencia y soporte automático para modo oscuro.
          </p>
        </div>
      </Container>
    );
  },
};

// Ejemplo de estado indeterminado (funciona independiente del store)
export const IndeterminateExample: Story = {
  render: () => {
    const [parentChecked, setParentChecked] = React.useState(false);
    const [childStates, setChildStates] = React.useState([false, true, false]);

    const allChecked = childStates.every(Boolean);
    const someChecked = childStates.some(Boolean);
    const indeterminate = someChecked && !allChecked;

    React.useEffect(() => {
      setParentChecked(allChecked);
    }, [allChecked]);

    const handleParentChange = (checked: boolean) => {
      setParentChecked(checked);
      setChildStates([checked, checked, checked]);
    };

    const handleChildChange = (index: number, checked: boolean) => {
      const newStates = [...childStates];
      newStates[index] = checked;
      setChildStates(newStates);
    };

    return (
      <Container className="w-80">
        <Text as="h3" $weight="semibold" className="mb-4">
          Estado Indeterminado
        </Text>

        <div className="space-y-3">
          <CheckBox
            $colorScheme="default"
            label="Seleccionar todo"
            description="Marcar/desmarcar todas las opciones"
            checked={parentChecked}
            indeterminate={indeterminate}
            onChange={handleParentChange}
          />

          <div className="ml-6 space-y-2">
            <CheckBox
              $colorScheme="secondary"
              label="Opción 1"
              checked={childStates[0]}
              onChange={(checked) => handleChildChange(0, checked)}
            />
            <CheckBox
              $colorScheme="secondary"
              label="Opción 2"
              checked={childStates[1]}
              onChange={(checked) => handleChildChange(1, checked)}
            />
            <CheckBox
              $colorScheme="secondary"
              label="Opción 3"
              checked={childStates[2]}
              onChange={(checked) => handleChildChange(2, checked)}
            />
          </div>
        </div>

        <Text $size="sm" $colorScheme="muted" className="mt-4">
          El checkbox padre muestra estado indeterminado cuando algunos hijos
          están seleccionados
        </Text>
      </Container>
    );
  },
};

// Estados visuales básicos
export const States: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-4">
        Estados Visuales
      </Text>

      <div className="space-y-3">
        <CheckBox
          $colorScheme="default"
          label="Sin marcar"
          description="Estado normal"
        />
        <CheckBox
          $colorScheme="default"
          label="Marcado"
          description="Estado seleccionado"
          checked
        />
        <CheckBox
          $colorScheme="default"
          label="Indeterminado"
          description="Estado parcial"
          indeterminate
        />
        <CheckBox
          $colorScheme="muted"
          label="Deshabilitado"
          description="No interactivo"
          disabled
        />
        <CheckBox
          $colorScheme="muted"
          label="Deshabilitado marcado"
          description="No interactivo pero seleccionado"
          disabled
          checked
        />
      </div>

      <div className="flex gap-4 items-center mt-6">
        <Text $size="sm" className="text-gray-600">
          Tamaños:
        </Text>
        <CheckBox $colorScheme="default" $size="sm" checked />
        <CheckBox $colorScheme="default" $size="default" checked />
        <CheckBox $colorScheme="default" $size="lg" checked />
      </div>
    </Container>
  ),
};

