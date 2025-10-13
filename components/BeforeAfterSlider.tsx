import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(event.target.value));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video select-none overflow-hidden rounded-lg shadow-xl"
    >
      {/* After Image */}
      <img
        src={after}
        alt="After"
        className="absolute top-0 left-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Before Image Container (clipped) */}
      <div
        className="absolute top-0 left-0 w-full h-full object-cover overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={before}
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Divider and Handle */}
      <div
        className="absolute top-0 h-full w-1 bg-white/80 shadow-md transform -translate-x-1/2 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 h-12 w-12 bg-white/90 rounded-full border-2 border-white flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
           <i className="fas fa-arrows-alt-h text-gray-700"></i>
        </div>
      </div>
      
      {/* Input Range Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Before and after image slider"
      />

    </div>
  );
};

export default BeforeAfterSlider;
