'use client';

export default function About() {
  return (
    <main className="min-h-screen p-8 bg-white relative">
      {/* Back button */}
      <button
        onClick={() => window.location.href = '/'}
        className="absolute top-8 right-8 text-gray-600"
      >
        ← Back
      </button>

      <div className="max-w-2xl">
        <div className="text-lg">
          <div className="mb-4">
            <h1 className="text-2xl font-light">About me</h1>
          </div>
          <a className="text-gray-600 text-sm">
		  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris est dolor, commodo a iaculis in, ullamcorper eget nulla. In imperdiet ex et venenatis pellentesque.
		  </a>
		  <p className="text-xs text-gray-600">Contact : giosayer@exemple.com</p>
          <div className="mt-auto">
            <a 
              href="https://www.instagram.com/giosayer/" 
              target="_blank"
              className="text-sm text-gray-600"
            >
              © Giosayer
            </a>
            <p className="text-xs text-gray-500">Website by Colin PROJEAN</p>
          </div>
        </div>
      </div>
    </main>
  );
}
