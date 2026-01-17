
import React from 'react';
import { services } from '../../../lib/data';
import { notFound } from 'next/navigation';
import ServiceGalleryClient from '../../../components/ServiceGalleryClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  // Chỉ tạo trang cho những dịch vụ có ảnh trong gallery
  return services
    .filter(s => s.gallery && s.gallery.length > 0)
    .map(service => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const service = services.find(s => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} Portfolio`,
    description: `Browse our high-quality real estate editing examples for ${service.title}. Professional results delivered in 24 hours.`,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const service = services.find(s => s.slug === slug);

  if (!service || !service.gallery) {
    notFound();
  }

  return <ServiceGalleryClient service={service} />;
}
