import { MetadataRoute } from 'next';
import { motorcycles, spareParts } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hawkmotor.com.tr';

  // Core Static URLs
  const staticRoutes = [
    '',
    '/motosikletler',
    '/yedek-parca',
    '/hakkimizda',
    '/iletisim',
    '/odeme'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Motorcycle URLs
  const motorRoutes = motorcycles.map((motor) => ({
    url: `${baseUrl}/urun/${motor.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Dynamic Spare Part URLs
  const sparePartRoutes = spareParts.map((part) => ({
    url: `${baseUrl}/urun/${part.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...motorRoutes, ...sparePartRoutes];
}
