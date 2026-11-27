/** Responsive photo from /assets/summit (each exported at 800 and 1600 px wide). */
export function Photo({ name, alt, sizes = '(max-width: 980px) 100vw, 50vw', className, eager = false, pos }: { name: string; alt: string; sizes?: string; className?: string; eager?: boolean; pos?: string }) {
  return (
    <img
      className={className}
      src={`/assets/summit/${name}-1600.jpg`}
      srcSet={`/assets/summit/${name}-800.jpg 800w, /assets/summit/${name}-1600.jpg 1600w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={pos ? { objectPosition: pos } : undefined}
    />
  );
}
