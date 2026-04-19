
import React, { useState, useRef } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize select-none border border-stone-100 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.2)] rounded-sm group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image: The Finished Vision */}
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]" />
      
      {/* Before Image (Clipped): The Raw Canvas */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-110 contrast-125 transition-transform duration-1000 group-hover:scale-[1.02]" 
        />
        
        {/* Annotation for Raw State */}
        <div className="absolute top-6 left-6 flex flex-col items-start space-y-2">
          <div className="bg-charcoal text-white text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2.5 backdrop-blur-md shadow-xl">
            The Canvas // Raw Flat
          </div>
          <div className="h-px w-24 bg-charcoal/20" />
        </div>
      </div>

      {/* Label for Finished State */}
      <div className="absolute top-6 right-6 flex flex-col items-end space-y-2">
        <div className="bg-brass text-white text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2.5 shadow-xl">
          The Vision // Curated
        </div>
        <div className="h-px w-24 bg-brass/40" />
      </div>

      {/* Slider Bar & Handle */}
      <div 
        className="absolute inset-y-0 w-px bg-white/40 shadow-2xl z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center border border-stone-50 transition-transform group-hover:scale-110 pointer-events-auto">
          <div className="flex space-x-1">
            <div className="w-px h-4 bg-brass/30"></div>
            <div className="w-px h-4 bg-brass"></div>
            <div className="w-px h-4 bg-brass/30"></div>
          </div>
        </div>
        
        {/* Dynamic Coordinate Tooltip */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-charcoal/80 backdrop-blur-md text-white text-[8px] font-mono px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          X: {sliderPosition.toFixed(1)}% // STATUS: PHASING
        </div>
      </div>
      
      {/* Corner Measurements Decoration */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 z-20 m-4" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 z-20 m-4" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 z-20 m-4" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 z-20 m-4" />
    </div>
  );
};

export default BeforeAfterSlider;
