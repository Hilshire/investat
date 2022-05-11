/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'lib', 'server']
  }
}

// init when server start
require('./server/model/async')

module.exports = nextConfig
