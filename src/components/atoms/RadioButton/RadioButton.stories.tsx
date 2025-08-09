import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioButton } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Label } from '../Label';

// Store de ejemplo para el patrón storeKey avanzado
import { create } from 'zustand';

interface DemoFormStore {
  preferences: string;
  setPreferences: (value: string) => void;
  method: string;
  setMethod: (value: string) => void;
  privacy: string;
  setPrivacy: (value: string) => void;
}

const useDemoFormStore = create<DemoFormStore>((set) => ({
  preferences: 'daily',
  setPreferences: (value) => set({ preferences: value }),
  method: 'email',
  setMethod: (value) => set({ method: value }),
  privacy: 'friends',
  setPrivacy: (value) => set({ privacy: value }),
}));

const meta: Meta<typeof RadioButton> = {
  title: 'Atoms/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: ['default', 'destructive', 'ghost'],
      description: 'Variante visual del radio button',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamaño del radio button',
    },
    $store: {
      control: 'text',
      description: 'Nombre del store de Zustand para manejo de estado',
    },
    value: {
      control: 'text',
      description: 'Valor del radio button',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del radio button',
    },
    description: {
      control: 'text',
      description: 'Descripción adicional',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el radio button está deshabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'default',
    label: 'Opción por defecto',
    description: 'Esta es la descripción de la opción',
  },
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Variantes
      </Text>

      <RadioButton
        name="variant-example"
        value="default"
        label="Default"
        description="Radio button por defecto"
      />
      <RadioButton
        name="variant-example"
        value="destructive"
        $variant="destructive"
        label="Destructive"
        description="Radio button con estilo destructivo"
      />
      <RadioButton
        name="variant-example"
        value="ghost"
        $variant="ghost"
        label="Ghost"
        description="Radio button con estilo transparente"
      />
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Tamaños
      </Text>

      <RadioButton
        name="size-example"
        value="small"
        $size="sm"
        label="Small"
        description="Radio button pequeño"
      />
      <RadioButton
        name="size-example"
        value="default"
        label="Default"
        description="Radio button normal"
      />
      <RadioButton
        name="size-example"
        value="large"
        $size="lg"
        label="Large"
        description="Radio button grande"
      />
    </Container>
  ),
};

export const WithStoreKeyPattern: Story = {
  render: () => {
    const preferences = useDemoFormStore((state) => state.preferences);
    const method = useDemoFormStore((state) => state.method);
    const privacy = useDemoFormStore((state) => state.privacy);

    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold">
          Patrón StoreKey Avanzado
        </Text>

        {/* Preferencias de notificación */}
        <div>
          <Label className="mb-3 block">Preferencias de notificación</Label>
          <div className="space-y-2">
            <RadioButton
              $store={useDemoFormStore}
              storeKey="preferences"
              name="preferences"
              value="immediate"
              label="Inmediata"
              description="Notificaciones instantáneas"
            />
            <RadioButton
              $store={useDemoFormStore}
              storeKey="preferences"
              name="preferences"
              value="daily"
              label="Diaria"
              description="Resumen diario"
            />
            <RadioButton
              $store={useDemoFormStore}
              storeKey="preferences"
              name="preferences"
              value="weekly"
              label="Semanal"
              description="Resumen semanal"
            />
          </div>
        </div>

        {/* Método de contacto */}
        <div>
          <Label className="mb-3 block">Método de contacto</Label>
          <div className="space-y-2">
            <RadioButton
              $store={useDemoFormStore}
              storeKey="method"
              name="method"
              value="email"
              label="Email"
              description="Notificaciones por correo"
            />
            <RadioButton
              $store={useDemoFormStore}
              storeKey="method"
              name="method"
              value="sms"
              label="SMS"
              description="Mensajes de texto"
            />
            <RadioButton
              $store={useDemoFormStore}
              storeKey="method"
              name="method"
              value="phone"
              label="Teléfono"
              description="Llamadas telefónicas"
            />
          </div>
        </div>

        {/* Configuración de privacidad */}
        <div>
          <Label className="mb-3 block">Configuración de privacidad</Label>
          <div className="space-y-2">
            <RadioButton
              $store={useDemoFormStore}
              storeKey="privacy"
              name="privacy"
              value="public"
              label="Público"
              description="Visible para todos"
            />
            <RadioButton
              $store={useDemoFormStore}
              storeKey="privacy"
              name="privacy"
              value="friends"
              label="Amigos"
              description="Solo amigos pueden ver"
            />
            <RadioButton
              $store={useDemoFormStore}
              storeKey="privacy"
              name="privacy"
              value="private"
              label="Privado"
              description="Solo yo puedo ver"
            />
          </div>
        </div>

        {/* Estado actual */}
        <div className="bg-muted p-4 rounded-md">
          <Text $size="sm" $weight="medium" className="mb-2">
            Estado actual:
          </Text>
          <Text $size="sm" $variant="muted">
            Preferencias: {preferences}
            <br />
            Método: {method}
            <br />
            Privacidad: {privacy}
          </Text>
        </div>

        <Text $size="sm" $variant="muted">
          ✨ Usando patrón:{' '}
          <code>$store={`{useStore}`} storeKey="propertyName"</code>
        </Text>
      </Container>
    );
  },
};

export const WithZustandStore: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold">
        Radio Buttons conectados a Zustand Store (Legacy)
      </Text>

      <div className="space-y-2">
        <RadioButton
          $storeString="exampleRadioStore"
          name="size-preference"
          value="small"
          label="Pequeño"
          description="Tamaño compacto"
        />
        <RadioButton
          $storeString="exampleRadioStore"
          name="size-preference"
          value="medium"
          label="Mediano"
          description="Tamaño estándar"
        />
        <RadioButton
          $storeString="exampleRadioStore"
          name="size-preference"
          value="large"
          label="Grande"
          description="Tamaño amplio"
        />
      </div>

      <Text $size="sm" $variant="muted">
        La selección se sincroniza automáticamente con el store
      </Text>
    </Container>
  ),
};
export const FormExample: Story = {
  render: () => (
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
          <div className="space-y-2">
            <RadioButton
              name="frequency"
              value="immediate"
              label="Inmediata"
              description="Recibir notificaciones al instante"
            />
            <RadioButton
              name="frequency"
              value="daily"
              label="Diaria"
              description="Resumen diario de notificaciones"
              checked
            />
            <RadioButton
              name="frequency"
              value="weekly"
              label="Semanal"
              description="Resumen semanal de notificaciones"
            />
            <RadioButton
              name="frequency"
              value="never"
              $variant="destructive"
              label="Nunca"
              description="No recibir notificaciones"
            />
          </div>
        </div>

        {/* Tipo de notificación */}
        <div>
          <Label className="mb-3 block">Método de entrega</Label>
          <div className="space-y-2">
            <RadioButton
              name="delivery"
              value="email"
              label="Email"
              description="Notificaciones por correo electrónico"
            />
            <RadioButton
              name="delivery"
              value="push"
              label="Push"
              description="Notificaciones push en el dispositivo"
            />
            <RadioButton
              name="delivery"
              value="sms"
              label="SMS"
              description="Mensajes de texto"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button $variant="default">Guardar configuración</Button>
          <Button $variant="outline">Restablecer</Button>
        </div>
      </div>
    </Container>
  ),
};

export const States: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Estados
      </Text>

      <RadioButton
        name="states-example"
        value="normal"
        label="Normal"
        description="Radio button en estado normal"
      />
      <RadioButton
        name="states-example"
        value="checked"
        label="Seleccionado"
        description="Radio button seleccionado"
        checked
      />
      <RadioButton
        name="states-example"
        value="disabled"
        label="Deshabilitado"
        description="Radio button deshabilitado"
        disabled
      />
      <RadioButton
        name="states-example"
        value="disabled-checked"
        label="Deshabilitado y seleccionado"
        description="Radio button deshabilitado pero seleccionado"
        disabled
        checked
      />
    </Container>
  ),
};

export const WithoutLabels: Story = {
  render: () => (
    <Container className="space-y-4">
      <Text as="h3" $weight="semibold" className="mb-2">
        Sin etiquetas
      </Text>

      <div className="flex gap-4 items-center">
        <RadioButton name="simple" value="1" />
        <RadioButton name="simple" value="2" />
        <RadioButton name="simple" value="3" checked />
        <RadioButton name="simple" value="4" disabled />
      </div>

      <Text $size="sm" $variant="muted">
        Radio buttons sin etiquetas para casos de uso específicos
      </Text>
    </Container>
  ),
};

