import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wheeledit.com';
  
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(({ meta }) => ({
    url: `${baseUrl}/blog/${meta.slug}`,
    lastModified: new Date(meta.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postEntries,
  ];
}
