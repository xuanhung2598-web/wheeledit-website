

'use client';

import React, { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import Link from 'next/link';
import Image from 'next/image';
import AnimateOnScroll from './AnimateOnScroll';
import { Service, Post } from '../types';
import { services, testimonials, socialLinks, contactInfo } from '../lib/data';
import { FaRocket, FaGem, FaDollarSign, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';


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
        <p className="text-2xl font-semibold text-[#007BFF] my-3">{service.price}</p>
        <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
        <button onClick={openModal} className="cta-button bg-[#007BFF] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0056b3] transition-all duration-300 hover:-translate-y-0.5 shadow-md">
          Get a Free Test
        </button>
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
      const detailedError = "Configuration error: NEXT_PUBLIC_SCRIPT_URL is not set. Please check your .env.local file and restart the server.";
      const friendlyError = 'Configuration error. Please contact support.';
      
      console.error(detailedError);
      setContactStatus('error');
      // Show detailed error only in development for easier debugging
      setContactMessage(process.env.NODE_ENV === 'development' ? detailedError : friendlyError);
      return;
    }

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      setContactStatus('success');
      setContactMessage('Thank you for your message! We will get back to you shortly.');
      form.reset();
      setTimeout(() => {
        setContactStatus('idle');
        setContactMessage('');
      }, 4000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setContactStatus('error');
      setContactMessage('Sorry, there was an error sending your message. Please try again.');
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
          src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Beautiful two-story house with a well-manicured lawn under a clear blue sky"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-black/60"></div>
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
        <AnimateOnScroll className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              Our Services
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
          </div>
          <div className="space-y-20">
            {services.map((service, index) => (
              <AnimateOnScroll key={service.title}>
                <ServiceCard service={service} reverse={index % 2 !== 0} />
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-24 bg-gray-50">
        <AnimateOnScroll className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
              Why Choose Us?
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
            </h2>
             <p className='text-lg text-gray-600 mt-8 max-w-3xl mx-auto'>We are a dedicated team of editors who use wheelchairs. Our passion for this work comes from the fact that it is not only what we excel at, but also what helps us sustain ourselves and provide for our families. With years of experience and exceptional skills, we are committed to delivering the highest-quality results tailored to your needs — with the best speed and pricing in the market.</p>
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
        </AnimateOnScroll>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <AnimateOnScroll className="max-w-7xl mx-auto px-5">
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
                  <Image src={testimonial.avatar} alt={`Photo of ${testimonial.author}, ${testimonial.role}`} width={80} height={80} className="w-20 h-20 rounded-full object-cover mx-auto -mt-16 mb-4 border-4 border-white" />
                  <blockquote className="text-gray-600 italic text-center mb-4">"{testimonial.quote}"</blockquote>
                  <cite className="block text-center font-bold text-gray-800">{testimonial.author}</cite>
                  <p className="text-center text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </section>

      {/* From Our Blog Section */}
      <section id="blog-preview" className="py-24 bg-gray-50">
        <AnimateOnScroll className="max-w-7xl mx-auto px-5">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                    From Our Blog
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Tips, trends, and insights from the world of real estate photography and editing.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                    <AnimateOnScroll key={post.meta.slug} delay={index * 0.1}>
                        <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
                            <Link href={`/blog/${post.meta.slug}`} aria-label={`Read more about ${post.meta.title}`}>
                              <Image 
                                src={post.meta.image} 
                                alt={post.meta.title} 
                                width={800} 
                                height={400} 
                                className="w-full h-48 object-cover" 
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <Link href={`/blog/${post.meta.slug}`}>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#007BFF] transition-colors duration-300">{post.meta.title}</h3>
                                </Link>
                                <p className="text-sm text-gray-500 mb-4">{post.meta.author} on {post.meta.date}</p>
                                <p className="text-gray-600 mb-4 flex-grow">{post.meta.excerpt}</p>
                                <Link href={`/blog/${post.meta.slug}`} className="mt-auto">
                                  <span className="text-[#007BFF] font-semibold group-hover:underline">Read More &rarr;</span>
                                </Link>
                            </div>
                        </div>
                    </AnimateOnScroll>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link href="/blog" className="cta-button bg-[#007BFF] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0056b3] transition-all duration-300 hover:-translate-y-0.5 shadow-md">
                    View All Posts
                </Link>
            </div>
        </AnimateOnScroll>
      </section>

       {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <AnimateOnScroll className="max-w-7xl mx-auto px-5">
           <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 relative inline-block">
                    Get In Touch
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#007BFF] rounded-full"></span>
                </h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 bg-gray-50 p-8 md:p-12 rounded-lg shadow-lg">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
                    <form id="contact-form" onSubmit={handleContactSubmit}>
                        <div className="mb-4">
                           <label htmlFor="name" className="sr-only">Name</label>
                           <input type="text" id="name" name="name" placeholder="Your Full Name" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" name="email" placeholder="your.email@example.com" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" />
                        </div>
                        <div className="mb-4">
                             <label htmlFor="message" className="sr-only">Message</label>
                             <textarea id="message" name="message" rows={5} placeholder="How can we help you?" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]"></textarea>
                        </div>
                        <button type="submit" disabled={contactStatus !== 'idle'} className="cta-button w-full bg-[#007BFF] text-white px-6 py-3.5 rounded-lg font-semibold uppercase text-base tracking-wide hover:bg-[#0056b3] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                          {getContactButtonText()}
                        </button>
                        <div className="mt-4 text-center h-5">
                            {contactMessage && (
                                <p className={`text-sm ${contactStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {contactMessage}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
                        <p className="text-gray-600 mb-6">Have any questions or want to discuss a project? Reach out to us through any of the channels below. We're here to help!</p>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-[#007BFF] w-5 text-center flex-shrink-0" />
                                <a href={`mailto:${contactInfo.email}`} className="hover:text-[#007BFF] transition-colors">
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaWhatsapp className="text-[#007BFF] w-5 text-center flex-shrink-0" />
                                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#007BFF] transition-colors">
                                    {contactInfo.phoneDisplay}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-[#007BFF] w-5 text-center flex-shrink-0" />
                                <a
                                    href={contactInfo.addressLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#007BFF] transition-colors"
                                >
                                    {contactInfo.address}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-4 mt-8">Follow Us</h4>
                        <div className="flex gap-5 text-2xl text-gray-600">
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#007BFF] transition-colors"><FaFacebookF /></a>
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#007BFF] transition-colors"><FaInstagram /></a>
                            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#007BFF] transition-colors"><FaYoutube /></a>
                            <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[#007BFF] transition-colors"><FaWhatsapp /></a>
                        </div>
                    </div>
                </div>
            </div>
        </AnimateOnScroll>
      </section>
    </>
  );
};

export default HomePageClient;