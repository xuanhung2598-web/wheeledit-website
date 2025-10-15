import React from 'react';
import type { Service } from '../types';
import ServiceCard from './ServiceCard';

interface ServicesProps {
    onGetFreeTest: (service: Service) => void;
    servicesData: Service[];
}

const Services: React.FC<ServicesProps> = ({ onGetFreeTest, servicesData }) => {
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
