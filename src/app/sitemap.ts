import { MetadataRoute } from 'next';
import { series } from '@/contants/60day-series';

function parseDMY(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day + 1 > 31 ? 31 : day);
}


const URL = 'https://challenge.devian.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const challenges = series.map(({slug, completedOn, challengedOn}) => ({
    url: `${URL + slug}`,
    lastModified: parseDMY(completedOn || challengedOn),
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

  return [...staticRoutes, ...challenges];
}
