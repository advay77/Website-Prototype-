import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Enhance } from '@/components/Enhance';
import './globals.css';

export const metadata: Metadata = {
  title: 'DISCOVER Supply Chain',
  description: 'The network that builds supply chain leaders.',
  icons: { icon: '/assets/img/discover-logo.png' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#081634' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Enhance />
      </body>
    </html>
  );
}
