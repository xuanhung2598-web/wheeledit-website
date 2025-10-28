import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import MainLayout from '../components/MainLayout';
import '../globals.css';
import { getSocialLinks } from '../lib/data'; // Import the data fetching function

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


// Make the layout component async to fetch data
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch social links on the server
  const socialLinks = getSocialLinks();

  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        {/* Pass the fetched data to the main layout client component */}
        <MainLayout socialLinks={socialLinks}>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}