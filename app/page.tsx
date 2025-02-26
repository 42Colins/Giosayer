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
        <div className="relative flex items-center justify-center" style={{ width: '100%', height: '100vh' }}>
          <div style={{ width: '500px', height: '281px', position: 'relative' }}> {/* Exact 16:9 ratio at 500px width */}
            <img
              src="/FondsiteBignoBack.png"
              alt="Background"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
            {/* Clickable binder areas - position with absolute dimensions */}
            {binders.map((binder) => (
              <div
                key={binder.id}
                className="absolute cursor-pointer transition-all duration-300 hover:opacity-75"
                style={{
                  left: `${parseFloat(binder.position.left) * 5}px`,
                  top: `${parseFloat(binder.position.top) * 2.81}px`,
                  width: `${parseFloat(binder.position.width) * 5}px`,
                  height: `${parseFloat(binder.position.height) * 2.81}px`
                }}
                onClick={() => setSelectedBinder(binder.id)}
              />
            ))}
            {/* Signature button */}
            <div 
              className="absolute cursor-pointer"
              style={{
                bottom: '-27%', // Changed from top: '50%' to position from bottom
                left: '92%',
                transform: 'translate(-50%, 0) rotate(-10deg)', // Adjusted transform
                width: '230px',  // Increased from 110px to 140px
                height: '80px',  // Increased from 40px to 50px
                zIndex: 50
              }}
              onClick={() => router.push('/about')}
            >
              <img
                src="/signature.png"
                alt="Signature"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                draggable="false"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full max-w-7xl">
          <div className="fixed top-4 left-4">
            <button 
              onClick={handleBack}
              className="text-gray-600 flex w-24 h-48"
            >
              <img 
                src={selectedBinderContent?.src}
                className="w-full h-full object-contain" 
              />
            </button>
          </div>
          <div className="flex justify-center items-center w-full h-screen">
            <div className="w-2/3 h-2/3 flex justify-center items-center">
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