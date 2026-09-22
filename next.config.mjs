// Export estático para GitHub Pages.
// Em "project pages" (usuario.github.io/repo), defina NEXT_PUBLIC_BASE_PATH=/repo no build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
