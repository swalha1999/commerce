import { HIDDEN_PRODUCT_TAG, TAGS } from '@/lib/constants';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag
} from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct
} from './types';

// Mock data configuration
const MOCK_DELAY = 500; // Simulate network delay for more realistic testing

// Mock data storage
const mockProducts: Product[] = [
  {
    id: 'mock-product-1',
    handle: 'classic-tee',
    availableForSale: true,
    title: 'Classic T-Shirt',
    description: 'A comfortable classic t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    descriptionHtml: '<p>A comfortable classic t-shirt made from 100% organic cotton. Perfect for everyday wear.</p>',
    options: [
      { id: 'size', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
      { id: 'color', name: 'Color', values: ['Black', 'White', 'Navy', 'Gray'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '29.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '29.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-1',
        title: 'Small / Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: 'S' },
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '29.99', currencyCode: 'USD' }
      },
      {
        id: 'variant-2',
        title: 'Medium / White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: 'M' },
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '29.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: {
      url: '/images/classic-tee.jpg',
      altText: 'Classic T-Shirt',
      width: 800,
      height: 800
    },
    images: [
      { url: '/images/classic-tee-1.jpg', altText: 'Classic T-Shirt Front', width: 800, height: 800 },
      { url: '/images/classic-tee-2.jpg', altText: 'Classic T-Shirt Back', width: 800, height: 800 }
    ],
    seo: {
      title: 'Classic T-Shirt',
      description: 'Comfortable organic cotton t-shirt for everyday wear'
    },
    tags: ['t-shirt', 'cotton', 'organic', 'basics'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-product-2',
    handle: 'denim-jeans',
    availableForSale: true,
    title: 'Slim Fit Denim Jeans',
    description: 'Premium denim jeans with a modern slim fit. Made from high-quality Japanese denim.',
    descriptionHtml: '<p>Premium denim jeans with a modern slim fit. Made from high-quality Japanese denim.</p>',
    options: [
      { id: 'size', name: 'Size', values: ['28', '30', '32', '34', '36'] },
      { id: 'wash', name: 'Wash', values: ['Dark', 'Medium', 'Light'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '89.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '89.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-3',
        title: '32 / Dark',
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: '32' },
          { name: 'Wash', value: 'Dark' }
        ],
        price: { amount: '89.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: {
      url: '/images/denim-jeans.jpg',
      altText: 'Slim Fit Denim Jeans',
      width: 800,
      height: 800
    },
    images: [
      { url: '/images/denim-jeans-1.jpg', altText: 'Denim Jeans Front', width: 800, height: 800 },
      { url: '/images/denim-jeans-2.jpg', altText: 'Denim Jeans Detail', width: 800, height: 800 }
    ],
    seo: {
      title: 'Slim Fit Denim Jeans',
      description: 'Premium Japanese denim with modern slim fit'
    },
    tags: ['jeans', 'denim', 'premium', 'slim-fit'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'mock-product-3',
    handle: 'canvas-sneakers',
    availableForSale: true,
    title: 'Canvas Sneakers',
    description: 'Classic canvas sneakers perfect for casual wear. Comfortable and versatile.',
    descriptionHtml: '<p>Classic canvas sneakers perfect for casual wear. Comfortable and versatile.</p>',
    options: [
      { id: 'size', name: 'Size', values: ['7', '8', '9', '10', '11', '12'] },
      { id: 'color', name: 'Color', values: ['White', 'Black', 'Navy', 'Red'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '59.99', currencyCode: 'USD' },
      maxVariantPrice: { amount: '59.99', currencyCode: 'USD' }
    },
    variants: [
      {
        id: 'variant-4',
        title: '9 / White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Size', value: '9' },
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '59.99', currencyCode: 'USD' }
      }
    ],
    featuredImage: {
      url: '/images/canvas-sneakers.jpg',
      altText: 'Canvas Sneakers',
      width: 800,
      height: 800
    },
    images: [
      { url: '/images/canvas-sneakers-1.jpg', altText: 'Canvas Sneakers Side', width: 800, height: 800 },
      { url: '/images/canvas-sneakers-2.jpg', altText: 'Canvas Sneakers Top', width: 800, height: 800 }
    ],
    seo: {
      title: 'Canvas Sneakers',
      description: 'Classic canvas sneakers for casual wear'
    },
    tags: ['sneakers', 'canvas', 'casual', 'unisex'],
    updatedAt: new Date().toISOString()
  }
];

const mockCollections: Collection[] = [
  {
    handle: 'all',
    title: 'All Products',
    description: 'Browse our complete collection of high-quality products',
    seo: {
      title: 'All Products',
      description: 'Complete product catalog'
    },
    path: '/search',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'tops',
    title: 'Tops',
    description: 'Stylish tops and t-shirts for every occasion',
    seo: {
      title: 'Tops',
      description: 'Collection of stylish tops and t-shirts'
    },
    path: '/search/tops',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'bottoms',
    title: 'Bottoms',
    description: 'Premium denim and pants collection',
    seo: {
      title: 'Bottoms',
      description: 'Premium denim and pants'
    },
    path: '/search/bottoms',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'footwear',
    title: 'Footwear',
    description: 'Comfortable and stylish shoes for everyday wear',
    seo: {
      title: 'Footwear',
      description: 'Stylish and comfortable footwear'
    },
    path: '/search/footwear',
    updatedAt: new Date().toISOString()
  }
];

const mockPages: Page[] = [
  {
    id: 'page-about',
    title: 'About Us',
    handle: 'about',
    body: '<h2>About Our Brand</h2><p>We are dedicated to providing high-quality, sustainable fashion that doesn\'t compromise on style.</p>',
    bodySummary: 'Learn more about our commitment to quality and sustainability.',
    seo: {
      title: 'About Us',
      description: 'Learn about our brand story and commitment to quality'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-contact',
    title: 'Contact',
    handle: 'contact',
    body: '<h2>Get in Touch</h2><p>We\'d love to hear from you! Reach out with any questions or feedback.</p>',
    bodySummary: 'Contact us for any questions or support.',
    seo: {
      title: 'Contact Us',
      description: 'Get in touch with our team'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock cart storage (in-memory for demo)
let mockCarts: { [cartId: string]: Cart } = {};
let cartCounter = 1;

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (
  collection: ShopifyCollection
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  console.log('🛒 MOCK: Creating new cart');
  
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const cartId = `mock-cart-${cartCounter++}`;
  const newCart: Cart = {
    id: cartId,
    checkoutUrl: '#',
    cost: {
      subtotalAmount: { amount: '0.00', currencyCode: 'USD' },
      totalAmount: { amount: '0.00', currencyCode: 'USD' },
      totalTaxAmount: { amount: '0.00', currencyCode: 'USD' }
    },
    lines: [],
    totalQuantity: 0
  };
  
  mockCarts[cartId] = newCart;
  console.log('✅ MOCK: Cart created successfully', { cartId });
  
  return newCart;
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  console.log('🛒 MOCK: Adding items to cart', { cartId, lines });
  
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const cart = mockCarts[cartId];
  if (!cart) {
    throw new Error('Cart not found');
  }
  
  lines.forEach(line => {
    const product = mockProducts.find(p => p.variants.some(v => v.id === line.merchandiseId));
    const variant = product?.variants.find(v => v.id === line.merchandiseId);
    
    if (product && variant) {
      const existingLineIndex = cart.lines.findIndex(
        l => l.merchandise.id === line.merchandiseId
      );
      
      if (existingLineIndex >= 0) {
        cart.lines[existingLineIndex].quantity += line.quantity;
      } else {
        cart.lines.push({
          id: `line-${Date.now()}`,
          quantity: line.quantity,
          cost: {
            totalAmount: {
              amount: (parseFloat(variant.price.amount) * line.quantity).toFixed(2),
              currencyCode: variant.price.currencyCode
            }
          },
          merchandise: {
            id: variant.id,
            title: variant.title,
            selectedOptions: variant.selectedOptions,
            product: {
              id: product.id,
              handle: product.handle,
              title: product.title,
              featuredImage: product.featuredImage
            }
          }
        });
      }
      
      cart.totalQuantity += line.quantity;
    }
  });
  
  // Recalculate totals
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0
  );
  
  cart.cost.subtotalAmount.amount = subtotal.toFixed(2);
  cart.cost.totalAmount.amount = subtotal.toFixed(2);
  
  console.log('✅ MOCK: Items added to cart', { cartId, cart });
  return cart;
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  console.log('🛒 MOCK: Removing items from cart', { cartId, lineIds });
  
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const cart = mockCarts[cartId];
  if (!cart) {
    throw new Error('Cart not found');
  }
  
  cart.lines = cart.lines.filter(line => !lineIds.includes(line.id!));
  
  // Recalculate totals
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0
  );
  
  cart.cost.subtotalAmount.amount = subtotal.toFixed(2);
  cart.cost.totalAmount.amount = subtotal.toFixed(2);
  
  cart.totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  
  console.log('✅ MOCK: Items removed from cart', { cartId, lineIds });
  return cart;
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  console.log('🛒 MOCK: Updating cart items', { cartId, lines });
  
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const cart = mockCarts[cartId];
  if (!cart) {
    throw new Error('Cart not found');
  }
  
  lines.forEach(line => {
    const cartLine = cart.lines.find(l => l.id === line.id);
    if (cartLine) {
      cartLine.quantity = line.quantity;
      cartLine.cost.totalAmount.amount = (
        parseFloat(cartLine.merchandise.product.featuredImage.url.includes('classic-tee') ? '29.99' : 
                   cartLine.merchandise.product.featuredImage.url.includes('denim-jeans') ? '89.99' : '59.99') * line.quantity
      ).toFixed(2);
    }
  });
  
  // Recalculate totals
  const subtotal = cart.lines.reduce(
    (sum, line) => sum + parseFloat(line.cost.totalAmount.amount),
    0
  );
  
  cart.cost.subtotalAmount.amount = subtotal.toFixed(2);
  cart.cost.totalAmount.amount = subtotal.toFixed(2);
  
  cart.totalQuantity = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  
  console.log('✅ MOCK: Cart updated', { cartId, cart });
  return cart;
}

export async function getCart(): Promise<Cart | undefined> {
  const cartId = (await cookies()).get('cartId')?.value;

  if (!cartId) {
    console.log('🛒 MOCK: No cart ID found in cookies');
    return undefined;
  }

  console.log('🛒 MOCK: Fetching cart', { cartId });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

  const cart = mockCarts[cartId];
  if (!cart) {
    console.log('🛒 MOCK: Cart not found', { cartId });
    return undefined;
  }

  console.log('✅ MOCK: Cart retrieved successfully', { cartId, cart });
  return cart;
}

export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  console.log('📦 MOCK: Fetching collection', { handle });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const collection = mockCollections.find(c => c.handle === handle);
  console.log('✅ MOCK: Collection retrieved', { handle, collection });
  
  return collection;
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife('days');

  console.log('📦 MOCK: Fetching collection products', { collection, reverse, sortKey });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  let products = [...mockProducts];
  
  // Filter by collection
  if (collection !== 'all') {
    if (collection === 'tops') {
      products = products.filter(p => p.handle === 'classic-tee');
    } else if (collection === 'bottoms') {
      products = products.filter(p => p.handle === 'denim-jeans');
    } else if (collection === 'footwear') {
      products = products.filter(p => p.handle === 'canvas-sneakers');
    }
  }
  
  // Sort products
  if (sortKey === 'PRICE') {
    products.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (sortKey === 'CREATED_AT') {
    products.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return reverse ? dateB - dateA : dateA - dateB;
    });
  }
  
  console.log('✅ MOCK: Collection products retrieved', { collection, count: products.length, products });
  return products;
}

export async function getCollections(): Promise<Collection[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  console.log('📦 MOCK: Fetching all collections');
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  console.log('✅ MOCK: Collections retrieved', { count: mockCollections.length, collections: mockCollections });
  return mockCollections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  console.log('📋 MOCK: Fetching menu', { handle });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const mockMenu: Menu[] = [
    { title: 'All Products', path: '/search' },
    { title: 'Tops', path: '/search/tops' },
    { title: 'Bottoms', path: '/search/bottoms' },
    { title: 'Footwear', path: '/search/footwear' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
  ];
  
  console.log('✅ MOCK: Menu retrieved', { handle, menu: mockMenu });
  return mockMenu;
}

export async function getPage(handle: string): Promise<Page> {
  console.log('📄 MOCK: Fetching page', { handle });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const page = mockPages.find(p => p.handle === handle);
  if (!page) {
    throw new Error(`Page not found: ${handle}`);
  }
  
  console.log('✅ MOCK: Page retrieved', { handle, page });
  return page;
}

export async function getPages(): Promise<Page[]> {
  console.log('📄 MOCK: Fetching all pages');
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  console.log('✅ MOCK: Pages retrieved', { count: mockPages.length, pages: mockPages });
  return mockPages;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  console.log('👕 MOCK: Fetching product', { handle });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  const product = mockProducts.find(p => p.handle === handle);
  console.log('✅ MOCK: Product retrieved', { handle, product });
  
  return product;
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  console.log('👕 MOCK: Fetching product recommendations', { productId });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // Return 2 random products excluding the current one
  const recommendations = mockProducts
    .filter(p => p.id !== productId)
    .slice(0, 2);
  
  console.log('✅ MOCK: Product recommendations retrieved', { productId, recommendations });
  return recommendations;
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  console.log('🔍 MOCK: Searching products', { query, reverse, sortKey });
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  let products = [...mockProducts];
  
  // Filter by search query
  if (query) {
    const searchTerm = query.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
  
  // Sort products
  if (sortKey === 'PRICE') {
    products.sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
      return reverse ? priceB - priceA : priceA - priceB;
    });
  } else if (sortKey === 'CREATED_AT') {
    products.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return reverse ? dateB - dateA : dateA - dateB;
    });
  }
  
  console.log('✅ MOCK: Products search completed', { query, count: products.length, products });
  return products;
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  console.log('🔄 MOCK: Revalidation request received', { url: req.url });
  
  // Mock revalidation - in real app, this would trigger cache invalidation
  const secret = req.nextUrl.searchParams.get('secret');
  
  if (!secret || secret !== 'mock-secret-key') {
    console.warn('⚠️ MOCK: Invalid revalidation secret');
    return NextResponse.json({ status: 401, message: 'Invalid secret' });
  }

  console.log('✅ MOCK: Revalidation successful');
  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
