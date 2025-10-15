import React from 'react';
import ServiceCard from './ServiceCard';
import texts from '/data/texts.json'; // ✅ thêm dòng này

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  beforeImg: string;
  afterImg: string;
}

interface ServicesProps {
  onGetFreeTest: () => void;
}

const Services: React.FC<ServicesProps> = ({ onGetFreeTest }) => {
  const servicesData: Service[] = [
    {
      id: 'single',
      name: 'Single Exposure',
      price: '$0.40 / image',
      description:
        'Basic enhancements including color correction, sharpening, and lens distortion removal for a clean, vibrant look.',
      beforeImg: '/img/before1.jpg',
      afterImg: '/img/after1.jpg',
    },
    {
      id: 'hdr',
      name: 'HDR Merge',
      price: '$0.60 / image',
      description:
        'We blend multiple exposures to create a perfectly lit image with balanced light and vibrant colors.',
      beforeImg: '/img/before2.jpg',
      afterImg: '/img/after2.jpg',
    },
    {
      id: 'flash',
      name: 'Flash',
      price: '$0.80 / image',
      description:
        'Combining ambient and flash exposures for crisp, natural interior photos.',
      beforeImg: '/img/before3.jpg',
      afterImg: '/img/after3.jpg',
    },
  ];

  // ✅ override text từ JSON nếu trùng id
  const overrideServices = servicesData.map((svc) => {
    const o = (texts?.services ?? []).find((x: any) => x.id === svc.id);
    return o
      ? {
          ...svc,
          name: o.name ?? svc.name,
          price: o.price ?? svc.price,
          description: o.description ?? svc.description,
        }
      : svc;
  });

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-12">
          {texts?.servicesTitle ?? 'Our Services'}
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {overrideServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onGetFreeTest={onGetFreeTest}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
