import type { Metadata } from 'next';
import { PageChrome } from '@/components/PageChrome';
import { Mosaic } from '@/components/gallery/Mosaic';
import { Wall } from '@/components/gallery/Wall';
import '../summit/summit.css';
import './gallery.css';

export const metadata: Metadata = {
  title: 'Gallery · Every DISCOVER Summit, 2017–2026',
  description: 'Hundreds of photos from every DISCOVER Summit since 2017, in one place.',
};

export default function GalleryPage() {
  return (
    <PageChrome page="gallery">
      <Mosaic />
      <Wall />
    </PageChrome>
  );
}
