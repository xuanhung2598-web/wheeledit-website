import React from 'react';

interface HeroProps {
    onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-white text-center px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Professional Real Estate Photo Editing
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Stunning, high-quality images that sell properties faster. First edit is on us!
        </p>
        <button 
          onClick={onOpenModal}
          className="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Get Your Free Test Edit
        </button>
      </div>
    </section>
  );
};

export default Hero;