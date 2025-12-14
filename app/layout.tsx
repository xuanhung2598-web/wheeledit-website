
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

const title = 'Professional Real Estate Photo Editing | HDR, Virtual Staging - WheelEdit';
const description = 'Get professional real estate photos edited in 12 hours. First edit FREE!';

export const metadata: Metadata = {
  metadataBase: new URL('https://wheeledit.com'),
  title: {
    default: title,
    template: '%s | WheelEdit',
  },
  description: description,
  openGraph: {
    title: title,
    description: description,
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
    title: title,
    description: description,
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'WheelEdit',
  url: 'https://wheeledit.com',
  logo: 'https://wheeledit.com/logo.png',
  image: 'https://wheeledit.com/og-image.png',
  description: description,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'VN'
  },
  offers: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Real Estate Photo Editing'
    },
    priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0.00',
        priceCurrency: 'USD',
        valueAddedTaxIncluded: 'False'
    },
    name: 'First Edit Free'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="json-ld-main"
        />
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
