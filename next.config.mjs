/** Static export: the whole site is plain files on Vercel's CDN. */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
};
export default nextConfig;
