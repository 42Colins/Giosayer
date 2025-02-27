import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Use next/font properly with weight array
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'g',
  description: 'Visual Artist & Photographer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} h-full overflow-hidden`}>{children}</body>
    </html>
  );
}