import React from 'react';
import type { Testimonial } from '../types';

const testimonialsData: Testimonial[] = [
  {
    quote: 'I’ve used their HDR editing service multiple times and the results are always consistent. The photos look bright, natural, and professional — exactly what I was hoping for!',
    author: 'Sarah L.',
    company: 'Real Estate Agent',
    avatar: 'https://i.pravatar.cc/80?img=47'
  },
  {
    quote: 'The turnaround speed really impressed me. I sent a large batch and got everything back the next day with perfect edits. Reliable and easy to work with.',
    author: 'Mark S.',
    company: 'Photographer',
    avatar: 'https://i.pravatar.cc/80?img=54'
  },
  {
    quote: 'Their attention to detail is outstanding. Every correction was spot on, and the final images looked better than I expected. Highly recommended.',
    author: 'Emily R.',
    company: 'Property Manager',
    avatar: 'https://i.pravatar.cc/80?img=9'
  },
];

const Testimonials: React.FC = () => {
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