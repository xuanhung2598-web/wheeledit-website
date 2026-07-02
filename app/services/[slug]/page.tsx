import React from 'react';
import { services } from '../../../lib/data';
import { notFound } from 'next/navigation';
import ServiceGalleryClient from '../../../components/ServiceGalleryClient';
import type { Metadata } from 'next';

// 1. Cấu hình bắt buộc cho Static Export
export const dynamic = 'force-static';
export const dynamicParams = false;

/**
 * 2. KHAI BÁO BIẾN EXPORT (Next.js scanner ưu tiên cách này trên Windows)
 */
export async function generateStaticParams() {
  return [
    { slug: 'single-exposure' },
    { slug: 'hdr-merge' },
    { slug: 'flash' },
    { slug: 'video-editing' },
    { slug: 'object-removal' },
    { slug: 'virtual-staging' }
  ];
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
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceGalleryClient service={service} />;
}
