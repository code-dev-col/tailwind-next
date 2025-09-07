# UserCard Molecule

## 📋 Descripción

`UserCard` es un molecule versátil que presenta información de usuarios de manera atractiva y funcional. Combina Avatar, Text, Badge, Button y otros atoms para crear tarjetas de perfil completas con estados de conexión, badges, acciones y más.

## 🎯 Características Principales

### ✅ Funcionalidades Core

- **Avatar integrado** - Imagen de perfil con fallbacks automáticos
- **Estados de conexión** - Online, offline, away, busy con iconos visuales
- **Badges personalizables** - Etiquetas con diferentes esquemas de color
- **Acciones integradas** - Botones de contacto y seguimiento
- **Integración Zustand** - Manejo de estado robusto con patrón storeKey
- **Información completa** - Nombre, rol, email, bio, ubicación, fecha de unión

### 🎨 Variantes de Diseño

- **`default`** - Layout estándar con espaciado normal
- **`compact`** - Espaciado reducido, ideal para listas
- **`detailed`** - Espaciado amplio con metadata completa
- **`minimal`** - Sin bordes ni sombras para integración suave

### 📏 Tamaños

- **`sm`** - Compacto para interfaces densas
- **`default`** - Tamaño estándar
- **`lg`** - Grande para perfiles destacados

### 🎨 Esquemas de Color

- **`default`**, **`secondary`**, **`accent`**, **`destructive`**, **`muted`**, **`minimal`**, **`custom`**

## 📚 Casos de Uso

### 👥 Equipo de Trabajo

```tsx
<UserCard
  name="María López"
  role="Diseñadora UX/UI"
  email="maria@empresa.com"
  status="online"
  bio="Especialista en investigación de usuarios y diseño centrado en el usuario"
  badges={[
    { text: 'Team Lead', colorScheme: 'accent' },
    { text: 'Mentor', colorScheme: 'secondary' },
  ]}
  showActions={true}
  onContact={() => openChat('maria')}
  onFollow={() => followUser('maria')}
/>
```

### 🌐 Red Social

```tsx
<UserCard
  name="Carlos Mendoza"
  role="Influencer Tech"
  bio="Compartiendo las últimas tendencias en desarrollo web"
  status="online"
  badges={[
    { text: '10K Followers', colorScheme: 'accent' },
    { text: 'Verified', colorScheme: 'default' },
  ]}
  isFollowing={true}
  onFollow={handleFollow}
  $colorScheme="accent"
/>
```

### 🏢 Directorio Corporativo

```tsx
<UserCard
  name="Ana García"
  role="Directora de Producto"
  email="ana.garcia@empresa.com"
  location="Madrid, España"
  joinDate="Enero 2020"
  bio="Liderando el desarrollo de productos innovadores"
  $variant="detailed"
  showContactButton={true}
  contactButtonText="Enviar Email"
  onContact={() => mailto('ana.garcia@empresa.com')}
/>
```

### 🎓 Plataforma Educativa

```tsx
<UserCard
  name="Luis Rodríguez"
  role="Instructor Senior"
  bio="Especialista en JavaScript y React con más de 8 años de experiencia"
  badges={[
    { text: 'Expert', colorScheme: 'accent' },
    { text: '4.8★ Rating', colorScheme: 'secondary' },
  ]}
  $colorScheme="secondary"
  showFollowButton={false}
  contactButtonText="Ver Cursos"
/>
```

### 🛒 E-commerce

```tsx
<UserCard
  name="Elena Martínez"
  role="Vendedor Verificado"
  badges={[
    { text: 'Top Seller', colorScheme: 'accent' },
    { text: '99% Rating', colorScheme: 'default' },
  ]}
  contactButtonText="Contactar Vendedor"
  followButtonText="Seguir Tienda"
  $variant="compact"
/>
```

## 🔧 API Completa

### Props Principales

```tsx
interface UserCardProps {
  // Configuración visual
  $colorScheme?:
    | 'default'
    | 'secondary'
    | 'accent'
    | 'destructive'
    | 'muted'
    | 'minimal'
    | 'custom';
  $size?: 'default' | 'sm' | 'lg';
  $variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  $custom?: string;

  // Store integration
  $store?: UseBoundStore<StoreApi<T>>;
  nameStoreKey?: keyof T;
  roleStoreKey?: keyof T;
  statusStoreKey?: keyof T;

  // Información del usuario
  name?: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  bio?: string;
  location?: string;
  joinDate?: string;

  // Estado de conexión
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusText?: string;

  // Configuración de visualización
  showEmail?: boolean;
  showStatus?: boolean;
  showBio?: boolean;
  showLocation?: boolean;
  showJoinDate?: boolean;
  showActions?: boolean;
  showContactButton?: boolean;
  showFollowButton?: boolean;

  // Personalización de botones
  contactButtonText?: string;
  followButtonText?: string;
  isFollowing?: boolean;

  // Badges opcionales
  badges?: Array<{
    text: string;
    colorScheme?: 'default' | 'secondary' | 'accent' | 'destructive';
  }>;

  // Callbacks
  onContact?: () => void;
  onFollow?: () => void;
  onAvatarClick?: () => void;
  onClick?: () => void;
}
```

## 🏪 Integración con Store (Zustand)

### Crear Store de Usuario

```tsx
// stores/userProfile.store.ts
import { create } from 'zustand';

interface UserProfileState {
  // Información básica
  currentUserName: string;
  currentUserRole: string;
  currentUserEmail: string;
  currentUserBio: string;
  currentUserLocation: string;

  // Estado de conexión
  connectionStatus: 'online' | 'offline' | 'away' | 'busy';
  lastActiveTime: string;

  // Social features
  followingCount: number;
  followersCount: number;
  isProfilePublic: boolean;

  // Badges y achievements
  userBadges: Array<{ text: string; colorScheme: string; date: string }>;

  // Setters
  setCurrentUserName: (value: string) => void;
  setCurrentUserRole: (value: string) => void;
  setCurrentUserEmail: (value: string) => void;
  setCurrentUserBio: (value: string) => void;
  setCurrentUserLocation: (value: string) => void;

  // Connection management
  setConnectionStatus: (status: 'online' | 'offline' | 'away' | 'busy') => void;
  updateLastActive: () => void;

  // Social functions
  addFollower: () => void;
  removeFollower: () => void;
  toggleProfileVisibility: () => void;

  // Badge management
  addBadge: (badge: { text: string; colorScheme: string }) => void;
  removeBadge: (text: string) => void;
  clearBadges: () => void;

  // Utilities
  clearProfile: () => void;
  loadDefaultProfile: () => void;
}

export const useUserProfile = create<UserProfileState>((set, get) => ({
  // Estados iniciales
  currentUserName: '',
  currentUserRole: '',
  currentUserEmail: '',
  currentUserBio: '',
  currentUserLocation: '',
  connectionStatus: 'offline',
  lastActiveTime: new Date().toISOString(),
  followingCount: 0,
  followersCount: 0,
  isProfilePublic: true,
  userBadges: [],

  // Setters básicos
  setCurrentUserName: (value) => set({ currentUserName: value }),
  setCurrentUserRole: (value) => set({ currentUserRole: value }),
  setCurrentUserEmail: (value) => set({ currentUserEmail: value }),
  setCurrentUserBio: (value) => set({ currentUserBio: value }),
  setCurrentUserLocation: (value) => set({ currentUserLocation: value }),

  // Connection management
  setConnectionStatus: (status) =>
    set({
      connectionStatus: status,
      lastActiveTime:
        status === 'online' ? new Date().toISOString() : get().lastActiveTime,
    }),

  updateLastActive: () => set({ lastActiveTime: new Date().toISOString() }),

  // Social functions
  addFollower: () =>
    set((state) => ({ followersCount: state.followersCount + 1 })),
  removeFollower: () =>
    set((state) => ({
      followersCount: Math.max(0, state.followersCount - 1),
    })),
  toggleProfileVisibility: () =>
    set((state) => ({
      isProfilePublic: !state.isProfilePublic,
    })),

  // Badge management
  addBadge: (badge) =>
    set((state) => ({
      userBadges: [
        ...state.userBadges,
        { ...badge, date: new Date().toISOString() },
      ],
    })),

  removeBadge: (text) =>
    set((state) => ({
      userBadges: state.userBadges.filter((badge) => badge.text !== text),
    })),

  clearBadges: () => set({ userBadges: [] }),

  // Utilities
  clearProfile: () =>
    set({
      currentUserName: '',
      currentUserRole: '',
      currentUserEmail: '',
      currentUserBio: '',
      currentUserLocation: '',
      connectionStatus: 'offline',
      followingCount: 0,
      followersCount: 0,
      userBadges: [],
    }),

  loadDefaultProfile: () =>
    set({
      currentUserName: 'Usuario Ejemplo',
      currentUserRole: 'Desarrollador',
      currentUserEmail: 'usuario@ejemplo.com',
      currentUserBio:
        'Desarrollador apasionado por crear soluciones innovadoras',
      currentUserLocation: 'Ciudad, País',
      connectionStatus: 'online',
      followersCount: 156,
      followingCount: 89,
      userBadges: [
        {
          text: 'Verificado',
          colorScheme: 'default',
          date: new Date().toISOString(),
        },
        { text: 'Pro', colorScheme: 'accent', date: new Date().toISOString() },
      ],
    }),
}));
```

### Usar Store con UserCard

```tsx
import { useUserProfile } from './stores/userProfile.store';

function ProfileSection() {
  const userStore = useUserProfile();

  const handleFollow = async () => {
    // Lógica de seguimiento
    try {
      await followUserAPI(userStore.currentUserEmail);
      userStore.addFollower();
      showNotification('¡Ahora sigues a este usuario!');
    } catch (error) {
      showError('Error al seguir usuario');
    }
  };

  const handleContact = () => {
    // Abrir modal de contacto o chat
    openContactModal({
      name: userStore.currentUserName,
      email: userStore.currentUserEmail,
    });
  };

  return (
    <UserCard
      $store={useUserProfile}
      nameStoreKey="currentUserName"
      roleStoreKey="currentUserRole"
      statusStoreKey="connectionStatus"
      email={userStore.currentUserEmail}
      bio={userStore.currentUserBio}
      location={userStore.currentUserLocation}
      badges={userStore.userBadges}
      onFollow={handleFollow}
      onContact={handleContact}
      $variant="detailed"
    />
  );
}
```

## 🎨 Personalización Avanzada

### Custom Styling con Gradientes

```tsx
<UserCard
  name="Premium User"
  role="VIP Member"
  $custom="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
  className="shadow-xl transform hover:scale-105 transition-transform"
  badges={[{ text: 'VIP', colorScheme: 'accent' }]}
/>
```

### Configuración Responsiva

```tsx
// Grid adaptativo para diferentes pantallas
const UserGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {users.map((user) => (
      <UserCard
        key={user.id}
        name={user.name}
        role={user.role}
        email={user.email}
        $size="sm" // Tamaño compacto para grids
        $variant="compact"
        badges={user.badges}
      />
    ))}
  </div>
);
```

### Estados Dinámicos

```tsx
const DynamicUserCard = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser(userId).then((userData) => {
      setUser(userData);
      setIsFollowing(userData.isFollowing);
      setIsLoading(false);
    });
  }, [userId]);

  if (isLoading) {
    return <UserCardSkeleton />;
  }

  return (
    <UserCard
      name={user.name}
      role={user.role}
      email={user.email}
      status={user.isOnline ? 'online' : 'offline'}
      bio={user.bio}
      badges={user.badges}
      isFollowing={isFollowing}
      onFollow={async () => {
        setIsFollowing(!isFollowing);
        await toggleFollowUser(userId);
      }}
      onContact={() => openDirectMessage(userId)}
      $colorScheme={user.isPremium ? 'accent' : 'default'}
    />
  );
};
```

## 🔄 Patrones Comunes

### Lista de Miembros del Equipo

```tsx
const TeamMembersList = () => {
  const teamMembers = useTeamMembers();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Nuestro Equipo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <UserCard
            key={member.id}
            name={member.name}
            role={member.position}
            email={member.email}
            bio={member.bio}
            location={member.location}
            status={member.status}
            badges={member.skills.map((skill) => ({
              text: skill,
              colorScheme: 'secondary',
            }))}
            showFollowButton={false}
            contactButtonText="Ver Perfil"
            onContact={() => navigateToProfile(member.id)}
            $variant="detailed"
          />
        ))}
      </div>
    </div>
  );
};
```

### Panel de Administración

```tsx
const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Acciones en Lote ({selectedUsers.size})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            role={user.role}
            email={user.email}
            status={user.lastActive < 30 ? 'online' : 'offline'}
            badges={[
              { text: user.userType, colorScheme: 'default' },
              ...(user.isVerified
                ? [{ text: 'Verificado', colorScheme: 'accent' }]
                : []),
            ]}
            onClick={() => toggleUserSelection(user.id)}
            className={selectedUsers.has(user.id) ? 'ring-2 ring-blue-500' : ''}
            contactButtonText="Editar"
            followButtonText={user.isActive ? 'Desactivar' : 'Activar'}
            onContact={() => editUser(user.id)}
            onFollow={() => toggleUserStatus(user.id)}
            $colorScheme={user.isActive ? 'default' : 'muted'}
          />
        ))}
      </div>
    </div>
  );
};
```

### Búsqueda y Filtrado

```tsx
const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex gap-4">
        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar usuarios..."
        />

        <Dropdown
          value={filterRole}
          onChange={setFilterRole}
          options={[
            { value: 'all', label: 'Todos los roles' },
            { value: 'developer', label: 'Desarrollador' },
            { value: 'designer', label: 'Diseñador' },
            { value: 'manager', label: 'Manager' },
          ]}
        />

        <Dropdown
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { value: 'all', label: 'Todos los estados' },
            { value: 'online', label: 'En línea' },
            { value: 'offline', label: 'Desconectado' },
          ]}
        />
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            role={user.role}
            email={user.email}
            status={user.status}
            badges={user.badges}
            $variant="compact"
          />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Text $size="lg" className="text-muted-foreground">
            No se encontraron usuarios con los filtros aplicados
          </Text>
        </div>
      )}
    </div>
  );
};
```

## ⚡ Performance y Optimización

### Virtualización para Listas Grandes

```tsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedUserList = ({ users }: { users: User[] }) => {
  const renderUser = ({ index, style }: { index: number; style: any }) => (
    <div style={style} className="p-2">
      <UserCard
        name={users[index].name}
        role={users[index].role}
        email={users[index].email}
        $size="sm"
        $variant="compact"
      />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={users.length}
      itemSize={120}
      className="w-full">
      {renderUser}
    </List>
  );
};
```

### Lazy Loading de Avatares

```tsx
const LazyUserCard = ({ user }: { user: User }) => {
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  return (
    <UserCard
      name={user.name}
      role={user.role}
      avatarSrc={avatarLoaded ? user.avatarUrl : undefined}
      onAvatarClick={() => {
        if (!avatarLoaded) {
          setAvatarLoaded(true);
        }
      }}
      // ... other props
    />
  );
};
```

### Memoización para Performance

```tsx
import { memo, useCallback } from 'react';

const OptimizedUserCard = memo(UserCard);

function UserContainer({ user }: { user: User }) {
  const handleContact = useCallback(() => {
    openContactModal(user.id);
  }, [user.id]);

  const handleFollow = useCallback(async () => {
    await toggleFollow(user.id);
  }, [user.id]);

  return (
    <OptimizedUserCard
      name={user.name}
      role={user.role}
      email={user.email}
      onContact={handleContact}
      onFollow={handleFollow}
      // ... other props
    />
  );
}
```

## 🧪 Testing

```tsx
// test/UserCard.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { UserCard } from '@code-dev-col/tailwind-next';

describe('UserCard', () => {
  const defaultProps = {
    name: 'Test User',
    role: 'Developer',
    email: 'test@example.com',
  };

  test('renders user information correctly', () => {
    render(<UserCard {...defaultProps} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('calls onContact when contact button is clicked', () => {
    const onContact = jest.fn();

    render(
      <UserCard
        {...defaultProps}
        onContact={onContact}
        showContactButton={true}
      />
    );

    fireEvent.click(screen.getByText('Contactar'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });

  test('displays status indicator correctly', () => {
    render(
      <UserCard
        {...defaultProps}
        status="online"
        statusText="En línea"
        showStatus={true}
      />
    );

    expect(screen.getByText('En línea')).toBeInTheDocument();
  });

  test('renders badges correctly', () => {
    const badges = [
      { text: 'Pro', colorScheme: 'accent' as const },
      { text: 'Verified', colorScheme: 'default' as const },
    ];

    render(<UserCard {...defaultProps} badges={badges} />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  test('handles different variants correctly', () => {
    const { rerender } = render(
      <UserCard {...defaultProps} $variant="compact" />
    );

    // Test compact variant
    expect(screen.getByText('Test User')).toBeInTheDocument();

    // Test detailed variant
    rerender(
      <UserCard
        {...defaultProps}
        $variant="detailed"
        bio="Test bio"
        location="Test location"
        joinDate="January 2023"
      />
    );

    expect(screen.getByText('Test bio')).toBeInTheDocument();
    expect(screen.getByText('Test location')).toBeInTheDocument();
    expect(screen.getByText('January 2023')).toBeInTheDocument();
  });
});
```

---

El `UserCard` es un molecule poderoso y flexible que se adapta a múltiples contextos: equipos de trabajo, redes sociales, directorios corporativos, plataformas educativas y más. Su integración con Zustand, sistema de badges y configurabilidad completa lo hacen ideal para cualquier aplicación que necesite mostrar información de usuarios. 👤✨

