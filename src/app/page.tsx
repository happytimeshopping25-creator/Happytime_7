import dynamic from 'next/dynamic'
// import { notFound } from 'next/navigation'

// import { dc } from '@/lib/data-connect'
// import { getCollectionsByPage } from '@firebasegen/default-connector'

import Hero from '@/components/sections/hero'
import CategoryCard from '@/components/ui/category-card'

const Details = dynamic(() => import('@/components/sections/details'))
const CardCarousel = dynamic(() => import('@/components/sections/card-carousel'))
const CardOverlay = dynamic(() => import('@/components/card-overlay'))
const ProductGrid = dynamic(() => import('@/components/sections/product-grid'))

export default async function Home() {
  // Mock data to replace Data Connect
  const collectionsData = {
    collections: [
      {
        id: '1',
        handle: 'o24-collection',
        name: 'O24 Collection',
        description: 'A collection of our finest products.',
        featuredImage: { url: 'https://via.placeholder.com/800x400' },
        products_via_ProductCollection: [],
      },
      {
        id: '2',
        handle: 'mist-collection',
        name: 'Mist Collection',
        description: 'A refreshing collection for the modern home.',
        featuredImage: { url: 'https://via.placeholder.com/800x400' },
        products_via_ProductCollection: [],
      },
      {
        id: '3',
        handle: 'winter-collection',
        name: 'Winter Collection',
        description: 'Stay warm and stylish this winter.',
        featuredImage: { url: 'https://via.placeholder.com/800x400' },
        products_via_ProductCollection: [],
      },
    ],
  }

  const [mainCollection, secondaryCollection, tertiaryCollection] = [
    ...(collectionsData?.collections || []),
  ].sort((a, b) => {
    const order: Record<string, number> = {
      'o24-collection': 1,
      'mist-collection': 2,
      'winter-collection': 3,
    }
    return (order[a.handle] || 99) - (order[b.handle] || 99)
  })

  // if (!collectionsData?.collections?.length) return notFound()

  return (
    <>
      <Hero
        title={mainCollection?.name as string}
        description={mainCollection?.description as string}
        image={mainCollection?.featuredImage?.url as string}
        primaryCta={{ label: 'Shop Now', href: `/category/${mainCollection?.handle}` }}
        secondaryCta={{ label: 'Learn More', href: `/category/${mainCollection?.handle}#about` }}
      />
      <Details title="About" body={mainCollection?.description as string} />
      <CardCarousel title="Explore" cta={{ label: 'Shop All', href: '/products' }}>
        {collectionsData?.collections
          .filter((collection) => Boolean(collection?.featuredImage?.url))
          .map((collection) => (
            <CategoryCard
              key={collection.id}
              handle={collection.handle}
              name={collection.name}
              image={collection.featuredImage?.url || ''}
            />
          ))}
      </CardCarousel>
      <CardOverlay
        title={secondaryCollection?.name as string}
        description={secondaryCollection?.description as string}
        cta={{ label: 'Shop Now', href: `/category/${secondaryCollection?.handle}` }}
        image={secondaryCollection?.featuredImage?.url as string}
      />
      <ProductGrid
        title={tertiaryCollection?.name as string}
        variant="character"
        products={tertiaryCollection?.products_via_ProductCollection.map((product) => ({
          id: product.id,
          title: product.title,
          handle: product.handle,
          price: '',
          image: '',
          variants: [],
        }))}
      />
    </>
  )
}
