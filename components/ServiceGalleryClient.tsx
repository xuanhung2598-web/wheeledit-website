
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
  const MotionDiv = motion.div as any;

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5">
        <AnimateOnScroll>
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#007BFF] transition-colors">
              <FaArrowLeft /> Back to Overview
            </Link>
          </div>
          
          <header className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-black text-gray-900 mb-4">{service.title} Portfolio</h1>
                <p className="text-xl text-gray-500">{service.description}</p>
              </div>
              <button onClick={openModal} className="bg-[#007BFF] text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-[#0056b3]">
                Order Custom Test
              </button>
            </div>
            <div className="w-full h-px bg-gray-100 mt-12"></div>
          </header>
        </AnimateOnScroll>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <AnimateOnScroll key={index} delay={index * 0.05}>
              <div 
                className="relative break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl cursor-zoom-in group"
                onClick={() => setSelectedImage(img)}
              >
                <Image 
                  src={img} 
                  alt="Gallery"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <FaSearchPlus className="text-white text-3xl" />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={0.4}>
          <div className="mt-24 py-16 rounded-[2rem] bg-gray-900 text-center text-white">
                <h2 className="text-4xl font-black mb-6">Want to see your photos like these?</h2>
                <button onClick={openModal} className="bg-[#007BFF] px-10 py-5 rounded-2xl font-bold text-xl">
                    Get Free Test Edit
                </button>
          </div>
        </AnimateOnScroll>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <MotionDiv 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4" 
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white text-4xl">&times;</button>
            <MotionDiv initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative w-full h-full max-w-7xl">
                <Image src={selectedImage} alt="Preview" fill className="object-contain" unoptimized />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceGalleryClient;
