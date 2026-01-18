
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
        <h3 className="text-3xl font-bold text-gray-800">{service.title}</h3>
        {service.price && <p className="text-2xl font-semibold text-[#007BFF] my-3">{service.price}</p>}
        <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
          <button onClick={openModal} className="cta-button bg-[#007BFF] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0056b3] transition-all duration-300 hover:-translate-y-0.5 shadow-md">
            Get a Free Test
          </button>
          
          <Link 
            href={`/services/${service.slug}/`} 
            className="flex items-center justify-center gap-2 border-2 border-[#007BFF] text-[#007BFF] px-7 py-3 rounded-lg font-semibold hover:bg-[#007BFF] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            <FaImages /> View Gallery
          </Link>
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
      setContactStatus('error');
      setContactMessage('Configuration error. Please contact support.');
      return;
    }

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      setContactStatus('success');
      setContactMessage('Thank you! Your message has been sent.');
      form.reset();
      setTimeout(() => {
        setContactStatus('idle');
        setContactMessage('');
      }, 4000);
    } catch (error) {
      setContactStatus('error');
      setContactMessage('Error sending message. Please try again.');
      setTimeout(() => setContactStatus('idle'), 4000);
    }
  };

  const getContactButtonText = () => {
    switch (contactStatus) {
      case 'sending': return 'Sending...';
      case 'success': return 'Sent Successfully!';
      case 'error': return 'Sending Failed';
      default: return 'Send Message';
    }
  };


  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-white text-center">
        <Image
          src="https://live.staticflickr.com/65535/54928312057_6d9393f582_b.jpg"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <AnimateOnScroll className="relative z-10 p-5 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Professional Real Estate Photo Editing</h1>
          <p className="text-lg md:text-xl mb-8">Stunning, high-quality images that sell properties faster. First edit is on us!</p>
          <button onClick={openModal} className="cta-button bg-[#007BFF] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#0056b3] transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Your Free Test Edit
          </button>
        </AnimateOnScroll>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              Our Services
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
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

      {/* Why Us Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              Why Choose Us?
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
            <p className='text-lg text-gray-600 mt-8 max-w-3xl mx-auto'>We are a dedicated team of professionals committed to delivering the highest-quality results tailored to your needs — with the best speed and pricing in the market.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <AnimateOnScroll>
              <div className="p-6">
                <div className="inline-block p-5 bg-blue-100 rounded-full mb-4">
                  <FaRocket className="text-3xl text-[#007BFF]" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Fast Turnaround</h4>
                <p className="text-gray-600">Get your edited photos back within 12-24 hours, so you can list your properties sooner.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="p-6">
                <div className="inline-block p-5 bg-blue-100 rounded-full mb-4">
                  <FaGem className="text-3xl text-[#007BFF]" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Quality Results</h4>
                <p className="text-gray-600">Our meticulous process ensures every detail is perfect, from color correction to window pulls.</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="p-6">
                <div className="inline-block p-5 bg-blue-100 rounded-full mb-4">
                  <FaDollarSign className="text-3xl text-[#007BFF]" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Affordable Pricing</h4>
                <p className="text-gray-600">Top-tier editing services at competitive prices to maximize your return on investment.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              What Our Clients Say
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-lg border-l-4 border-[#007BFF] shadow-lg h-full">
                  <Image src={testimonial.avatar} alt={testimonial.author} width={80} height={80} className="w-20 h-20 rounded-full object-cover mx-auto -mt-16 mb-4 border-4 border-white" />
                  <blockquote className="text-gray-600 italic text-center mb-4">"{testimonial.quote}"</blockquote>
                  <cite className="block text-center font-bold text-gray-800">{testimonial.author}</cite>
                  <p className="text-center text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog-preview" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              From Our Blog
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <AnimateOnScroll key={post.meta.slug} delay={index * 0.1}>
                <div className="bg-white rounded-xl overflow-hidden shadow-md group">
                  <Link href={`/blog/${post.meta.slug}/`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image src={post.meta.image} alt={post.meta.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link href={`/blog/${post.meta.slug}/`}>
                      <h3 className="font-bold text-xl mb-2 hover:text-[#007BFF] transition-colors">{post.meta.title}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.meta.excerpt}</p>
                    <Link href={`/blog/${post.meta.slug}/`} className="text-[#007BFF] font-semibold text-sm">Read More →</Link>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 bg-gray-50 p-8 md:p-12 rounded-lg shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              <form id="contact-form" onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none" />
                </div>
                <div className="mb-4">
                  <input type="email" name="email" placeholder="Your Email" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none" />
                </div>
                <div className="mb-4">
                  <textarea name="message" rows={4} placeholder="Your Message" required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#007BFF] outline-none"></textarea>
                </div>
                <button type="submit" disabled={contactStatus !== 'idle'} className="w-full bg-[#007BFF] text-white py-3 rounded-lg font-bold hover:bg-[#0056b3] transition-colors disabled:bg-gray-400">
                  {getContactButtonText()}
                </button>
                {contactMessage && <p className="mt-4 text-center text-sm text-blue-600">{contactMessage}</p>}
              </form>
            </div>
            <div className="flex flex-col justify-center gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <FaEnvelope className="text-[#007BFF]" /> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaWhatsapp className="text-[#007BFF]" /> <a href={socialLinks.whatsapp}>{contactInfo.phoneDisplay}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#007BFF]" /> {contactInfo.address}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4 text-2xl">
                  <a href={socialLinks.facebook} className="hover:text-[#007BFF]"><FaFacebookF /></a>
                  <a href={socialLinks.instagram} className="hover:text-[#007BFF]"><FaInstagram /></a>
                  <a href={socialLinks.youtube} className="hover:text-[#007BFF]"><FaYoutube /></a>
                  <a href={socialLinks.whatsapp} className="hover:text-[#007BFF]"><FaWhatsapp /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePageClient;
