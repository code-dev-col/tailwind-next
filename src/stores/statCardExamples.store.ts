import { create } from 'zustand';
import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiTarget,
  FiShoppingCart,
  FiActivity,
} from 'react-icons/fi';

interface StatCardExample {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  showMeter?: boolean;
  meterValue?: number;
  meterMax?: number;
  meterOptimum?: number;
  showBadge?: boolean;
  badgeText?: string;
  interactive?: boolean;
}

interface StatCardExamplesState {
  // Ejemplos básicos
  basicExample: StatCardExample;
  revenueExample: StatCardExample;
  usersExample: StatCardExample;
  conversionExample: StatCardExample;
  ordersExample: StatCardExample;
  performanceExample: StatCardExample;

  // Colecciones organizadas
  dashboardStats: StatCardExample[];
  financialMetrics: StatCardExample[];
  userMetrics: StatCardExample[];
  performanceMetrics: StatCardExample[];

  // Acciones para actualizar valores
  updateStat: (statId: string, updates: Partial<StatCardExample>) => void;
  simulateRealTimeData: () => void;
  resetStats: () => void;

  // Estado de simulación
  isSimulating: boolean;
  simulationInterval: number | null;
  toggleSimulation: () => void;
}

// Datos base para las estadísticas
const baseStats: Record<string, StatCardExample> = {
  basicExample: {
    id: 'basic',
    title: 'Total de Ventas',
    value: '₡2,450,000',
    subtitle: 'Este mes',
    description: 'Comparado con el mes anterior',
    icon: FiDollarSign,
    trend: 'up',
    trendValue: '+12.5%',
    showMeter: true,
    meterValue: 75,
    meterMax: 100,
    meterOptimum: 80,
    showBadge: true,
    badgeText: 'Meta superada',
    interactive: true,
  },
  revenueExample: {
    id: 'revenue',
    title: 'Ingresos Totales',
    value: '₡8,924,350',
    subtitle: 'Último trimestre',
    description: 'Crecimiento sostenido en los últimos 3 meses',
    icon: FiDollarSign,
    trend: 'up',
    trendValue: '+18.2%',
    showMeter: true,
    meterValue: 89,
    meterMax: 100,
    meterOptimum: 85,
    showBadge: true,
    badgeText: 'Excelente',
    interactive: true,
  },
  usersExample: {
    id: 'users',
    title: 'Usuarios Activos',
    value: '12,458',
    subtitle: 'Usuarios únicos',
    description: 'Registrados en los últimos 30 días',
    icon: FiUsers,
    trend: 'up',
    trendValue: '+8.3%',
    showMeter: true,
    meterValue: 64,
    meterMax: 100,
    meterOptimum: 70,
    showBadge: false,
    interactive: true,
  },
  conversionExample: {
    id: 'conversion',
    title: 'Tasa de Conversión',
    value: '24.8%',
    subtitle: 'Conversiones',
    description: 'De visitantes a clientes registrados',
    icon: FiTarget,
    trend: 'up',
    trendValue: '+4.1%',
    showMeter: true,
    meterValue: 24.8,
    meterMax: 100,
    meterOptimum: 25,
    showBadge: true,
    badgeText: 'Objetivo cerca',
    interactive: true,
  },
  ordersExample: {
    id: 'orders',
    title: 'Pedidos Completados',
    value: '3,247',
    subtitle: 'Este mes',
    description: 'Pedidos procesados y entregados exitosamente',
    icon: FiShoppingCart,
    trend: 'down',
    trendValue: '-2.1%',
    showMeter: true,
    meterValue: 45,
    meterMax: 100,
    meterOptimum: 60,
    showBadge: true,
    badgeText: 'Por debajo',
    interactive: true,
  },
  performanceExample: {
    id: 'performance',
    title: 'Rendimiento del Sistema',
    value: '98.7%',
    subtitle: 'Uptime',
    description: 'Disponibilidad en los últimos 30 días',
    icon: FiActivity,
    trend: 'neutral',
    trendValue: '0.0%',
    showMeter: true,
    meterValue: 98.7,
    meterMax: 100,
    meterOptimum: 99,
    showBadge: true,
    badgeText: 'Estable',
    interactive: true,
  },
};

export const useStatCardExamples = create<StatCardExamplesState>(
  (set, get) => ({
    // Ejemplos individuales
    basicExample: baseStats.basicExample,
    revenueExample: baseStats.revenueExample,
    usersExample: baseStats.usersExample,
    conversionExample: baseStats.conversionExample,
    ordersExample: baseStats.ordersExample,
    performanceExample: baseStats.performanceExample,

    // Colecciones organizadas
    dashboardStats: [
      baseStats.revenueExample,
      baseStats.usersExample,
      baseStats.conversionExample,
      baseStats.ordersExample,
    ],
    financialMetrics: [
      baseStats.revenueExample,
      {
        ...baseStats.basicExample,
        title: 'Ganancias Netas',
        value: '₡1,245,000',
      },
      { ...baseStats.conversionExample, title: 'ROI', value: '156%' },
    ],
    userMetrics: [
      baseStats.usersExample,
      {
        ...baseStats.usersExample,
        title: 'Nuevos Usuarios',
        value: '2,847',
        trendValue: '+15.2%',
      },
      {
        ...baseStats.usersExample,
        title: 'Usuarios Recurrentes',
        value: '9,611',
        trendValue: '+3.8%',
      },
    ],
    performanceMetrics: [
      baseStats.performanceExample,
      {
        ...baseStats.performanceExample,
        title: 'Tiempo de Carga',
        value: '1.2s',
        meterValue: 85,
      },
      {
        ...baseStats.performanceExample,
        title: 'Errores',
        value: '0.3%',
        trend: 'down',
        trendValue: '-0.1%',
      },
    ],

    // Acciones
    updateStat: (statId: string, updates: Partial<StatCardExample>) => {
      set((state) => {
        const updatedState = { ...state };

        // Buscar y actualizar el stat correspondiente
        Object.keys(updatedState).forEach((key) => {
          const value = updatedState[key as keyof StatCardExamplesState];
          if (
            value &&
            typeof value === 'object' &&
            'id' in value &&
            (value as StatCardExample).id === statId
          ) {
            (updatedState[key as keyof StatCardExamplesState] as any) = {
              ...value,
              ...updates,
            };
          }
        });

        return updatedState;
      });
    },

    simulateRealTimeData: () => {
      const state = get();
      const stats = [
        'revenueExample',
        'usersExample',
        'conversionExample',
        'ordersExample',
        'performanceExample',
      ];

      stats.forEach((statKey) => {
        const stat = state[
          statKey as keyof StatCardExamplesState
        ] as StatCardExample;
        if (stat && typeof stat.meterValue === 'number') {
          const variation = (Math.random() - 0.5) * 10; // ±5% variation
          const newValue = Math.max(
            0,
            Math.min(100, stat.meterValue + variation)
          );
          const trend =
            variation > 0 ? 'up' : variation < 0 ? 'down' : 'neutral';
          const trendValue = `${variation > 0 ? '+' : ''}${variation.toFixed(
            1
          )}%`;

          get().updateStat(stat.id, {
            meterValue: newValue,
            trend,
            trendValue,
          });
        }
      });
    },

    resetStats: () => {
      set({
        basicExample: baseStats.basicExample,
        revenueExample: baseStats.revenueExample,
        usersExample: baseStats.usersExample,
        conversionExample: baseStats.conversionExample,
        ordersExample: baseStats.ordersExample,
        performanceExample: baseStats.performanceExample,
        isSimulating: false,
        simulationInterval: null,
      });
    },

    // Simulación en tiempo real
    isSimulating: false,
    simulationInterval: null,

    toggleSimulation: () => {
      const { isSimulating, simulationInterval } = get();

      if (isSimulating && simulationInterval) {
        clearInterval(simulationInterval);
        set({ isSimulating: false, simulationInterval: null });
      } else {
        const interval = setInterval(() => {
          get().simulateRealTimeData();
        }, 2000) as any;

        set({ isSimulating: true, simulationInterval: interval });
      }
    },
  })
);

