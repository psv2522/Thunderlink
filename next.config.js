/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.duckduckgo.com",
        port: "",
        pathname: "/ip2/**",
      },
    ],
  },
};

module.exports = nextConfig;
