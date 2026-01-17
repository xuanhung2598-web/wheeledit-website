
import React from 'react';
import { services } from '../../../lib/data';
import { notFound } from 'next/navigation';
import ServiceGalleryClient from '../../../components/ServiceGalleryClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return services
    .filter(s => s.gallery && s.gallery.length > 0)
    .map(service => ({
      slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find(s => s.slug === params.slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} Portfolio`,
    description: `Browse our high-quality real estate editing examples for ${service.title}. Professional results delivered in 24 hours.`,
  };
}

const ServicePage = ({ params }: { params: { slug: string } }) => {
  const service = services.find(s => s.slug === params.slug);

  if (!service || !service.gallery) {
    notFound();
  }

  return <ServiceGalleryClient service={service} />;
};

export default ServicePage;
