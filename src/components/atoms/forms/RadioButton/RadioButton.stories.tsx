import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioButton } from './RadioButton';
import { Container } from '../../layout/Container';
import { Button } from '../Button';
import { Text } from '../../Text';
import { Label } from '../Label';
import { useRadioButtonExamplesStore } from '../../../../stores/radioButtonExamples.store';

// Store simple para demostrar theme.css colors
import { create } from 'zustand';

interface ThemeColorRadioDemoStore {
  // Esquemas de color theme.css
  defaultChoice: string;
  setDefaultChoice: (value: string) => void;

  secondaryChoice: string;
  setSecondaryChoice: (value: string) => void;

  destructiveChoice: string;
  setDestructiveChoice: (value: string) => void;

  accentChoice: string;
  setAccentChoice: (value: string) => void;

  mutedChoice: string;
  setMutedChoice: (value: string) => void;

  minimalChoice: string;
  setMinimalChoice: (value: string) => void;

  // Grupo común para comparar esquemas
  colorSchemeComparison: string;
  setColorSchemeComparison: (value: string) => void;

  // Utilities
  clearAll: () => void;
}

const useThemeColorRadioDemoStore = create<ThemeColorRadioDemoStore>((set) => ({
  defaultChoice: 'option-2',
  setDefaultChoice: (value) => set({ defaultChoice: value }),

  secondaryChoice: 'option-1',
  setSecondaryChoice: (value) => set({ secondaryChoice: value }),

  destructiveChoice: 'option-3',
  setDestructiveChoice: (value) => set({ destructiveChoice: value }),

  accentChoice: 'option-2',
  setAccentChoice: (value) => set({ accentChoice: value }),

  mutedChoice: 'option-1',
  setMutedChoice: (value) => set({ mutedChoice: value }),

  minimalChoice: 'option-3',
  setMinimalChoice: (value) => set({ minimalChoice: value }),

  colorSchemeComparison: 'secondary',
  setColorSchemeComparison: (value) => set({ colorSchemeComparison: value }),

  clearAll: () =>
    set({
      defaultChoice: '',
      secondaryChoice: '',
      destructiveChoice: '',
      accentChoice: '',
      mutedChoice: '',
      minimalChoice: '',
      colorSchemeComparison: '',
    }),
}));

const meta: Meta<typeof RadioButton> = {
  title: 'Atoms/Forms/RadioButton',
  component: RadioButton,
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
      description: 'Tamaño del radio button',
    },
    value: {
      control: 'text',
      description: 'Valor del radio button (requerido)',
    },
    name: {
      control: 'text',
      description: 'Nombre del grupo de radio buttons',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del radio button',
    },
    description: {
      control: 'text',
      description: 'Descripción adicional',
    },
    checked: {
      control: 'boolean',
      description: 'Si el radio button está seleccionado',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el radio button está deshabilitado',
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
    name: 'example',
    value: 'option-1',
    label: 'Opción por defecto',
    description: 'Radio button básico con controles de Storybook',
    checked: false,
  },
};

// Store principal con diferentes tipos de grupos
export const WithStoreKey: Story = {
  render: () => {
    const store = useRadioButtonExamplesStore();
    const { preferences, method, privacy, frequency, delivery, clearAllRadio } =
      store;

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold" className="mb-4">
          Patrón StoreKey - RadioButton
        </Text>

        {/* Grupo de Preferencias */}
        <div>
          <Label className="mb-3 block text-gray-700">
            Frecuencia de Notificaciones
          </Label>
          <div className="space-y-3">
            {[
              {
                value: 'immediate',
                label: 'Inmediata',
                desc: 'Notificaciones instantáneas',
              },
              { value: 'daily', label: 'Diaria', desc: 'Resumen diario' },
              { value: 'weekly', label: 'Semanal', desc: 'Resumen semanal' },
              { value: 'never', label: 'Nunca', desc: 'Sin notificaciones' },
            ].map(({ value, label, desc }) => (
              <RadioButton
                key={value}
                $colorScheme="default"
                $store={useRadioButtonExamplesStore}
                storeKey="preferences"
                name="preferences"
                value={value}
                label={label}
                description={desc}
              />
            ))}
          </div>
          <Text $size="xs" className="text-gray-500 mt-2">
            Seleccionado: <strong>{preferences || 'Ninguno'}</strong>
          </Text>
        </div>

        {/* Grupo de Método */}
        <div>
          <Label className="mb-3 block text-gray-700">Método de Contacto</Label>
          <div className="space-y-3">
            {[
              {
                value: 'email',
                label: 'Email',
                desc: 'Notificaciones por correo',
              },
              { value: 'sms', label: 'SMS', desc: 'Mensajes de texto' },
              {
                value: 'phone',
                label: 'Teléfono',
                desc: 'Llamadas telefónicas',
              },
            ].map(({ value, label, desc }) => (
              <RadioButton
                key={value}
                $colorScheme="secondary"
                $store={useRadioButtonExamplesStore}
                storeKey="method"
                name="method"
                value={value}
                label={label}
                description={desc}
              />
            ))}
          </div>
          <Text $size="xs" className="text-gray-500 mt-2">
            Seleccionado: <strong>{method || 'Ninguno'}</strong>
          </Text>
        </div>

        {/* Grupo de Privacidad */}
        <div>
          <Label className="mb-3 block text-gray-700">
            Nivel de Privacidad
          </Label>
          <div className="space-y-3">
            {[
              { value: 'public', label: 'Público', desc: 'Visible para todos' },
              {
                value: 'friends',
                label: 'Amigos',
                desc: 'Solo amigos pueden ver',
              },
              { value: 'private', label: 'Privado', desc: 'Solo yo puedo ver' },
            ].map(({ value, label, desc }) => (
              <RadioButton
                key={value}
                $colorScheme="accent"
                $store={useRadioButtonExamplesStore}
                storeKey="privacy"
                name="privacy"
                value={value}
                label={label}
                description={desc}
              />
            ))}
          </div>
          <Text $size="xs" className="text-gray-500 mt-2">
            Seleccionado: <strong>{privacy || 'Ninguno'}</strong>
          </Text>
        </div>

        {/* Estado y Controles */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
          <Text $size="sm" $weight="medium">
            Estado del Store:
          </Text>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              • Frecuencia: <strong>{preferences || 'No seleccionado'}</strong>
            </p>
            <p>
              • Método: <strong>{method || 'No seleccionado'}</strong>
            </p>
            <p>
              • Privacidad: <strong>{privacy || 'No seleccionado'}</strong>
            </p>
            <p>
              • Frecuencia (form):{' '}
              <strong>{frequency || 'No seleccionado'}</strong>
            </p>
            <p>
              • Entrega (form): <strong>{delivery || 'No seleccionado'}</strong>
            </p>
          </div>

          <Button
            $size="sm"
            $colorScheme="destructive"
            onClick={clearAllRadio}
            className="w-full">
            Limpiar Todo
          </Button>
        </div>

        <div className="text-xs text-gray-500 bg-white p-3 rounded border">
          <p>
            <strong>💡 Patrón StoreKey para RadioButton:</strong>
          </p>
          <p>
            • Grupo único:{' '}
            <code>
              name="groupName" $store={`{useStore}`} storeKey="property"
            </code>
          </p>
          <p>
            • Cada radio tiene el mismo <code>name</code> y{' '}
            <code>storeKey</code>
          </p>
          <p>
            • Diferentes <code>value</code> para cada opción del grupo
          </p>
        </div>
      </Container>
    );
  },
};

// Demostración específica de colores theme.css
export const ThemeColorSchemes: Story = {
  render: () => {
    const store = useThemeColorRadioDemoStore();
    const {
      defaultChoice,
      secondaryChoice,
      destructiveChoice,
      accentChoice,
      mutedChoice,
      minimalChoice,
      colorSchemeComparison,
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
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3'].map((value) => (
                <RadioButton
                  key={value}
                  $colorScheme="default"
                  $store={useThemeColorRadioDemoStore}
                  storeKey="defaultChoice"
                  name="default-group"
                  value={value}
                  label={`Opción ${value.split('-')[1]}`}
                  description={`Estado: ${defaultChoice === value ? 'Seleccionado' : 'No seleccionado'}`}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Color indigo-lavanda • Seleccionado:{' '}
              <strong>{defaultChoice || 'Ninguno'}</strong>
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-cyan-700">
              Secondary - hsl(195 60% 55%)
            </Text>
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3'].map((value) => (
                <RadioButton
                  key={value}
                  $colorScheme="secondary"
                  $store={useThemeColorRadioDemoStore}
                  storeKey="secondaryChoice"
                  name="secondary-group"
                  value={value}
                  label={`Opción ${value.split('-')[1]}`}
                  description={`Estado: ${secondaryChoice === value ? 'Seleccionado' : 'No seleccionado'}`}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Color turquesa pastel • Seleccionado:{' '}
              <strong>{secondaryChoice || 'Ninguno'}</strong>
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-red-700">
              Destructive - hsl(358 65% 58%)
            </Text>
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3'].map((value) => (
                <RadioButton
                  key={value}
                  $colorScheme="destructive"
                  $store={useThemeColorRadioDemoStore}
                  storeKey="destructiveChoice"
                  name="destructive-group"
                  value={value}
                  label={`Opción ${value.split('-')[1]}`}
                  description={`Estado: ${destructiveChoice === value ? 'Seleccionado' : 'No seleccionado'}`}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Color coral suave • Seleccionado:{' '}
              <strong>{destructiveChoice || 'Ninguno'}</strong>
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-purple-700">
              Accent - hsl(270 50% 75%)
            </Text>
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3'].map((value) => (
                <RadioButton
                  key={value}
                  $colorScheme="accent"
                  $store={useThemeColorRadioDemoStore}
                  storeKey="accentChoice"
                  name="accent-group"
                  value={value}
                  label={`Opción ${value.split('-')[1]}`}
                  description={`Estado: ${accentChoice === value ? 'Seleccionado' : 'No seleccionado'}`}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Color violeta rosado • Seleccionado:{' '}
              <strong>{accentChoice || 'Ninguno'}</strong>
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-700">
              Muted - hsl(215 16% 47%)
            </Text>
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3'].map((value) => (
                <RadioButton
                  key={value}
                  $colorScheme="muted"
                  $store={useThemeColorRadioDemoStore}
                  storeKey="mutedChoice"
                  name="muted-group"
                  value={value}
                  label={`Opción ${value.split('-')[1]}`}
                  description={`Estado: ${mutedChoice === value ? 'Seleccionado' : 'No seleccionado'}`}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Color gris neutro • Seleccionado:{' '}
              <strong>{mutedChoice || 'Ninguno'}</strong>
            </Text>
          </div>

          <div>
            <Text $size="sm" $weight="medium" className="mb-2 text-gray-900">
              Minimal - hsl(222 84% 5%)
            </Text>
            <div className="space-y-2">
              {['option-1', 'option-2', 'option-3'].map((value) => (
                <RadioButton
                  key={value}
                  $colorScheme="minimal"
                  $store={useThemeColorRadioDemoStore}
                  storeKey="minimalChoice"
                  name="minimal-group"
                  value={value}
                  label={`Opción ${value.split('-')[1]}`}
                  description={`Estado: ${minimalChoice === value ? 'Seleccionado' : 'No seleccionado'}`}
                />
              ))}
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Color foreground • Seleccionado:{' '}
              <strong>{minimalChoice || 'Ninguno'}</strong>
            </Text>
          </div>

          {/* Comparación de esquemas en un solo grupo */}
          <div>
            <Text $size="sm" $weight="medium" className="mb-3 text-gray-700">
              Comparación - Diferentes Esquemas en un Grupo
            </Text>
            <div className="space-y-2">
              <RadioButton
                $colorScheme="default"
                $store={useThemeColorRadioDemoStore}
                storeKey="colorSchemeComparison"
                name="comparison-group"
                value="default"
                label="Default (Primary)"
                description="Esquema principal del sistema"
              />
              <RadioButton
                $colorScheme="secondary"
                $store={useThemeColorRadioDemoStore}
                storeKey="colorSchemeComparison"
                name="comparison-group"
                value="secondary"
                label="Secondary"
                description="Esquema secundario turquesa"
              />
              <RadioButton
                $colorScheme="accent"
                $store={useThemeColorRadioDemoStore}
                storeKey="colorSchemeComparison"
                name="comparison-group"
                value="accent"
                label="Accent"
                description="Esquema de acento violeta"
              />
              <RadioButton
                $colorScheme="destructive"
                $store={useThemeColorRadioDemoStore}
                storeKey="colorSchemeComparison"
                name="comparison-group"
                value="destructive"
                label="Destructive"
                description="Esquema para acciones destructivas"
              />
            </div>
            <Text $size="xs" className="text-gray-500 mt-2">
              Seleccionado:{' '}
              <strong>{colorSchemeComparison || 'Ninguno'}</strong>
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
            garantizando consistencia visual y soporte automático para modo
            oscuro.
          </p>
        </div>
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
        <RadioButton
          $colorScheme="default"
          name="states"
          value="normal"
          label="Sin seleccionar"
          description="Estado normal"
        />
        <RadioButton
          $colorScheme="default"
          name="states"
          value="selected"
          label="Seleccionado"
          description="Estado activo"
          checked
        />
        <RadioButton
          $colorScheme="muted"
          name="states"
          value="disabled"
          label="Deshabilitado"
          description="No interactivo"
          disabled
        />
        <RadioButton
          $colorScheme="muted"
          name="states"
          value="disabled-selected"
          label="Deshabilitado seleccionado"
          description="No interactivo pero seleccionado"
          disabled
          checked
        />
      </div>

      <div className="flex gap-4 items-center mt-6">
        <Text $size="sm" className="text-gray-600">
          Tamaños:
        </Text>
        <RadioButton
          $colorScheme="default"
          name="sizes"
          value="sm"
          $size="sm"
          checked
        />
        <RadioButton
          $colorScheme="default"
          name="sizes"
          value="default"
          $size="default"
          checked
        />
        <RadioButton
          $colorScheme="default"
          name="sizes"
          value="lg"
          $size="lg"
          checked
        />
      </div>
    </Container>
  ),
};

// Formulario completo de ejemplo
export const FormExample: Story = {
  render: () => {
    const store = useRadioButtonExamplesStore();
    const { frequency, delivery, clearAllRadio } = store;

    return (
      <Container
        $padding="p-6"
        $backgroundColor="bg-white"
        $borderRadius="rounded-lg"
        className="shadow-sm w-96">
        <Text as="h3" $size="lg" $weight="semibold" className="mb-4">
          Configuración de Notificaciones
        </Text>

        <div className="space-y-6">
          {/* Frecuencia */}
          <div>
            <Label className="mb-3 block">Frecuencia de notificaciones</Label>
            <div className="space-y-3">
              {[
                {
                  value: 'immediate',
                  label: 'Inmediata',
                  desc: 'Recibir notificaciones al instante',
                  scheme: 'default' as const,
                },
                {
                  value: 'daily',
                  label: 'Diaria',
                  desc: 'Resumen diario de notificaciones',
                  scheme: 'secondary' as const,
                },
                {
                  value: 'weekly',
                  label: 'Semanal',
                  desc: 'Resumen semanal de notificaciones',
                  scheme: 'accent' as const,
                },
                {
                  value: 'never',
                  label: 'Nunca',
                  desc: 'No recibir notificaciones',
                  scheme: 'destructive' as const,
                },
              ].map((option) => (
                <RadioButton
                  key={option.value}
                  $colorScheme={option.scheme}
                  $store={useRadioButtonExamplesStore}
                  storeKey="frequency"
                  name="frequency"
                  value={option.value}
                  label={option.label}
                  description={option.desc}
                />
              ))}
            </div>
          </div>

          {/* Método de entrega */}
          <div>
            <Label className="mb-3 block">Método de entrega</Label>
            <div className="space-y-3">
              {[
                {
                  value: 'email',
                  label: 'Email',
                  desc: 'Notificaciones por correo electrónico',
                },
                {
                  value: 'push',
                  label: 'Push',
                  desc: 'Notificaciones push en el dispositivo',
                },
                {
                  value: 'sms',
                  label: 'SMS',
                  desc: 'Mensajes de texto',
                },
              ].map((option) => (
                <RadioButton
                  key={option.value}
                  $colorScheme="secondary"
                  $store={useRadioButtonExamplesStore}
                  storeKey="delivery"
                  name="delivery"
                  value={option.value}
                  label={option.label}
                  description={option.desc}
                />
              ))}
            </div>
          </div>

          {/* Estado actual */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <Text $size="sm" $weight="medium" className="mb-2">
              Configuración actual:
            </Text>
            <Text $size="sm" className="text-gray-600">
              Frecuencia: <strong>{frequency || 'No seleccionado'}</strong>
              <br />
              Entrega: <strong>{delivery || 'No seleccionado'}</strong>
            </Text>
          </div>

          <div className="flex gap-2 pt-2">
            <Button $colorScheme="default">Guardar configuración</Button>
            <Button $colorScheme="outline" onClick={clearAllRadio}>
              Restablecer
            </Button>
          </div>
        </div>
      </Container>
    );
  },
};

