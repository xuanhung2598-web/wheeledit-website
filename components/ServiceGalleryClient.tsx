'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '../types';
import { FaArrowLeft, FaTimes, FaSearchPlus } from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceGalleryClientProps {
  service: Service;
}

const ServiceGalleryClient: React.FC<ServiceGalleryClientProps> = ({ service }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = service.gallery || [];

  const openModal = () => window.dispatchEvent(new CustomEvent('open-modal'));

  // FIX: Cast motion.div to any to bypass strict type checking issues with framer-motion props in certain environments.
  const MotionDiv = motion.div as any;

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5">
        <AnimateOnScroll>
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 font-medium hover:text-[#007BFF] transition-colors group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Overview
            </Link>
          </div>
          
          <header className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                  {service.title} Portfolio
                </h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                  {service.description} Browse our recent projects and high-quality editing results.
                </p>
              </div>
              <button onClick={openModal} className="whitespace-nowrap bg-[#007BFF] text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-[#0056b3] transition-all transform hover:-translate-y-1">
                Order Custom Test
              </button>
            </div>
            <div className="w-full h-px bg-gray-100 mt-12"></div>
          </header>
        </AnimateOnScroll>

        {/* Grid of Images (Masonry Style) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <AnimateOnScroll key={index} delay={index * 0.05}>
              <div 
                className="relative break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-zoom-in group"
                onClick={() => setSelectedImage(img)}
              >
                <Image 
                  src={img} 
                  alt={`${service.title} showcase ${index + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <FaSearchPlus className="text-2xl" />
                   </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-xl font-medium">Coming soon! We are currently uploading our latest works.</p>
          </div>
        )}

        <AnimateOnScroll delay={0.4}>
          <div className="mt-24 py-16 px-8 rounded-[2rem] bg-gray-900 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#007BFF] rounded-full blur-[100px]"></div>
            </div>
            <div className="relative z-10 text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Want to see your photos like these?</h2>
                <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
                  Experience our premium quality for free. Send us your project today.
                </p>
                <button onClick={openModal} className="bg-[#007BFF] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-gray-900 transition-all shadow-xl">
                    Get Free Test Edit
                </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <MotionDiv 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10" 
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl p-2 z-[2001] transition-colors" 
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <MotionDiv 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }} 
              className="relative w-full h-full max-w-7xl"
            >
                <Image 
                  src={selectedImage} 
                  alt="Gallery preview" 
                  fill 
                  className="object-contain" 
                  unoptimized 
                />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceGalleryClient;
