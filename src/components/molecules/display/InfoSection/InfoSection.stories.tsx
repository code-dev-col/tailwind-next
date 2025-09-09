import type { Meta, StoryObj } from '@storybook/react';
import { InfoSection } from './InfoSection';
import { useInfoSectionExamples } from '../../../../stores/infoSectionExamples.store';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
} from 'react-icons/fi';

const meta: Meta<typeof InfoSection> = {
  title: 'Molecules/Display/InfoSection',
  component: InfoSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Datos de ejemplo
const userData = [
  { label: 'Nombre', value: 'Juan Pérez', icon: FiUser },
  { label: 'Email', value: 'juan@example.com', icon: FiMail },
  { label: 'Teléfono', value: '+57 300 123 4567', icon: FiPhone },
  { label: 'Ubicación', value: 'Bogotá, Colombia', icon: FiMapPin },
];

const projectData = [
  {
    label: 'Estado',
    value: 'En progreso',
    badge: 'Activo',
    $colorScheme: 'success' as const,
  },
  { label: 'Fecha inicio', value: '15 Mar 2024', icon: FiCalendar },
  { label: 'Presupuesto', value: '$25,000', icon: FiDollarSign },
  {
    label: 'Progreso',
    value: '75%',
    icon: FiTrendingUp,
    badge: 'On track',
    $colorScheme: 'accent' as const,
  },
];

const statsData = [
  {
    label: 'Usuarios activos',
    value: '1,234',
    icon: FiActivity,
    badge: '+12%',
    $colorScheme: 'success' as const,
  },
  {
    label: 'Ingresos',
    value: '$45,678',
    icon: FiDollarSign,
    badge: '+8%',
    $colorScheme: 'success' as const,
  },
  {
    label: 'Conversión',
    value: '3.2%',
    icon: FiTrendingUp,
    badge: '-2%',
    $colorScheme: 'destructive' as const,
  },
];

export const Default: Story = {
  render: () => (
    <InfoSection
      $store={useInfoSectionExamples}
      storeKey="defaultExample"
      title="Información de Usuario"
      description="Datos básicos del perfil de usuario"
      data={userData}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InfoSection
        $variant="default"
        title="Variante Default"
        description="Layout estándar con 2 columnas"
        data={userData}
      />
      <InfoSection
        $variant="compact"
        title="Variante Compact"
        description="Layout compacto de 1 columna"
        data={userData}
      />
      <InfoSection
        $variant="detailed"
        title="Variante Detailed"
        description="Layout detallado con más espaciado"
        data={userData}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <InfoSection
        $size="sm"
        title="Tamaño Small"
        description="Compact size for dense layouts"
        data={userData.slice(0, 2)}
      />
      <InfoSection
        $size="default"
        title="Tamaño Default"
        description="Standard size for most use cases"
        data={userData}
      />
      <InfoSection
        $size="lg"
        title="Tamaño Large"
        description="Large size for prominent sections"
        data={userData}
      />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <InfoSection
        $colorScheme="default"
        title="Default"
        description="Esquema neutro por defecto"
        data={userData.slice(0, 2)}
      />
      <InfoSection
        $colorScheme="secondary"
        title="Secondary"
        description="Esquema secundario turquesa"
        data={userData.slice(0, 2)}
      />
      <InfoSection
        $colorScheme="accent"
        title="Accent"
        description="Esquema de acentos violeta"
        data={userData.slice(0, 2)}
      />
      <InfoSection
        $colorScheme="destructive"
        title="Destructive"
        description="Para errores y acciones críticas"
        data={userData.slice(0, 2)}
      />
    </div>
  ),
};

export const WithProjectData: Story = {
  args: {
    title: 'Estado del Proyecto',
    description: 'Información detallada del proyecto actual',
    data: projectData,
    $colorScheme: 'accent',
  },
};

export const WithStatistics: Story = {
  args: {
    title: 'Métricas del Dashboard',
    description: 'Indicadores clave de rendimiento',
    data: statsData,
    $size: 'lg',
    $variant: 'detailed',
  },
};

export const Interactive: Story = {
  render: () => {
    const handleClick = () => alert('InfoSection clicked!');
    const handleDataClick = (item: any, index: number) =>
      alert(
        `Data item clicked: ${item.label} = ${item.value} (index: ${index})`
      );

    return (
      <div className="space-y-6">
        <InfoSection
          title="Sección Clickeable"
          description="Toda la sección es interactiva"
          data={userData.slice(0, 2)}
          onClick={handleClick}
          $colorScheme="secondary"
        />

        <InfoSection
          title="Items Clickeables"
          description="Cada item de datos es clickeable"
          data={projectData}
          onDataItemClick={handleDataClick}
          $colorScheme="accent"
        />
      </div>
    );
  },
};

export const WithoutSeparator: Story = {
  args: {
    title: 'Sin Separador',
    description: 'Diseño más fluido sin línea separadora',
    data: userData,
    showSeparator: false,
    $colorScheme: 'muted',
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'Solo Título',
    data: userData.slice(0, 3),
    $variant: 'compact',
  },
};

export const OnlyData: Story = {
  args: {
    title: '',
    data: statsData,
    showSeparator: false,
    $size: 'sm',
  },
};

