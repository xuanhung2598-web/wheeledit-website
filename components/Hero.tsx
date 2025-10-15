import React from 'react';
import { HeroData } from '../types';

interface HeroProps {
    onOpenModal: () => void;
    data: HeroData;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal, data }) => {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-white text-center px-6 bg-cover bg-center"
      style={{ backgroundImage: `url('${data.backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {data.title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {data.subtitle}
        </p>
        <button 
          onClick={onOpenModal}
          className="bg-blue-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          {data.buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;
