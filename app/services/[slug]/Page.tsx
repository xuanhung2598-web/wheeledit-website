
import React from 'react';
import { services } from '../../../lib/data';
import { notFound } from 'next/navigation';
import ServiceGalleryClient from '../../../components/ServiceGalleryClient';
import type { Metadata } from 'next';

// dynamicParams = false buộc Next.js phải có đủ params tại thời điểm build
export const dynamicParams = false;

export async function generateStaticParams() {
  // Lấy tất cả các service có slug, không cần filter quá phức tạp ở đây 
  // để đảm bảo Next.js nhận diện được các route
  const paths = services.map((service) => ({
    slug: service.slug,
  }));
  
  return paths;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: `${service.title} Portfolio`,
    description: `Browse our high-quality real estate editing examples for ${service.title}. Professional results delivered in 24 hours.`,
    alternates: {
      canonical: `/services/${slug}/`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const service = services.find(s => s.slug === slug);

  // Nếu không có gallery, chúng ta vẫn cho hiển thị giao diện trống thay vì 404 ngay lập tức
  if (!service) {
    notFound();
  }

  return <ServiceGalleryClient service={service} />;
}
