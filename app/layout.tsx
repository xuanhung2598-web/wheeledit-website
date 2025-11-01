import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import MainLayout from '../components/MainLayout';
import '../globals.css';
// FIX: Import React to provide the React namespace for types like React.ReactNode.
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

const faviconUrl = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23007BFF'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='20' font-weight='bold' fill='white' font-family='sans-serif'>W</text></svg>";

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
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl,
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