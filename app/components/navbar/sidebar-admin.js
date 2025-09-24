'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SidebarAdmin() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userData, setUserData] = useState({});

  // Deteksi ukuran layar untuk responsivitas dan cek user data
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Cek user data dari localStorage (hanya di client-side)
    const checkUserData = () => {
      try {
        const storedUserData = localStorage.getItem('adminUser');
        console.log('Stored user data in sidebar:', storedUserData);

        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          console.log('Parsed user data:', parsedUserData);
          console.log('User role:', parsedUserData.role);
          console.log(
            'Is super admin check:',
            parsedUserData.role === 'super_admin'
          );

          setUserData(parsedUserData);
          setIsSuperAdmin(parsedUserData.role === 'super_admin');
        } else {
          console.log('No user data found in localStorage');
          setIsSuperAdmin(false);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsSuperAdmin(false);
      }
    };

    checkScreenSize();
    checkUserData();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Debug log untuk isSuperAdmin
  useEffect(() => {
    console.log('isSuperAdmin state changed:', isSuperAdmin);
  }, [isSuperAdmin]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    document.cookie = 'token=; path=/; max-age=0';
    router.push('/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      name: 'Jadwal Kajian',
      href: '/kajian-admin',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: 'Kegiatan',
      href: '/kegiatan-admin',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: 'Donasi',
      href: '/donasi-admin',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Pengurus',
      href: '/pengurus-admin',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed z-50 top-4 ${
          isOpen ? 'left-64' : 'left-4'
        } bg-green-600 p-2 rounded-md text-white focus:outline-none transition-all duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          onTouchEnd={toggleSidebar}
          style={{ touchAction: 'manipulation' }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-40 transition-all duration-300 ${
          isOpen ? 'w-72' : 'w-20'
        } overflow-hidden`}
        style={{
          height: '100vh',
          height: '100dvh', // Dynamic viewport height for mobile
          touchAction: 'pan-y',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo and brand */}
          <div
            className={`flex items-center justify-center p-6 ${
              isOpen ? '' : 'justify-center'
            }`}
          >
            <div className="relative h-12 w-12 mr-3">
              <Image
                src="/images/Logo Masjid Baiturrohim.png"
                alt="Logo Masjid"
                fill
                className="object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/48?text=Masjid';
                }}
              />
            </div>
            {isOpen && (
              <h1 className="text-xl font-bold text-green-700">Baiturrohim</h1>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Admin profile */}
          <div
            className={`px-6 py-4 ${
              isOpen ? '' : 'hidden lg:flex lg:flex-col lg:items-center'
            }`}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-lg">
                A
              </div>
              {isOpen && (
                <div className="ml-3">
                  <p className="font-medium">Admin</p>
                  <p className="text-sm text-gray-500">Admin Masjid</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-6 py-3 hover:bg-green-50 transition-colors duration-200 ${
                      pathname === item.href
                        ? 'bg-green-100 text-green-700 border-r-4 border-green-700'
                        : 'text-gray-600'
                    } ${isOpen ? '' : 'justify-center'}`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {isOpen && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {isSuperAdmin && (
            <Link
              href="/users-admin"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/users-admin'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={{ touchAction: 'manipulation' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Manajemen User
            </Link>
          )}

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              onTouchEnd={handleLogout}
              className={`flex items-center text-red-600 hover:bg-red-50 rounded-md ${
                isOpen ? 'px-6' : 'px-2'
              } py-3 transition-colors w-full justify-center`}
              style={{ touchAction: 'manipulation' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {isOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>

          {/* Toggle for desktop */}
          <div className="hidden lg:block p-4 border-t border-gray-200">
            <button
              onClick={toggleSidebar}
              onTouchEnd={toggleSidebar}
              className="flex items-center justify-center w-full text-gray-500 hover:bg-gray-100 rounded-md py-2"
              style={{ touchAction: 'manipulation' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content margin */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'lg:ml-72' : 'lg:ml-20'
        }`}
      ></div>
    </>
  );
}
