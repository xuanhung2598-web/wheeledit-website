import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialsProps {
  testimonialsData: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonialsData }) => {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg text-center border-l-4 border-blue-500 shadow-lg">
              <img src={testimonial.avatar} alt={testimonial.author} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
              <blockquote className="text-gray-600 italic mb-6 text-lg">"{testimonial.quote}"</blockquote>
              <cite className="font-bold text-gray-900 not-italic block">{testimonial.author}</cite>
              <span className="text-sm text-gray-500">{testimonial.company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
