/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
    },
    images: {
        domains: ['dreamage-photographer-image-storage.s3.eu-central-1.amazonaws.com'],
    },
};

module.exports = nextConfig;
