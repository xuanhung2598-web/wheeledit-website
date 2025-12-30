
import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/GPTBot',
          '/ChatGPT-User',
          '/CCBot',
          '/Bytespider',
          '/ImagesiftBot',
          '/cohere-ai',
          '/FacebookBot',
          '/anthropic-ai',
          '/Claude-Web'
        ],
      },
    ],
    sitemap: 'https://wheeledit.com/sitemap.xml',
  };
}
