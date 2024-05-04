/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "wsxgrmtiuprnsabpslkk.supabase.co",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
