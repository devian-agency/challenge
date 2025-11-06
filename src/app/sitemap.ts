import { MetadataRoute } from 'next';
import { series } from '@/contants/60day-series';

const URL = 'https://challenge.devian.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = series.map((s) => ({
    url: `${URL + s.slug}`,
    lastModified: new Date(s.completedOn || s.challengedOn),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ];

  return [...staticRoutes, ...blogs];
}
