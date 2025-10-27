import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  // Handle accessibility: focus trapping, auto-focus, and escape key
  useEffect(() => {
    if (isOpen) {
      // Auto-focus the first input element
      setTimeout(() => firstInputRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusableElements) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);


  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setMessage('');
    
    const formData = new FormData(form);
    formData.append('formType', form.id);
    
    const scriptURL = process.env.NEXT_PUBLIC_SCRIPT_URL;
    if (!scriptURL) {
      const detailedError = "Configuration error: NEXT_PUBLIC_SCRIPT_URL is not set. Please check your .env.local file and restart the server.";
      const friendlyError = 'Configuration error. Please contact support.';
      
      console.error(detailedError);
      setStatus('error');
      // Show detailed error only in development for easier debugging
      setMessage(process.env.NODE_ENV === 'development' ? detailedError : friendlyError);
      return;
    }

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });

      setStatus('success');
      setMessage('Thank you! Your request has been sent successfully.');
      
      form.reset();
      setTimeout(() => {
        onClose();
        // Reset state after closing animation
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 300);
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setMessage('Oops! There was a problem. Please try again later.');
      // Reset status to idle so user can try again
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };


  const getButtonText = () => {
    switch (status) {
      case 'sending': return 'Submitting...';
      case 'success': return 'Sent Successfully!';
      case 'error': return 'Submission Failed';
      default: return 'Submit Request';
    }
  };

  return (
    <div className="fixed inset-0 z-[1001] bg-black/60 flex justify-center items-center p-4 animate-fadeIn" onClick={onClose}>
      <div ref={modalRef} className="bg-gray-50 border border-gray-200 p-10 rounded-lg shadow-2xl w-full max-w-md relative animate-slideIn" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-5 text-gray-400 hover:text-gray-800 text-3xl font-bold">&times;</button>
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">Get Your Free Test Edit</h2>
        <p className="text-center text-gray-600 mb-6">Please include a link to 3-5 photos (e.g., Dropbox, Google Drive) for your free test.</p>
        <form id="free-edit-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="modal-name" className="block mb-1.5 font-semibold text-gray-800">Your Name</label>
            <input ref={firstInputRef} id="modal-name" name="name" type="text" placeholder="John Doe" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" />
          </div>
          <div className="mb-4">
            <label htmlFor="modal-email" className="block mb-1.5 font-semibold text-gray-800">Your Email</label>
            <input id="modal-email" name="email" type="email" placeholder="name@example.com" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" />
          </div>
          <div className="mb-4">
            <label htmlFor="photo-link" className="block mb-1.5 font-semibold text-gray-800">Link to Your Photos</label>
            <input id="photo-link" name="photo-link" type="url" placeholder="https://..." required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF]" />
          </div>
          <div className="mb-4">
            <label htmlFor="service-select" className="block mb-1.5 font-semibold text-gray-800">Select Service</label>
            <select id="service-select" name="service-select" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white">
              <option value="">--Please choose an option--</option>
              <option value="ai-enhancement">AI Enhancement</option>
              <option value="single-exposure">Single Exposure</option>
              <option value="hdr-merge">HDR Merge</option>
              <option value="flash">Flash</option>
            </select>
          </div>
          <button type="submit" disabled={status === 'sending' || status === 'success'} className="w-full mt-2 bg-[#007BFF] text-white px-6 py-3.5 rounded-lg font-semibold uppercase text-base tracking-wide hover:bg-[#0056b3] transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed">
            {getButtonText()}
          </button>
          <div className="mt-4 text-center h-5">
            {message && (
              <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;