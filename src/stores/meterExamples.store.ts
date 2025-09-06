import { create } from 'zustand';

interface MeterExamplesState {
  // Estados básicos para ejemplos
  batteryLevel: number;
  cpuUsage: number;
  memoryUsage: number;
  diskSpace: number;

  // Estados para métricas de rendimiento
  performanceScore: number;
  loadTime: number;
  responseTime: number;
  throughput: number;

  // Estados para scores y ratings
  userRating: number;
  testScore: number;
  completionRate: number;
  satisfactionLevel: number;

  // Estados para niveles y progress
  skillLevel: number;
  experiencePoints: number;
  healthPoints: number;
  energyLevel: number;

  // Estados para métricas de negocio
  salesTarget: number;
  customerSatisfaction: number;
  marketShare: number;
  growthRate: number;

  // Estados de configuración
  minValue: number;
  maxValue: number;
  lowThreshold: number;
  highThreshold: number;
  optimumValue: number;

  // Setters básicos
  setBatteryLevel: (value: number) => void;
  setCpuUsage: (value: number) => void;
  setMemoryUsage: (value: number) => void;
  setDiskSpace: (value: number) => void;

  // Setters de rendimiento
  setPerformanceScore: (value: number) => void;
  setLoadTime: (value: number) => void;
  setResponseTime: (value: number) => void;
  setThroughput: (value: number) => void;

  // Setters de scores
  setUserRating: (value: number) => void;
  setTestScore: (value: number) => void;
  setCompletionRate: (value: number) => void;
  setSatisfactionLevel: (value: number) => void;

  // Setters de niveles
  setSkillLevel: (value: number) => void;
  setExperiencePoints: (value: number) => void;
  setHealthPoints: (value: number) => void;
  setEnergyLevel: (value: number) => void;

  // Setters de negocio
  setSalesTarget: (value: number) => void;
  setCustomerSatisfaction: (value: number) => void;
  setMarketShare: (value: number) => void;
  setGrowthRate: (value: number) => void;

  // Setters de configuración
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  setLowThreshold: (value: number) => void;
  setHighThreshold: (value: number) => void;
  setOptimumValue: (value: number) => void;

  // Utilidades
  clearAllMeter: () => void;
  resetToDefaults: () => void;
  incrementBattery: () => void;
  decrementBattery: () => void;
  randomizeValues: () => void;
  simulateRealTimeData: () => void;

  // Funciones de simulación
  simulateSystemLoad: () => void;
  simulateUserActivity: () => void;
  simulateBusinessMetrics: () => void;
  loadSampleData: () => void;
}

export const useMeterExamples = create<MeterExamplesState>((set, get) => ({
  // Estados iniciales básicos
  batteryLevel: 75,
  cpuUsage: 45,
  memoryUsage: 62,
  diskSpace: 80,

  // Estados de rendimiento
  performanceScore: 87,
  loadTime: 2.3,
  responseTime: 150,
  throughput: 1250,

  // Estados de scores
  userRating: 4.2,
  testScore: 85,
  completionRate: 78,
  satisfactionLevel: 91,

  // Estados de niveles
  skillLevel: 7,
  experiencePoints: 2850,
  healthPoints: 85,
  energyLevel: 60,

  // Estados de negocio
  salesTarget: 92,
  customerSatisfaction: 88,
  marketShare: 15,
  growthRate: 125,

  // Configuración
  minValue: 0,
  maxValue: 100,
  lowThreshold: 30,
  highThreshold: 70,
  optimumValue: 80,

  // Setters básicos
  setBatteryLevel: (value) => set({ batteryLevel: value }),
  setCpuUsage: (value) => set({ cpuUsage: value }),
  setMemoryUsage: (value) => set({ memoryUsage: value }),
  setDiskSpace: (value) => set({ diskSpace: value }),

  // Setters de rendimiento
  setPerformanceScore: (value) => set({ performanceScore: value }),
  setLoadTime: (value) => set({ loadTime: value }),
  setResponseTime: (value) => set({ responseTime: value }),
  setThroughput: (value) => set({ throughput: value }),

  // Setters de scores
  setUserRating: (value) => set({ userRating: value }),
  setTestScore: (value) => set({ testScore: value }),
  setCompletionRate: (value) => set({ completionRate: value }),
  setSatisfactionLevel: (value) => set({ satisfactionLevel: value }),

  // Setters de niveles
  setSkillLevel: (value) => set({ skillLevel: value }),
  setExperiencePoints: (value) => set({ experiencePoints: value }),
  setHealthPoints: (value) => set({ healthPoints: value }),
  setEnergyLevel: (value) => set({ energyLevel: value }),

  // Setters de negocio
  setSalesTarget: (value) => set({ salesTarget: value }),
  setCustomerSatisfaction: (value) => set({ customerSatisfaction: value }),
  setMarketShare: (value) => set({ marketShare: value }),
  setGrowthRate: (value) => set({ growthRate: value }),

  // Setters de configuración
  setMinValue: (value) => set({ minValue: value }),
  setMaxValue: (value) => set({ maxValue: value }),
  setLowThreshold: (value) => set({ lowThreshold: value }),
  setHighThreshold: (value) => set({ highThreshold: value }),
  setOptimumValue: (value) => set({ optimumValue: value }),

  // Utilidades
  clearAllMeter: () =>
    set({
      batteryLevel: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      diskSpace: 0,
      performanceScore: 0,
      loadTime: 0,
      responseTime: 0,
      throughput: 0,
      userRating: 0,
      testScore: 0,
      completionRate: 0,
      satisfactionLevel: 0,
      skillLevel: 0,
      experiencePoints: 0,
      healthPoints: 0,
      energyLevel: 0,
      salesTarget: 0,
      customerSatisfaction: 0,
      marketShare: 0,
      growthRate: 0,
    }),

  resetToDefaults: () =>
    set({
      batteryLevel: 75,
      cpuUsage: 45,
      memoryUsage: 62,
      diskSpace: 80,
      performanceScore: 87,
      loadTime: 2.3,
      responseTime: 150,
      throughput: 1250,
      userRating: 4.2,
      testScore: 85,
      completionRate: 78,
      satisfactionLevel: 91,
      skillLevel: 7,
      experiencePoints: 2850,
      healthPoints: 85,
      energyLevel: 60,
      salesTarget: 92,
      customerSatisfaction: 88,
      marketShare: 15,
      growthRate: 125,
    }),

  incrementBattery: () =>
    set((state) => ({
      batteryLevel: Math.min(state.batteryLevel + 5, 100),
    })),

  decrementBattery: () =>
    set((state) => ({
      batteryLevel: Math.max(state.batteryLevel - 5, 0),
    })),

  randomizeValues: () => {
    const random = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    set({
      batteryLevel: random(10, 100),
      cpuUsage: random(20, 90),
      memoryUsage: random(30, 95),
      diskSpace: random(40, 85),
      performanceScore: random(60, 100),
      testScore: random(0, 100),
      completionRate: random(50, 100),
      satisfactionLevel: random(70, 100),
      skillLevel: random(1, 10),
      healthPoints: random(20, 100),
      energyLevel: random(10, 100),
      salesTarget: random(50, 120),
      customerSatisfaction: random(60, 100),
      marketShare: random(5, 25),
      growthRate: random(80, 150),
    });
  },

  simulateRealTimeData: () => {
    const fluctuate = (current: number, variance: number = 5) => {
      const change = (Math.random() - 0.5) * variance * 2;
      return Math.max(0, Math.min(100, current + change));
    };

    set((state) => ({
      cpuUsage: fluctuate(state.cpuUsage, 10),
      memoryUsage: fluctuate(state.memoryUsage, 3),
      responseTime: fluctuate(state.responseTime, 20),
      throughput: fluctuate(state.throughput, 50),
    }));
  },

  // Funciones de simulación
  simulateSystemLoad: () => {
    set({
      cpuUsage: Math.floor(Math.random() * 40) + 60, // 60-100%
      memoryUsage: Math.floor(Math.random() * 30) + 70, // 70-100%
      diskSpace: Math.floor(Math.random() * 20) + 80, // 80-100%
      responseTime: Math.floor(Math.random() * 300) + 200, // 200-500ms
    });
  },

  simulateUserActivity: () => {
    set({
      userRating: +(Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
      satisfactionLevel: Math.floor(Math.random() * 30) + 70, // 70-100%
      completionRate: Math.floor(Math.random() * 40) + 60, // 60-100%
      skillLevel: Math.floor(Math.random() * 5) + 5, // 5-10
    });
  },

  simulateBusinessMetrics: () => {
    set({
      salesTarget: Math.floor(Math.random() * 50) + 75, // 75-125%
      customerSatisfaction: Math.floor(Math.random() * 20) + 80, // 80-100%
      marketShare: Math.floor(Math.random() * 15) + 10, // 10-25%
      growthRate: Math.floor(Math.random() * 60) + 90, // 90-150%
    });
  },

  loadSampleData: () => {
    set({
      batteryLevel: 85,
      cpuUsage: 32,
      memoryUsage: 68,
      diskSpace: 75,
      performanceScore: 94,
      loadTime: 1.8,
      responseTime: 120,
      throughput: 1500,
      userRating: 4.7,
      testScore: 92,
      completionRate: 89,
      satisfactionLevel: 95,
      skillLevel: 8,
      experiencePoints: 3200,
      healthPoints: 95,
      energyLevel: 80,
      salesTarget: 105,
      customerSatisfaction: 93,
      marketShare: 18,
      growthRate: 135,
    });
  },
}));

