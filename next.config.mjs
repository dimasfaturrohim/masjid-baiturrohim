/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/front-user/',
      },
      {
        source: '/kajian',
        destination: '/front-user/kajian',
      },
      {
        source: '/kegiatan',
        destination: '/front-user/kegiatan',
      },
      {
        source: '/donasi',
        destination: '/front-user/donasi',
      },
      {
        source: '/pengurus',
        destination: '/front-user/pengurus',
      },
      {
        source: '/laporan',
        destination: '/front-user/laporan',
      },
    ];
  },
};

// Change this line to use ES module export syntax
export default nextConfig;
