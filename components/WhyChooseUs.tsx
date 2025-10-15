import React from 'react';
import { WhyChooseUsData } from '../types';

interface WhyChooseUsProps {
    data: WhyChooseUsData;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ data }) => {
  return (
    <section id="about" className="section-padding bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="section-title">{data.title}</h2>
        <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-600 leading-relaxed">
            {data.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {data.features.map((item, index) => (
                <div key={index} className="p-6">
                    <i className={`${item.icon} text-4xl text-blue-500 mb-4`}></i>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
