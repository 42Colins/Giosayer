import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata: Metadata = {
  title: 'g-archives.fr',
  description: 'Visual Artist & Photographer Portfolio',
  icons: {
    icon: '/Blank.png', // Default favicon
    shortcut: '/Blank.png'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}