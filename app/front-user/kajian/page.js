'use client';

import {
  PlayIcon,
  CalendarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';
import { useState, useEffect } from 'react';

export default function Kajian() {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const [activeTab, setActiveTab] = useState('semua');

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [allKajianData, setAllKajianData] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  // Fetch kajian data from the backend
  useEffect(() => {
    const fetchKajianData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/kajian');

        if (!response.ok) {
          throw new Error('Failed to fetch kajian data');
        }

        const data = await response.json();

        const formatExternalUrl = (url) => {
          if (!url) return '#';

          url = url.trim();

          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          }

          while (url.startsWith('/')) {
            url = url.substring(1);
          }

          return `https://${url}`;
        };

        if (data && data.length > 0) {
          // Transform API data to match the expected format for display
          const formattedKajian = data.map((item) => ({
            id: item.id,
            title: item.judul,
            description: item.deskripsi || 'Kajian Masjid Baiturrohim',
            thumbnail:
              item.imageUrl ||
              'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg', // Fallback image
            // More robust URL handling
            link: item.linkYoutube ? formatExternalUrl(item.linkYoutube) : '#',
            date: new Date(item.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            duration: '45:00', // Default duration if not provided
            speaker: 'Ustadz', // Default speaker if not provided
            category: getCategoryFromTime(item.waktu), // Derive category from time
          }));

          setAllKajianData(formattedKajian);

          // Set main video to the most recent kajian
          setMainVideo({
            ...formattedKajian[0],
            speaker: 'Ustadz', // Default speaker if not provided
          });
        }
      } catch (err) {
        console.error('Error fetching kajian data:', err);
        setError('Gagal memuat data kajian');
      } finally {
        setIsLoading(false);
      }
    };

    fetchKajianData();
  }, []);

  // Helper function to determine category based on time
  const getCategoryFromTime = (time) => {
    if (!time) return 'khusus';

    const hour = parseInt(time.split(':')[0]);

    if (hour >= 3 && hour < 6) return 'subuh';
    if (hour >= 11 && hour < 14) return 'dzuhur';
    if (hour >= 17 && hour < 19) return 'magrib';
    if (hour >= 19 || hour < 3) return 'isya';
    return 'khusus';
  };

  // Filter videos based on the selected tab
  const filteredVideos =
    activeTab === 'semua'
      ? allKajianData
      : allKajianData.filter((video) => video.category === activeTab);

  // Get highlights (5 most recent excluding the main video)
  const highlights = allKajianData
    .filter((item) => item.id !== mainVideo?.id)
    .slice(0, 5);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  // Function to change pagination page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tab categories
  const categories = [
    { id: 'semua', name: 'Semua Kajian' },
    { id: 'subuh', name: 'Kajian Subuh' },
    { id: 'dzuhur', name: 'Kajian Dzuhur' },
    { id: 'magrib', name: 'Kajian Magrib' },
    { id: 'isya', name: 'Kajian Isya' },
    { id: 'khusus', name: 'Kajian Khusus' },
  ];

  // Event schedule data (still using hardcoded data as this might come from a different API)
  const scheduleItems = [
    {
      day: 'Senin',
      time: '05:00 - 06:00',
      title: 'Kajian Subuh',
      speaker: 'Ustadz Ahmad',
    },
    {
      day: 'Selasa',
      time: '12:30 - 13:30',
      title: 'Kajian Dzuhur',
      speaker: 'Ustadz Budi',
    },
    {
      day: 'Rabu',
      time: '19:30 - 20:30',
      title: 'Kajian Aqidah',
      speaker: 'Ustadz Farhan',
    },
    {
      day: 'Kamis',
      time: '05:00 - 06:00',
      title: 'Kajian Tafsir',
      speaker: 'Ustadz Ahmad',
    },
    {
      day: 'Jumat',
      time: '13:00 - 14:00',
      title: 'Kajian Jumat',
      speaker: 'Ustadz Hasan',
    },
    {
      day: 'Sabtu',
      time: '19:30 - 21:00',
      title: 'Kajian Sirah',
      speaker: 'Ustadz Farhan',
    },
    {
      day: 'Ahad',
      time: '08:00 - 10:00',
      title: 'Kajian Tematik',
      speaker: 'Ustadz Ahmad',
    },
  ];

  // Handle retry on error
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchKajianData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: '70vh' }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: mainVideo?.thumbnail
              ? `url('${mainVideo.thumbnail}')`
              : "url('https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-60 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="px-0">
                <span className="inline-block px-4 py-1 bg-[#6DB144] bg-opacity-80 text-white rounded-full mb-4 text-sm backdrop-blur-sm">
                  Jadwal Kajian & Ceramah
                </span>
                <h1 className="text-white font-bold text-4xl sm:text-5xl">
                  Kajian Masjid Baiturrohim
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Dapatkan ilmu dan hikmah melalui berbagai kajian yang
                  diselenggarakan di Masjid Baiturrohim
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById('video-section')
                      .scrollIntoView({ behavior: 'smooth' })
                  }
                  className="mt-8 px-6 py-3 bg-[#6DB144] hover:bg-[#1C5827] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Lihat Kajian Terbaru
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: '70px' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-50 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div id="video-section" className="container mx-auto px-4 pb-16">
        {/* Featured Video Section */}
        <div className="py-12">
          <div className="mb-8 text-center">
            <span className="text-[#6DB144] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 block">
              DIREKOMENDASIKAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C5827] relative inline-block">
              Kajian Utama
              <div className="absolute -bottom-2 left-0 right-0 h-1 w-full bg-[#6DB144] rounded-full"></div>
            </h2>
          </div>

          {isLoading ? (
            <div className="w-full sm:w-10/12 md:w-8/12 px-0 sm:px-4 mx-auto">
              <div className="relative rounded-xl overflow-hidden shadow-xl bg-gray-200 animate-pulse aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="h-6 sm:h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-300 rounded w-full mb-4"></div>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-24"></div>
                    <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-24"></div>
                    <div className="h-3 sm:h-4 bg-gray-300 rounded w-16 sm:w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-2">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-[#6DB144] text-white rounded-lg hover:bg-[#1C5827] transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : mainVideo ? (
            <div className="flex flex-wrap justify-center">
              <div className="w-full sm:w-10/12 md:w-8/12 px-0 sm:px-4 mx-auto">
                <a
                  href={mainVideo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl group">
                    <img
                      src={mainVideo.thumbnail}
                      alt={mainVideo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#6DB144] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <PlayIcon className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2">
                        {mainVideo.title}
                      </h3>
                      <p className="text-gray-200 mb-2 sm:mb-4 max-w-2xl text-sm sm:text-base">
                        {mainVideo.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center">
                          <UserIcon className="w-4 h-4 mr-1" />
                          <span>{mainVideo.speaker}</span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>{mainVideo.date}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span>{mainVideo.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                Belum ada kajian utama yang tersedia.
              </p>
            </div>
          )}
        </div>

        {/* Video Library Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1C5827] mb-4 md:mb-0">
              Kajian Video Terbaru
            </h2>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === category.id
                      ? 'bg-[#1C5827] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse"
                >
                  <div className="w-full aspect-video bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex gap-3 mt-4">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-2">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-[#6DB144] text-white rounded-lg hover:bg-[#1C5827] transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <>
              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentVideos.length > 0 ? (
                  currentVideos.map((video, index) => (
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-14 h-14 bg-[#6DB144] rounded-full flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <PlayIcon className="w-7 h-7 text-white" />
                          </div>
                        </div>

                        <div className="absolute bottom-2 right-2">
                          <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-md">
                            {video.duration || '45:00'}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="px-2 py-1 bg-[#6DB144]/10 text-[#6DB144] rounded-full font-medium">
                            {video.category.charAt(0).toUpperCase() +
                              video.category.slice(1)}
                          </span>
                          <span className="mx-2">•</span>
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          <span>{video.date}</span>
                        </div>

                        <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[#6DB144] transition-colors line-clamp-2">
                          {video.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {video.description}
                        </p>

                        <div className="flex items-center text-sm text-gray-500">
                          <UserIcon className="w-4 h-4 mr-1 text-[#6DB144]" />
                          <span>{video.speaker}</span>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Tidak ada kajian dalam kategori ini.
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md flex items-center ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#1C5827] text-white hover:bg-[#6DB144]'
                      } transition-colors`}
                    >
                      <ChevronLeftIcon className="w-5 h-5 mr-1" />
                      <span>Sebelumnya</span>
                    </button>

                    <div className="hidden md:flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-9 h-9 rounded-md flex items-center justify-center ${
                              currentPage === number
                                ? 'bg-[#6DB144] text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } transition-colors`}
                          >
                            {number}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() =>
                        paginate(
                          currentPage < totalPages
                            ? currentPage + 1
                            : totalPages
                        )
                      }
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md flex items-center ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-[#1C5827] text-white hover:bg-[#6DB144]'
                      } transition-colors`}
                    >
                      <span>Selanjutnya</span>
                      <ChevronRightIcon className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Jadwal Kajian & Highlights Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {/* Jadwal Kajian Rutin */}
            <div className="w-full lg:w-7/12 px-4 mb-10 lg:mb-0">
              <div className="mb-8">
                <span className="text-[#6DB144] text-sm font-semibold uppercase tracking-wider block mb-2">
                  IKUTI RUTIN
                </span>
                <h2 className="text-2xl font-bold text-[#1C5827] relative inline-block">
                  Jadwal Kajian Mingguan
                  <div className="absolute -bottom-2 left-0 right-0 h-1 w-full bg-[#6DB144] rounded-full"></div>
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Hari
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Waktu
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Kajian
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pemateri
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduleItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.speaker}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Highlights Kajian */}
            <div className="w-full lg:w-5/12 px-4">
              <div className="mb-8">
                <span className="text-[#6DB144] text-sm font-semibold uppercase tracking-wider block mb-2">
                  TIDAK BOLEH DILEWATKAN
                </span>
                <h2 className="text-2xl font-bold text-[#1C5827] relative inline-block">
                  Highlight Kajian
                  <div className="absolute -bottom-2 left-0 right-0 h-1 w-full bg-[#6DB144] rounded-full"></div>
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="flex gap-4 animate-pulse">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="flex gap-3">
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-10">
                    <p className="text-red-500 mb-2">{error}</p>
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 bg-[#6DB144] text-white rounded-lg hover:bg-[#1C5827] transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </div>
                ) : highlights.length > 0 ? (
                  <div className="space-y-6">
                    {highlights.map((highlight, index) => (
                      <a
                        href={highlight.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={highlight.thumbnail}
                            alt={highlight.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayIcon className="h-8 w-8 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 group-hover:text-[#6DB144] transition-colors line-clamp-2">
                            {highlight.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2 mb-2">
                            {highlight.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 gap-3">
                            <span className="flex items-center">
                              <UserIcon className="w-3 h-3 mr-1" />
                              {highlight.speaker}
                            </span>
                            <span className="flex items-center">
                              <CalendarIcon className="w-3 h-3 mr-1" />
                              {highlight.date}
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      Belum ada highlight kajian yang tersedia.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative bg-[#1C5827] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bergabunglah dengan Kajian Kami
          </h2>
          <p className="max-w-2xl mx-auto text-white/80 mb-8">
            Hadirilah kajian-kajian rutin di Masjid Baiturrohim untuk
            meningkatkan keimanan dan ketaqwaan kita bersama.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#jadwal"
              className="px-6 py-3 bg-white text-[#1C5827] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Lihat Jadwal Kajian
            </a>
            <a
              href="https://www.youtube.com/@masjidbaiturrohim.korpriraya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#6DB144] text-white font-medium rounded-lg hover:bg-[#5ca23a] transition-colors"
            >
              Kunjungi Channel YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
