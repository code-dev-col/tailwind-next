import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';
import { useStatCardExamples } from '../../../../stores/statCardExamples.store';
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiTarget,
  FiShoppingCart,
  FiActivity,
} from 'react-icons/fi';

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/Cards/StatCard',
  component: StatCard,
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
      ],
    },
    $size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    $variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed', 'minimal'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 📊 Historia básica con configuración manual
export const Default: Story = {
  args: {
    title: 'Total de Ventas',
    value: '₡2,450,000',
    subtitle: 'Este mes',
    description: 'Comparado con el mes anterior',
    icon: FiDollarSign,
    trend: 'up',
    trendValue: '+12.5%',
    $showMeter: true,
    meterValue: 75,
    meterMax: 100,
    meterOptimum: 80,
    $showBadge: true,
    badgeText: 'Meta superada',
    $interactive: true,
  },
};

// 🎨 Esquemas de color
export const ColorSchemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <StatCard
        title="Ventas"
        value="₡2,450,000"
        icon={FiDollarSign}
        trend="up"
        trendValue="+12.5%"
        $colorScheme="default"
        $showMeter
        meterValue={75}
      />
      <StatCard
        title="Usuarios"
        value="12,458"
        icon={FiUsers}
        trend="up"
        trendValue="+8.3%"
        $colorScheme="secondary"
        $showMeter
        meterValue={64}
      />
      <StatCard
        title="Conversión"
        value="24.8%"
        icon={FiTarget}
        trend="up"
        trendValue="+4.1%"
        $colorScheme="accent"
        $showMeter
        meterValue={24.8}
      />
      <StatCard
        title="Sistema"
        value="98.7%"
        icon={FiActivity}
        trend="neutral"
        trendValue="0.0%"
        $colorScheme="muted"
        $showMeter
        meterValue={98.7}
      />
    </div>
  ),
};

// 📏 Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 w-full max-w-md">
      <StatCard
        title="Pequeño"
        value="₡1,250,000"
        icon={FiDollarSign}
        $size="sm"
        $showMeter
        meterValue={60}
      />
      <StatCard
        title="Predeterminado"
        value="₡2,450,000"
        icon={FiDollarSign}
        $size="default"
        $showMeter
        meterValue={75}
      />
      <StatCard
        title="Grande"
        value="₡3,680,000"
        icon={FiDollarSign}
        $size="lg"
        $showMeter
        meterValue={90}
      />
    </div>
  ),
};

// 🎭 Variantes
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
      <StatCard
        title="Default"
        value="₡2,450,000"
        subtitle="Este mes"
        description="Comparado con el mes anterior"
        icon={FiDollarSign}
        trend="up"
        trendValue="+12.5%"
        $variant="default"
        $showMeter
        meterValue={75}
      />
      <StatCard
        title="Compact"
        value="₡2,450,000"
        subtitle="Este mes"
        description="Información compacta pero completa"
        icon={FiDollarSign}
        trend="up"
        trendValue="+12.5%"
        $variant="compact"
        $showMeter
        meterValue={75}
        $showBadge
        badgeText="Compacto"
      />
      <StatCard
        title="Detailed"
        value="₡2,450,000"
        subtitle="Este mes"
        description="Comparado con el mes anterior, mostrando un crecimiento sostenido"
        icon={FiDollarSign}
        trend="up"
        trendValue="+12.5%"
        $variant="detailed"
        $showMeter
        meterValue={75}
        $showBadge
        badgeText="Excelente"
        onActionClick={() => alert('Ver más detalles')}
      />
      <StatCard
        title="Minimal con Info"
        value="₡2,450,000"
        subtitle="Sutil pero informativo"
        description="Diseño minimal con datos esenciales"
        icon={FiDollarSign}
        trend="neutral"
        trendValue="Estable"
        $variant="minimal"
        $colorScheme="minimal"
        $showMeter
        meterValue={75}
      />
    </div>
  ),
};

// 📈 Estados de tendencia
export const TrendStates: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
      <StatCard
        title="Tendencia Positiva"
        value="₡2,450,000"
        icon={FiTrendingUp}
        trend="up"
        trendValue="+12.5%"
        $colorScheme="default"
        $showMeter
        meterValue={85}
        meterOptimum={80}
        $showBadge
        badgeText="Excelente"
      />
      <StatCard
        title="Tendencia Negativa"
        value="₡1,890,000"
        icon={FiDollarSign}
        trend="down"
        trendValue="-5.2%"
        $colorScheme="destructive"
        $showMeter
        meterValue={45}
        meterOptimum={60}
        $showBadge
        badgeText="Atención"
      />
      <StatCard
        title="Estable"
        value="₡2,100,000"
        icon={FiDollarSign}
        trend="neutral"
        trendValue="0.0%"
        $colorScheme="muted"
        $showMeter
        meterValue={70}
        meterOptimum={70}
        $showBadge
        badgeText="Estable"
      />
    </div>
  ),
};

// 🏪 Dashboard de ejemplo
export const Dashboard: Story = {
  render: () => {
    const { dashboardStats } = useStatCardExamples();

    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
            $showMeter={stat.showMeter}
            meterValue={stat.meterValue}
            meterMax={stat.meterMax}
            meterOptimum={stat.meterOptimum}
            $showBadge={stat.showBadge}
            badgeText={stat.badgeText}
            $interactive={stat.interactive}
            $colorScheme={index % 2 === 0 ? 'default' : 'secondary'}
            onClick={() => console.log(`Clicked on ${stat.title}`)}
          />
        ))}
      </div>
    );
  },
};

// 🎯 Usando store - Ejemplo básico
export const WithStore: Story = {
  render: () => (
    <StatCard
      $store={useStatCardExamples}
      storeKey="basicExample"
      title="Desde Store"
      onClick={() => console.log('StatCard desde store clickeado')}
    />
  ),
};

// 🔄 Datos en tiempo real
export const RealTimeData: Story = {
  render: () => {
    const {
      revenueExample,
      usersExample,
      performanceExample,
      toggleSimulation,
      isSimulating,
    } = useStatCardExamples();

    return (
      <div className="space-y-4 w-full max-w-2xl">
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleSimulation}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            {isSimulating ? 'Detener Simulación' : 'Iniciar Simulación'}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <StatCard
            title={revenueExample.title}
            value={revenueExample.value}
            subtitle={revenueExample.subtitle}
            icon={revenueExample.icon}
            trend={revenueExample.trend}
            trendValue={revenueExample.trendValue}
            $showMeter
            meterValue={revenueExample.meterValue}
            meterMax={revenueExample.meterMax}
            meterOptimum={revenueExample.meterOptimum}
            $showBadge
            badgeText={revenueExample.badgeText}
            $colorScheme="default"
          />

          <StatCard
            title={usersExample.title}
            value={usersExample.value}
            subtitle={usersExample.subtitle}
            icon={usersExample.icon}
            trend={usersExample.trend}
            trendValue={usersExample.trendValue}
            $showMeter
            meterValue={usersExample.meterValue}
            meterMax={usersExample.meterMax}
            meterOptimum={usersExample.meterOptimum}
            $colorScheme="secondary"
          />

          <StatCard
            title={performanceExample.title}
            value={performanceExample.value}
            subtitle={performanceExample.subtitle}
            icon={performanceExample.icon}
            trend={performanceExample.trend}
            trendValue={performanceExample.trendValue}
            $showMeter
            meterValue={performanceExample.meterValue}
            meterMax={performanceExample.meterMax}
            meterOptimum={performanceExample.meterOptimum}
            $showBadge
            badgeText={performanceExample.badgeText}
            $colorScheme="accent"
          />
        </div>
      </div>
    );
  },
};

// 💼 Casos de uso específicos
export const UseCases: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 w-full max-w-3xl">
      {/* KPI Executive Dashboard */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Dashboard Ejecutivo</h3>
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            title="Ingresos"
            value="₡8.9M"
            trend="up"
            trendValue="+18.2%"
            icon={FiDollarSign}
            $size="sm"
            $variant="compact"
            $showMeter
            meterValue={89}
          />
          <StatCard
            title="Usuarios"
            value="12.4K"
            trend="up"
            trendValue="+8.3%"
            icon={FiUsers}
            $size="sm"
            $variant="compact"
            $colorScheme="secondary"
            $showMeter
            meterValue={64}
          />
          <StatCard
            title="Conversión"
            value="24.8%"
            trend="up"
            trendValue="+4.1%"
            icon={FiTarget}
            $size="sm"
            $variant="compact"
            $colorScheme="accent"
            $showMeter
            meterValue={25}
          />
          <StatCard
            title="Pedidos"
            value="3.2K"
            trend="down"
            trendValue="-2.1%"
            icon={FiShoppingCart}
            $size="sm"
            $variant="compact"
            $colorScheme="destructive"
            $showMeter
            meterValue={45}
          />
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Análisis Detallado</h3>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Rendimiento del Sistema"
            value="98.7%"
            subtitle="Uptime últimos 30 días"
            description="Disponibilidad del sistema con monitoreo 24/7 y alertas automáticas"
            icon={FiActivity}
            trend="neutral"
            trendValue="Estable"
            $variant="detailed"
            $showMeter
            meterValue={98.7}
            meterOptimum={99}
            $showBadge
            badgeText="Óptimo"
            onActionClick={() => alert('Ver métricas detalladas')}
          />
          <StatCard
            title="Satisfacción del Cliente"
            value="4.8/5"
            subtitle="Promedio de calificaciones"
            description="Basado en 1,247 reseñas de clientes en los últimos 30 días"
            icon={FiTarget}
            trend="up"
            trendValue="+0.3"
            $variant="detailed"
            $colorScheme="accent"
            $showMeter
            meterValue={96}
            meterOptimum={95}
            $showBadge
            badgeText="Excelente"
            onActionClick={() => alert('Ver reseñas detalladas')}
          />
        </div>
      </div>
    </div>
  ),
};

