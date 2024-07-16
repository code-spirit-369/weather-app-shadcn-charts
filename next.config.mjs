/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.weatherbit.io",
      },
    ],
  },
};

export default nextConfig;
