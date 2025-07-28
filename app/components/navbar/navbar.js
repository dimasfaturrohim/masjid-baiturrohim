'use client';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoute, setActiveRoute] = useState(pathname); // Initialize with current pathname
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update activeRoute when pathname changes
  useEffect(() => {
    setActiveRoute(pathname);
    setIsSidebarOpen(false); // Close sidebar on route change
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
    setIsSidebarOpen(false); // Close sidebar on navigation
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
            {/* Desktop menu */}
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
            {/* Hamburger menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-700 hover:text-[#6DB144] focus:outline-none"
                aria-label="Buka menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isSidebarOpen
                        ? 'M6 18L18 6M6 6l12 12' // X icon
                        : 'M4 6h16M4 12h16M4 18h16' // Hamburger
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar mobile menu */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${
            isSidebarOpen ? 'block' : 'hidden'
          } md:hidden`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <span className="font-bold text-[#6DB144] text-lg">Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-700 hover:text-[#6DB144] focus:outline-none"
                aria-label="Tutup menu"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex flex-col py-6 px-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
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
