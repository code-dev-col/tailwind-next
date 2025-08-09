import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Label } from '../Label';

const meta: Meta<typeof Dropdown> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $variant: {
      control: 'select',
      options: ['default', 'destructive', 'ghost'],
      description: 'Variante visual del dropdown',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamaño del dropdown',
    },
    $store: {
      control: 'text',
      description: 'Nombre del store de Zustand para manejo de estado',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el dropdown está deshabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Opción 1' },
  { value: 'option2', label: 'Opción 2' },
  { value: 'option3', label: 'Opción 3' },
];

const countryOptions = [
  { value: 'es', label: 'España' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'fr', label: 'Francia' },
  { value: 'de', label: 'Alemania' },
  { value: 'it', label: 'Italia' },
  { value: 'uk', label: 'Reino Unido' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Seleccionar opción...',
  },
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Default</Label>
        <Dropdown options={basicOptions} placeholder="Dropdown por defecto" />
      </div>
      <div>
        <Label>Destructive</Label>
        <Dropdown
          $variant="destructive"
          options={basicOptions}
          placeholder="Dropdown con error"
        />
      </div>
      <div>
        <Label>Ghost</Label>
        <Dropdown
          $variant="ghost"
          options={basicOptions}
          placeholder="Dropdown transparente"
        />
      </div>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Small</Label>
        <Dropdown
          $size="sm"
          options={basicOptions}
          placeholder="Dropdown pequeño"
        />
      </div>
      <div>
        <Label>Default</Label>
        <Dropdown options={basicOptions} placeholder="Dropdown normal" />
      </div>
      <div>
        <Label>Large</Label>
        <Dropdown
          $size="lg"
          options={basicOptions}
          placeholder="Dropdown grande"
        />
      </div>
    </Container>
  ),
};

export const WithZustandStore: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold">
        Dropdown conectado a Zustand Store
      </Text>
      <div>
        <Label htmlFor="zustand-dropdown">País</Label>
        <Dropdown
          id="zustand-dropdown"
          $storeString="exampleDropdownStore"
          options={countryOptions}
          placeholder="Seleccionar país"
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
        Configuración de Usuario
      </Text>

      <div className="space-y-4">
        <div>
          <Label htmlFor="country">País</Label>
          <Dropdown
            id="country"
            options={countryOptions}
            placeholder="Seleccionar país"
          />
        </div>

        <div>
          <Label htmlFor="language">Idioma</Label>
          <Dropdown
            id="language"
            options={[
              { value: 'es', label: 'Español' },
              { value: 'en', label: 'English' },
              { value: 'fr', label: 'Français' },
              { value: 'de', label: 'Deutsch' },
            ]}
            placeholder="Seleccionar idioma"
          />
        </div>

        <div>
          <Label htmlFor="timezone">Zona horaria</Label>
          <Dropdown
            id="timezone"
            $variant="ghost"
            options={[
              { value: 'utc-3', label: 'UTC-3 (Buenos Aires)' },
              { value: 'utc-2', label: 'UTC-2 (Brasília)' },
              { value: 'utc+1', label: 'UTC+1 (Madrid)' },
              { value: 'utc+2', label: 'UTC+2 (Berlin)' },
            ]}
            placeholder="Seleccionar zona horaria"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button $variant="default">Guardar</Button>
          <Button $variant="outline">Cancelar</Button>
        </div>
      </div>
    </Container>
  ),
};

export const States: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Normal</Label>
        <Dropdown options={basicOptions} placeholder="Dropdown normal" />
      </div>
      <div>
        <Label>Con valor seleccionado</Label>
        <Dropdown options={basicOptions} value="option2" />
      </div>
      <div>
        <Label>Deshabilitado</Label>
        <Dropdown
          disabled
          options={basicOptions}
          placeholder="Dropdown deshabilitado"
        />
      </div>
      <div>
        <Label>Con opciones deshabilitadas</Label>
        <Dropdown
          options={[
            { value: 'option1', label: 'Opción disponible' },
            { value: 'option2', label: 'Opción deshabilitada', disabled: true },
            { value: 'option3', label: 'Otra opción disponible' },
          ]}
          placeholder="Algunas opciones deshabilitadas"
        />
      </div>
    </Container>
  ),
};

