import { MetadataRoute } from 'next';
import blogData from '@/components/Blog/blogData';

// Basic sitemap; extend with dynamic content (e.g. blog posts) later.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://pantmig.dk';
  const staticRoutes = [
    '',
    '/about',
    '/how-it-works',
    '/saadan-virker-det',
    '/blog',
    '/blog-sidebar',
    '/contact',
    '/privatlivspolitik',
    '/refusionspolitik',
    '/vilkar'
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogData.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
