'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { binders } from '../lib/data';  // Remove .tsx extension and import binders as named export

// Helper function to get binder ID and correct image index
const getBinderAndImageIndex = (imagePath: string) => {
  console.log('Processing image path:', imagePath); // Debug log
  
  const binderMatch = imagePath.match(/binder0(\d)/);
  const imageMatch = imagePath.match(/dessin(\d+)/);
  
  if (binderMatch && imageMatch) {
    const binderId = parseInt(binderMatch[1]);
    const imageNumber = parseInt(imageMatch[1]);
    
    // Find the binder and get the correct index
    const binder = binders.find(b => b.id === binderId);
    if (binder) {
      const imageIndex = binder.content.findIndex(
        item => item.image.includes(`dessin${imageNumber.toString().padStart(3, '0')}`)
      );
      
      console.log('Found:', { binderId, imageIndex }); // Debug log
      return {
        binderId,
        imageIndex: imageIndex >= 0 ? imageIndex : 0
      };
    }
  }
  return null;
};

const getAllImages = async () => {
  const images = [
    "/binder02/dessin012.png", "/binder02/dessin050.png",
    "/binder03/dessin009.png", "/binder03/dessin023.png", "/binder03/dessin024.png",
    "/binder03/dessin025.png", "/binder03/dessin027.png", "/binder03/dessin028.png",
    "/binder03/dessin029.png", "/binder03/dessin030.png", "/binder03/dessin031.png",
    "/binder03/dessin032.png", "/binder03/dessin033.png", "/binder03/dessin034.png",
    "/binder03/dessin045.png", "/binder03/dessin046.png", "/binder03/dessin052.png",
    "/binder04/dessin015.png", "/binder04/dessin017.png", "/binder04/dessin020.png",
    "/binder04/dessin021.png", "/binder04/dessin061.png",
    "/binder05/dessin014.png", "/binder05/dessin016.png",
    "/binder06/dessin035.png", "/binder06/dessin036.png", "/binder06/dessin038.png",
    "/binder06/dessin039.png", "/binder06/dessin040.png", "/binder06/dessin042.png",
    "/binder06/dessin044.png", "/binder06/dessin047.png", "/binder06/dessin048.png",
    "/binder07/dessin005.png", "/binder07/dessin007.png", "/binder07/dessin008.png",
    "/binder07/dessin051.png", "/binder07/dessin053.png", "/binder07/dessin054.png",
    "/binder07/dessin055.png", "/binder07/dessin058.png", "/binder07/dessin059.png",
    "/binder07/dessin060.png", "/binder07/dessin062.png",
    "/binder08/dessin018.png", "/binder08/dessin019.png", "/binder08/dessin022.png",
    "/binder08/dessin026.png", "/binder08/dessin037.png", "/binder08/dessin041.png",
    "/binder08/dessin057.png",
    "/binder09/dessin010.png", "/binder09/dessin013.png", "/binder09/dessin049.png",
    "/binder09/dessin063.png"
  ];
  return images;
};

export default function About() {
  const router = useRouter();
  const [imagePositions, setImagePositions] = useState<Array<{
    src: string;
    x: number;
    y: number;
    scale: number;
  }>>([]);

  useEffect(() => {
    const loadImages = async () => {
      const images = await getAllImages();
      
      // Adjust positioning for different screen sizes
      const isMobile = window.innerWidth < 768;
      
      const positions = images.map(src => ({
        src,
        // Keep images within 20-80% range on mobile (or 10-90% on desktop)
        x: 0 + Math.random() * 100, 
        y: 0 + Math.random() * 100,
        scale: isMobile ? 0.2 + Math.random() * 0.2 : 0.2 + Math.random() * 0.2
      }));
      setImagePositions(positions);
    };

    loadImages();
    
    // Add resize handler to reposition when screen size changes
    const handleResize = () => {
      loadImages();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageClick = (imagePath: string) => {
    const imageInfo = getBinderAndImageIndex(imagePath);
    if (imageInfo) {
      // Store the information in localStorage to be retrieved by the main page
      localStorage.setItem('selectedBinder', imageInfo.binderId.toString());
      localStorage.setItem('selectedImageIndex', imageInfo.imageIndex.toString());
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-8 bg-white relative overflow-hidden">
      {/* Background layer with random images - adjusted for mobile */}
      <div className="fixed inset-0" style={{ margin: '-5vw sm:-15vw md:-25vw' }}>
        {imagePositions.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt=""
            className="absolute object-contain duration-1000 cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              transform: `scale(${img.scale})`,
              maxWidth: 'min(300px, 50vw)', // Limit maximum width on mobile
              maxHeight: 'min(300px, 50vh)', // Limit maximum height on mobile
              zIndex: 1,
              pointerEvents: 'auto'
            }}
            onClick={() => handleImageClick(img.src)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={() => window.location.href = '/'}
        className="absolute top-3 left-3 z-10 text-xs sm:text-sm font-['Adobe_Arabic'] p-2"
      >
        classeurs
      </button>

      {/* Center text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full max-w-2xl px-4">
        <a className="text-xs sm:text-sm block mb-4 font-['Adobe_Arabic'] p-2">
          Classement numérique d'esquisses, d'idées, de plans et de recherches.
        </a>
      </div>

      {/* Bottom left corner info - fixed size issue */}
      <div 
        className="fixed bottom-2 left-2 z-10 p-2 max-w-[95vw] sm:max-w-[300px]"
      >
        <div className="font-['Adobe_Arabic']">
          <p className="text-xs sm:text-sm mb-[-3px]">contact@g-archives.fr</p>
          <a href="https://www.instagram.com/giosayer/" target="_blank" className="text-xs sm:text-sm block mb-2">
            Instagram
          </a>
          <p className="text-xs sm:text-sm mb-[-3px]">Droits d'auteur</p>
          <p className="text-xs sm:text-sm mb-[-3px]">Guillaume Deschamps</p>
          <p className="text-xs sm:text-sm mb-[-3px]">2019 2025</p>
          <p className="text-xs sm:text-sm mb-[-3px]">Site web</p>
          <p className="text-xs sm:text-sm mb-[-3px]">Colin Projean</p>
        </div>
      </div>
    </main>
  );
}