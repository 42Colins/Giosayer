'use client';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { binders }  from './lib/data'; // Import binders as named export

const logo = {
  position: { left: '41.1%', width: '9%' , top: '10%', height: '80%'}  
}

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

export default function Home() {
  const router = useRouter();
  const [selectedBinder, setSelectedBinder] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const preloadAllImages = async () => {
      const totalImages = binders.reduce((count, binder) => count + binder.content.length, 0);
      let loadedImages = 0;

      try {
        // First preload all binder thumbnails
        await Promise.all(
          binders.map(binder => preloadImage(binder.src))
        );

        // Then preload all content images
        for (const binder of binders) {
          await Promise.all(
            binder.content.map(async (item) => {
              await preloadImage(item.image);
              loadedImages++;
              setLoadingProgress(Math.round((loadedImages / totalImages) * 100));
            })
          );
        }
      } catch (error) {
        console.error('Failed to preload images:', error);
      }
      setInitialLoading(false);
    };

    preloadAllImages();
  }, []);

  // Add this useEffect for initial image load
  useEffect(() => {
    const img = new Image();
    img.src = '/signature.png';
    img.onload = () => {
      console.log('Signature image dimensions:', img.naturalWidth, 'x', img.naturalHeight);
    };
  }, []);

  useEffect(() => {
    // Check for stored binder selection
    const storedBinder = localStorage.getItem('selectedBinder');
    const storedImageIndex = localStorage.getItem('selectedImageIndex');
    
    if (storedBinder && storedImageIndex) {
      setSelectedBinder(parseInt(storedBinder));
      setCurrentImageIndex(parseInt(storedImageIndex));
      // Clear the stored values
      localStorage.removeItem('selectedBinder');
      localStorage.removeItem('selectedImageIndex');
    }
  }, []);

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
    <main className="min-h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
      {!selectedBinder ? (
        <div className="relative flex items-center justify-center w-full h-screen p-2 sm:p-4 md:p-6">
          {/* Responsive container - scales based on screen size */}
          <div className="relative w-[85%] sm:w-[75%] md:w-[65%] lg:w-[55%] xl:w-[45%] max-w-[700px]">
            {/* Use aspect ratio to maintain proportions */}
            <div className="relative w-full pb-[56.25%]">
              <img
                src="/FondsiteBignoBack.png"
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-contain"
                draggable="false"
              />
              
              {/* Clickable binder areas with responsive positioning */}
              {binders.map((binder) => (
                <div
                  key={binder.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:opacity-75"
                  style={{
                    left: binder.position.left,
                    top: binder.position.top,
                    width: binder.position.width,
                    height: binder.position.height
                  }}
                  onClick={() => setSelectedBinder(binder.id)}
                />
              ))}

              {/* Signature button with improved responsive sizing */}
              <div 
                className="absolute cursor-pointer z-10"
                style={{
                  bottom: '-10%',
                  right: '-10%',
                  transform: 'rotate(-10deg)',
                  width: 'clamp(75px, calc(15vw + 30px), 345px)', // Increased by 1.5x
                }}
                onClick={() => router.push('/about')}
              >
                <img
                  src="/signature.png"
                  alt="Signature"
                  className="w-full h-auto object-contain"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-screen">
          {/* Back button - significantly smaller on mobile */}
          <div className="fixed top-2 sm:top-4 left-2 sm:left-4 z-10">
            <button 
              onClick={handleBack}
              className="text-gray-600 flex"
              style={{ 
                width: 'clamp(40px, 10vw, 120px)',
                height: 'clamp(80px, 20vw, 240px)'
              }}
            >
              <img 
                src={selectedBinderContent?.src}
                className="w-full h-full object-contain" 
                alt="Back to home"
              />
            </button>
          </div>
          {/* Content area - responsive sizing and padding */}
          <div className="flex justify-center items-center w-full h-full p-4 sm:p-8 md:p-12">
            <div className="w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/2 h-[70%] sm:h-3/4 flex justify-center items-center">
              {/* Image container */}
              <div
                className="w-full h-full relative cursor-pointer flex justify-center items-center"
                onClick={handleNextImage}
              >
                {currentImage && (
                  <img
                    src={currentImage.image}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
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