'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';
import {
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  ClockIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [adminName, setAdminName] = useState('Admin');
  const [stats, setStats] = useState({
    kajian: 0,
    kegiatan: 0,
    donasi: 0,
    pengurus: 0,
  });

  // Cek apakah admin sudah login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 18) setGreeting('Selamat Siang');
    else setGreeting('Selamat Malam');

    // Fetch statistics (replace with actual API calls later)
    // Example: fetchStats();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/login');
  };

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <main className="flex-1 p-6 md:p-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-2xl shadow-lg mb-8 p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {greeting}, {adminName}!
                </h2>
                <p className="text-green-50">
                  Selamat datang kembali di Panel Admin Masjid Baiturrohim
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="bg-white/20 py-2 px-4 rounded-full text-sm backdrop-blur-sm">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-blue-50 p-3 rounded-xl mr-4">
                <BookOpenIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Kajian</p>
                <p className="text-2xl font-bold">{stats.kajian}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-purple-50 p-3 rounded-xl mr-4">
                <CalendarIcon className="h-8 w-8 text-purple-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Kegiatan</p>
                <p className="text-2xl font-bold">{stats.kegiatan}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-amber-50 p-3 rounded-xl mr-4">
                <CurrencyDollarIcon className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Donasi</p>
                <p className="text-2xl font-bold">{stats.donasi}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-green-50 p-3 rounded-xl mr-4">
                <UsersIcon className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pengurus</p>
                <p className="text-2xl font-bold">{stats.pengurus}</p>
              </div>
            </div>
          </div>

          {/* Management Cards */}
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Manajemen Konten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card untuk menu admin */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-blue-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Kelola Kajian</h3>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <BookOpenIcon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Tambah, edit, atau hapus jadwal kajian dan materi
              </p>
              <button
                onClick={() => router.push('/kajian-admin')}
                className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm flex items-center justify-center"
              >
                Kelola Kajian
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Kelola Kegiatan</h3>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Atur jadwal dan informasi kegiatan masjid
              </p>
              <button
                onClick={() => router.push('/kegiatan-admin')}
                className="w-full py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm flex items-center justify-center"
              >
                Kelola Kegiatan
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-amber-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Laporan Donasi</h3>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Lihat dan kelola laporan donasi masjid
              </p>
              <button
                onClick={() => router.push('/donasi-admin')}
                className="w-full py-2 px-4 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors font-medium text-sm flex items-center justify-center"
              >
                Kelola Donasi
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Kelola Pengurus</h3>
                <div className="p-2 bg-green-50 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Tambah, edit, atau hapus data pengurus masjid
              </p>
              <button
                onClick={() => router.push('/pengurus-admin')}
                className="w-full py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm flex items-center justify-center"
              >
                Kelola Pengurus
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-teal-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Laporan Keuangan</h3>
                <div className="p-2 bg-teal-50 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-teal-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Kelola laporan pemasukan dan pengeluaran masjid
              </p>
              <button
                onClick={() => router.push('/keuangan')}
                className="w-full py-2 px-4 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors font-medium text-sm flex items-center justify-center"
              >
                Kelola Keuangan
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow border-l-4 border-gray-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Pengaturan</h3>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <CogIcon className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Konfigurasi website dan informasi masjid
              </p>
              <button
                onClick={() => router.push('/front-admin/pengaturan')}
                className="w-full py-2 px-4 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm flex items-center justify-center"
              >
                Kelola Pengaturan
              </button>
            </div>
          </div>

          {/* Recent Activities Section */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
              <p className="text-gray-500 text-center py-6">
                Aktivitas akan muncul di sini ketika Anda mulai mengelola
                konten.
              </p>
              {/* You can replace the above with actual activity items when you have data */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
