import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { useProductCardExamples } from '../../../../stores/productCardExamples.store';
import { Container } from '../../../atoms/layout/Container';
import { Grid } from '../../../atoms/layout/Grid';
import { Text } from '../../../atoms/display/Text';
import { Button } from '../../../atoms/forms/Button';
import { Input } from '../../../atoms/forms/Input';
import { Dropdown } from '../../../atoms/forms/Dropdown';
import { CheckBox } from '../../../atoms/forms/CheckBox';

// Imagen de ejemplo local para demos
const sampleImage = '/src/assets/image-example.png';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/Cards/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ProductCard
      $store={useProductCardExamples}
      storeKey="defaultExample"
      onAddToCart={() => console.log('Agregado al carrito')}
      onToggleFavorite={() => console.log('Favorito cambiado')}
      onQuickView={() => console.log('Vista rápida')}
      onClick={() => console.log('Producto clickeado')}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h2" $size="2xl" $weight="bold" className="mb-6 text-center">
        ProductCard - Variantes
      </Text>

      <Grid $columns={2} $gap="1.5rem" $maxGridWidth="1000px">
        <ProductCard
          $variant="default"
          title="Smartphone Galaxy Pro"
          description="Smartphone de última generación con cámara triple"
          price={899000}
          originalPrice={1199000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
          category="Electrónicos"
          brand="Samsung"
          rating={4.5}
          reviewCount={128}
          discount="-25%"
          onAddToCart={() => console.log('Default: Agregado al carrito')}
        />

        <ProductCard
          $variant="compact"
          title="Laptop Gaming RGB"
          price={1599000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
          category="Computadoras"
          brand="ASUS"
          rating={4.8}
          reviewCount={89}
          isNew
          $showActions={false}
        />

        <ProductCard
          $variant="detailed"
          title="Auriculares Inalámbricos Pro"
          description="Auriculares con cancelación de ruido activa, batería de 30 horas y sonido Hi-Fi premium para la mejor experiencia musical"
          price={299000}
          originalPrice={399000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
          category="Audio"
          brand="Sony"
          rating={4.7}
          reviewCount={342}
          stockCount={23}
          discount="-25%"
          onAddToCart={() => console.log('Detailed: Agregado al carrito')}
          onToggleFavorite={() => console.log('Detailed: Favorito cambiado')}
        />

        <ProductCard
          $variant="minimal"
          title="Smartwatch Series 9"
          price={449000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
          category="Wearables"
          brand="Apple"
          rating={4.6}
          reviewCount={567}
          inStock={false}
          isNew
          $showBadges={false}
          $showRating={false}
        />
      </Grid>
    </Container>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Container $padding="p-6" $backgroundColor="bg-gray-50">
      <Text as="h2" $size="2xl" $weight="bold" className="mb-6 text-center">
        ProductCard - Esquemas de Color
      </Text>

      <Grid $columns={3} $gap="1.5rem" $maxGridWidth="1200px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Default
          </Text>
          <ProductCard
            $colorScheme="default"
            title="Producto Default"
            price={299000}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
            category="Categoría"
            rating={4.5}
            reviewCount={123}
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Secondary
          </Text>
          <ProductCard
            $colorScheme="secondary"
            title="Producto Secondary"
            price={399000}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
            category="Categoría"
            rating={4.7}
            reviewCount={89}
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Accent
          </Text>
          <ProductCard
            $colorScheme="accent"
            title="Producto Accent"
            price={199000}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
            category="Categoría"
            rating={4.3}
            reviewCount={245}
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Destructive
          </Text>
          <ProductCard
            $colorScheme="destructive"
            title="Producto Oferta"
            price={149000}
            originalPrice={299000}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
            category="Oferta"
            rating={4.1}
            reviewCount={67}
            discount="-50%"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Muted
          </Text>
          <ProductCard
            $colorScheme="muted"
            title="Producto Descontinuado"
            price={99000}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"
            category="Liquidación"
            rating={3.8}
            reviewCount={23}
            inStock={false}
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Minimal
          </Text>
          <ProductCard
            $colorScheme="minimal"
            title="Producto Minimal"
            price={599000}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop"
            category="Premium"
            rating={4.9}
            reviewCount={456}
          />
        </Container>
      </Grid>
    </Container>
  ),
};

export const PriceFormatting: Story = {
  render: () => (
    <Container className="space-y-6">
      <Text as="h2" $size="2xl" $weight="bold" className="text-center">
        Formateo de Precios - Casos de Prueba
      </Text>

      <Grid $columns={2} $gap="1.5rem" $maxGridWidth="800px">
        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Decimales largos
          </Text>
          <ProductCard
            title="Producto con Decimales"
            price={1234567.8965}
            originalPrice={2345678.12345}
            currency="₡"
            imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
            category="Test"
            rating={4.5}
            reviewCount={123}
            discount="-47%"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Precios exactos
          </Text>
          <ProductCard
            title="Producto Precio Exacto"
            price={1000000}
            originalPrice={1200000.5}
            currency="$"
            imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
            category="Test"
            rating={4.8}
            reviewCount={89}
            discount="-17%"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Centavos
          </Text>
          <ProductCard
            title="Producto con Centavos"
            price={999.99}
            originalPrice={1499.95}
            currency="€"
            imageUrl="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
            category="Test"
            rating={4.3}
            reviewCount={45}
            discount="-33%"
          />
        </Container>

        <Container>
          <Text $size="sm" $weight="medium" className="mb-2 text-center">
            Solo precio actual
          </Text>
          <ProductCard
            title="Sin Precio Original"
            price={567.123456789}
            currency="£"
            imageUrl="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
            category="Test"
            rating={4.1}
            reviewCount={67}
          />
        </Container>
      </Grid>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Grid $columns={3} $gap="gap-4" className="max-w-4xl">
      <Container>
        <Text $size="sm" $weight="medium" className="mb-2 text-center">
          Small
        </Text>
        <ProductCard
          $size="sm"
          title="Producto Small"
          price={199000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
          category="Audio"
          rating={4.2}
          reviewCount={45}
        />
      </Container>

      <Container>
        <Text $size="sm" $weight="medium" className="mb-2 text-center">
          Default
        </Text>
        <ProductCard
          $size="default"
          title="Producto Default"
          price={399000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
          category="Electrónicos"
          rating={4.5}
          reviewCount={128}
        />
      </Container>

      <Container>
        <Text $size="sm" $weight="medium" className="mb-2 text-center">
          Large
        </Text>
        <ProductCard
          $size="lg"
          title="Producto Large"
          description="Descripción detallada del producto grande"
          price={899000}
          originalPrice={1199000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
          category="Computadoras"
          brand="Premium Brand"
          rating={4.8}
          reviewCount={234}
          discount="-25%"
        />
      </Container>
    </Grid>
  ),
};

export const ProductStates: Story = {
  render: () => (
    <Grid $columns={2} $gap="gap-6" className="max-w-4xl">
      <Container>
        <Text $size="sm" $weight="medium" className="mb-2">
          En Stock - Con Descuento
        </Text>
        <ProductCard
          title="Producto en Oferta"
          price={299000}
          originalPrice={499000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
          category="Audio"
          brand="Sony"
          rating={4.7}
          reviewCount={189}
          stockCount={12}
          discount="-40%"
          onAddToCart={() => console.log('Agregado al carrito')}
          onToggleFavorite={() => console.log('Favorito cambiado')}
        />
      </Container>

      <Container>
        <Text $size="sm" $weight="medium" className="mb-2">
          Producto Nuevo
        </Text>
        <ProductCard
          title="Lanzamiento Exclusivo"
          price={1299000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop"
          category="Smartphones"
          brand="Apple"
          rating={5.0}
          reviewCount={23}
          stockCount={5}
          isNew
          onAddToCart={() => console.log('Producto nuevo agregado')}
          onToggleFavorite={() => console.log('Nuevo favorito')}
        />
      </Container>

      <Container>
        <Text $size="sm" $weight="medium" className="mb-2">
          Agotado
        </Text>
        <ProductCard
          title="Producto Agotado"
          price={599000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop"
          category="Wearables"
          brand="Samsung"
          rating={4.4}
          reviewCount={567}
          inStock={false}
          onToggleFavorite={() => console.log('Favorito en agotado')}
        />
      </Container>

      <Container>
        <Text $size="sm" $weight="medium" className="mb-2">
          Favorito - Stock Bajo
        </Text>
        <ProductCard
          title="Producto Popular"
          price={449000}
          currency="₡"
          imageUrl="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
          category="Computadoras"
          brand="ASUS"
          rating={4.9}
          reviewCount={892}
          stockCount={2}
          isFavorite
          onAddToCart={() => console.log('Stock bajo agregado')}
          onToggleFavorite={() => console.log('Quitar de favoritos')}
        />
      </Container>
    </Grid>
  ),
};

export const WithStore: Story = {
  render: () => {
    const {
      defaultExample,
      toggleFavorite,
      updateStock,
      updatePrice,
      clearAllProducts,
      resetToDefaults,
    } = useProductCardExamples();

    return (
      <Container className="space-y-6">
        <Container $display="flex" $gap="gap-4" $justifyContent="center">
          <Button
            $colorScheme="secondary"
            $size="sm"
            onClick={() => toggleFavorite(defaultExample.id)}>
            Toggle Favorito
          </Button>
          <Button
            $colorScheme="accent"
            $size="sm"
            onClick={() =>
              updateStock(defaultExample.id, !defaultExample.inStock, 25)
            }>
            Toggle Stock
          </Button>
          <Button
            $colorScheme="destructive"
            $size="sm"
            onClick={() =>
              updatePrice(
                defaultExample.id,
                Math.floor(Math.random() * 1000000) + 100000
              )
            }>
            Precio Random
          </Button>
          <Button $colorScheme="muted" $size="sm" onClick={resetToDefaults}>
            Reset
          </Button>
        </Container>

        <ProductCard
          $store={useProductCardExamples}
          storeKey="defaultExample"
          $interactive
          onAddToCart={() => console.log('Store: Agregado al carrito')}
          onToggleFavorite={() => toggleFavorite(defaultExample.id)}
          onQuickView={() => console.log('Store: Vista rápida')}
          onClick={() => console.log('Store: Producto clickeado')}
        />

        <Container className="text-center text-sm text-muted-foreground">
          <Text>Producto ID: {defaultExample.id}</Text>
          <Text>Estado: {defaultExample.inStock ? 'En stock' : 'Agotado'}</Text>
          <Text>Favorito: {defaultExample.isFavorite ? 'Sí' : 'No'}</Text>
          <Text>
            Precio actual: {defaultExample.currency}
            {defaultExample.price.toLocaleString()}
          </Text>
        </Container>
      </Container>
    );
  },
};

export const ProductGrid: Story = {
  render: () => {
    const { variantProducts } = useProductCardExamples();

    return (
      <Container className="space-y-4">
        <Text $size="lg" $weight="bold" className="text-center">
          Catálogo de Productos
        </Text>

        <Grid $columns={3} $gap="gap-4" className="max-w-6xl">
          {variantProducts.map((product) => (
            <ProductCard
              key={product.id}
              $store={useProductCardExamples}
              storeKey={
                variantProducts.findIndex((p) => p.id === product.id) === 0
                  ? 'defaultExample'
                  : variantProducts.findIndex((p) => p.id === product.id) === 1
                  ? 'compactExample'
                  : variantProducts.findIndex((p) => p.id === product.id) === 2
                  ? 'detailedExample'
                  : 'minimalExample'
              }
              $interactive
              onAddToCart={() => console.log(`Agregado: ${product.title}`)}
              onToggleFavorite={() => console.log(`Favorito: ${product.title}`)}
              onQuickView={() => console.log(`Vista rápida: ${product.title}`)}
              onClick={() => console.log(`Clickeado: ${product.title}`)}
            />
          ))}
        </Grid>
      </Container>
    );
  },
};

export const ECommerceDemo: Story = {
  render: () => {
    const {
      variantProducts,
      searchTerm,
      setSearchTerm,
      selectedCategory,
      setSelectedCategory,
      showOnlyInStock,
      setShowOnlyInStock,
      getFilteredProducts,
      getSortedProducts,
      toggleFavorite,
    } = useProductCardExamples();

    const filteredProducts = getSortedProducts(getFilteredProducts());

    return (
      <Container className="space-y-6 max-w-6xl">
        {/* Controles de filtrado */}
        <Container className="space-y-4 p-4 border rounded-lg bg-card">
          <Text $size="lg" $weight="bold">
            Filtros de Búsqueda
          </Text>

          <Grid $columns={3} $gap="gap-4">
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Dropdown
              placeholder="Todas las categorías"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={[
                { value: '', label: 'Todas las categorías' },
                { value: 'Electrónicos', label: 'Electrónicos' },
                { value: 'Computadoras', label: 'Computadoras' },
                { value: 'Audio', label: 'Audio' },
                { value: 'Wearables', label: 'Wearables' },
              ]}
            />

            <Container $display="flex" $alignItems="center" $gap="gap-2">
              <CheckBox
                id="stock-filter"
                checked={showOnlyInStock}
                onChange={(checked) => setShowOnlyInStock(checked)}
                label="Solo en stock"
                $size="lg"
                $colorScheme="default"
              />
            </Container>
          </Grid>
        </Container>

        {/* Resultados */}
        <Container>
          <Text $size="base" className="mb-4">
            {filteredProducts.length} productos encontrados
          </Text>

          <Grid $columns={3} $gap="gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                originalPrice={product.originalPrice}
                currency={product.currency}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                category={product.category}
                brand={product.brand}
                rating={product.rating}
                reviewCount={product.reviewCount}
                inStock={product.inStock}
                stockCount={product.stockCount}
                discount={product.discount}
                isNew={product.isNew}
                isFavorite={product.isFavorite}
                $interactive
                onAddToCart={() =>
                  console.log(`E-commerce: Agregado ${product.title}`)
                }
                onToggleFavorite={() => toggleFavorite(product.id)}
                onQuickView={() =>
                  console.log(`E-commerce: Vista rápida ${product.title}`)
                }
                onClick={() =>
                  console.log(`E-commerce: Ver detalles ${product.title}`)
                }
              />
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <Container className="text-center py-12">
              <Text className="text-muted-foreground">
                No se encontraron productos con los filtros seleccionados
              </Text>
            </Container>
          )}
        </Container>
      </Container>
    );
  },
};

export const RealTimeUpdates: Story = {
  render: () => {
    const {
      defaultExample,
      compactExample,
      detailedExample,
      minimalExample,
      isSimulating,
      toggleSimulation,
      updateInterval,
      setUpdateInterval,
      resetToDefaults,
    } = useProductCardExamples();

    // Usar los productos directamente del store para reactividad
    const realtimeProducts = [
      defaultExample,
      compactExample,
      detailedExample,
      minimalExample,
    ];

    return (
      <Container className="space-y-6">
        <Container className="text-center space-y-4 p-4 border rounded-lg bg-card">
          <Text $size="lg" $weight="bold">
            Simulación en Tiempo Real
          </Text>
          <Text $size="sm" className="text-muted-foreground">
            Simula cambios automáticos en precios, stock y ratings
          </Text>

          <Container
            $display="flex"
            $gap="gap-4"
            $justifyContent="center"
            $alignItems="center">
            <Button
              $colorScheme={isSimulating ? 'destructive' : 'default'}
              onClick={toggleSimulation}>
              {isSimulating ? 'Detener' : 'Iniciar'} Simulación
            </Button>

            <Container $display="flex" $alignItems="center" $gap="gap-2">
              <Text $size="sm">Intervalo:</Text>
              <select
                value={updateInterval}
                onChange={(e) => setUpdateInterval(Number(e.target.value))}
                className="px-2 py-1 border rounded text-sm">
                <option value={1000}>1s</option>
                <option value={3000}>3s</option>
                <option value={5000}>5s</option>
                <option value={10000}>10s</option>
              </select>
            </Container>

            <Button $colorScheme="muted" $size="sm" onClick={resetToDefaults}>
              Reset
            </Button>
          </Container>
        </Container>

        <Grid $columns={2} $gap="1.5rem">
          {realtimeProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              currency={product.currency}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
              category={product.category}
              brand={product.brand}
              rating={product.rating}
              reviewCount={product.reviewCount}
              inStock={product.inStock}
              stockCount={product.stockCount}
              discount={product.discount}
              isNew={product.isNew}
              isFavorite={product.isFavorite}
              $variant="detailed"
              $interactive
              onAddToCart={() =>
                console.log(`Tiempo real: Agregado ${product.title}`)
              }
              onToggleFavorite={() =>
                console.log(`Tiempo real: Favorito ${product.title}`)
              }
              onQuickView={() =>
                console.log(`Tiempo real: Vista rápida ${product.title}`)
              }
              onClick={() =>
                console.log(`Tiempo real: Clickeado ${product.title}`)
              }
            />
          ))}
        </Grid>

        {isSimulating && (
          <Container className="text-center text-sm text-muted-foreground">
            <Text>
              🔄 Simulación activa - Los productos se actualizan cada{' '}
              {updateInterval / 1000}s
            </Text>
            <Text $size="xs" className="mt-1">
              Revisa la consola para ver los logs de actualización
            </Text>
          </Container>
        )}
      </Container>
    );
  },
};

// Demostración de Overflow de Imagen
export const ImageOverflowDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">
          🎯 Overflow de Imagen en ProductCard
        </h3>
        <p className="text-muted-foreground">
          Observa cómo las imágenes pueden sobresalir del contenedor para
          efectos visuales impactantes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sin overflow - normal */}
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-green-700">
            📱 Normal (100%)
          </h4>
          <div className="border-2 border-dashed border-green-300 p-6 bg-green-50">
            <ProductCard
              title="Producto Normal"
              price="25000"
              originalPrice="30000"
              description="Imagen sin overflow"
              imageUrl={sampleImage}
              category="Tecnología"
              rating={4.5}
              reviewCount={128}
              $imageOverflow="none"
              $showActions={true}
              onAddToCart={() => console.log('Agregado al carrito')}
              onToggleFavorite={() => console.log('Favorito cambiado')}
            />
          </div>
          <p className="text-sm text-green-600 text-center">
            Imagen respeta los límites del contenedor
          </p>
        </div>

        {/* Overflow superior - 3% */}
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-blue-700">
            ⬆️ Superior (103%)
          </h4>
          <div className="border-2 border-dashed border-blue-300 p-6 bg-blue-50">
            <ProductCard
              title="Producto Destacado"
              price="45000"
              originalPrice="50000"
              description="Imagen con overflow superior"
              imageUrl={sampleImage}
              category="Premium"
              rating={4.8}
              reviewCount={89}
              isNew={true}
              $imageOverflow="top"
              $showActions={true}
              onAddToCart={() => console.log('Agregado al carrito')}
              onToggleFavorite={() => console.log('Favorito cambiado')}
            />
          </div>
          <p className="text-sm text-blue-600 text-center">
            Imagen sobresale por arriba y se escala 3%
          </p>
        </div>

        {/* Overflow completo - 10% */}
        <div className="space-y-4">
          <h4 className="text-center font-semibold text-purple-700">
            🚀 Completo (110%)
          </h4>
          <div className="border-2 border-dashed border-purple-300 p-6 bg-purple-50">
            <ProductCard
              title="Producto Premium"
              price="89000"
              originalPrice="99000"
              description="Imagen con overflow completo"
              imageUrl={sampleImage}
              category="Exclusivo"
              rating={5.0}
              reviewCount={245}
              isNew={true}
              discount="-10%"
              $imageOverflow="all"
              $showActions={true}
              onAddToCart={() => console.log('Agregado al carrito')}
              onToggleFavorite={() => console.log('Favorito cambiado')}
            />
          </div>
          <p className="text-sm text-purple-600 text-center">
            Imagen se agranda 10% y sobresale verticalmente
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h5 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span>💡</span> Funcionalidad de Overflow en ProductCard
        </h5>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            <strong>🎯 Casos de uso:</strong> Productos destacados, ofertas
            especiales, items premium, productos nuevos que necesitan llamar la
            atención.
          </p>
          <p>
            <strong>✨ Características:</strong> Escalado automático,
            transparencia opcional, espaciado inteligente del contenido,
            transiciones suaves.
          </p>
          <p>
            <strong>🔧 Implementación:</strong> Misma funcionalidad que
            ImageCard - props $imageOverflow y $imageBgColor para control total.
          </p>
        </div>
      </div>
    </div>
  ),
};

// Comparación de Object Fit en Overflow para ProductCard
export const ObjectFitComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">
          Comparación Object Fit en ProductCard con Overflow
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Muestra cómo diferentes valores de object-fit afectan las imágenes de
          productos con overflow. Por defecto, los productos con overflow usan
          "contain" para mostrar el producto completo sin recortes.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="border-2 border-dashed border-red-300 p-4 bg-red-50">
            <ProductCard
              title="iPhone 15 Pro"
              price="120000"
              originalPrice="130000"
              imageUrl={sampleImage}
              category="Smartphones"
              rating={4.9}
              isNew={true}
              $imageOverflow="all"
              $imageBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              // Forzar cover para mostrar la diferencia
              className="[&_img]:object-cover"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-red-700">cover</p>
            <p className="text-xs text-muted-foreground">
              Recorta la imagen del producto
            </p>
            <span className="text-xs text-red-600 font-medium">
              ❌ No recomendado
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border-2 border-dashed border-green-300 p-4 bg-green-50">
            <ProductCard
              title="iPhone 15 Pro"
              price="120000"
              originalPrice="130000"
              imageUrl={sampleImage}
              category="Smartphones"
              rating={4.9}
              isNew={true}
              $imageOverflow="all"
              $imageBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              // contain es el valor por defecto para overflow
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-green-700">
              contain (automático)
            </p>
            <p className="text-xs text-muted-foreground">
              Muestra el producto completo
            </p>
            <span className="text-xs text-green-600 font-medium">
              ✅ Recomendado
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border-2 border-dashed border-orange-300 p-4 bg-orange-50">
            <ProductCard
              title="iPhone 15 Pro"
              price="120000"
              originalPrice="130000"
              imageUrl={sampleImage}
              category="Smartphones"
              rating={4.9}
              isNew={true}
              $imageOverflow="all"
              $imageBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              // Forzar fill para mostrar la diferencia
              className="[&_img]:object-fill"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-orange-700">fill</p>
            <p className="text-xs text-muted-foreground">
              Estira y deforma el producto
            </p>
            <span className="text-xs text-orange-600 font-medium">
              ⚠️ Usar con cuidado
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">
            💡 Comportamiento Automático
          </h5>
          <p className="text-sm text-blue-800">
            Cuando{' '}
            <code className="bg-blue-100 px-1 rounded">$imageOverflow</code>{' '}
            está activo, ProductCard automáticamente usa{' '}
            <code className="bg-blue-100 px-1 rounded">
              object-fit: contain
            </code>{' '}
            para mostrar el producto completo sin recortes.
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h5 className="font-medium text-green-900 mb-2">🎯 Recomendación</h5>
          <p className="text-sm text-green-800">
            Para e-commerce, siempre es mejor mostrar el producto completo. Los
            clientes necesitan ver exactamente lo que están comprando.
          </p>
        </div>
      </div>
    </div>
  ),
};

// Demostración del Overlay Corregido con Overflow
export const OverlayAndBordersDemo: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">
          Overlay y Bordes Redondeados con Overflow
        </h4>
        <p className="text-sm text-muted-foreground mb-6">
          Demuestra cómo el overlay aparece correctamente por encima de las
          imágenes con overflow y cómo los bordes redondeados se adaptan
          automáticamente. <strong>Haz hover para ver el overlay.</strong>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="border-2 border-dashed border-blue-300 p-4 bg-blue-50">
            <ProductCard
              title="Sin Overflow"
              price="25000"
              originalPrice="30000"
              imageUrl={sampleImage}
              category="Normal"
              rating={4.5}
              reviewCount={89}
              $showActions={true}
              onAddToCart={() => console.log('Carrito - Sin overflow')}
              onToggleFavorite={() => console.log('Favorito - Sin overflow')}
              onMoreActions={() => console.log('Más acciones - Sin overflow')}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-700">
              Sin overflow (normal)
            </p>
            <p className="text-xs text-muted-foreground">
              Overlay con bordes rounded-lg
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border-2 border-dashed border-green-300 p-4 bg-green-50">
            <ProductCard
              title="Overflow Superior"
              price="45000"
              originalPrice="50000"
              imageUrl={sampleImage}
              category="Destacado"
              rating={4.8}
              reviewCount={156}
              isNew={true}
              $imageOverflow="top"
              $showActions={true}
              $showBadges={true}
              onAddToCart={() => console.log('Carrito - Overflow top')}
              onToggleFavorite={() => console.log('Favorito - Overflow top')}
              onMoreActions={() => console.log('Más acciones - Overflow top')}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-green-700">Overflow top</p>
            <p className="text-xs text-muted-foreground">
              Overlay con bordes rounded-t-xl
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="border-2 border-dashed border-purple-300 p-4 bg-purple-50">
            <ProductCard
              title="Overflow Completo"
              price="89000"
              originalPrice="99000"
              imageUrl={sampleImage}
              category="Premium"
              rating={5.0}
              reviewCount={312}
              isNew={true}
              discount="-10%"
              $imageOverflow="all"
              $imageBgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              $showActions={true}
              $showBadges={true}
              onAddToCart={() => console.log('Carrito - Overflow all')}
              onToggleFavorite={() => console.log('Favorito - Overflow all')}
              onMoreActions={() => console.log('Más acciones - Overflow all')}
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-purple-700">Overflow all</p>
            <p className="text-xs text-muted-foreground">
              Overlay con bordes rounded-xl
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-medium text-green-900 mb-2 flex items-center gap-2">
            <span>✅</span> Z-Index Corregido
          </h5>
          <div className="space-y-1 text-sm text-green-800">
            <p>
              • Imagen con overflow: <code>z-10</code>
            </p>
            <p>
              • Overlay de acciones: <code>z-20</code>
            </p>
            <p>
              • Badges y botones: <code>z-30</code>
            </p>
            <p>
              • <strong>Resultado</strong>: Todo es clickeable
            </p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <span>🎨</span> Bordes Adaptativos
          </h5>
          <div className="space-y-1 text-sm text-blue-800">
            <p>
              • Sin overflow: <code>rounded-lg</code>
            </p>
            <p>
              • Overflow top: <code>rounded-t-xl</code>
            </p>
            <p>
              • Overflow all: <code>rounded-xl</code>
            </p>
            <p>
              • <strong>Resultado</strong>: Consistencia visual
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h5 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
          <span>💡</span> Cómo Probar
        </h5>
        <p className="text-sm text-yellow-800">
          <strong>Haz hover sobre cada ProductCard</strong> para ver cómo el
          overlay aparece por encima de la imagen (incluso con overflow) y cómo
          los bordes redondeados coinciden perfectamente con el contenedor.
          Todos los botones del overlay son clickeables.
        </p>
      </div>
    </div>
  ),
};

