/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
