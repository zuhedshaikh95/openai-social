/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '8mb' // Set desired value here
    }
  },
}

module.exports = nextConfig
