import React, { useState } from 'react';
import img from '../img/template.jpg';

const Image = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center p-8">
      <img
        src={img}
        alt="image"
        className={`
          transition-all duration-300 ease-in-out
          ${isHovered ? 'blur-sm scale-105' : 'blur-0 scale-100'}
          ${isClicked ? 'grayscale' : 'grayscale-0'}
          rounded-lg cursor-pointer
        `}
        onClick={() => setIsClicked(!isClicked)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div className="mt-4 text-center">
        {isClicked ? 
          <p className="text-green-600">Image Clicked!</p> : 
          <p className="text-gray-600">Click the image to see the effect</p>
        }
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            Hover Effect Active
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;