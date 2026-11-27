import idx from '@/public/assets/years/index.json';

export type YearShot = { src: string; thumb: string; alt: string };
export type Year = { year: string; city: string; note: string; shots: YearShot[]; virtual?: boolean; soon?: boolean };

const past = (y: string): YearShot[] =>
  ((idx as Record<string, { n: number }[]>)[y] ?? []).map(({ n }) => {
    const id = `${y}-${String(n).padStart(2, '0')}`;
    return { src: `/assets/years/${id}-1600.jpg`, thumb: `/assets/years/${id}-600.jpg`, alt: `DISCOVER Summit ${y}, photo ${n}` };
  });

const SUMMIT_2026 = ['group-stairs', 'hall', 'keynote', 'panel', 'gala', 'networking', 'workshop', 'dance', 'awards', 'joy', 'breakouts', 'voice-keynote-2'];
// More 2026 photos from the gallery, picked by hand and checked for near-duplicates.
const MORE_2026 = [129, 137, 154, 163, 180, 188, 198, 206, 215, 225, 238, 247, 260, 268, 279, 290, 303, 311, 319, 337, 350, 370];
const g3 = (i: number) => String(i).padStart(3, '0');
const now = [
  ...SUMMIT_2026.map((n) => ({ src: `/assets/summit/${n}-1600.jpg`, thumb: `/assets/summit/${n}-800.jpg` })),
  ...MORE_2026.map((i) => ({ src: `/assets/gallery/l/${g3(i)}.webp`, thumb: `/assets/gallery/t/${g3(i)}.webp` })),
].map((s, i) => ({ ...s, alt: `DISCOVER Summit 2026, photo ${i + 1}` }));

/** Every Summit since 2017, with the photos from discover-org.us/gallery and the 2026 gallery. */
export const YEARS: Year[] = [
  { year: '2017', city: 'Summit I', note: 'The first DISCOVER Summit', shots: past('2017') },
  { year: '2018', city: 'Summit II', note: 'The first sponsor cohort', shots: past('2018') },
  { year: '2019', city: 'Summit III', note: 'The network grows', shots: past('2019') },
  { year: '2020', city: 'Virtual', note: 'The Summit went online', shots: [], virtual: true },
  { year: '2021', city: 'Virtual', note: 'Career Chats launch', shots: [], virtual: true },
  { year: '2022', city: 'Hotel Hershey, PA', note: 'Back in person', shots: past('2022') },
  { year: '2023', city: 'Philadelphia, PA', note: '“United for IMPACT”', shots: past('2023') },
  { year: '2024', city: 'New York, NY', note: 'Hosted by Pfizer', shots: past('2024') },
  { year: '2025', city: 'Jersey City, NJ', note: 'Photos coming soon', shots: [], soon: true },
  { year: '2026', city: 'New Brunswick, NJ', note: 'The Decade of DISCOVER', shots: now },
];

const p = (y: string, n: number) => ({ src: `/assets/years/${y}-${String(n).padStart(2, '0')}-1600.jpg`, thumb: `/assets/years/${y}-${String(n).padStart(2, '0')}-600.jpg` });
const s = (name: string) => ({ src: `/assets/summit/${name}-1600.jpg`, thumb: `/assets/summit/${name}-800.jpg` });

/** The same kind of moment, every year. */
export const MOMENTS: { key: string; label: string; shots: Record<string, { src: string; thumb: string; pos?: string }> }[] = [
  { key: 'group', label: 'The group photo', shots: { 2017: p('2017', 1), 2018: p('2018', 19), 2019: p('2019', 1), 2022: p('2022', 1), 2023: p('2023', 1), 2024: p('2024', 10), 2026: s('group-stairs') } },
  { key: 'stage', label: 'On stage', shots: { 2017: p('2017', 7), 2018: p('2018', 15), 2019: p('2019', 12), 2022: { ...p('2022', 11), pos: '88% 50%' }, 2023: p('2023', 11), 2024: p('2024', 2), 2026: s('panel') } },
  { key: 'network', label: 'Between sessions', shots: { 2017: p('2017', 12), 2018: p('2018', 9), 2019: p('2019', 8), 2022: p('2022', 9), 2023: p('2023', 6), 2024: p('2024', 8), 2026: s('networking') } },
];
