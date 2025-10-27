'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowsAltH } from 'react-icons/fa';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after, alt }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const afterImageRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const currentPosition = useRef(50);

  const moveSlider = useCallback((clientX: number) => {
    if (!containerRef.current || !afterImageRef.current || !handleRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;

    currentPosition.current = percent;
    
    requestAnimationFrame(() => {
        if (afterImageRef.current) {
            afterImageRef.current.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        }
        if (handleRef.current) {
            handleRef.current.style.left = `${percent}%`;
        }
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    moveSlider(e.clientX);
  }, [moveSlider]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    moveSlider(e.touches[0].clientX);
  }, [moveSlider]);

  const stopDragging = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setSliderPosition(currentPosition.current); // Sync React state with final DOM position
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDragging);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', stopDragging);
  }, [handleMouseMove, handleTouchMove]);

  const startDragging = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', stopDragging);
  }, [handleMouseMove, handleTouchMove, stopDragging]);

  useEffect(() => {
    // Set initial position from state on mount
    if (afterImageRef.current) {
      afterImageRef.current.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${sliderPosition}%`;
    }
    currentPosition.current = sliderPosition;

    // General cleanup
    return () => {
      stopDragging();
    };
  }, [sliderPosition, stopDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[700px] mx-auto aspect-[4/3] overflow-hidden rounded-xl shadow-2xl select-none"
    >
      <Image 
        src={before} 
        alt={`Before ${alt}`} 
        fill 
        sizes="(max-width: 1024px) 100vw, 700px"
        priority
        className="object-cover pointer-events-none" 
        draggable="false" 
      />
      <div
        ref={afterImageRef}
        className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden pointer-events-none"
      >
        <Image 
          src={after} 
          alt={`After ${alt}`} 
          fill
          sizes="(max-width: 1024px) 100vw, 700px"
          className="object-cover pointer-events-none" 
          draggable="false" 
        />
      </div>
      <div
        ref={handleRef}
        className="absolute top-0 h-full w-1 bg-white/60 backdrop-blur-[2px] pointer-events-none transform -translate-x-1/2"
      >
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-800 cursor-ew-resize pointer-events-auto transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
           <FaArrowsAltH />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;