import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioButton } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Label } from '../Label';
import { useRadioButtonExamplesStore } from '../../../stores/radioButtonExamples.store';

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
    storeKey: {
      control: false,
      description: 'Clave usada con el patrón storeKey',
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
  render: () => (
    <RadioButton
      $store={useRadioButtonExamplesStore}
      storeKey="variantDefault"
      name="default-example"
      value="default"
      label="Opción por defecto"
      description="Esta es la descripción de la opción"
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold" className="mb-2">
        Variantes
      </Text>

      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="variantDefault"
        name="variant-example"
        value="default"
        label="Default"
        description="Radio button por defecto"
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="variantDestructive"
        name="variant-example"
        value="destructive"
        $variant="destructive"
        label="Destructive"
        description="Radio button con estilo destructivo"
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="variantGhost"
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
        $store={useRadioButtonExamplesStore}
        storeKey="sizeSm"
        name="size-example"
        value="small"
        $size="sm"
        label="Small"
        description="Radio button pequeño"
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="sizeDefault"
        name="size-example"
        value="default"
        label="Default"
        description="Radio button normal"
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="sizeLg"
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
    const s = useRadioButtonExamplesStore.getState();
    return (
      <Container className="space-y-6 w-96">
        <Text as="h3" $weight="semibold">
          Patrón StoreKey Avanzado
        </Text>
        <div>
          <Label className="mb-3 block">Preferencias de notificación</Label>
          <div className="space-y-2">
            {['immediate', 'daily', 'weekly'].map((val) => (
              <RadioButton
                key={val}
                $store={useRadioButtonExamplesStore}
                storeKey="preferences"
                name="preferences"
                value={val}
                label={
                  val === 'immediate'
                    ? 'Inmediata'
                    : val === 'daily'
                      ? 'Diaria'
                      : 'Semanal'
                }
                description={
                  val === 'immediate'
                    ? 'Notificaciones instantáneas'
                    : val === 'daily'
                      ? 'Resumen diario'
                      : 'Resumen semanal'
                }
              />
            ))}
          </div>
        </div>
        <div>
          <Label className="mb-3 block">Método de contacto</Label>
          <div className="space-y-2">
            {['email', 'sms', 'phone'].map((val) => (
              <RadioButton
                key={val}
                $store={useRadioButtonExamplesStore}
                storeKey="method"
                name="method"
                value={val}
                label={
                  val === 'email' ? 'Email' : val === 'sms' ? 'SMS' : 'Teléfono'
                }
                description={
                  val === 'email'
                    ? 'Notificaciones por correo'
                    : val === 'sms'
                      ? 'Mensajes de texto'
                      : 'Llamadas telefónicas'
                }
              />
            ))}
          </div>
        </div>
        <div>
          <Label className="mb-3 block">Configuración de privacidad</Label>
          <div className="space-y-2">
            {['public', 'friends', 'private'].map((val) => (
              <RadioButton
                key={val}
                $store={useRadioButtonExamplesStore}
                storeKey="privacy"
                name="privacy"
                value={val}
                label={
                  val === 'public'
                    ? 'Público'
                    : val === 'friends'
                      ? 'Amigos'
                      : 'Privado'
                }
                description={
                  val === 'public'
                    ? 'Visible para todos'
                    : val === 'friends'
                      ? 'Solo amigos pueden ver'
                      : 'Solo yo puedo ver'
                }
              />
            ))}
          </div>
        </div>
        <div className="bg-muted p-4 rounded-md">
          <Text $size="sm" $weight="medium" className="mb-2">
            Estado actual:
          </Text>
          <Text $size="sm" $variant="muted">
            Preferencias: {s.preferences}
            <br />
            Método: {s.method}
            <br />
            Privacidad: {s.privacy}
          </Text>
        </div>
        <Text $size="sm" $variant="muted">
          ✨ storeKey Pattern - un único store tipado, múltiples grupos.
        </Text>
      </Container>
    );
  },
};

// Legacy story eliminada (WithZustandStore) para mantener consistencia con la norma ($storeString deprecado)
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
            {[
              {
                value: 'immediate',
                label: 'Inmediata',
                desc: 'Recibir notificaciones al instante',
              },
              {
                value: 'daily',
                label: 'Diaria',
                desc: 'Resumen diario de notificaciones',
              },
              {
                value: 'weekly',
                label: 'Semanal',
                desc: 'Resumen semanal de notificaciones',
              },
              {
                value: 'never',
                label: 'Nunca',
                desc: 'No recibir notificaciones',
                variant: 'destructive',
              },
            ].map((o) => (
              <RadioButton
                key={o.value}
                $store={useRadioButtonExamplesStore}
                storeKey="frequency"
                name="frequency"
                value={o.value}
                $variant={o.variant as any}
                label={o.label}
                description={o.desc}
              />
            ))}
          </div>
        </div>

        {/* Tipo de notificación */}
        <div>
          <Label className="mb-3 block">Método de entrega</Label>
          <div className="space-y-2">
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
              { value: 'sms', label: 'SMS', desc: 'Mensajes de texto' },
            ].map((o) => (
              <RadioButton
                key={o.value}
                $store={useRadioButtonExamplesStore}
                storeKey="delivery"
                name="delivery"
                value={o.value}
                label={o.label}
                description={o.desc}
              />
            ))}
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
        $store={useRadioButtonExamplesStore}
        storeKey="stateNormal"
        name="states-example"
        value="normal"
        label="Normal"
        description="Radio button en estado normal"
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="stateChecked"
        name="states-example"
        value="checked"
        label="Seleccionado"
        description="Radio button seleccionado"
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="stateDisabled"
        name="states-example"
        value="disabled"
        label="Deshabilitado"
        description="Radio button deshabilitado"
        disabled
      />
      <RadioButton
        $store={useRadioButtonExamplesStore}
        storeKey="stateDisabledChecked"
        name="states-example"
        value="disabled-checked"
        label="Deshabilitado y seleccionado"
        description="Radio button deshabilitado pero seleccionado"
        disabled
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
        {['1', '2', '3', '4'].map((v) => (
          <RadioButton
            key={v}
            $store={useRadioButtonExamplesStore}
            storeKey="simple"
            name="simple"
            value={v}
            disabled={v === '4'}
          />
        ))}
      </div>

      <Text $size="sm" $variant="muted">
        Radio buttons sin etiquetas usando un único storeKey group
      </Text>
    </Container>
  ),
};

