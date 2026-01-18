
import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/posts';
import { services } from '../lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wheeledit.com';
  
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ meta }) => ({
    url: `${baseUrl}/blog/${meta.slug}/`,
    lastModified: new Date(meta.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    ...postEntries,
    ...serviceEntries,
  ];
}
