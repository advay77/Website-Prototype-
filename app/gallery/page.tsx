import type { Metadata } from 'next';
import { PageChrome } from '@/components/PageChrome';
import { Mosaic } from '@/components/gallery/Mosaic';
import { Wall } from '@/components/gallery/Wall';
import { SameMoment } from '@/components/summit/SameMoment';
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
      {/* Same moment, every year */}
      <section className="s-same">
        <div className="wrap">
          <div className="sec-head reveal">
            <div><div className="tag">Same moment, every year</div><h2>Watch the community grow.</h2></div>
            <p>The same kind of photo from every Summit we have, side by side.</p>
          </div>
          <div className="reveal"><SameMoment /></div>
        </div>
      </section>
    </PageChrome>
  );
}
