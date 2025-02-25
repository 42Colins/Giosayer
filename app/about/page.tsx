'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    rotation: number;
    scale: number;
  }>>([]);

  useEffect(() => {
    const loadImages = async () => {
      const images = await getAllImages();
      const positions = images.map(src => ({
        src,
        x: Math.random() * 200 - 50, // Position from -50% to 150% of viewport
        y: Math.random() * 200 - 50, // Position from -50% to 150% of viewport
        rotation: Math.random() * 360,
        scale: 0.4 + Math.random() * 0.4 // Scale from 0.4 to 0.8
      }));
      setImagePositions(positions);
    };

    loadImages();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-white relative overflow-hidden">
      {/* Background layer with random images */}
      <div className="fixed inset-0 pointer-events-none" style={{ margin: '-25vw' }}> {/* Expand container beyond viewport */}
        {imagePositions.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt=""
            className="absolute object-contain duration-1000"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              transform: `rotate(${img.rotation}deg) scale(${img.scale})`,
              maxWidth: '1000px',
              maxHeight: '1000px',
              zIndex: 1
            }}
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
        className="absolute top-8 right-8 text-gray-600 z-10"
      >
        ← Back
      </button>

      <div className="relative z-10 max-w-2xl">
        <div className="text-lg font-['Adobe_Arabic']">
          <div className="mb-4">
            <h1 className="text-2xl font-light font-['Adobe_Arabic']">About me</h1>
          </div>
          <a className="text-gray-600 text-sm block mb-4 font-['Adobe_Arabic']">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris est dolor, commodo a iaculis in, ullamcorper eget nulla. In imperdiet ex et venenatis pellentesque.
          </a>
          <p className="text-xs text-gray-600 mb-4 font-['Adobe_Arabic']">Contact : giosayer@exemple.com</p>
          <div className="mt-auto">
            <a 
              href="https://www.instagram.com/giosayer/" 
              target="_blank"
              className="text-sm text-gray-600 font-['Adobe_Arabic']"
            >
              © Giosayer
            </a>
            <p className="text-xs text-gray-500 font-['Adobe_Arabic']">Website by Colin PROJEAN</p>
          </div>
        </div>
      </div>
    </main>
  );
}