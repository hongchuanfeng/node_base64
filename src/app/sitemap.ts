import type { Metadata } from 'next';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.base64.club';
  
  const routes = [
    '',
    '/text-base64',
    '/file-base64',
    '/image-base64',
    '/url-base64',
    '/base16',
    '/base32',
    '/base58',
    '/base62',
    '/base85',
    '/base100',
    '/batch',
    '/api',
    '/analyze',
    '/security',
    '/learn',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/copyright',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
