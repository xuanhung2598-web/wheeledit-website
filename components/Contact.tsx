import React, { useState } from 'react';

const contactInfo = [
    { icon: 'fas fa-envelope', text: 'info@wheeledit.com', href: 'mailto:info@wheeledit.com' },
    { icon: 'fas fa-phone', text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: 'fas fa-map-marker-alt', text: '123 Photo Lane, Edit City, USA', href: '#' },
];

const socialLinks = [
    { href: '#', icon: 'fab fa-facebook-f', label: 'Facebook' },
    { href: '#', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: '#', icon: 'fab fa-youtube', label: 'YouTube' },
    { href: '#', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
];

const Contact: React.FC = () => {
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSD_uVAy24Vl-n8pbrU3Lz2yr8oQ5miSpE8C1zA5qAiuDQIBmjiTd9r2bsZhdX2yFn/exec';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const data = new FormData();
        data.append('formType', 'contact-form');
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('message', formData.message);
        
        fetch(SCRIPT_URL, {
            method: 'POST',
            body: data,
        })
        .then(response => {
           console.log('Success (assumed):', response);
           setSubmitStatus('success');
           alert('Thank you for your message! We will get back to you shortly.');
           setFormData({ name: '', email: '', message: '' });
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            alert('Oops! There was a problem submitting your form. Please try again later.');
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    const getButtonText = () => {
        if (isSubmitting) return 'Sending...';
        if (submitStatus === 'success') return 'Message Sent!';
        if (submitStatus === 'error') return 'Submission Failed. Try Again.';
        return 'Send Message';
    };

    return (
        <section id="contact" className="section-padding bg-white text-gray-700">
            <div className="container mx-auto px-6">
                <h2 className="section-title">Get In Touch</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    
                    {/* Contact Form */}
                    <div className="lg:col-span-3 bg-gray-100 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    required 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    placeholder="Your Full Name"
                                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    required 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500" 
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    rows={5} 
                                    required 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                ></textarea>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500">
                                {getButtonText()}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-2">
                         <h3 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h3>
                         <p className="mb-8 text-gray-600">
                            Have questions or want to discuss a project? Reach out to us through any of the channels below. We're here to help!
                         </p>
                         <div className="space-y-6">
                            {contactInfo.map(info => (
                                <a key={info.text} href={info.href} className="flex items-center space-x-4 text-lg group">
                                    <i className={`${info.icon} text-blue-500 text-xl w-6 text-center`}></i>
                                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{info.text}</span>
                                </a>
                            ))}
                         </div>
                         <div className="mt-10 pt-8 border-t border-gray-200">
                            <h4 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h4>
                            <div className="flex space-x-6">
                                {socialLinks.map(link => (
                                    <a key={link.label} href={link.href} aria-label={link.label} className="text-gray-500 hover:text-gray-900 transition-transform transform hover:scale-110">
                                        <i className={`${link.icon} text-2xl`}></i>
                                    </a>
                                ))}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;