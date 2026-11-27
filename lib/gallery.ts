import idx from '@/public/assets/gallery/index.json';

export type GItem = { i: number; y: number; w: number; h: number };
export const GALLERY = idx as { cols: number; tile: number; items: { y: number; w: number; h: number }[] };
export const ITEMS: GItem[] = GALLERY.items.map((it, i) => ({ i, ...it }));
export const thumb = (i: number) => `/assets/gallery/t/${String(i).padStart(3, '0')}.webp`;
export const large = (i: number) => `/assets/gallery/l/${String(i).padStart(3, '0')}.webp`;
export const YEARS = Array.from(new Set(ITEMS.map((x) => x.y))).sort();
