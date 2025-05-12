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
  const [greeting, setGreeting] = useState('');
  const [adminName] = useState('Admin');
  const [stats, setStats] = useState({
    kajian: 0,
    kegiatan: 0,
    donasi: 0,
    pengurus: 0,
  });
  // New state for recent activities
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cek apakah admin sudah login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      // Set greeting based on time of day
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Selamat Pagi');
      else if (hour < 18) setGreeting('Selamat Siang');
      else setGreeting('Selamat Malam');

      // Fetch dashboard stats
      fetchDashboardStats();
    }
  }, [router]);

  // Fetch dashboard statistics from all APIs
  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      // Create an array of promises for parallel fetching
      const promises = [
        fetch('/api/kajian').then((res) => res.json()),
        fetch('/api/kegiatan').then((res) => res.json()),
        fetch('/api/donasi').then((res) => res.json()),
        fetch('/api/pengurus').then((res) => res.json()),
      ];

      // Wait for all promises to resolve
      const [kajianData, kegiatanData, donasiData, pengurusData] =
        await Promise.all(promises);

      // Update stats with the fetched data counts
      setStats({
        kajian: kajianData.length,
        kegiatan: kegiatanData.length,
        donasi: donasiData.length,
        pengurus: pengurusData.length,
      });

      // Process and set recent activities (from kegiatan)
      if (kegiatanData && kegiatanData.length > 0) {
        // Sort activities by date (most recent first)
        const sortedActivities = [...kegiatanData].sort((a, b) => {
          const dateA = new Date(`${a.tanggal}T${a.waktu || '00:00'}`);
          const dateB = new Date(`${b.tanggal}T${b.waktu || '00:00'}`);
          return dateB - dateA; // Descending order (newest first)
        });

        // Get the 5 most recent activities
        setRecentActivities(sortedActivities.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Gagal mengambil data statistik dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
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
            {/* Loading state for statistics */}
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-xl shadow p-6 animate-pulse"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl mr-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-6 w-10 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Display error if any */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

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
                onClick={() => router.push('/front-admin/kajian-admin')}
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
                onClick={() => router.push('/front-admin/kegiatan-admin')}
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
                onClick={() => router.push('/front-admin/donasi-admin')}
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
                onClick={() => router.push('/front-admin/pengurus-admin')}
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
                onClick={() => router.push('/front-admin/keuangan')}
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

          {/* Recent Activities Section - Now showing actual kegiatan data */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Aktivitas Terbaru
            </h3>
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center animate-pulse">
                      <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => router.push('/front-admin/kegiatan-admin')}
                      role="button"
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <CalendarIcon className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {activity.nama}
                        </h4>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 mt-1">
                          <span className="mr-3">
                            {formatDate(activity.tanggal)}
                          </span>
                          {activity.waktu && (
                            <span className="mr-3">{activity.waktu}</span>
                          )}
                          {activity.lokasi && <span>di {activity.lokasi}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                  {recentActivities.length > 0 && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() =>
                          router.push('/front-admin/kegiatan-admin')
                        }
                        className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                      >
                        Lihat Semua Kegiatan
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">
                  Belum ada kegiatan yang ditambahkan. Tambahkan kegiatan baru
                  untuk melihat aktivitas terbaru di sini.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
