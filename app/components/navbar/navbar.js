"use client"; // Tambahkan ini di bagian atas file

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path); // Navigasi ke halaman tertentu
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-green-500">
              Masjid Baiturrohim
            </a>
          </div>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => handleNavigation('/')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavigation('/kajian')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Kajian
            </button>
            <button
              onClick={() => handleNavigation('/kegiatan')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Kegiatan
            </button>
            <button
              onClick={() => handleNavigation('/contact')}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profil
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}