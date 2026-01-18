
import React from 'react';
import { services } from '../../../lib/data';
import { notFound } from 'next/navigation';
import ServiceGalleryClient from '../../../components/ServiceGalleryClient';
import type { Metadata } from 'next';

// Ép buộc Next.js xử lý trang này là static hoàn toàn
export const dynamic = 'force-static';
export const dynamicParams = false;

// Hàm này cực kỳ quan trọng, nó phải trả về danh sách slug
export async function generateStaticParams() {
  const paths = services.map((service) => ({
    slug: service.slug,
  }));
  
  // Log này sẽ xuất hiện trong Cloudflare Build Log nếu thành công
  console.log('--- GENERATING GALLERY PAGES ---');
  paths.forEach(p => console.log(`Path: /services/${p.slug}/`));
  
  return paths;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find(s => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} Portfolio`,
    description: service.description,
    alternates: {
      canonical: `/services/${params.slug}/`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find(s => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceGalleryClient service={service} />;
}
