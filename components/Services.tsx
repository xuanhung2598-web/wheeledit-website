import React from 'react';
import type { Service } from '../types';
import ServiceCard from './ServiceCard';

const servicesData: Service[] = [
  {
    id: 'single',
    name: 'Single Exposure',
    price: '$0.40 / image',
    description: 'Basic enhancements including color correction, sharpening, and lens distortion removal for a clean, vibrant look.',
    beforeImg: 'https://live.staticflickr.com/65535/54829022669_6e6416f3bd_b.jpg',
    afterImg: 'https://live.staticflickr.com/65535/54829022684_1289cf76ba_b.jpg',
    isTestable: true,
  },
  {
    id: 'hdr',
    name: 'HDR Merge',
    price: '$0.60 / image',
    description: 'We blend multiple exposures to create a single, perfectly lit image with balanced light and vibrant colors.',
    beforeImg: 'https://live.staticflickr.com/65535/54827937127_f75707f023_b.jpg',
    afterImg: 'https://live.staticflickr.com/65535/54829036884_0985b6af3f_b.jpg',
    isTestable: true,
  },
  {
    id: 'flash',
    name: 'Flash',
    price: '$0.80 / image',
    description: 'The ultimate technique for natural, crisp, and color-accurate interior photos by combining ambient light with flash shots.',
    beforeImg: 'https://live.staticflickr.com/65535/54829049034_6884ac4613_b.jpg',
    afterImg: 'https://live.staticflickr.com/65535/54827949842_efeeb39a29_b.jpg',
    isTestable: true,
  },
  {
    id: 'ai',
    name: 'AI Enhancement',
    price: '$0.25 / image',
    description: 'Leverage AI for automated enhancements like sky replacement, lighting adjustments, and color grading for stunning results in seconds.',
    beforeImg: 'https://i.imgur.com/8p4gPEc.jpg',
    afterImg: 'https://i.imgur.com/N185dOR.jpg',
    isTestable: true,
  },
  {
    id: 'video',
    name: 'Video Editing',
    price: '$20.00 / video',
    description: 'Professional cuts, color grading, and stabilization for engaging property tours that captivate buyers.',
    beforeImg: '',
    afterImg: '',
    videoUrl: 'https://www.youtube.com/embed/VKAKbueezMk?autoplay=1&mute=1&loop=1&playlist=VKAKbueezMk',
    isTestable: false,
  },
  {
    id: 'removal',
    name: 'Object Removal',
    price: '$1.00–$10.00 / image',
    description: 'Declutter your shots by seamlessly removing unwanted objects, from cords to furniture, for a cleaner final image.',
    beforeImg: 'https://live.staticflickr.com/65535/54829080033_c23baa136b_b.jpg',
    afterImg: 'https://live.staticflickr.com/65535/54828818451_5ea312f454_b.jpg',
    isTestable: false,
  },
  {
    id: 'staging',
    name: 'Virtual Staging',
    price: '$10.00 / image',
    description: 'Transform empty rooms into beautifully furnished spaces that attract more buyers and help them visualize their future home.',
    beforeImg: 'https://live.staticflickr.com/65535/54829166810_16e0cbd5ee_b.jpg',
    afterImg: 'https://live.staticflickr.com/65535/54829166930_ed2a3b04bf_b.jpg',
    isTestable: false,
  },
];

interface ServicesProps {
    onGetFreeTest: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onGetFreeTest }) => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Our Services</h2>
        <div className="flex flex-col gap-20">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} onGetFreeTest={onGetFreeTest} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;