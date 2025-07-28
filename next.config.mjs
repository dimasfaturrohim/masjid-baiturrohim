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
      //Routes for admin
      {
        source: '/login',
        destination: '/front-admin/login',
      },
      {
        source: '/dashboard',
        destination: '/front-admin/dashboard',
      },
      {
        source: '/kegiatan-admin',
        destination: '/front-admin/kegiatan-admin',
      },
      {
        source: '/kajian-admin',
        destination: '/front-admin/kajian-admin',
      },
      {
        source: '/donasi-admin',
        destination: '/front-admin/donasi-admin',
      },
      {
        source: '/pengurus-admin',
        destination: '/front-admin/pengurus-admin',
      },
      {
        source: '/users-admin',
        destination: '/front-admin/users-admin',
      },
    ];
  },
};

// Change this line to use ES module export syntax
export default nextConfig;
