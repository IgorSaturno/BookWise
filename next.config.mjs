/** @type {import('next').NextConfig} */

const hostnames = [
  'lh3.googleusercontent.com',
  'github.com',
  'avatars.githubusercontent.com',
  'images.unsplash.com',
]

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
}

export default nextConfig
