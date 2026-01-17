
'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from './AnimateOnScroll';
import { Service, Post } from '../types';
import { services, testimonials, socialLinks, contactInfo } from '../lib/data';
import { FaRocket, FaGem, FaDollarSign, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaImages } from 'react-icons/fa';


const ServiceCard: React.FC<{ service: Service; reverse?: boolean }> = ({ service, reverse = false }) => {
  const openModal = () => window.dispatchEvent(new CustomEvent('open-modal'));
  
  const textOrder = reverse ? 'lg:order-first' : '';

  return (
    <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
      <div className={`lg:col-span-3 ${reverse ? 'lg:order-last' : ''}`}>
        {service.videoUrl ? (
          <div className="aspect-video rounded-xl shadow-2xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={service.videoUrl}
              title={service.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ) : (
          service.before && service.after && <BeforeAfterSlider before={service.before} after={service.after} alt={service.title} />
        )}
      </div>
      <div className={`lg:col-span-2 text-center sm:text-left ${textOrder}`}>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h3>
        <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <button onClick={openModal} className="cta-button bg-[#007BFF] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0056b3] transition-all duration-300 hover:-translate-y-0.5 shadow-md">
            Get a Free Test
          </button>
          {service.gallery && service.gallery.length > 0 && (
            <Link 
              href={`/services/${service.slug}/`} 
              className="flex items-center justify-center gap-2 border-2 border-[#007BFF] text-[#007BFF] px-7 py-3 rounded-lg font-semibold hover:bg-[#007BFF] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaImages /> View Gallery
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


const HomePageClient: React.FC<{ recentPosts: Post[] }> = ({ recentPosts }) => {
  const openModal = () => {
    window.dispatchEvent(new CustomEvent('open-modal'));
  };
  
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactMessage, setContactMessage] = useState('');
  
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setContactStatus('sending');
    setContactMessage('');

    const formData = new FormData(form);
    formData.append('formType', form.id);
    
    const scriptURL = process.env.NEXT_PUBLIC_SCRIPT_URL;
    if (!scriptURL) {
      console.error("NEXT_PUBLIC_SCRIPT_URL missing");
      setContactStatus('error');
      setContactMessage('Configuration error.');
      return;
    }

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      setContactStatus('success');
      setContactMessage('Thank you for your message!');
      form.reset();
      setTimeout(() => setContactStatus('idle'), 4000);
    } catch (error) {
      setContactStatus('error');
      setContactMessage('Error sending message.');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };

  const getContactButtonText = () => {
    switch (contactStatus) {
      case 'sending': return 'Sending...';
      case 'success': return 'Sent!';
      case 'error': return 'Failed';
      default: return 'Send Message';
    }
  };


  return (
    <>
      <section id="hero" className="relative h-[80vh] flex items-center justify-center text-white text-center">
        <Image
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
          alt="Hero"
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <AnimateOnScroll className="relative z-10 p-5 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Professional Real Estate Photo Editing</h1>
          <p className="text-lg md:text-xl mb-8">Stunning, high-quality images that sell properties faster.</p>
          <button onClick={openModal} className="cta-button bg-[#007BFF] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#0056b3] transition-all duration-300 shadow-lg">
            Get Your Free Test Edit
          </button>
        </AnimateOnScroll>
      </section>

      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          </div>
          <div className="space-y-20">
            {services.map((service, index) => (
              <AnimateOnScroll key={service.slug}>
                <ServiceCard service={service} reverse={index % 2 !== 0} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <AnimateOnScroll>
              <div className="p-6">
                <FaRocket className="text-4xl text-[#007BFF] mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Fast Turnaround</h4>
                <p className="text-gray-600">Edited photos back within 12-24 hours.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="p-6">
                <FaGem className="text-4xl text-[#007BFF] mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Quality Results</h4>
                <p className="text-gray-600">Meticulous color correction and window pulls.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="p-6">
                <FaDollarSign className="text-4xl text-[#007BFF] mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Affordable</h4>
                <p className="text-gray-600">Top-tier editing at competitive prices.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
           <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800">Get In Touch</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 bg-gray-50 p-8 rounded-lg shadow-lg">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Send Us a Message</h3>
                    <form id="contact-form" onSubmit={handleContactSubmit}>
                        <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 mb-4 border rounded-lg" />
                        <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-3 mb-4 border rounded-lg" />
                        <textarea name="message" rows={5} placeholder="Message" required className="w-full px-4 py-3 mb-4 border rounded-lg"></textarea>
                        <button type="submit" disabled={contactStatus !== 'idle'} className="cta-button w-full bg-[#007BFF] text-white py-3.5 rounded-lg font-bold">
                          {getContactButtonText()}
                        </button>
                    </form>
                </div>
                <div>
                    <h3 className="text-2xl font-bold mb-4">Contact info</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3"><FaEnvelope /> {contactInfo.email}</li>
                        <li className="flex items-center gap-3"><FaWhatsapp /> {contactInfo.phoneDisplay}</li>
                        <li className="flex items-center gap-3"><FaMapMarkerAlt /> {contactInfo.address}</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default HomePageClient;
