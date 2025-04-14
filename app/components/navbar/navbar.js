'use client'; // Tambahkan ini di bagian atas file
import { useRouter } from 'next/navigation'; // Tambahkan impor useRouter
import Image from 'next/image'; // Tambahkan impor Image dari Next.js

export default function Navbar() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path); // Navigasi ke halaman tertentu
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {' '}
          {/* Perbesar tinggi navbar */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/images/Logo Masjid Baiturrohim.png"
              alt="Logo Masjid Baiturrohim"
              width={60} // Perbesar ukuran logo
              height={60} // Perbesar ukuran logo
              className="mr-4" // Tambahkan margin kanan agar ada jarak dengan teks
            />
            <div className="text-green-500 text-left">
              <div className="text-xl font-bold leading-none">Masjid</div>{' '}
              {/* Tulisan Masjid */}
              <div className="text-2xl font-bold leading-none">
                Baiturrohim
              </div>{' '}
              {/* Tulisan Baiturrohim */}
            </div>
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
