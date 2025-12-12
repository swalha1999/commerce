import { TAGS } from '@/lib/constants';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag
} from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  Cart,
  Collection,
  Menu,
  Page,
  Product
} from './types';

// Mock data configuration
const MOCK_DELAY = 500; // Simulate network delay for more realistic testing

// Mock data storage
const mockProducts: Product[] = [
  {
    id: 'supreme-140ng-white',
    handle: 'supreme-140ng-white',
    availableForSale: true,
    title: 'SUPREME INVERTER 140NG White',
    description: 'Advanced inverter air conditioner with 9,210 BTU cooling capacity and 10,230 BTU heating capacity. Features cutting-edge inverter technology for energy efficiency, quiet operation, and precise temperature control. Includes 7 fan speeds, WiFi control, 4D air distribution, and advanced air purification with UVC technology and PM2.5 filter.',
    descriptionHtml: '<p>Advanced inverter air conditioner with 9,210 BTU cooling capacity and 10,230 BTU heating capacity. Features cutting-edge inverter technology for energy efficiency, quiet operation, and precise temperature control. Includes 7 fan speeds, WiFi control, 4D air distribution, and advanced air purification with UVC technology and PM2.5 filter.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2710.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2710.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-140ng-white-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2710.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-140ng-white-hq.jpg',
      altText: 'SUPREME INVERTER 140NG White',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-140ng-white-hq.jpg', altText: 'SUPREME INVERTER 140NG White', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 140NG White - 9,210 BTU Air Conditioner',
      description: 'Energy-efficient A++ rated inverter air conditioner with 9,210 BTU cooling capacity, WiFi control, and advanced air purification'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '9210-btu', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-140ng-carbon',
    handle: 'supreme-140ng-carbon',
    availableForSale: true,
    title: 'SUPREME INVERTER 140NG Carbon',
    description: 'Advanced inverter air conditioner with 9,210 BTU cooling capacity and 10,230 BTU heating capacity in elegant carbon finish. Features cutting-edge inverter technology for energy efficiency, quiet operation, and precise temperature control. Includes 7 fan speeds, WiFi control, 4D air distribution, and advanced air purification with UVC technology and PM2.5 filter.',
    descriptionHtml: '<p>Advanced inverter air conditioner with 9,210 BTU cooling capacity and 10,230 BTU heating capacity in elegant carbon finish. Features cutting-edge inverter technology for energy efficiency, quiet operation, and precise temperature control. Includes 7 fan speeds, WiFi control, 4D air distribution, and advanced air purification with UVC technology and PM2.5 filter.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Carbon'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2780.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2780.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-140ng-carbon-variant',
        title: 'Carbon',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Carbon' }
        ],
        price: { amount: '2780.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-140ng-carbon-hq.jpg',
      altText: 'SUPREME INVERTER 140NG Carbon',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-140ng-carbon-hq.jpg', altText: 'SUPREME INVERTER 140NG Carbon', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 140NG Carbon - 9,210 BTU Air Conditioner',
      description: 'Energy-efficient A++ rated inverter air conditioner with 9,210 BTU cooling capacity in elegant carbon finish'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '9210-btu', 'carbon'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-180ng-white',
    handle: 'supreme-180ng-white',
    availableForSale: true,
    title: 'SUPREME INVERTER 180NG White',
    description: 'Advanced inverter air conditioner with 11,950 BTU cooling capacity and 12,960 BTU heating capacity. Perfect for larger rooms with cutting-edge inverter technology for energy efficiency and quiet operation. Features 7 fan speeds, WiFi control, 4D air distribution, motion sensor, and self-cleaning function.',
    descriptionHtml: '<p>Advanced inverter air conditioner with 11,950 BTU cooling capacity and 12,960 BTU heating capacity. Perfect for larger rooms with cutting-edge inverter technology for energy efficiency and quiet operation. Features 7 fan speeds, WiFi control, 4D air distribution, motion sensor, and self-cleaning function.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2990.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2990.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-180ng-white-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2990.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-180ng-white-hq.jpg',
      altText: 'SUPREME INVERTER 180NG White',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-180ng-white-hq.jpg', altText: 'SUPREME INVERTER 180NG White', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 180NG White - 11,950 BTU Air Conditioner',
      description: 'Energy-efficient A++ rated inverter air conditioner with 11,950 BTU cooling capacity for larger rooms'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '11950-btu', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-180ng-carbon',
    handle: 'supreme-180ng-carbon',
    availableForSale: true,
    title: 'SUPREME INVERTER 180NG Carbon',
    description: 'Advanced inverter air conditioner with 11,950 BTU cooling capacity and 12,960 BTU heating capacity in luxurious carbon finish. Features cutting-edge inverter technology, 7 fan speeds, WiFi control, 4D air distribution, motion sensor, UVC technology, and PM2.5 filter for superior air quality.',
    descriptionHtml: '<p>Advanced inverter air conditioner with 11,950 BTU cooling capacity and 12,960 BTU heating capacity in luxurious carbon finish. Features cutting-edge inverter technology, 7 fan speeds, WiFi control, 4D air distribution, motion sensor, UVC technology, and PM2.5 filter for superior air quality.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Carbon'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3050.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3050.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-180ng-carbon-variant',
        title: 'Carbon',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Carbon' }
        ],
        price: { amount: '3050.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-180ng-carbon-hq.jpg',
      altText: 'SUPREME INVERTER 180NG Carbon',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-180ng-carbon-hq.jpg', altText: 'SUPREME INVERTER 180NG Carbon', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 180NG Carbon - 11,950 BTU Air Conditioner',
      description: 'Energy-efficient A++ rated inverter air conditioner with 11,950 BTU cooling capacity in carbon finish'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '11950-btu', 'carbon'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-240ng-white',
    handle: 'supreme-240ng-white',
    availableForSale: true,
    title: 'SUPREME INVERTER 240NG White',
    description: 'Powerful inverter air conditioner with 17,740 BTU cooling and heating capacity. Ideal for large spaces with advanced inverter technology for maximum efficiency and comfort. Features 7 fan speeds, WiFi control, 4D air distribution, motion sensor, self-cleaning function, and UVC technology.',
    descriptionHtml: '<p>Powerful inverter air conditioner with 17,740 BTU cooling and heating capacity. Ideal for large spaces with advanced inverter technology for maximum efficiency and comfort. Features 7 fan speeds, WiFi control, 4D air distribution, motion sensor, self-cleaning function, and UVC technology.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '5460.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '5460.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-240ng-white-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '5460.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-240ng-white-hq.jpg',
      altText: 'SUPREME INVERTER 240NG White',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-240ng-white-hq.jpg', altText: 'SUPREME INVERTER 240NG White', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 240NG White - 17,740 BTU Air Conditioner',
      description: 'Powerful A++ rated inverter air conditioner with 17,740 BTU capacity for large spaces'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '17740-btu', 'large-spaces'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-240ng-carbon',
    handle: 'supreme-240ng-carbon',
    availableForSale: true,
    title: 'SUPREME INVERTER 240NG Carbon',
    description: 'Powerful inverter air conditioner with 17,740 BTU cooling and heating capacity in premium carbon finish. Award-winning design with advanced inverter technology, 7 fan speeds, WiFi control, 4D air distribution, motion sensor, self-cleaning function, UVC technology, and PM2.5 filter.',
    descriptionHtml: '<p>Powerful inverter air conditioner with 17,740 BTU cooling and heating capacity in premium carbon finish. Award-winning design with advanced inverter technology, 7 fan speeds, WiFi control, 4D air distribution, motion sensor, self-cleaning function, UVC technology, and PM2.5 filter.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Carbon'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '5720.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '5720.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-240ng-carbon-variant',
        title: 'Carbon',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Carbon' }
        ],
        price: { amount: '5720.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-240ng-carbon-hq.jpg',
      altText: 'SUPREME INVERTER 240NG Carbon',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-240ng-carbon-hq.jpg', altText: 'SUPREME INVERTER 240NG Carbon', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 240NG Carbon - 17,740 BTU Air Conditioner',
      description: 'Award-winning A++ rated inverter air conditioner with 17,740 BTU capacity in carbon finish'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '17740-btu', 'carbon', 'award-winning'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-370ng-white',
    handle: 'supreme-370ng-white',
    availableForSale: true,
    title: 'SUPREME INVERTER 370NG White',
    description: 'High-capacity inverter air conditioner with 28,000 BTU cooling and heating capacity. Designed for very large spaces with premium inverter technology for superior performance. Winner of Bravo Award 2021 with 96.6% customer satisfaction. Features 7 fan speeds, WiFi connectivity, 4D air distribution, self-cleaning function, motion sensor, UVC technology, and PM2.5 filter.',
    descriptionHtml: '<p>High-capacity inverter air conditioner with 28,000 BTU cooling and heating capacity. Designed for very large spaces with premium inverter technology for superior performance. Winner of Bravo Award 2021 with 96.6% customer satisfaction. Features 7 fan speeds, WiFi connectivity, 4D air distribution, self-cleaning function, motion sensor, UVC technology, and PM2.5 filter.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '8610.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '8610.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-370ng-white-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '8610.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-370ng-white-hq.jpg',
      altText: 'SUPREME INVERTER 370NG White',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-370ng-white-hq.jpg', altText: 'SUPREME INVERTER 370NG White', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 370NG White - 28,000 BTU Air Conditioner',
      description: 'Award-winning A++ rated inverter air conditioner with 28,000 BTU capacity for very large spaces'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '28000-btu', 'award-winning', 'large-capacity'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'supreme-370ng-carbon',
    handle: 'supreme-370ng-carbon',
    availableForSale: true,
    title: 'SUPREME INVERTER 370NG Carbon',
    description: 'High-capacity inverter air conditioner with 28,000 BTU cooling and heating capacity in luxurious carbon finish. Designed for very large spaces with premium inverter technology. Features 7 fan speeds, WiFi control, 4D air distribution, motion sensor, self-cleaning function, UVC technology, and PM2.5 filter. Includes 5-year warranty.',
    descriptionHtml: '<p>High-capacity inverter air conditioner with 28,000 BTU cooling and heating capacity in luxurious carbon finish. Designed for very large spaces with premium inverter technology. Features 7 fan speeds, WiFi control, 4D air distribution, motion sensor, self-cleaning function, UVC technology, and PM2.5 filter. Includes 5-year warranty.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Carbon'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '9010.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '9010.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'supreme-370ng-carbon-variant',
        title: 'Carbon',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Carbon' }
        ],
        price: { amount: '9010.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/supreme-370ng-carbon-hq.jpg',
      altText: 'SUPREME INVERTER 370NG Carbon',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/supreme-370ng-carbon-hq.jpg', altText: 'SUPREME INVERTER 370NG Carbon', width: 800, height: 600 }
    ],
    seo: {
      title: 'SUPREME INVERTER 370NG Carbon - 28,000 BTU Air Conditioner',
      description: 'Premium A++ rated inverter air conditioner with 28,000 BTU capacity in carbon finish'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'supreme', 'hvac', '28000-btu', 'carbon', 'large-capacity'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alpha-pro-340ng',
    handle: 'alpha-pro-340ng',
    availableForSale: true,
    title: 'ALPHA PRO INVERTER 340NG',
    description: 'Professional-grade inverter air conditioner with 24,000 BTU cooling capacity and 25,000 BTU heating capacity. From the quality ALPHA PRO INVERTER series with A++ energy rating. Features built-in WiFi, 7 fan speeds, 4D air distribution, self-cleaning function, motion sensor, and Sabbath mode.',
    descriptionHtml: '<p>Professional-grade inverter air conditioner with 24,000 BTU cooling capacity and 25,000 BTU heating capacity. From the quality ALPHA PRO INVERTER series with A++ energy rating. Features built-in WiFi, 7 fan speeds, 4D air distribution, self-cleaning function, motion sensor, and Sabbath mode.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6020.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6020.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'alpha-pro-340ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '6020.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/alpha-pro-340ng-hq.png',
      altText: 'ALPHA PRO INVERTER 340NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/alpha-pro-340ng-hq.png', altText: 'ALPHA PRO INVERTER 340NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'ALPHA PRO INVERTER 340NG - 24,000 BTU Professional AC',
      description: 'Professional A++ rated inverter air conditioner with 24,000 BTU cooling capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'alpha-pro', 'hvac', '24000-btu', 'professional', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alpha-pro-140ng',
    handle: 'alpha-pro-140ng',
    availableForSale: true,
    title: 'ALPHA PRO INVERTER 140NG',
    description: 'Professional-grade inverter air conditioner with 9,210 BTU cooling capacity and 10,236 BTU heating capacity. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, BMS dry contact, and Sabbath mode.',
    descriptionHtml: '<p>Professional-grade inverter air conditioner with 9,210 BTU cooling capacity and 10,236 BTU heating capacity. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, BMS dry contact, and Sabbath mode.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2310.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2310.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'alpha-pro-140ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2310.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/alpha-pro-140ng-hq.png',
      altText: 'ALPHA PRO INVERTER 140NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/alpha-pro-140ng-hq.png', altText: 'ALPHA PRO INVERTER 140NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'ALPHA PRO INVERTER 140NG - 9,210 BTU Professional AC',
      description: 'Professional A++ rated inverter air conditioner with 9,210 BTU cooling capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'alpha-pro', 'hvac', '9210-btu', 'professional', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alpha-pro-180ng',
    handle: 'alpha-pro-180ng',
    availableForSale: true,
    title: 'ALPHA PRO INVERTER 180NG',
    description: 'Professional-grade inverter air conditioner with 11,940 BTU cooling capacity and 12,970 BTU heating capacity. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, motion sensor, dry mode, self-cleaning function, and Sabbath mode.',
    descriptionHtml: '<p>Professional-grade inverter air conditioner with 11,940 BTU cooling capacity and 12,970 BTU heating capacity. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, motion sensor, dry mode, self-cleaning function, and Sabbath mode.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2710.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2710.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'alpha-pro-180ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2710.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/alpha-pro-180ng-hq.png',
      altText: 'ALPHA PRO INVERTER 180NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/alpha-pro-180ng-hq.png', altText: 'ALPHA PRO INVERTER 180NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'ALPHA PRO INVERTER 180NG - 11,940 BTU Professional AC',
      description: 'Professional A++ rated inverter air conditioner with 11,940 BTU cooling capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'alpha-pro', 'hvac', '11940-btu', 'professional', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alpha-pro-240ng',
    handle: 'alpha-pro-240ng',
    availableForSale: true,
    title: 'ALPHA PRO INVERTER 240NG',
    description: 'Professional-grade inverter air conditioner with 17,740 BTU cooling and heating capacity. High-performance cooling solution for larger commercial and residential spaces. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>Professional-grade inverter air conditioner with 17,740 BTU cooling and heating capacity. High-performance cooling solution for larger commercial and residential spaces. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '4550.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '4550.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'alpha-pro-240ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '4550.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/alpha-pro-240ng-hq.png',
      altText: 'ALPHA PRO INVERTER 240NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/alpha-pro-240ng-hq.png', altText: 'ALPHA PRO INVERTER 240NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'ALPHA PRO INVERTER 240NG - 17,740 BTU Professional AC',
      description: 'Professional A++ rated inverter air conditioner with 17,740 BTU capacity for larger spaces'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'alpha-pro', 'hvac', '17740-btu', 'professional', 'large-spaces'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alpha-pro-370ng',
    handle: 'alpha-pro-370ng',
    availableForSale: true,
    title: 'ALPHA PRO INVERTER 370NG',
    description: 'Professional-grade inverter air conditioner with 28,000 BTU cooling and heating capacity. Designed for very large commercial and residential spaces with advanced inverter technology. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>Professional-grade inverter air conditioner with 28,000 BTU cooling and heating capacity. Designed for very large commercial and residential spaces with advanced inverter technology. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '7350.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '7350.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'alpha-pro-370ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '7350.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/alpha-pro-370ng-hq.png',
      altText: 'ALPHA PRO INVERTER 370NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/alpha-pro-370ng-hq.png', altText: 'ALPHA PRO INVERTER 370NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'ALPHA PRO INVERTER 370NG - 28,000 BTU Professional AC',
      description: 'Professional A++ rated inverter air conditioner with 28,000 BTU capacity for very large spaces'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'alpha-pro', 'hvac', '28000-btu', 'professional', 'large-capacity'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'alpha-pro-450ng',
    handle: 'alpha-pro-450ng',
    availableForSale: true,
    title: 'ALPHA PRO INVERTER 450NG',
    description: 'Premium professional-grade inverter air conditioner with 32,100 BTU cooling capacity and 32,700 BTU heating capacity. Designed for extra large commercial and residential spaces. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>Premium professional-grade inverter air conditioner with 32,100 BTU cooling capacity and 32,700 BTU heating capacity. Designed for extra large commercial and residential spaces. Features built-in WiFi, 7 fan speeds, 4D air distribution, auto restart, sleep mode, self dry function, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '10200.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '10200.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'alpha-pro-450ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '10200.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/alpha-pro-450ng-hq.png',
      altText: 'ALPHA PRO INVERTER 450NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/alpha-pro-450ng-hq.png', altText: 'ALPHA PRO INVERTER 450NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'ALPHA PRO INVERTER 450NG - 32,100 BTU Professional AC',
      description: 'Premium professional A++ rated inverter air conditioner with 32,100 BTU capacity for extra large spaces'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'alpha-pro', 'hvac', '32100-btu', 'professional', 'extra-large'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'joy-140ng',
    handle: 'joy-140ng',
    availableForSale: true,
    title: 'JOY INVERTER 140NG',
    description: 'Compact inverter air conditioner with 8,530 BTU cooling capacity and 9,550 BTU heating capacity. A++ energy rating for maximum electricity savings. Features 7 fan speeds for ultra-quiet operation, self-cleaning function, WiFi control, 4D air distribution, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Compact inverter air conditioner with 8,530 BTU cooling capacity and 9,550 BTU heating capacity. A++ energy rating for maximum electricity savings. Features 7 fan speeds for ultra-quiet operation, self-cleaning function, WiFi control, 4D air distribution, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2230.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2230.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'joy-140ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2230.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/joy-140ng-hq.jpg',
      altText: 'JOY INVERTER 140NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/joy-140ng-hq.jpg', altText: 'JOY INVERTER 140NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'JOY INVERTER 140NG - 8,530 BTU Compact AC',
      description: 'A++ rated compact inverter air conditioner with 8,530 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'joy', 'hvac', '8530-btu', 'compact', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'joy-180ng',
    handle: 'joy-180ng',
    availableForSale: true,
    title: 'JOY INVERTER 180NG',
    description: 'Efficient inverter air conditioner with 10,900 BTU cooling capacity and 11,600 BTU heating capacity. A++ energy rating with advanced inverter technology. Features 7 fan speeds, WiFi connectivity, auto restart, 4D air distribution, self-cleaning function, sleep mode, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Efficient inverter air conditioner with 10,900 BTU cooling capacity and 11,600 BTU heating capacity. A++ energy rating with advanced inverter technology. Features 7 fan speeds, WiFi connectivity, auto restart, 4D air distribution, self-cleaning function, sleep mode, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2540.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2540.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'joy-180ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2540.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/joy-180ng-hq.jpg',
      altText: 'JOY INVERTER 180NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/joy-180ng-hq.jpg', altText: 'JOY INVERTER 180NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'JOY INVERTER 180NG - 10,900 BTU Efficient AC',
      description: 'A++ rated efficient inverter air conditioner with 10,900 BTU cooling capacity and WiFi connectivity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'joy', 'hvac', '10900-btu', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'joy-240ng',
    handle: 'joy-240ng',
    availableForSale: true,
    title: 'JOY INVERTER 240NG',
    description: 'Powerful inverter air conditioner with 15,700 BTU cooling and heating capacity. A++ energy rating with advanced inverter technology. Features built-in WiFi, 7 fan speeds, 4D air distribution, self-cleaning function, auto restart, sleep mode, timer x3, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>Powerful inverter air conditioner with 15,700 BTU cooling and heating capacity. A++ energy rating with advanced inverter technology. Features built-in WiFi, 7 fan speeds, 4D air distribution, self-cleaning function, auto restart, sleep mode, timer x3, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '4230.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '4230.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'joy-240ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '4230.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/joy-240ng-hq.jpg',
      altText: 'JOY INVERTER 240NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/joy-240ng-hq.jpg', altText: 'JOY INVERTER 240NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'JOY INVERTER 240NG - 15,700 BTU Powerful AC',
      description: 'A++ rated powerful inverter air conditioner with 15,700 BTU capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'joy', 'hvac', '15700-btu', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'joy-340ng',
    handle: 'joy-340ng',
    availableForSale: true,
    title: 'JOY INVERTER 340NG',
    description: 'High-capacity inverter air conditioner with 21,150 BTU cooling and heating capacity. A++ energy rating with advanced inverter technology. Features 7 fan speeds, WiFi connectivity, auto restart, 4D air distribution, self-cleaning function, sleep mode, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>High-capacity inverter air conditioner with 21,150 BTU cooling and heating capacity. A++ energy rating with advanced inverter technology. Features 7 fan speeds, WiFi connectivity, auto restart, 4D air distribution, self-cleaning function, sleep mode, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '5560.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '5560.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'joy-340ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '5560.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/joy-340ng-hq.jpg',
      altText: 'JOY INVERTER 340NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/joy-340ng-hq.jpg', altText: 'JOY INVERTER 340NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'JOY INVERTER 340NG - 21,150 BTU High-Capacity AC',
      description: 'A++ rated high-capacity inverter air conditioner with 21,150 BTU capacity and WiFi connectivity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'joy', 'hvac', '21150-btu', 'high-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'joy-370ng',
    handle: 'joy-370ng',
    availableForSale: true,
    title: 'JOY INVERTER 370NG',
    description: 'Premium inverter air conditioner with 27,980 BTU cooling and heating capacity. A++ energy rating with top-tier inverter technology for large spaces. Features 7 fan speeds, WiFi connectivity, auto restart, 4D air distribution, self-cleaning function, sleep mode, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Premium inverter air conditioner with 27,980 BTU cooling and heating capacity. A++ energy rating with top-tier inverter technology for large spaces. Features 7 fan speeds, WiFi connectivity, auto restart, 4D air distribution, self-cleaning function, sleep mode, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '7010.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '7010.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'joy-370ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '7010.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/joy-370ng-hq.jpg',
      altText: 'JOY INVERTER 370NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/joy-370ng-hq.jpg', altText: 'JOY INVERTER 370NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'JOY INVERTER 370NG - 27,980 BTU Premium AC',
      description: 'A++ rated premium inverter air conditioner with 27,980 BTU capacity for large spaces'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'joy', 'hvac', '27980-btu', 'premium', 'large-spaces'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'solo-140ng',
    handle: 'solo-140ng',
    availableForSale: true,
    title: 'SOLO INVERTER 140NG',
    description: 'Budget-friendly inverter air conditioner with 8,530 BTU cooling capacity and 9,550 BTU heating capacity. A++ energy rating with built-in WiFi. Features 7 fan speeds for quiet operation, self-cleaning function, auto restart, "I Feel" temperature adjustment, sleep mode, triple timer function, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Budget-friendly inverter air conditioner with 8,530 BTU cooling capacity and 9,550 BTU heating capacity. A++ energy rating with built-in WiFi. Features 7 fan speeds for quiet operation, self-cleaning function, auto restart, "I Feel" temperature adjustment, sleep mode, triple timer function, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '1910.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '1910.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'solo-140ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '1910.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/solo-140ng-hq.jpg',
      altText: 'SOLO INVERTER 140NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/solo-140ng-hq.jpg', altText: 'SOLO INVERTER 140NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'SOLO INVERTER 140NG - 8,530 BTU Budget AC',
      description: 'A++ rated budget-friendly inverter air conditioner with 8,530 BTU cooling capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'solo', 'hvac', '8530-btu', 'budget', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'solo-180ng',
    handle: 'solo-180ng',
    availableForSale: true,
    title: 'SOLO INVERTER 180NG',
    description: 'Affordable inverter air conditioner with 10,900 BTU cooling capacity and 11,600 BTU heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning function, 4D air distribution, auto restart, sleep mode, timer x3, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Affordable inverter air conditioner with 10,900 BTU cooling capacity and 11,600 BTU heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning function, 4D air distribution, auto restart, sleep mode, timer x3, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2290.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2290.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'solo-180ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2290.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/solo-180ng-hq.jpg',
      altText: 'SOLO INVERTER 180NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/solo-180ng-hq.jpg', altText: 'SOLO INVERTER 180NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'SOLO INVERTER 180NG - 10,900 BTU Affordable AC',
      description: 'A++ rated affordable inverter air conditioner with 10,900 BTU cooling capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'solo', 'hvac', '10900-btu', 'affordable', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'solo-240ng',
    handle: 'solo-240ng',
    availableForSale: true,
    title: 'SOLO INVERTER 240NG',
    description: 'Mid-range inverter air conditioner with 15,700 BTU cooling and heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning, 4D air distribution, auto restart, sleep mode, timer function, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Mid-range inverter air conditioner with 15,700 BTU cooling and heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning, 4D air distribution, auto restart, sleep mode, timer function, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3960.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3960.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'solo-240ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '3960.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/solo-240ng-hq.jpg',
      altText: 'SOLO INVERTER 240NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/solo-240ng-hq.jpg', altText: 'SOLO INVERTER 240NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'SOLO INVERTER 240NG - 15,700 BTU Mid-Range AC',
      description: 'A++ rated mid-range inverter air conditioner with 15,700 BTU capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'solo', 'hvac', '15700-btu', 'mid-range', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'solo-340ng',
    handle: 'solo-340ng',
    availableForSale: true,
    title: 'SOLO INVERTER 340NG',
    description: 'High-capacity inverter air conditioner with 21,150 BTU cooling and heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning, 4D air distribution, auto restart, sleep mode, timer function, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>High-capacity inverter air conditioner with 21,150 BTU cooling and heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning, 4D air distribution, auto restart, sleep mode, timer function, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '5080.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '5080.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'solo-340ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '5080.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/solo-340ng-hq.jpg',
      altText: 'SOLO INVERTER 340NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/solo-340ng-hq.jpg', altText: 'SOLO INVERTER 340NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'SOLO INVERTER 340NG - 21,150 BTU High-Capacity AC',
      description: 'A++ rated high-capacity inverter air conditioner with 21,150 BTU capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'solo', 'hvac', '21150-btu', 'high-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'solo-370ng',
    handle: 'solo-370ng',
    availableForSale: true,
    title: 'SOLO INVERTER 370NG',
    description: 'Large-capacity inverter air conditioner with 27,980 BTU cooling and heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning function, auto restart, 4D air distribution, sleep mode, timer function, motion sensor, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Large-capacity inverter air conditioner with 27,980 BTU cooling and heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features self-cleaning function, auto restart, 4D air distribution, sleep mode, timer function, motion sensor, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6410.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6410.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'solo-370ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '6410.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/solo-370ng-hq.jpg',
      altText: 'SOLO INVERTER 370NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/solo-370ng-hq.jpg', altText: 'SOLO INVERTER 370NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'SOLO INVERTER 370NG - 27,980 BTU Large-Capacity AC',
      description: 'A++ rated large-capacity inverter air conditioner with 27,980 BTU capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'solo', 'hvac', '27980-btu', 'large-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'solo-450ng',
    handle: 'solo-450ng',
    availableForSale: true,
    title: 'SOLO INVERTER 450NG',
    description: 'Extra large-capacity inverter air conditioner with 32,070 BTU cooling capacity and 32,750 BTU heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features 4D air distribution, self-cleaning, auto restart, sleep mode, timer x3, motion sensor, Sabbath mode, and hydrophilic coating.',
    descriptionHtml: '<p>Extra large-capacity inverter air conditioner with 32,070 BTU cooling capacity and 32,750 BTU heating capacity. A++ energy rating with built-in WiFi and 7 fan speeds. Features 4D air distribution, self-cleaning, auto restart, sleep mode, timer x3, motion sensor, Sabbath mode, and hydrophilic coating.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '7800.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '7800.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'solo-450ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '7800.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/solo-450ng-hq.png',
      altText: 'SOLO INVERTER 450NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/solo-450ng-hq.png', altText: 'SOLO INVERTER 450NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'SOLO INVERTER 450NG - 32,070 BTU Extra Large AC',
      description: 'A++ rated extra large-capacity inverter air conditioner with 32,070 BTU capacity and built-in WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'solo', 'hvac', '32070-btu', 'extra-large', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'apollo-340ng',
    handle: 'apollo-340ng',
    availableForSale: true,
    title: 'APOLLO N INVERTER 340NG',
    description: 'Advanced inverter air conditioner with 20,280 BTU cooling capacity and 22,200 BTU heating capacity. A++ energy rating with built-in Wi-Fi and 5 fan speeds. Features inverter technology, self-cleaning function, auto restart, sleep mode, timer function, hydrophilic coating, and optional movement sensor.',
    descriptionHtml: '<p>Advanced inverter air conditioner with 20,280 BTU cooling capacity and 22,200 BTU heating capacity. A++ energy rating with built-in Wi-Fi and 5 fan speeds. Features inverter technology, self-cleaning function, auto restart, sleep mode, timer function, hydrophilic coating, and optional movement sensor.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '4750.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '4750.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'apollo-340ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '4750.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/apollo-340ng-hq.png',
      altText: 'APOLLO N INVERTER 340NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/apollo-340ng-hq.png', altText: 'APOLLO N INVERTER 340NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'APOLLO N INVERTER 340NG - 20,280 BTU Advanced AC',
      description: 'A++ rated advanced inverter air conditioner with 20,280 BTU cooling capacity and built-in Wi-Fi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'apollo', 'hvac', '20280-btu', 'advanced', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'apollo-360ng',
    handle: 'apollo-360ng',
    availableForSale: true,
    title: 'APOLLO N INVERTER 360NG',
    description: 'High-performance inverter air conditioner with 27,150 BTU cooling capacity and 28,170 BTU heating capacity. A++ energy rating with Wi-Fi IOT built-in and 5 fan speeds. Features auto restart, sleep mode, timer function, motion sensor, Sabbath mode, hydrophilic coating, and dual control option.',
    descriptionHtml: '<p>High-performance inverter air conditioner with 27,150 BTU cooling capacity and 28,170 BTU heating capacity. A++ energy rating with Wi-Fi IOT built-in and 5 fan speeds. Features auto restart, sleep mode, timer function, motion sensor, Sabbath mode, hydrophilic coating, and dual control option.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '5980.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '5980.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'apollo-360ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '5980.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/apollo-360ng-hq.png',
      altText: 'APOLLO N INVERTER 360NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/apollo-360ng-hq.png', altText: 'APOLLO N INVERTER 360NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'APOLLO N INVERTER 360NG - 27,150 BTU High-Performance AC',
      description: 'A++ rated high-performance inverter air conditioner with 27,150 BTU cooling capacity and Wi-Fi IOT'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'apollo', 'hvac', '27150-btu', 'high-performance', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'apollo-360-3ng',
    handle: 'apollo-360-3ng',
    availableForSale: true,
    title: 'APOLLO N INVERTER 360/3NG',
    description: 'Three-phase inverter air conditioner with 27,600 BTU cooling capacity and 28,600 BTU heating capacity. A++ energy rating with Wi-Fi IOT built-in and 5 fan speeds. Features self-cleaning, motion sensor, Sabbath mode, hydrophilic coating, and 400V three-phase power supply.',
    descriptionHtml: '<p>Three-phase inverter air conditioner with 27,600 BTU cooling capacity and 28,600 BTU heating capacity. A++ energy rating with Wi-Fi IOT built-in and 5 fan speeds. Features self-cleaning, motion sensor, Sabbath mode, hydrophilic coating, and 400V three-phase power supply.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6430.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6430.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'apollo-360-3ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '6430.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/apollo-360-3ng-hq.png',
      altText: 'APOLLO N INVERTER 360/3NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/apollo-360-3ng-hq.png', altText: 'APOLLO N INVERTER 360/3NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'APOLLO N INVERTER 360/3NG - 27,600 BTU Three-Phase AC',
      description: 'A++ rated three-phase inverter air conditioner with 27,600 BTU cooling capacity and Wi-Fi IOT'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'apollo', 'hvac', '27600-btu', 'three-phase', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'apollo-450-3ng',
    handle: 'apollo-450-3ng',
    availableForSale: true,
    title: 'APOLLO N INVERTER 450/3NG',
    description: 'High-capacity three-phase inverter air conditioner with 32,030 BTU cooling capacity and 31,250 BTU heating capacity. A++ energy rating with Wi-Fi IOT built-in and 5 fan speeds. Features self-cleaning function, hydrophilic coating, auto restart, sleep mode, motion sensor, Sabbath mode, and 400V three-phase power supply.',
    descriptionHtml: '<p>High-capacity three-phase inverter air conditioner with 32,030 BTU cooling capacity and 31,250 BTU heating capacity. A++ energy rating with Wi-Fi IOT built-in and 5 fan speeds. Features self-cleaning function, hydrophilic coating, auto restart, sleep mode, motion sensor, Sabbath mode, and 400V three-phase power supply.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '8070.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '8070.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'apollo-450-3ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '8070.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/apollo-450-3ng-hq.png',
      altText: 'APOLLO N INVERTER 450/3NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/apollo-450-3ng-hq.png', altText: 'APOLLO N INVERTER 450/3NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'APOLLO N INVERTER 450/3NG - 32,030 BTU Three-Phase AC',
      description: 'A++ rated high-capacity three-phase inverter air conditioner with 32,030 BTU cooling capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'apollo', 'hvac', '32030-btu', 'high-capacity', 'three-phase', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'amcor-14ng',
    handle: 'amcor-14ng',
    availableForSale: true,
    title: 'AMCOR INVERTER 14NG',
    description: 'Entry-level inverter air conditioner with 8,530 BTU cooling capacity and 9,550 BTU heating capacity. A++ energy rating with WiFi connectivity and 7 fan speeds. Features 4D air distribution, auto restart, sleep mode, timer function, self-cleaning, and optional motion sensor.',
    descriptionHtml: '<p>Entry-level inverter air conditioner with 8,530 BTU cooling capacity and 9,550 BTU heating capacity. A++ energy rating with WiFi connectivity and 7 fan speeds. Features 4D air distribution, auto restart, sleep mode, timer function, self-cleaning, and optional motion sensor.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '1610.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '1610.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'amcor-14ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '1610.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/amcor-14ng-hq.png',
      altText: 'AMCOR INVERTER 14NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/amcor-14ng-hq.png', altText: 'AMCOR INVERTER 14NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'AMCOR INVERTER 14NG - 8,530 BTU Entry-Level AC',
      description: 'A++ rated entry-level inverter air conditioner with 8,530 BTU cooling capacity and WiFi connectivity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'amcor', 'hvac', '8530-btu', 'entry-level', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'amcor-18ng',
    handle: 'amcor-18ng',
    availableForSale: true,
    title: 'AMCOR INVERTER 18NG',
    description: 'Compact inverter air conditioner with 10,920 BTU cooling capacity and 11,600 BTU heating capacity. A++ energy rating with 7 fan speeds and WiFi remote control. Features auto restart, sleep mode, 4D air distribution, self-cleaning function, and Sabbath mode option.',
    descriptionHtml: '<p>Compact inverter air conditioner with 10,920 BTU cooling capacity and 11,600 BTU heating capacity. A++ energy rating with 7 fan speeds and WiFi remote control. Features auto restart, sleep mode, 4D air distribution, self-cleaning function, and Sabbath mode option.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '1860.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '1860.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'amcor-18ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '1860.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/amcor-18ng-hq.png',
      altText: 'AMCOR INVERTER 18NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/amcor-18ng-hq.png', altText: 'AMCOR INVERTER 18NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'AMCOR INVERTER 18NG - 10,920 BTU Compact AC',
      description: 'A++ rated compact inverter air conditioner with 10,920 BTU cooling capacity and WiFi remote control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'amcor', 'hvac', '10920-btu', 'compact', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'amcor-24ng',
    handle: 'amcor-24ng',
    availableForSale: true,
    title: 'AMCOR INVERTER 24NG',
    description: 'Mid-range inverter air conditioner with 15,700 BTU cooling and heating capacity. A++ energy rating with inverter technology and 7 fan speeds. Features WiFi remote control, auto restart, sleep mode, 4D air distribution, self-cleaning function, and Sabbath mode compatibility.',
    descriptionHtml: '<p>Mid-range inverter air conditioner with 15,700 BTU cooling and heating capacity. A++ energy rating with inverter technology and 7 fan speeds. Features WiFi remote control, auto restart, sleep mode, 4D air distribution, self-cleaning function, and Sabbath mode compatibility.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3700.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3700.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'amcor-24ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '3700.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/amcor-24ng-hq.png',
      altText: 'AMCOR INVERTER 24NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/amcor-24ng-hq.png', altText: 'AMCOR INVERTER 24NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'AMCOR INVERTER 24NG - 15,700 BTU Mid-Range AC',
      description: 'A++ rated mid-range inverter air conditioner with 15,700 BTU capacity and WiFi remote control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'amcor', 'hvac', '15700-btu', 'mid-range', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'amcor-34ng',
    handle: 'amcor-34ng',
    availableForSale: true,
    title: 'AMCOR INVERTER 34NG',
    description: 'High-capacity inverter air conditioner with 21,150 BTU cooling and heating capacity. A++ energy rating with inverter technology and 7 fan speeds. Features WiFi control, auto restart, sleep mode, self dry function, 4D air distribution, and optional motion sensor.',
    descriptionHtml: '<p>High-capacity inverter air conditioner with 21,150 BTU cooling and heating capacity. A++ energy rating with inverter technology and 7 fan speeds. Features WiFi control, auto restart, sleep mode, self dry function, 4D air distribution, and optional motion sensor.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '4750.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '4750.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'amcor-34ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '4750.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/amcor-34ng-hq.png',
      altText: 'AMCOR INVERTER 34NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/amcor-34ng-hq.png', altText: 'AMCOR INVERTER 34NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'AMCOR INVERTER 34NG - 21,150 BTU High-Capacity AC',
      description: 'A++ rated high-capacity inverter air conditioner with 21,150 BTU capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'amcor', 'hvac', '21150-btu', 'high-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'amcor-37ng',
    handle: 'amcor-37ng',
    availableForSale: true,
    title: 'AMCOR INVERTER 37NG',
    description: 'Premium large-capacity inverter air conditioner with 27,980 BTU cooling and heating capacity. A++ energy rating with inverter technology and 7 fan speeds. Features WiFi remote control, auto restart, sleep mode, timer function, 4D air distribution, and self-cleaning function.',
    descriptionHtml: '<p>Premium large-capacity inverter air conditioner with 27,980 BTU cooling and heating capacity. A++ energy rating with inverter technology and 7 fan speeds. Features WiFi remote control, auto restart, sleep mode, timer function, 4D air distribution, and self-cleaning function.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '5980.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '5980.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'amcor-37ng-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '5980.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/amcor-37ng-hq.png',
      altText: 'AMCOR INVERTER 37NG',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/amcor-37ng-hq.png', altText: 'AMCOR INVERTER 37NG', width: 800, height: 600 }
    ],
    seo: {
      title: 'AMCOR INVERTER 37NG - 27,980 BTU Premium AC',
      description: 'A++ rated premium large-capacity inverter air conditioner with 27,980 BTU capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'amcor', 'hvac', '27980-btu', 'premium', 'large-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-145',
    handle: 'galaxy-145',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV 145',
    description: 'Compact inverter air conditioner with 8,600 BTU cooling capacity and 9,250 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>Compact inverter air conditioner with 8,600 BTU cooling capacity and 9,250 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '1710.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '1710.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-145-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '1710.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-145-hq.jpg',
      altText: 'TADIRAN GALAXY INV 145',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-145-hq.jpg', altText: 'TADIRAN GALAXY INV 145', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV 145 - 8,600 BTU Compact AC',
      description: 'A++ rated compact inverter air conditioner with 8,600 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '8600-btu', 'compact', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-145-black',
    handle: 'galaxy-145-black',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV 145 BLACK',
    description: 'Stylish black inverter air conditioner with 8,600 BTU cooling capacity and 9,250 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning, and 4D air distribution.',
    descriptionHtml: '<p>Stylish black inverter air conditioner with 8,600 BTU cooling capacity and 9,250 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Black'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '1770.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '1770.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-145-black-variant',
        title: 'Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '1770.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-145-black-hq.jpg',
      altText: 'TADIRAN GALAXY INV 145 BLACK',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-145-black-hq.jpg', altText: 'TADIRAN GALAXY INV 145 BLACK', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV 145 BLACK - 8,600 BTU Stylish AC',
      description: 'A++ rated stylish black inverter air conditioner with 8,600 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '8600-btu', 'black', 'stylish', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-185',
    handle: 'galaxy-185',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-185',
    description: 'Mid-capacity inverter air conditioner with 11,430 BTU cooling capacity and 11,945 BTU heating capacity. A++ energy rating with 5 fan speeds and Wi-Fi enabled. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>Mid-capacity inverter air conditioner with 11,430 BTU cooling capacity and 11,945 BTU heating capacity. A++ energy rating with 5 fan speeds and Wi-Fi enabled. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2120.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2120.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-185-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '2120.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-185-hq.jpg',
      altText: 'TADIRAN GALAXY INV-185',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-185-hq.jpg', altText: 'TADIRAN GALAXY INV-185', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-185 - 11,430 BTU Mid-Capacity AC',
      description: 'A++ rated mid-capacity inverter air conditioner with 11,430 BTU cooling capacity and Wi-Fi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '11430-btu', 'mid-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-185-black',
    handle: 'galaxy-185-black',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-185 BLACK',
    description: 'Stylish black mid-capacity inverter air conditioner with 11,430 BTU cooling capacity and 11,945 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi connectivity. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>Stylish black mid-capacity inverter air conditioner with 11,430 BTU cooling capacity and 11,945 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi connectivity. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Black'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '2180.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '2180.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-185-black-variant',
        title: 'Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '2180.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-185-black-hq.jpg',
      altText: 'TADIRAN GALAXY INV-185 BLACK',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-185-black-hq.jpg', altText: 'TADIRAN GALAXY INV-185 BLACK', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-185 BLACK - 11,430 BTU Stylish AC',
      description: 'A++ rated stylish black inverter air conditioner with 11,430 BTU cooling capacity and WiFi'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '11430-btu', 'black', 'stylish', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-215',
    handle: 'galaxy-215',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-215',
    description: 'High-efficiency inverter air conditioner with 15,010 BTU cooling capacity and 15,750 BTU heating capacity. A+ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, I Feel temperature adjustment, quiet function, motion sensor, and self-cleaning.',
    descriptionHtml: '<p>High-efficiency inverter air conditioner with 15,010 BTU cooling capacity and 15,750 BTU heating capacity. A+ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, I Feel temperature adjustment, quiet function, motion sensor, and self-cleaning.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3010.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3010.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-215-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '3010.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-215-hq.jpg',
      altText: 'TADIRAN GALAXY INV-215',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-215-hq.jpg', altText: 'TADIRAN GALAXY INV-215', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-215 - 15,010 BTU High-Efficiency AC',
      description: 'A+ rated high-efficiency inverter air conditioner with 15,010 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '15010-btu', 'high-efficiency', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-245',
    handle: 'galaxy-245',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-245',
    description: 'Premium inverter air conditioner with 17,150 BTU cooling capacity and 18,150 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features AUTO mode, auto restart, sleep mode, quiet function, motion sensor, self-cleaning, and 4D air distribution.',
    descriptionHtml: '<p>Premium inverter air conditioner with 17,150 BTU cooling capacity and 18,150 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features AUTO mode, auto restart, sleep mode, quiet function, motion sensor, self-cleaning, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3770.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3770.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-245-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '3770.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-245-hq.jpg',
      altText: 'TADIRAN GALAXY INV-245',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-245-hq.jpg', altText: 'TADIRAN GALAXY INV-245', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-245 - 17,150 BTU Premium AC',
      description: 'A++ rated premium inverter air conditioner with 17,150 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '17150-btu', 'premium', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-345',
    handle: 'galaxy-345',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-345',
    description: 'High-capacity inverter air conditioner with 20,780 BTU cooling capacity and 22,200 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>High-capacity inverter air conditioner with 20,780 BTU cooling capacity and 22,200 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '4840.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '4840.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-345-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '4840.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-345-hq.jpg',
      altText: 'TADIRAN GALAXY INV-345',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-345-hq.jpg', altText: 'TADIRAN GALAXY INV-345', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-345 - 20,780 BTU High-Capacity AC',
      description: 'A++ rated high-capacity inverter air conditioner with 20,780 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '20780-btu', 'high-capacity', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-365',
    handle: 'galaxy-365',
    availableForSale: true,
    title: 'GALAXY INV-365',
    description: 'Large-capacity premium inverter air conditioner with 27,150 BTU cooling capacity and 28,170 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>Large-capacity premium inverter air conditioner with 27,150 BTU cooling capacity and 28,170 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6100.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6100.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-365-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '6100.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-365-hq.jpg',
      altText: 'GALAXY INV-365',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-365-hq.jpg', altText: 'GALAXY INV-365', width: 800, height: 600 }
    ],
    seo: {
      title: 'GALAXY INV-365 - 27,150 BTU Large-Capacity Premium AC',
      description: 'A++ rated large-capacity premium inverter air conditioner with 27,150 BTU cooling capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '27150-btu', 'large-capacity', 'premium', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-215-black',
    handle: 'galaxy-215-black',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-215 BLACK',
    description: 'Stylish black high-efficiency inverter air conditioner with 15,010 BTU cooling capacity and 15,750 BTU heating capacity. A+ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>Stylish black high-efficiency inverter air conditioner with 15,010 BTU cooling capacity and 15,750 BTU heating capacity. A+ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Black'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3100.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3100.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-215-black-variant',
        title: 'Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '3100.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-215-black-hq.jpg',
      altText: 'TADIRAN GALAXY INV-215 BLACK',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-215-black-hq.jpg', altText: 'TADIRAN GALAXY INV-215 BLACK', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-215 BLACK - 15,010 BTU Stylish AC',
      description: 'A+ rated stylish black inverter air conditioner with 15,010 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '15010-btu', 'black', 'stylish', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-245-black',
    handle: 'galaxy-245-black',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV-245 BLACK',
    description: 'Premium black inverter air conditioner with 17,150 BTU cooling capacity and 18,150 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, 4D air distribution, quiet function, and Sabbath mode.',
    descriptionHtml: '<p>Premium black inverter air conditioner with 17,150 BTU cooling capacity and 18,150 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, 4D air distribution, quiet function, and Sabbath mode.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Black'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '3880.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '3880.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-245-black-variant',
        title: 'Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '3880.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-245-black-hq.jpg',
      altText: 'TADIRAN GALAXY INV-245 BLACK',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-245-black-hq.jpg', altText: 'TADIRAN GALAXY INV-245 BLACK', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV-245 BLACK - 17,150 BTU Premium Black AC',
      description: 'A++ rated premium black inverter air conditioner with 17,150 BTU cooling capacity and WiFi control'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '17150-btu', 'premium', 'black', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-365-black',
    handle: 'galaxy-365-black',
    availableForSale: true,
    title: 'GALAXY INV-365 BLACK',
    description: 'Premium large-capacity black inverter air conditioner with 27,150 BTU cooling capacity and 28,170 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.',
    descriptionHtml: '<p>Premium large-capacity black inverter air conditioner with 27,150 BTU cooling capacity and 28,170 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, self-cleaning function, and 4D air distribution.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Black'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6280.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6280.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-365-black-variant',
        title: 'Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '6280.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-365-black-hq.jpg',
      altText: 'GALAXY INV-365 BLACK',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-365-black-hq.jpg', altText: 'GALAXY INV-365 BLACK', width: 800, height: 600 }
    ],
    seo: {
      title: 'GALAXY INV-365 BLACK - 27,150 BTU Premium Black AC',
      description: 'A++ rated premium large-capacity black inverter air conditioner with 27,150 BTU cooling capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '27150-btu', 'large-capacity', 'premium', 'black', 'wifi'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-365-3',
    handle: 'galaxy-365-3',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV 365/3',
    description: 'High-capacity three-phase inverter air conditioner with 27,600 BTU cooling capacity and 28,600 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning, and quiet function with 400V three-phase power supply.',
    descriptionHtml: '<p>High-capacity three-phase inverter air conditioner with 27,600 BTU cooling capacity and 28,600 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, timer function, motion sensor, self-cleaning, and quiet function with 400V three-phase power supply.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6560.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6560.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-365-3-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '6560.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-365-3-hq.jpg',
      altText: 'TADIRAN GALAXY INV 365/3',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-365-3-hq.jpg', altText: 'TADIRAN GALAXY INV 365/3', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV 365/3 - 27,600 BTU Three-Phase AC',
      description: 'A++ rated high-capacity three-phase inverter air conditioner with 27,600 BTU cooling capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '27600-btu', 'high-capacity', 'three-phase', 'wifi', 'hidden-homepage-featured-items'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-365-3-black',
    handle: 'galaxy-365-3-black',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV 365/3 BLACK',
    description: 'Premium black three-phase inverter air conditioner with 27,600 BTU cooling capacity and 28,600 BTU heating capacity. A++ energy rating with 5 fan speeds. Features auto restart, sleep mode, timer function, optional motion sensor, 4D air distribution, quiet function, and hydrophilic coating with 400V three-phase power supply.',
    descriptionHtml: '<p>Premium black three-phase inverter air conditioner with 27,600 BTU cooling capacity and 28,600 BTU heating capacity. A++ energy rating with 5 fan speeds. Features auto restart, sleep mode, timer function, optional motion sensor, 4D air distribution, quiet function, and hydrophilic coating with 400V three-phase power supply.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['Black'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '6750.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '6750.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-365-3-black-variant',
        title: 'Black',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'Black' }
        ],
        price: { amount: '6750.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-365-3-black-hq.jpg',
      altText: 'TADIRAN GALAXY INV 365/3 BLACK',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-365-3-black-hq.jpg', altText: 'TADIRAN GALAXY INV 365/3 BLACK', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV 365/3 BLACK - 27,600 BTU Premium Three-Phase AC',
      description: 'A++ rated premium black three-phase inverter air conditioner with 27,600 BTU cooling capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '27600-btu', 'premium', 'three-phase', 'black', 'hidden-homepage-featured-items'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'galaxy-455-3',
    handle: 'galaxy-455-3',
    availableForSale: true,
    title: 'TADIRAN GALAXY INV 455/3',
    description: 'Ultra-high-capacity three-phase inverter air conditioner with 32,030 BTU cooling capacity and 31,250 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, 4D air distribution, and self-cleaning function with 400V three-phase power supply.',
    descriptionHtml: '<p>Ultra-high-capacity three-phase inverter air conditioner with 32,030 BTU cooling capacity and 31,250 BTU heating capacity. A++ energy rating with 5 fan speeds and WiFi control. Features auto restart, sleep mode, motion sensor, 4D air distribution, and self-cleaning function with 400V three-phase power supply.</p>',
    options: [
      { id: 'color', name: 'Color', values: ['White'] }
    ],
    priceRange: {
      minVariantPrice: { amount: '8230.00', currencyCode: 'ILS' },
      maxVariantPrice: { amount: '8230.00', currencyCode: 'ILS' }
    },
    variants: [
      {
        id: 'galaxy-455-3-variant',
        title: 'White',
        availableForSale: true,
        selectedOptions: [
          { name: 'Color', value: 'White' }
        ],
        price: { amount: '8230.00', currencyCode: 'ILS' }
      }
    ],
    featuredImage: {
      url: '/ac-images/galaxy-455-3-hq.jpg',
      altText: 'TADIRAN GALAXY INV 455/3',
      width: 800,
      height: 600
    },
    images: [
      { url: '/ac-images/galaxy-455-3-hq.jpg', altText: 'TADIRAN GALAXY INV 455/3', width: 800, height: 600 }
    ],
    seo: {
      title: 'TADIRAN GALAXY INV 455/3 - 32,030 BTU Ultra-High-Capacity Three-Phase AC',
      description: 'A++ rated ultra-high-capacity three-phase inverter air conditioner with 32,030 BTU cooling capacity'
    },
    tags: ['air-conditioner', 'inverter', 'tadiran', 'galaxy', 'hvac', '32030-btu', 'ultra-high-capacity', 'three-phase', 'wifi', 'hidden-homepage-featured-items'],
    updatedAt: new Date().toISOString()
  }
];

const mockCollections: Collection[] = [
  {
    handle: 'all',
    title: 'All Air Conditioners',
    description: 'Browse our complete collection of Tadiran air conditioners',
    seo: {
      title: 'All Air Conditioners',
      description: 'Complete Tadiran AC catalog'
    },
    path: '/search',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'hidden-homepage-featured-items',
    title: 'Featured Items',
    description: 'Featured items for the homepage',
    seo: {
      title: 'Featured Items',
      description: 'Featured items for the homepage'
    },
    path: '/search/hidden-homepage-featured-items',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'supreme',
    title: 'Supreme Series',
    description: 'Premium Supreme inverter air conditioners with advanced features',
    seo: {
      title: 'Supreme Series',
      description: 'Premium Supreme inverter air conditioners'
    },
    path: '/search/supreme',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'alpha-pro',
    title: 'Alpha Pro Series',
    description: 'Professional-grade Alpha Pro inverter air conditioners',
    seo: {
      title: 'Alpha Pro Series',
      description: 'Professional Alpha Pro inverter air conditioners'
    },
    path: '/search/alpha-pro',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'joy',
    title: 'Joy Series',
    description: 'Premium Joy inverter air conditioners',
    seo: {
      title: 'Joy Series',
      description: 'Premium Joy inverter air conditioners'
    },
    path: '/search/joy',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'solo',
    title: 'Solo Series',
    description: 'Mid-range Solo inverter air conditioners',
    seo: {
      title: 'Solo Series',
      description: 'Mid-range Solo inverter air conditioners'
    },
    path: '/search/solo',
    updatedAt: new Date().toISOString()
  },
  {
    handle: 'galaxy',
    title: 'Galaxy Series',
    description: 'Premium Galaxy inverter air conditioners',
    seo: {
      title: 'Galaxy Series',
      description: 'Premium Galaxy inverter air conditioners'
    },
    path: '/search/galaxy',
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
    const result = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
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
    if (e instanceof Error) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: 500,
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
        cart.lines[existingLineIndex]!.quantity += line.quantity;
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
      const product = mockProducts.find(p => p.id === cartLine.merchandise.product.id);
      const variant = product?.variants.find(v => v.id === cartLine.merchandise.id);
      if (variant) {
        cartLine.quantity = line.quantity;
        cartLine.cost.totalAmount.amount = (
          parseFloat(variant.price.amount) * line.quantity
        ).toFixed(2);
      }
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
    products = products.filter(p => p.tags.includes(collection));
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
    { title: 'Air Conditioners', path: '/search' },
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
