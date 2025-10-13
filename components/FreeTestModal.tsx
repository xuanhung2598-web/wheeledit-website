import React, { useState } from 'react';
import type { Service } from '../types';

interface FreeTestModalProps {
  service: Service | null;
  onClose: () => void;
}

const FreeTestModal: React.FC<FreeTestModalProps> = ({ service, onClose }) => {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwSD_uVAy24Vl-n8pbrU3Lz2yr8oQ5miSpE8C1zA5qAiuDQIBmjiTd9r2bsZhdX2yFn/exec';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: service?.id || 'single',
    link: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const data = new FormData();
    data.append('formType', 'free-edit-form');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('photo-link', formData.link);
    data.append('service-select', formData.serviceType);
    
    fetch(SCRIPT_URL, {
      method: 'POST',
      body: data,
    })
    .then(response => {
       // Response from a no-cors request is opaque, so we can't check status.
       // We assume success if the request doesn't throw an error.
       console.log('Success (assumed):', response);
       setSubmitStatus('success');
       alert('Thank you for your request! We will get back to you shortly.');
       setTimeout(() => {
           onClose();
       }, 500);
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
  
  const testableServices = [
      {id: 'single', name: 'Single Exposure'},
      {id: 'hdr', name: 'HDR Merge'},
      {id: 'flash', name: 'Flash'},
      {id: 'ai', name: 'AI Enhancement'},
  ];
  
  const getButtonText = () => {
    if (isSubmitting) return 'Sending...';
    if (submitStatus === 'success') return 'Sent Successfully!';
    if (submitStatus === 'error') return 'Submission Failed. Try Again.';
    return 'Submit Request';
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <i className="fas fa-times text-2xl"></i>
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Get Your Free Test Edit</h2>
        <p className="text-gray-600 mb-6 text-center">Please include a link to 3-5 photos (e.g., Dropbox, Google Drive) for your free test.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <input 
              type="text" 
              name="name" 
              id="modal-name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500" 
            />
          </div>
          <div>
            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
            <input 
              type="email" 
              name="email" 
              id="modal-email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="mt-1 block w-full px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500" 
            />
          </div>
          <div>
            <label htmlFor="photo-link" className="block text-sm font-medium text-gray-700 mb-2">Link to Your Photos</label>
            <input 
              type="url" 
              name="link" 
              id="photo-link"
              required
              value={formData.link}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-1 block w-full px-4 py-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500" 
            />
          </div>
           <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">Select Service</label>
            <select
              name="serviceType"
              id="serviceType"
              required
              value={formData.serviceType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-gray-100 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {testableServices.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg disabled:bg-gray-500"
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FreeTestModal;