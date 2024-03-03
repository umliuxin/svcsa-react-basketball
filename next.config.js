/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    output: 'standalone',
    images: { unoptimized: true }
}

module.exports = nextConfig
