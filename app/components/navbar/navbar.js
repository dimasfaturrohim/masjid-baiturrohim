'use client';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState(pathname); // Initialize with current pathname

  // Update activeRoute when pathname changes
  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  const handleNavigation = (path) => {
    if (path !== pathname) {
      setIsLoading(true);
      // Set the active route immediately to avoid flashing
      setActiveRoute(path);
      router.push(path);

      // Simulate loading time (you may remove this in production)
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  // Function to determine if a nav item is active
  const isActive = (path) => {
    return activeRoute === path;
  };

  // Navigation items for cleaner code
  const navItems = [
    { path: '/', label: 'Beranda' },
    { path: '/kajian', label: 'Kajian' },
    { path: '/kegiatan', label: 'Kegiatan' },
    { path: '/donasi', label: 'Donasi' },
    { path: '/pengurus', label: 'Struktur Kepengurusan' },
    { path: '/laporan', label: 'Laporan Keuangan' },
  ];

  return (
    <>
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 z-[60] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6DB144]"></div>
            <p className="mt-4 text-[#6DB144] font-medium">Loading...</p>
          </div>
        </div>
      )}

      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center flex-shrink-0">
              <Image
                src="/images/Logo Masjid Baiturrohim.png"
                alt="Logo Masjid Baiturrohim"
                width={60}
                height={60}
                className="mr-4"
              />
              <div className="text-green-500 text-left">
                <div className="text-xl font-bold leading-none">Masjid</div>
                <div className="text-2xl font-bold leading-none">
                  Baiturrohim
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-white bg-[#6DB144]'
                      : 'text-gray-700 hover:text-[#6DB144]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
