import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { create } from 'zustand';
import { Container } from '../components/atoms/Container';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { TextArea } from '../components/atoms/TextArea';
import { Dropdown } from '../components/atoms/Dropdown';
import { RadioButton } from '../components/atoms/RadioButton';
import { CheckBox } from '../components/atoms/CheckBox';
import { Label } from '../components/atoms/Label';
import { Switch } from '../components/atoms/Switch';
import { Progress } from '../components/atoms/Progress';
import { ChipGroup } from '../components/atoms/Chip';
import { Badge } from '../components/atoms/Badge';
import { Avatar } from '../components/atoms/Avatar';
import { Separator } from '../components/atoms/Separator';
import { Spinner } from '../components/atoms/Spinner';
import { Link } from '../components/atoms/Link';

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiStar,
  FiHeart,
  FiSettings,
  FiCode,
  FiEdit,
  FiCamera,
  FiMic,
  FiVideo,
  FiGlobe,
  FiSmartphone,
  FiMonitor,
} from 'react-icons/fi';

// Definir interfaces para el formulario expandido
interface ContactFormData {
  // Información personal
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  country: string;
  city: string;
  profileImage: string;

  // Preferencias
  contactPreference: string;
  notifications: boolean;
  emailMarketing: boolean;
  smsUpdates: boolean;

  // Contenido
  message: string;
  subject: string;
  priority: string;

  // Selecciones múltiples
  interests: string[];
  skills: string[];
  technologies: string[];

  // Configuraciones
  theme: string;
  language: string;
  timezone: string;

  // Progreso y estado
  profileCompletion: number;
  isLoading: boolean;

  // Métodos
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setBirthDate: (date: string) => void;
  setCountry: (country: string) => void;
  setCity: (city: string) => void;
  setProfileImage: (image: string) => void;
  setContactPreference: (preference: string) => void;
  setNotifications: (notifications: boolean) => void;
  setEmailMarketing: (marketing: boolean) => void;
  setSmsUpdates: (sms: boolean) => void;
  setMessage: (message: string) => void;
  setSubject: (subject: string) => void;
  setPriority: (priority: string) => void;
  setInterests: (interests: string[]) => void;
  setSkills: (skills: string[]) => void;
  setTechnologies: (technologies: string[]) => void;
  setTheme: (theme: string) => void;
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;
  setProfileCompletion: (completion: number) => void;
  setIsLoading: (loading: boolean) => void;
  reset: () => void;
  calculateProgress: () => void;
}

// Store del formulario de contacto expandido
const useContactFormStore = create<ContactFormData>()((set, get) => ({
  // Información personal
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  country: '',
  city: '',
  profileImage: '',

  // Preferencias
  contactPreference: 'email',
  notifications: true,
  emailMarketing: false,
  smsUpdates: false,

  // Contenido
  message: '',
  subject: '',
  priority: 'medium',

  // Selecciones múltiples
  interests: [],
  skills: ['React', 'TypeScript'],
  technologies: [],

  // Configuraciones
  theme: 'light',
  language: 'es',
  timezone: 'Europe/Madrid',

  // Progreso y estado
  profileCompletion: 0,
  isLoading: false,

  // Setters
  setName: (name) => {
    set({ name });
    get().calculateProgress();
  },
  setEmail: (email) => {
    set({ email });
    get().calculateProgress();
  },
  setPhone: (phone) => set({ phone }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setCountry: (country) => {
    set({ country });
    get().calculateProgress();
  },
  setCity: (city) => set({ city }),
  setProfileImage: (profileImage) => set({ profileImage }),
  setContactPreference: (contactPreference) => set({ contactPreference }),
  setNotifications: (notifications) => set({ notifications }),
  setEmailMarketing: (emailMarketing) => set({ emailMarketing }),
  setSmsUpdates: (smsUpdates) => set({ smsUpdates }),
  setMessage: (message) => {
    set({ message });
    get().calculateProgress();
  },
  setSubject: (subject) => set({ subject }),
  setPriority: (priority) => set({ priority }),
  setInterests: (interests) => set({ interests }),
  setSkills: (skills) => set({ skills }),
  setTechnologies: (technologies) => set({ technologies }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setTimezone: (timezone) => set({ timezone }),
  setProfileCompletion: (profileCompletion) => set({ profileCompletion }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Calcular progreso del formulario
  calculateProgress: () => {
    const state = get();
    const fields = [state.name, state.email, state.country, state.message];
    const filledFields = fields.filter((field) => field.trim() !== '').length;
    const progress = Math.round((filledFields / fields.length) * 100);
    set({ profileCompletion: progress });
  },

  reset: () =>
    set({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      country: '',
      city: '',
      profileImage: '',
      contactPreference: 'email',
      notifications: true,
      emailMarketing: false,
      smsUpdates: false,
      message: '',
      subject: '',
      priority: 'medium',
      interests: [],
      skills: ['React', 'TypeScript'],
      technologies: [],
      theme: 'light',
      language: 'es',
      timezone: 'Europe/Madrid',
      profileCompletion: 0,
      isLoading: false,
    }),
}));

const countryOptions = [
  { value: 'es', label: 'España' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'fr', label: 'Francia' },
  { value: 'de', label: 'Alemania' },
  { value: 'it', label: 'Italia' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'mx', label: 'México' },
  { value: 'co', label: 'Colombia' },
  { value: 'ar', label: 'Argentina' },
  { value: 'br', label: 'Brasil' },
];

const priorityOptions = [
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
];

const languageOptions = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'it', label: 'Italiano' },
];

const timezoneOptions = [
  { value: 'Europe/Madrid', label: 'Madrid (UTC+1)' },
  { value: 'America/New_York', label: 'New York (UTC-5)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (UTC-8)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (UTC+9)' },
  { value: 'Australia/Sydney', label: 'Sydney (UTC+10)' },
];

const availableSkills = [
  'React',
  'Vue',
  'Angular',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Java',
  'C#',
  'PHP',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'HTML',
  'CSS',
  'SASS',
  'Tailwind',
  'Bootstrap',
  'Material-UI',
  'Next.js',
  'Nuxt.js',
  'Gatsby',
  'Express',
  'NestJS',
  'Django',
  'Spring',
  'Laravel',
  'Ruby on Rails',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
];

const availableTechnologies = [
  'Frontend',
  'Backend',
  'Fullstack',
  'Mobile',
  'Desktop',
  'DevOps',
  'Cloud',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Game Development',
  'AR/VR',
];

const availableInterests = [
  'Web Development',
  'Mobile Apps',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'Cloud Computing',
  'Cybersecurity',
  'Game Development',
  'E-commerce',
  'Fintech',
  'Healthcare Tech',
  'EdTech',
  'SaaS',
  'API Development',
];

const meta: Meta<any> = {
  title: 'Examples/Complete Form with All Atoms',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteContactForm: Story = {
  render: () => {
    const formData = useContactFormStore();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      formData.setIsLoading(true);

      // Simular envío
      setTimeout(() => {
        console.log('Form submitted:', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          contactPreference: formData.contactPreference,
          message: formData.message,
          interests: formData.interests,
          skills: formData.skills,
          technologies: formData.technologies,
        });
        alert('Formulario enviado! Revisa la consola para ver los datos.');
        formData.setIsLoading(false);
      }, 2000);
    };

    return (
      <Container
        $padding="p-6"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Container $maxWidth="max-w-4xl" className="mx-auto">
          <Container
            $padding="p-8"
            $backgroundColor="bg-white"
            $borderRadius="rounded-xl"
            className="shadow-lg">
            {/* Header con Avatar y Progress */}
            <div className="text-center mb-8">
              <Avatar
                src={
                  formData.profileImage ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                }
                alt="Profile"
                $size="lg"
                className="mx-auto mb-4"
              />

              <Text as="h1" $size="3xl" $weight="bold" className="mb-2">
                Formulario Completo con Todos los Atoms
              </Text>

              <Text $variant="muted" className="mb-4">
                Ejemplo exhaustivo usando todos los componentes de la librería
              </Text>

              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-2">
                  <Text $size="sm" $weight="medium">
                    Progreso del formulario:
                  </Text>
                  <Badge
                    $variant={
                      formData.profileCompletion === 100 ? 'success' : 'default'
                    }>
                    {formData.profileCompletion}%
                  </Badge>
                </div>
                <Progress
                  value={formData.profileCompletion}
                  $variant="primary"
                  $showPercentage={false}
                  className="mb-4"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información Personal */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FiUser className="text-blue-500" size={24} />
                  <Text as="h2" $size="xl" $weight="semibold">
                    Información Personal
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="name">
                      <FiUser size={16} className="inline mr-2" />
                      Nombre completo *
                    </Label>
                    <Input
                      id="name"
                      $store={useContactFormStore}
                      storeKey="name"
                      placeholder="Tu nombre completo"
                      $security="form"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      <FiMail size={16} className="inline mr-2" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      $store={useContactFormStore}
                      storeKey="email"
                      placeholder="tu@email.com"
                      $security="form"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      <FiPhone size={16} className="inline mr-2" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      $store={useContactFormStore}
                      storeKey="phone"
                      placeholder="+34 123 456 789"
                    />
                  </div>

                  <div>
                    <Label htmlFor="birthDate">
                      <FiCalendar size={16} className="inline mr-2" />
                      Fecha de nacimiento
                    </Label>
                    <Input
                      id="birthDate"
                      $store={useContactFormStore}
                      storeKey="birthDate"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">
                      <FiMapPin size={16} className="inline mr-2" />
                      País *
                    </Label>
                    <Dropdown
                      id="country"
                      $store={useContactFormStore}
                      storeKey="country"
                      options={countryOptions}
                      placeholder="Seleccionar país"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      $store={useContactFormStore}
                      storeKey="city"
                      placeholder="Tu ciudad"
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Configuraciones y Preferencias */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FiSettings className="text-purple-500" size={24} />
                  <Text as="h2" $size="xl" $weight="semibold">
                    Configuraciones y Preferencias
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="language">Idioma preferido</Label>
                    <Dropdown
                      id="language"
                      $store={useContactFormStore}
                      storeKey="language"
                      options={languageOptions}
                      placeholder="Seleccionar idioma"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timezone">Zona horaria</Label>
                    <Dropdown
                      id="timezone"
                      $store={useContactFormStore}
                      storeKey="timezone"
                      options={timezoneOptions}
                      placeholder="Seleccionar zona horaria"
                    />
                  </div>

                  <div>
                    <Label htmlFor="theme">Tema de la aplicación</Label>
                    <div className="space-y-3 mt-2">
                      <RadioButton
                        $store={useContactFormStore}
                        storeKey="theme"
                        name="theme"
                        value="light"
                        label="Claro"
                        description="Tema claro para uso diurno"
                      />
                      <RadioButton
                        $store={useContactFormStore}
                        storeKey="theme"
                        name="theme"
                        value="dark"
                        label="Oscuro"
                        description="Tema oscuro para uso nocturno"
                      />
                      <RadioButton
                        $store={useContactFormStore}
                        storeKey="theme"
                        name="theme"
                        value="auto"
                        label="Automático"
                        description="Sigue las preferencias del sistema"
                      />
                    </div>
                  </div>
                </div>

                {/* Switches para notificaciones */}
                <div className="mt-6">
                  <Text $size="lg" $weight="medium" className="mb-4">
                    Notificaciones
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Text $weight="medium">Notificaciones push</Text>
                        <Text $size="sm" $variant="muted">
                          Alertas en tiempo real
                        </Text>
                      </div>
                      <Switch
                        $store={useContactFormStore}
                        storeKey="notifications"
                        $variant="primary"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Text $weight="medium">Email marketing</Text>
                        <Text $size="sm" $variant="muted">
                          Ofertas y promociones
                        </Text>
                      </div>
                      <Switch
                        $store={useContactFormStore}
                        storeKey="emailMarketing"
                        $variant="secondary"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Text $weight="medium">SMS updates</Text>
                        <Text $size="sm" $variant="muted">
                          Actualizaciones por SMS
                        </Text>
                      </div>
                      <Switch
                        $store={useContactFormStore}
                        storeKey="smsUpdates"
                        $variant="accent"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Mensaje y Comunicación */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FiMail className="text-pink-500" size={24} />
                  <Text as="h2" $size="xl" $weight="semibold">
                    Mensaje y Comunicación
                  </Text>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="subject">Asunto del mensaje</Label>
                      <Input
                        id="subject"
                        $store={useContactFormStore}
                        storeKey="subject"
                        placeholder="Motivo de contacto"
                      />
                    </div>

                    <div>
                      <Label htmlFor="priority">Prioridad</Label>
                      <Dropdown
                        id="priority"
                        $store={useContactFormStore}
                        storeKey="priority"
                        options={priorityOptions}
                        placeholder="Seleccionar prioridad"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje detallado *</Label>
                    <TextArea
                      id="message"
                      $store={useContactFormStore}
                      storeKey="message"
                      placeholder="Escribe tu mensaje aquí... Puedes incluir detalles específicos sobre tu consulta."
                      rows={6}
                      $security="form"
                    />
                  </div>

                  <div>
                    <Text as="h3" $size="lg" $weight="medium" className="mb-3">
                      ¿Cómo prefieres que te contactemos?
                    </Text>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <RadioButton
                        $store={useContactFormStore}
                        storeKey="contactPreference"
                        name="contact-preference"
                        value="email"
                        label="Email"
                        description="Respuesta por correo electrónico"
                      />
                      <RadioButton
                        $store={useContactFormStore}
                        storeKey="contactPreference"
                        name="contact-preference"
                        value="phone"
                        label="Teléfono"
                        description="Llamada telefónica"
                      />
                      <RadioButton
                        $store={useContactFormStore}
                        storeKey="contactPreference"
                        name="contact-preference"
                        value="whatsapp"
                        label="WhatsApp"
                        description="Mensaje por WhatsApp"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Habilidades y Tecnologías */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FiCode className="text-green-500" size={24} />
                  <Text as="h2" $size="xl" $weight="semibold">
                    Habilidades y Tecnologías
                  </Text>
                </div>

                <div className="space-y-6">
                  <div>
                    <Text $size="lg" $weight="medium" className="mb-3">
                      Tus habilidades técnicas
                    </Text>
                    <Text $size="sm" $variant="muted" className="mb-4">
                      Selecciona las tecnologías que conoces o en las que tienes
                      experiencia
                    </Text>

                    <ChipGroup
                      chips={availableSkills}
                      $variant="primary"
                      $selectable
                      $gap="sm"
                      $wrap
                      onChipSelect={(skill, selected) => {
                        const currentSkills = formData.skills;
                        if (selected) {
                          formData.setSkills([...currentSkills, skill]);
                        } else {
                          formData.setSkills(
                            currentSkills.filter((s) => s !== skill)
                          );
                        }
                      }}
                    />

                    {formData.skills.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <Text $size="sm" $weight="medium" className="mb-2">
                          Habilidades seleccionadas ({formData.skills.length}):
                        </Text>
                        <ChipGroup
                          $store={useContactFormStore}
                          storeKey="skills"
                          $variant="success"
                          $removable
                          $gap="sm"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Text $size="lg" $weight="medium" className="mb-3">
                      Áreas de tecnología de interés
                    </Text>
                    <ChipGroup
                      chips={availableTechnologies}
                      $variant="secondary"
                      $selectable
                      $gap="default"
                      $wrap
                      onChipSelect={(tech, selected) => {
                        const currentTech = formData.technologies;
                        if (selected) {
                          formData.setTechnologies([...currentTech, tech]);
                        } else {
                          formData.setTechnologies(
                            currentTech.filter((t) => t !== tech)
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </section>

              <Separator />

              {/* Intereses */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <FiHeart className="text-red-500" size={24} />
                  <Text as="h2" $size="xl" $weight="semibold">
                    Áreas de Interés
                  </Text>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableInterests.map((interest) => (
                    <CheckBox
                      key={interest}
                      $store={useContactFormStore}
                      storeKey="interests"
                      value={interest}
                      label={interest}
                      description={`Interesado en ${interest.toLowerCase()}`}
                    />
                  ))}
                </div>

                {formData.interests.length > 0 && (
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <Text $size="sm" $weight="medium" className="mb-3">
                      Resumen de intereses seleccionados:
                    </Text>
                    <ChipGroup
                      $store={useContactFormStore}
                      storeKey="interests"
                      $variant="accent"
                      $removable
                      $gap="sm"
                    />
                  </div>
                )}
              </section>

              <Separator />

              {/* Botones de acción */}
              <section className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    type="submit"
                    $variant="default"
                    className="flex-1"
                    disabled={formData.isLoading}>
                    {formData.isLoading ? (
                      <>
                        <Spinner $size="sm" className="mr-2" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Formulario Completo'
                    )}
                  </Button>

                  <Button
                    type="button"
                    $variant="outline"
                    onClick={() => formData.reset()}
                    className="flex-1"
                    disabled={formData.isLoading}>
                    Limpiar Todo
                  </Button>
                </div>

                <div className="text-center">
                  <Text $size="sm" $variant="muted">
                    Al enviar este formulario, aceptas nuestros{' '}
                    <Link href="#" $variant="primary">
                      términos de servicio
                    </Link>{' '}
                    y{' '}
                    <Link href="#" $variant="primary">
                      política de privacidad
                    </Link>
                    .
                  </Text>
                </div>
              </section>
            </form>

            {/* Debug info */}
            <Container
              $padding="p-6"
              $backgroundColor="bg-gray-50"
              $borderRadius="rounded-lg"
              className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <FiMonitor className="text-gray-500" size={24} />
                <Text as="h3" $weight="semibold">
                  Estado del Formulario (Debug Mode)
                </Text>
                <Badge $variant="outline">Desarrollo</Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Text $weight="medium" className="mb-2">
                    Campos principales:
                  </Text>
                  <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-auto max-h-48">
                    {JSON.stringify(
                      {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        country: formData.country,
                        message: formData.message,
                        profileCompletion: formData.profileCompletion,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>

                <div>
                  <Text $weight="medium" className="mb-2">
                    Preferencias y selecciones:
                  </Text>
                  <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-auto max-h-48">
                    {JSON.stringify(
                      {
                        contactPreference: formData.contactPreference,
                        notifications: formData.notifications,
                        skills:
                          formData.skills.slice(0, 5) +
                          (formData.skills.length > 5 ? '...' : ''),
                        interests:
                          formData.interests.slice(0, 3) +
                          (formData.interests.length > 3 ? '...' : ''),
                        technologies: formData.technologies,
                        theme: formData.theme,
                        language: formData.language,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  },
};

