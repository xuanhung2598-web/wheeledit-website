// FIX: Import React to resolve 'React' namespace error.
import React from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import MainLayout from '../components/MainLayout';
import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wheeledit.com'),
  title: {
    default: 'WheelEdit | Professional Real Estate Photo Editing',
    template: '%s | WheelEdit',
  },
  description: 'Stunning, high-quality images that sell properties faster. We offer fast turnarounds, quality results, and affordable pricing for real estate photography.',
  openGraph: {
    title: 'WheelEdit | Professional Real Estate Photo Editing',
    description: 'Stunning, high-quality images that sell properties faster.',
    url: 'https://wheeledit.com',
    siteName: 'WheelEdit',
    images: [
      {
        url: '/og-image.png', // Assumes a default OG image exists at /public/og-image.png
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WheelEdit | Professional Real Estate Photo Editing',
    description: 'Stunning, high-quality images that sell properties faster.',
    images: ['/og-image.png'], // Assumes a default OG image exists
  },
  alternates: {
    canonical: '/',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
