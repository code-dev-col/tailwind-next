import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Dropdown } from './';
import { Container } from '../Container';
import { Button } from '../Button';
import { Text } from '../Text';
import { Label } from '../Label';
import { useDropdownExamplesStore } from '../../../stores/dropdownExamples.store';

const meta: Meta<typeof Dropdown> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    $colorScheme: {
      control: 'select',
      options: ['default', 'destructive', 'muted'],
      description: 'Variante visual del dropdown',
    },
    $size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'Tamaño del dropdown',
    },
    storeKey: {
      control: false,
      description: 'Clave interna usada por el patrón storeKey',
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
  render: () => (
    <Dropdown
      $store={useDropdownExamplesStore}
      storeKey="defaultDropdown"
      options={basicOptions}
      placeholder="Seleccionar opción..."
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-4 w-80">
      <div>
        <Label>Default</Label>
        <Dropdown
          $store={useDropdownExamplesStore}
          storeKey="variantDefault"
          options={basicOptions}
          placeholder="Dropdown por defecto"
        />
      </div>
      <div>
        <Label>Destructive</Label>
        <Dropdown
          $colorScheme="destructive"
          $store={useDropdownExamplesStore}
          storeKey="variantDestructive"
          options={basicOptions}
          placeholder="Dropdown con error"
        />
      </div>
      <div>
        <Label>Ghost</Label>
        <Dropdown
          $colorScheme="muted"
          $store={useDropdownExamplesStore}
          storeKey="variantGhost"
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
          $store={useDropdownExamplesStore}
          storeKey="sizeSm"
          options={basicOptions}
          placeholder="Dropdown pequeño"
        />
      </div>
      <div>
        <Label>Default</Label>
        <Dropdown
          $store={useDropdownExamplesStore}
          storeKey="sizeDefault"
          options={basicOptions}
          placeholder="Dropdown normal"
        />
      </div>
      <div>
        <Label>Large</Label>
        <Dropdown
          $size="lg"
          $store={useDropdownExamplesStore}
          storeKey="sizeLg"
          options={basicOptions}
          placeholder="Dropdown grande"
        />
      </div>
    </Container>
  ),
};

export const WithStoreKey: Story = {
  name: 'With Store Key',
  render: () => (
    <Container className="space-y-4 w-80">
      <Text as="h3" $weight="semibold">
        Dropdown conectado (storeKey)
      </Text>
      <div>
        <Label htmlFor="country-storekey">País</Label>
        <Dropdown
          id="country-storekey"
          $store={useDropdownExamplesStore}
          storeKey="country"
          options={countryOptions}
          placeholder="Seleccionar país"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          $colorScheme="default"
          onClick={() => useDropdownExamplesStore.getState().setCountry('es')}>
          Set España
        </Button>
        <Button
          onClick={() => useDropdownExamplesStore.getState().setCountry('')}>
          Clear
        </Button>
      </div>
      <Text $size="sm" $colorScheme="muted">
        Estado aislado mediante clave en un único store.
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
            $store={useDropdownExamplesStore}
            storeKey="formCountry"
            options={countryOptions}
            placeholder="Seleccionar país"
          />
        </div>

        <div>
          <Label htmlFor="language">Idioma</Label>
          <Dropdown
            id="language"
            $store={useDropdownExamplesStore}
            storeKey="formLanguage"
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
            $colorScheme="muted"
            $store={useDropdownExamplesStore}
            storeKey="formTimezone"
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
          <Button
            $colorScheme="default"
            onClick={() => {
              const s = useDropdownExamplesStore.getState();
              // Simulación submit
              console.log('Submit form values:', {
                country: s.formCountry,
                language: s.formLanguage,
                timezone: s.formTimezone,
              });
            }}>
            Guardar
          </Button>
          <Button
            $colorScheme="default"
            onClick={() =>
              useDropdownExamplesStore.getState().clearAllDropdowns()
            }>
            Limpiar
          </Button>
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
        <Dropdown
          $store={useDropdownExamplesStore}
          storeKey="stateNormal"
          options={basicOptions}
          placeholder="Dropdown normal"
        />
      </div>
      <div>
        <Label>Con valor seleccionado</Label>
        <Dropdown
          $store={useDropdownExamplesStore}
          storeKey="stateSelected"
          options={basicOptions}
          placeholder="Con valor"
        />
      </div>
      <div>
        <Label>Deshabilitado</Label>
        <Dropdown
          disabled
          $store={useDropdownExamplesStore}
          storeKey="stateDisabled"
          options={basicOptions}
          placeholder="Dropdown deshabilitado"
        />
      </div>
      <div>
        <Label>Con opciones deshabilitadas</Label>
        <Dropdown
          $store={useDropdownExamplesStore}
          storeKey="stateWithDisabledOptions"
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

