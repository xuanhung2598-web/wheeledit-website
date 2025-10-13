import React from 'react';
import type { Service } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ServiceCardProps {
  service: Service;
  index: number;
  onGetFreeTest: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onGetFreeTest }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-10 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
      <div className="w-full lg:w-3/5">
        {service.videoUrl ? (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <iframe
                src={service.videoUrl}
                title={service.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          ) : service.beforeImg && service.afterImg ? (
            <BeforeAfterSlider before={service.beforeImg} after={service.afterImg} />
          ) : (
            <div className="relative aspect-video rounded-lg shadow-xl bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No preview available</p>
            </div>
          )}
      </div>
      <div className={`w-full lg:w-2/5 ${!isEven ? 'lg:text-right' : 'lg:text-left'}`}>
        <h3 className="text-3xl font-bold text-gray-900">{service.name}</h3>
        <p className="text-2xl font-bold text-blue-500 my-3">{service.price}</p>
        <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
        {service.isTestable && (
          <button
            onClick={() => onGetFreeTest(service)}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            Get a Free Test
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;