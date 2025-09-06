import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from './ArticleCard';
import { useArticleCardExamples } from '../../../../stores/articleCardExamples.store';
import { Grid } from '../../../atoms/layout/Grid';
import { Container } from '../../../atoms/layout/Container';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';

const meta: Meta<typeof ArticleCard> = {
  title: 'Molecules/Cards/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ✅ Stories obligatorias con storeKey pattern:

export const Default: Story = {
  render: () => (
    <ArticleCard
      $store={useArticleCardExamples}
      storeKey="defaultExample"
      $interactive
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Variantes de ArticleCard
      </Text>

      <Grid $columns={2} $gap="2rem" $maxGridWidth="1200px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Default
          </Text>
          <ArticleCard
            title="Guía Completa de React Hooks"
            excerpt="Aprende todo sobre React Hooks con ejemplos prácticos y casos de uso reales. Desde useState hasta hooks personalizados."
            author="Ana García"
            authorAvatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop"
            category="React"
            tags={['JavaScript', 'React', 'Frontend']}
            readTime={8}
            views={1250}
            likes={89}
            publishedDate="2024-01-15"
            imageUrl="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
            $variant="default"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Compact
          </Text>
          <ArticleCard
            title="Optimización de Performance en Next.js"
            excerpt="Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones Next.js."
            author="Carlos Ruiz"
            authorAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
            category="Next.js"
            tags={['Next.js', 'Performance']}
            readTime={12}
            views={890}
            publishedDate="2024-01-10"
            imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
            $variant="compact"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Detailed
          </Text>
          <ArticleCard
            title="Estado del Arte en TypeScript 2024"
            excerpt="Explora las últimas características de TypeScript y cómo pueden mejorar tu desarrollo. Incluye ejemplos de tipos avanzados y herramientas."
            author="María López"
            authorAvatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
            category="TypeScript"
            tags={['TypeScript', 'JavaScript', 'Desarrollo']}
            readTime={15}
            views={2100}
            likes={156}
            isBookmarked
            isFeatured
            difficulty="intermediate"
            publishedDate="2024-01-20"
            imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
            $variant="detailed"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Minimal
          </Text>
          <ArticleCard
            title="Introducción a Tailwind CSS"
            author="Pedro Sánchez"
            category="CSS"
            readTime={5}
            publishedDate="2024-01-05"
            $variant="minimal"
            $interactive
          />
        </Container>
      </Grid>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Tamaños de ArticleCard
      </Text>

      <Grid $columns={3} $gap="1.5rem" $maxGridWidth="1000px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Small
          </Text>
          <ArticleCard
            title="CSS Grid vs Flexbox"
            author="Laura Martín"
            category="CSS"
            readTime={6}
            views={567}
            publishedDate="2024-01-12"
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
            $size="sm"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Default
          </Text>
          <ArticleCard
            title="Guía de Accesibilidad Web"
            excerpt="Principios fundamentales para crear aplicaciones web accesibles para todos."
            author="José Torres"
            category="Accesibilidad"
            tags={['A11y', 'Web', 'UX']}
            readTime={10}
            views={1120}
            likes={78}
            publishedDate="2024-01-18"
            imageUrl="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop"
            $size="default"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Large
          </Text>
          <ArticleCard
            title="Arquitectura de Microservicios"
            excerpt="Todo lo que necesitas saber sobre microservicios: patrones, beneficios, desafíos y mejores prácticas para implementación."
            author="Roberto Kim"
            authorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
            category="Arquitectura"
            tags={['Microservicios', 'Backend', 'DevOps']}
            readTime={20}
            views={3400}
            likes={234}
            isFeatured
            difficulty="advanced"
            publishedDate="2024-01-25"
            imageUrl="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
            $size="lg"
            $interactive
          />
        </Container>
      </Grid>
    </Container>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Esquemas de Color
      </Text>

      <Grid $columns={2} $gap="2rem" $maxGridWidth="1000px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Default
          </Text>
          <ArticleCard
            title="Desarrollo con React"
            author="Ana Silva"
            category="React"
            readTime={8}
            publishedDate="2024-01-15"
            $colorScheme="default"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Secondary
          </Text>
          <ArticleCard
            title="Vue.js vs React"
            author="Carlos Mendez"
            category="Frontend"
            readTime={12}
            publishedDate="2024-01-20"
            $colorScheme="secondary"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Accent
          </Text>
          <ArticleCard
            title="Diseño de Sistemas"
            author="María González"
            category="Design"
            readTime={15}
            publishedDate="2024-01-25"
            $colorScheme="accent"
            $interactive
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-3 text-center">
            Minimal
          </Text>
          <ArticleCard
            title="Clean Code Principles"
            author="Pedro Ruiz"
            category="Programming"
            readTime={10}
            publishedDate="2024-01-30"
            $colorScheme="minimal"
            $interactive
          />
        </Container>
      </Grid>
    </Container>
  ),
};

export const WithStore: Story = {
  render: () => {
    const { clearAllArticleCard } = useArticleCardExamples();

    return (
      <Container className="space-y-6">
        <Text as="h2" $size="2xl" $weight="bold" className="text-center">
          ArticleCard con Store
        </Text>

        <Container className="max-w-md mx-auto">
          <ArticleCard
            $store={useArticleCardExamples}
            storeKey="storeExample"
            $interactive
          />

          <Container className="mt-4 text-center">
            <Button
              onClick={clearAllArticleCard}
              $colorScheme="outline"
              $size="sm">
              Limpiar Store
            </Button>
          </Container>
        </Container>
      </Container>
    );
  },
};

export const FeaturedArticles: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Artículos Destacados
      </Text>

      <Grid $columns={1} $gap="1.5rem" $maxGridWidth="800px">
        <ArticleCard
          title="El Futuro del Desarrollo Web: Tendencias 2024"
          excerpt="Exploramos las tendencias más importantes que están definiendo el desarrollo web en 2024. Desde nuevos frameworks hasta herramientas de IA."
          author="Sofia Restrepo"
          authorAvatar="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
          category="Tendencias"
          tags={['Web Dev', 'Tendencias', 'IA', 'Frameworks']}
          readTime={25}
          views={5600}
          likes={423}
          isBookmarked
          isFeatured
          difficulty="intermediate"
          publishedDate="2024-02-01"
          imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=600&fit=crop"
          $interactive
          onReadMore={() => alert('Leyendo artículo completo...')}
          onToggleBookmark={() => alert('Bookmark toggled!')}
          onToggleLike={() => alert('Like toggled!')}
          onShare={() => alert('Compartiendo artículo...')}
        />

        <ArticleCard
          title="Guía Completa de Testing en React"
          excerpt="Aprende a escribir tests efectivos para tus componentes React. Cubrimos Jest, React Testing Library y estrategias de testing."
          author="Miguel Torres"
          authorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
          category="Testing"
          tags={['React', 'Testing', 'Jest', 'Quality']}
          readTime={18}
          views={3200}
          likes={187}
          isFeatured
          isSponsored
          difficulty="advanced"
          publishedDate="2024-01-28"
          imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop"
          $interactive
        />
      </Grid>
    </Container>
  ),
};

export const CompactList: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Lista Compacta de Artículos
      </Text>

      <Container className="max-w-2xl mx-auto space-y-3">
        {[
          {
            title: 'Introducción a GraphQL',
            author: 'Elena Vargas',
            category: 'GraphQL',
            readTime: 7,
            views: 890,
            publishedDate: '2024-01-15',
          },
          {
            title: 'Docker para Desarrolladores',
            author: 'Andrés Castro',
            category: 'DevOps',
            readTime: 12,
            views: 1200,
            publishedDate: '2024-01-10',
          },
          {
            title: 'Performance en JavaScript',
            author: 'Carmen Díaz',
            category: 'JavaScript',
            readTime: 9,
            views: 756,
            publishedDate: '2024-01-05',
          },
          {
            title: 'Diseño de APIs REST',
            author: 'Luis Moreno',
            category: 'API Design',
            readTime: 15,
            views: 1450,
            publishedDate: '2024-01-01',
          },
        ].map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            author={article.author}
            category={article.category}
            readTime={article.readTime}
            views={article.views}
            publishedDate={article.publishedDate}
            $variant="compact"
            $interactive
            onClick={() => alert(`Abriendo: ${article.title}`)}
          />
        ))}
      </Container>
    </Container>
  ),
};

export const InteractiveDemo: Story = {
  render: () => {
    const {
      interactiveExample,
      setInteractiveExample,
      isSimulating,
      toggleSimulation,
      updateInterval,
      setUpdateInterval,
      clearAllArticleCard,
      resetToDefaults,
    } = useArticleCardExamples();

    return (
      <Container className="space-y-6">
        <Text as="h2" $size="2xl" $weight="bold" className="text-center">
          Demo Interactivo - ArticleCard
        </Text>

        {/* Panel de Control */}
        <Container className="text-center space-y-4 p-4 border rounded-lg bg-card">
          <Text $size="lg" $weight="bold">
            Simulación en Tiempo Real
          </Text>
          <Text $size="sm" className="text-muted-foreground">
            Simula cambios automáticos en views, likes y estado de bookmark
          </Text>

          <Container className="flex gap-4 justify-center items-center flex-wrap">
            <Button
              $colorScheme={isSimulating ? 'destructive' : 'default'}
              onClick={toggleSimulation}>
              {isSimulating ? '⏹️ Detener' : '▶️ Iniciar'} Simulación
            </Button>

            <Container className="flex items-center gap-2">
              <Text $size="sm">Intervalo:</Text>
              <select
                value={updateInterval}
                onChange={(e) => setUpdateInterval(Number(e.target.value))}
                className="px-2 py-1 border rounded text-sm">
                <option value={1000}>1s</option>
                <option value={2000}>2s</option>
                <option value={3000}>3s</option>
                <option value={5000}>5s</option>
              </select>
            </Container>

            <Text $size="sm" className="text-muted-foreground">
              Estado: {isSimulating ? '🔄 Simulando...' : '⏸️ Pausado'}
            </Text>
          </Container>

          {/* Métricas en tiempo real */}
          <Container className="grid grid-cols-3 gap-4 mt-4 text-center">
            <Container className="p-2 bg-blue-50 rounded">
              <Text $size="sm" $weight="bold" className="text-blue-600">
                {interactiveExample.views || 0}
              </Text>
              <Text $size="xs" className="text-blue-500">
                Views
              </Text>
            </Container>
            <Container className="p-2 bg-red-50 rounded">
              <Text $size="sm" $weight="bold" className="text-red-600">
                {interactiveExample.likes || 0}
              </Text>
              <Text $size="xs" className="text-red-500">
                Likes
              </Text>
            </Container>
            <Container className="p-2 bg-purple-50 rounded">
              <Text $size="sm" $weight="bold" className="text-purple-600">
                {interactiveExample.isBookmarked ? '⭐' : '☆'}
              </Text>
              <Text $size="xs" className="text-purple-500">
                Bookmark
              </Text>
            </Container>
          </Container>
        </Container>

        <Container className="max-w-md mx-auto space-y-4">
          <ArticleCard
            $store={useArticleCardExamples}
            storeKey="interactiveExample"
            $interactive
            onReadMore={() => alert('Navegando al artículo completo...')}
            onToggleBookmark={() => {
              const current = interactiveExample;
              setInteractiveExample({
                ...current,
                isBookmarked: !current.isBookmarked,
              });
            }}
            onToggleLike={() => {
              const current = interactiveExample;
              setInteractiveExample({
                ...current,
                likes: current.isLiked
                  ? (current.likes || 0) - 1
                  : (current.likes || 0) + 1,
                isLiked: !current.isLiked,
              });
            }}
            onShare={() => {
              navigator.clipboard.writeText(
                `${interactiveExample.title} por ${interactiveExample.author}`
              );
              alert('¡Enlace copiado al portapapeles!');
            }}
            onAuthorClick={() =>
              alert(`Ver perfil de ${interactiveExample.author}`)
            }
            onCategoryClick={() =>
              alert(`Ver categoría: ${interactiveExample.category}`)
            }
            onTagClick={(tag) => alert(`Ver artículos con tag: ${tag}`)}
          />

          <Container className="flex gap-2 justify-center">
            <Button
              onClick={clearAllArticleCard}
              $colorScheme="outline"
              $size="sm">
              Reset All
            </Button>
            <Button
              onClick={() => {
                const current = interactiveExample;
                setInteractiveExample({
                  ...current,
                  views:
                    (current.views || 0) + Math.floor(Math.random() * 10) + 1,
                });
              }}
              $colorScheme="secondary"
              $size="sm">
              +Views
            </Button>
          </Container>
        </Container>
      </Container>
    );
  },
};

