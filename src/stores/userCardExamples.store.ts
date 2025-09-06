import { create } from 'zustand';

interface UserCardExamplesState {
  // Estados básicos para ejemplos
  defaultUserName: string;
  defaultUserRole: string;
  defaultUserStatus: 'online' | 'offline' | 'away' | 'busy';

  // Estados para diferentes contextos
  profileName: string;
  profileRole: string;
  profileBio: string;
  profileLocation: string;
  profileEmail: string;

  // Estados para team members
  teamMemberName: string;
  teamMemberRole: string;
  teamMemberStatus: 'online' | 'offline' | 'away' | 'busy';

  // Estados para social media
  socialUserName: string;
  socialUserRole: string;
  socialFollowingCount: number;
  socialFollowersCount: number;

  // Estados para client/customer
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientStatus: 'active' | 'inactive' | 'pending';

  // Estados de interacción
  isFollowing: boolean;
  isOnline: boolean;
  notificationCount: number;
  lastActive: string;

  // Setters básicos
  setDefaultUserName: (value: string) => void;
  setDefaultUserRole: (value: string) => void;
  setDefaultUserStatus: (value: 'online' | 'offline' | 'away' | 'busy') => void;

  // Setters para perfil
  setProfileName: (value: string) => void;
  setProfileRole: (value: string) => void;
  setProfileBio: (value: string) => void;
  setProfileLocation: (value: string) => void;
  setProfileEmail: (value: string) => void;

  // Setters para team
  setTeamMemberName: (value: string) => void;
  setTeamMemberRole: (value: string) => void;
  setTeamMemberStatus: (value: 'online' | 'offline' | 'away' | 'busy') => void;

  // Setters para social
  setSocialUserName: (value: string) => void;
  setSocialUserRole: (value: string) => void;
  setSocialFollowingCount: (value: number) => void;
  setSocialFollowersCount: (value: number) => void;

  // Setters para cliente
  setClientName: (value: string) => void;
  setClientCompany: (value: string) => void;
  setClientEmail: (value: string) => void;
  setClientStatus: (value: 'active' | 'inactive' | 'pending') => void;

  // Setters de interacción
  setIsFollowing: (value: boolean) => void;
  setIsOnline: (value: boolean) => void;
  setNotificationCount: (value: number) => void;
  setLastActive: (value: string) => void;

  // Utilidades
  clearAllUserCard: () => void;
  toggleFollowing: () => void;
  toggleOnlineStatus: () => void;
  incrementNotifications: () => void;
  resetInteractions: () => void;

  // Funciones de simulación
  simulateUserActivity: () => void;
  randomizeUserData: () => void;
  loadSampleUsers: () => void;
}

export const useUserCardExamples = create<UserCardExamplesState>(
  (set, get) => ({
    // Estados iniciales básicos
    defaultUserName: 'Ana García',
    defaultUserRole: 'Desarrolladora Frontend',
    defaultUserStatus: 'online',

    // Estados de perfil
    profileName: 'Carlos Mendoza',
    profileRole: 'Director de Producto',
    profileBio:
      'Apasionado por crear productos que mejoren la vida de las personas. Más de 8 años de experiencia en desarrollo de software.',
    profileLocation: 'Madrid, España',
    profileEmail: 'carlos.mendoza@empresa.com',

    // Estados de team
    teamMemberName: 'María López',
    teamMemberRole: 'Diseñadora UX/UI',
    teamMemberStatus: 'away',

    // Estados sociales
    socialUserName: 'Luis Rodríguez',
    socialUserRole: 'Influencer Tech',
    socialFollowingCount: 1284,
    socialFollowersCount: 15600,

    // Estados de cliente
    clientName: 'Roberto Silva',
    clientCompany: 'TechCorp Solutions',
    clientEmail: 'roberto@techcorp.com',
    clientStatus: 'active',

    // Estados de interacción
    isFollowing: false,
    isOnline: true,
    notificationCount: 3,
    lastActive: '2 minutos',

    // Setters básicos
    setDefaultUserName: (value) => set({ defaultUserName: value }),
    setDefaultUserRole: (value) => set({ defaultUserRole: value }),
    setDefaultUserStatus: (value) => set({ defaultUserStatus: value }),

    // Setters de perfil
    setProfileName: (value) => set({ profileName: value }),
    setProfileRole: (value) => set({ profileRole: value }),
    setProfileBio: (value) => set({ profileBio: value }),
    setProfileLocation: (value) => set({ profileLocation: value }),
    setProfileEmail: (value) => set({ profileEmail: value }),

    // Setters de team
    setTeamMemberName: (value) => set({ teamMemberName: value }),
    setTeamMemberRole: (value) => set({ teamMemberRole: value }),
    setTeamMemberStatus: (value) => set({ teamMemberStatus: value }),

    // Setters sociales
    setSocialUserName: (value) => set({ socialUserName: value }),
    setSocialUserRole: (value) => set({ socialUserRole: value }),
    setSocialFollowingCount: (value) => set({ socialFollowingCount: value }),
    setSocialFollowersCount: (value) => set({ socialFollowersCount: value }),

    // Setters de cliente
    setClientName: (value) => set({ clientName: value }),
    setClientCompany: (value) => set({ clientCompany: value }),
    setClientEmail: (value) => set({ clientEmail: value }),
    setClientStatus: (value) => set({ clientStatus: value }),

    // Setters de interacción
    setIsFollowing: (value) => set({ isFollowing: value }),
    setIsOnline: (value) => set({ isOnline: value }),
    setNotificationCount: (value) => set({ notificationCount: value }),
    setLastActive: (value) => set({ lastActive: value }),

    // Utilidades
    clearAllUserCard: () =>
      set({
        defaultUserName: '',
        defaultUserRole: '',
        profileName: '',
        profileRole: '',
        profileBio: '',
        profileLocation: '',
        profileEmail: '',
        teamMemberName: '',
        teamMemberRole: '',
        socialUserName: '',
        socialUserRole: '',
        clientName: '',
        clientCompany: '',
        clientEmail: '',
        isFollowing: false,
        notificationCount: 0,
      }),

    toggleFollowing: () =>
      set((state) => ({ isFollowing: !state.isFollowing })),

    toggleOnlineStatus: () => set((state) => ({ isOnline: !state.isOnline })),

    incrementNotifications: () =>
      set((state) => ({ notificationCount: state.notificationCount + 1 })),

    resetInteractions: () =>
      set({
        isFollowing: false,
        isOnline: true,
        notificationCount: 0,
        lastActive: 'ahora',
      }),

    // Funciones de simulación
    simulateUserActivity: () => {
      const statuses: ('online' | 'offline' | 'away' | 'busy')[] = [
        'online',
        'away',
        'busy',
        'offline',
      ];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      set({
        defaultUserStatus: randomStatus,
        teamMemberStatus: randomStatus,
        lastActive:
          randomStatus === 'online'
            ? 'ahora'
            : `${Math.floor(Math.random() * 30) + 1} min`,
      });
    },

    randomizeUserData: () => {
      const names = [
        'Ana García',
        'Carlos Mendoza',
        'María López',
        'Luis Rodríguez',
        'Carmen Silva',
      ];
      const roles = [
        'Desarrollador Frontend',
        'Diseñador UX/UI',
        'Product Manager',
        'Data Scientist',
        'DevOps Engineer',
      ];

      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];

      set({
        defaultUserName: randomName,
        defaultUserRole: randomRole,
        socialFollowersCount: Math.floor(Math.random() * 50000) + 1000,
        socialFollowingCount: Math.floor(Math.random() * 2000) + 100,
      });
    },

    loadSampleUsers: () => {
      set({
        defaultUserName: 'Elena Martínez',
        defaultUserRole: 'Senior Developer',
        profileName: 'Diego Fernández',
        profileRole: 'Lead Designer',
        teamMemberName: 'Sofía Castillo',
        teamMemberRole: 'QA Engineer',
        socialUserName: 'Alejandro Ruiz',
        socialUserRole: 'Tech Blogger',
        clientName: 'Gabriela Torres',
        clientCompany: 'Innovation Labs',
      });
    },
  })
);

