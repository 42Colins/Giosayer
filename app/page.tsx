'use client';
import { useState } from 'react';

// Updated binder data with precise positions for all 9 binders
const binders = [
  {
    id: 1,
    title: "Nature Collection",
    description: "A series of landscape and wildlife photographs",
    position: { left: '2%', width: '10%' }
  },
  {
    id: 2,
    title: "Urban Series",
    description: "City life and architecture studies",
    position: { left: '12%', width: '10%' }
  },
  {
    id: 3,
    title: "Seascapes",
    description: "Ocean and coastal photography",
    position: { left: '23%', width: '10%' }
  },
  {
    id: 4,
    title: "Birds in Flight",
    description: "Dynamic captures of birds in motion",
    position: { left: '33%', width: '10%' }
  },
  {
    id: 5,
    title: "Patterns",
    description: "Natural and artificial pattern studies",
    position: { left: '43.5%', width: '10%' }
  },
  {
    id: 6,
    title: "Light Studies",
    description: "Experiments with natural light",
    position: { left: '53.5%', width: '10%' }
  },
  {
    id: 7,
    title: "Abstract",
    description: "Abstract interpretations of everyday scenes",
    position: { left: '64%', width: '10%' }
  },
  {
    id: 8,
    title: "Portraits",
    description: "Artistic portrait photography",
    position: { left: '74.5%', width: '10%' }
  },
  {
    id: 9,
    title: "Minimalism",
    description: "Minimalist photography studies",
    position: { left: '87%', width: '10%' }
  }
];

export default function Home() {
  const [selectedBinder, setSelectedBinder] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Main image container */}
      <div className="relative w-full max-w-5xl aspect-[16/9]">
        <img
          src="/gBinders.png"
          alt="Binders on shelf"
          className="w-full h-full object-contain"
        />
        
        {/* Clickable binder areas */}
        {binders.map((binder) => (
          <div
            key={binder.id}
            className="absolute top-0 h-full cursor-pointer transition-all duration-300"
            style={binder.position}
            onClick={() => setSelectedBinder(binder.id)}
          />
        ))}

        {/* Information overlay */}
        {selectedBinder && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
            onClick={() => setSelectedBinder(null)}
          >
            <div 
              className="bg-white p-8 max-w-md rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-light mb-4">
                {binders.find(b => b.id === selectedBinder)?.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {binders.find(b => b.id === selectedBinder)?.description}
              </p>
              <button 
                className="text-gray-500"
                onClick={() => setSelectedBinder(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}