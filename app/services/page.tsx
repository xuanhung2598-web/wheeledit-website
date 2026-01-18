
import React from 'react';
import Link from 'next/link';
import { services } from '../../lib/data';
import AnimateOnScroll from '../../components/AnimateOnScroll';
import { FaImages, FaArrowRight } from 'react-icons/fa';

export const metadata = {
  title: 'Our Real Estate Editing Services',
  description: 'Explore our range of professional photo and video editing services for real estate.',
};

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-4">Editing Services</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select a service to view our portfolio and quality examples.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.slug} delay={index * 0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-blue-50 text-[#007BFF] rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-[#007BFF] group-hover:text-white transition-colors">
                  <FaImages />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-6 line-clamp-2">{service.description}</p>
                <Link 
                  href={`/services/${service.slug}/`}
                  className="inline-flex items-center gap-2 font-bold text-[#007BFF] hover:gap-4 transition-all"
                >
                  View Gallery <FaArrowRight />
                </Link>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
