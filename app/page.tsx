'use client';
import { useState } from 'react';

// Updated binder data with precise posi tions f or all 9 binders
const binders = [
  {
    id: 1,
    title: "Nature Collection",
    description: "A series of landscape and wildlife photographs",
    position: { left: '38.6%', width: '2.2%' , top: '40%', height: '20%'},
    src: "binder01/binder01.png",
    content: [
      { image: "/gio.jpg"},
      { image: "/gio3.jpg"},
      { image: "/template.jpg"}
    ]
  },
  {
    id: 2,
    title: "Urban Series",
    description: "City life and architecture studies",
    position: { left: '41.1%', width: '2.2%' , top: '40%', height: '20%'},
    src: "binder02/binder02.png",
    content: [
      { image: "binder02/dessin012.png"},
      { image: "binder02/dessin050.png"}
    ]
  },
  {
    id: 3,
    title: "Seascapes",
    description: "Ocean and coastal photography",
    position: { left: '43.7%', width: '2.2%' , top: '40%', height: '20%' },
    src: "binder03/binder03.png",
    content: [
      { image: "binder03/dessin009.png"},
      { image: "binder03/dessin023.png"},
      { image: "binder03/dessin024.png"},
      { image: "binder03/dessin025.png"},
      { image: "binder03/dessin027.png"},
      { image: "binder03/dessin028.png"},
      { image: "binder03/dessin029.png"},
      { image: "binder03/dessin030.png"},
      { image: "binder03/dessin031.png"},
      { image: "binder03/dessin032.png"},
      { image: "binder03/dessin033.png"},
      { image: "binder03/dessin034.png"},
      { image: "binder03/dessin045.png"},
      { image: "binder03/dessin046.png"},
      { image: "binder03/dessin052.png"}
    ]
  },
  {
    id: 4,
    title: "Birds in Flight",
    description: "Dynamic captures of birds in motion",
    position: { left: '46.2%', width: '2.2%' , top: '40%', height: '20%'},
    src: "binder04/binder04.png",
    content: [
      { image: "binder04/dessin015.png"},
      { image: "binder04/dessin017.png"},
      { image: "binder04/dessin020.png"},
      { image: "binder04/dessin021.png"},
      { image: "binder04/dessin061.png"}
    ]
  },
  {
    id: 5,
    title: "Patterns",
    description: "Natural and artificial pattern studies",
    position: { left: '48.7%', width: '2.2%' , top: '40%', height: '20%' },
    src: "binder05/binder05.png",
    content: [
      { image: "binder05/dessin014.png"},
      { image: "binder05/dessin016.png"}
    ]
  },
  {
    id: 6,
    title: "Light Studies",
    description: "Experiments with natural light",
    position: { left: '51.2%', width: '2.2%' , top: '40%', height: '20%'},
    src: "binder06/binder06.png",
    content: [
      { image: "binder06/dessin035.png"},
      { image: "binder06/dessin036.png"},
      { image: "binder06/dessin038.png"},
      { image: "binder06/dessin039.png"},
      { image: "binder06/dessin040.png"},
      { image: "binder06/dessin042.png"},
      { image: "binder06/dessin044.png"},
      { image: "binder06/dessin047.png"},
      { image: "binder06/dessin048.png"}
    ]
  },
  {
    id: 7,
    title: "Abstract",
    description: "Abstract interpretations of everyday scenes",
    position: { left: '53.8%', width: '2.2%' , top: '40%', height: '20%' },
    src: "binder07/binder07.png",
    content: [
      { image: "binder07/dessin005.png"},
      { image: "binder07/dessin007.png"},
      { image: "binder07/dessin008.png"},
      { image: "binder07/dessin051.png"},
      { image: "binder07/dessin053.png"},
      { image: "binder07/dessin054.png"},
      { image: "binder07/dessin055.png"},
      { image: "binder07/dessin058.png"},
      { image: "binder07/dessin059.png"},
      { image: "binder07/dessin060.png"},
      { image: "binder07/dessin062.png"}
    ]
  },
  {
    id: 8,
    title: "Portraits",
    description: "Artistic portrait photography",
    position: { left: '56.4%', width: '2.2%' , top: '40%', height: '20%' },
    src: "binder08/binder08.png",
    content: [
      { image: "binder08/dessin018.png"},
      { image: "binder08/dessin019.png"},
      { image: "binder08/dessin022.png"},
      { image: "binder08/dessin026.png"},
      { image: "binder08/dessin037.png"},
      { image: "binder08/dessin041.png"},
      { image: "binder08/dessin057.png"}
    ]
  },
  {
    id: 9,
    title: "Minimalism",
    description: "Minimalist photography studies",
    position: { left: '59.5%', width: '2.2%' , top: '40%', height: '20%' },
    src: "binder09/binder09.png",
    content: [
      { image: "binder09/dessin003.png"},
      { image: "binder09/dessin010.png"},
      { image: "binder09/dessin013.png"},
      { image: "binder09/dessin049.png"},
      { image: "binder09/dessin063.png"}
    ]
  }
];

export default function Home() {
  const [selectedBinder, setSelectedBinder] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBack = () => {
    setSelectedBinder(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    const binder = binders.find(b => b.id === selectedBinder);
    if (binder) {
      setCurrentImageIndex((prev) => 
        prev === binder.content.length - 1 ? 0 : prev + 1
      );
    }
  };

  const selectedBinderContent = binders.find(b => b.id === selectedBinder);
  const currentImage = selectedBinderContent?.content[currentImageIndex];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {!selectedBinder ? (
        // Main shelf view
        <div className="relative w-full max-w-5xl aspect-[16/9]">
          <img
            src="/Background.png"
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
        </div>
      ) : (
        <div className="relative w-full max-w-7xl">
          <div className="fixed top-4 left-4">
            <button 
              onClick={handleBack}
              className="text-gray-600 flex w-24 h-48"
            >
              <img 
                src={binders.find(b => b.id === selectedBinder)?.src}
                className="w-full h-full object-contain" 
              />
            </button>
          </div>
          <div className="flex justify-center items-center w-full h-screen">
            <div className="w-2/3 h-2/3 flex justify-center items-center">
        {/* Image container */}
              <div
                className="aspect-[16/9] relative cursor-pointer flex justify-center items-center"
                onClick={handleNextImage}
              >
                {currentImage && (
                <img
                  src={currentImage.image}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </main>
  );
}

