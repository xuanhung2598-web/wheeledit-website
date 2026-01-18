
import React from 'react';
// Sửa đường dẫn từ ../../../ thành ../../../../ vì file này nằm sâu 4 cấp
import { services } from '../../../../lib/data';
import { notFound } from 'next/navigation';
import ServiceGalleryClient from '../../../../components/ServiceGalleryClient';
import type { Metadata } from 'next';

// Quan trọng: Ngăn Next.js cố gắng tạo trang động lúc runtime trên Cloudflare
export const dynamicParams = false;

export async function generateStaticParams() {
  // Debug log để kiểm tra trong quá trình build (xem trong Cloudflare Logs)
  console.log('Generating static pages for services...');
  
  const paths = services
    .filter(s => s.gallery && s.gallery.length > 0)
    .map(service => ({
      slug: service.slug,
    }));
    
  console.log(`Exporting ${paths.length} service gallery pages.`);
  return paths;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} Portfolio`,
    description: `Browse our high-quality real estate editing examples for ${service.title}. Professional results delivered in 24 hours.`,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  if (!service || !service.gallery) {
    notFound();
  }

  return <ServiceGalleryClient service={service} />;
}
