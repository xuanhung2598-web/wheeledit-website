
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Service } from '../types';
import { FaArrowLeft, FaTimes, FaSearchPlus, FaPlay } from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { getFlickrUrl } from '../lib/flickr';
import { parseVideoUrl } from '../lib/video';

interface ServiceGalleryClientProps {
  service: Service;
}

const ServiceGalleryClient: React.FC<ServiceGalleryClientProps> = ({ service }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const images = service.gallery || [];
  const videos = service.videos || (service.videoUrl ? [service.videoUrl] : []);

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

        {/* Gallery for Images */}
        {images.length > 0 && (
          <div className="mb-16">
            {videos.length > 0 && (
              <h2 className="text-3xl font-black text-gray-900 mb-8">Photo Showcase</h2>
            )}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, index) => (
                <AnimateOnScroll key={index} delay={index * 0.05}>
                  <div 
                    className="relative break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl cursor-zoom-in group"
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image 
                      src={getFlickrUrl(img, 'b')} 
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
          </div>
        )}

        {/* Gallery for Videos */}
        {videos.length > 0 && (
          <div className="mb-16">
            {images.length > 0 && (
              <h2 className="text-3xl font-black text-gray-900 mb-8">Video Showcase</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vidUrl, index) => {
                const parsed = parseVideoUrl(vidUrl);
                return (
                  <AnimateOnScroll key={index} delay={index * 0.1}>
                    <div 
                      className="relative aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer group bg-black"
                      onClick={() => setSelectedVideoUrl(vidUrl)}
                    >
                      <Image 
                        src={parsed.thumbnailUrl} 
                        alt="Video thumbnail"
                        fill
                        className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-102"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#007BFF]/90 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                          <FaPlay className="ml-1 text-white text-xl" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-6 text-white text-lg font-bold">
                        Video Sample #{index + 1}
                      </div>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        )}

        <AnimateOnScroll delay={0.4}>
          <div className="mt-24 py-16 rounded-[2rem] bg-gray-900 text-center text-white">
                <h2 className="text-4xl font-black mb-6">Want to see your content like these?</h2>
                <button onClick={openModal} className="bg-[#007BFF] px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#0056b3] transition-colors">
                    Get Free Test Edit
                </button>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <MotionDiv 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" 
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 text-4xl transition-colors z-[2020] p-2"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>
            <MotionDiv 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] flex items-center justify-center select-none"
              onClick={(e: any) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={getFlickrUrl(selectedImage, 'b')} 
                alt="Preview" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Video Lightbox */}
      <AnimatePresence>
        {selectedVideoUrl && (
          <MotionDiv 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out" 
            onClick={() => setSelectedVideoUrl(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 text-4xl transition-colors z-[2020] p-2"
              onClick={() => setSelectedVideoUrl(null)}
            >
              <FaTimes />
            </button>
            <MotionDiv 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
              onClick={(e: any) => e.stopPropagation()}
            >
              {(() => {
                const parsed = parseVideoUrl(selectedVideoUrl);
                if (parsed.type === 'direct') {
                  return (
                    <video 
                      src={parsed.embedUrl} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-contain"
                    />
                  );
                }
                return (
                  <iframe 
                    src={parsed.embedUrl} 
                    title="Video Preview"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                  />
                );
              })()}
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceGalleryClient;
