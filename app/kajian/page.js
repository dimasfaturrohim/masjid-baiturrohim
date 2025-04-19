'use client';

import {
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
  PlayIcon,
  CalendarIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../components/navbar/navbar';
import { useState, useEffect } from 'react';

export default function Kajian() {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const [activeTab, setActiveTab] = useState('semua');

  // Simulasi loading state
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const mainVideo = {
    title: 'Kajian Utama: Pentingnya Keikhlasan dalam Ibadah',
    description:
      'Kajian utama yang dibawakan oleh Ustadz Ahmad tentang pentingnya keikhlasan dalam ibadah sehari-hari.',
    thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
    link: 'https://www.youtube.com/watch?v=8Gy1pQQoElA',
    date: '15 April 2025',
    duration: '45:12',
    speaker: 'Ustadz Ahmad',
  };

  const videos = [
    {
      title: 'Kajian Subuh: Pentingnya Keikhlasan',
      description:
        'Ustadz Ahmad memberikan kajian tentang keikhlasan dalam ibadah.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'subuh',
      date: '12 April 2025',
      duration: '32:15',
      speaker: 'Ustadz Ahmad',
    },
    {
      title: 'Kajian Dzuhur: Menjaga Lisan',
      description:
        'Kajian tentang pentingnya menjaga lisan dalam kehidupan sehari-hari.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'dzuhur',
      date: '10 April 2025',
      duration: '28:45',
      speaker: 'Ustadz Budi',
    },
    {
      title: 'Kajian Magrib: Memaafkan dan Melupakan',
      description:
        'Kajian tentang pentingnya memaafkan dan melupakan kesalahan orang lain.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'magrib',
      date: '8 April 2025',
      duration: '35:20',
      speaker: 'Ustadz Hasan',
    },
    {
      title: 'Kajian Subuh: Berkah Shalat Subuh',
      description:
        'Kajian tentang berkah dan keutamaan shalat subuh berjamaah.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'subuh',
      date: '5 April 2025',
      duration: '30:18',
      speaker: 'Ustadz Ahmad',
    },
    {
      title: 'Kajian Isya: Makna Sabar dalam Islam',
      description: 'Ustadz Farhan membahas makna sabar dalam perspektif Islam.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'isya',
      date: '2 April 2025',
      duration: '40:05',
      speaker: 'Ustadz Farhan',
    },
    {
      title: 'Kajian Dzuhur: Keutamaan Sedekah',
      description:
        'Pembahasan tentang keutamaan sedekah dan balasannya di dunia dan akhirat.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'dzuhur',
      date: '1 April 2025',
      duration: '25:35',
      speaker: 'Ustadz Budi',
    },
    {
      title: 'Kajian Khusus: Persiapan Ramadhan',
      description:
        'Kajian khusus tentang persiapan spiritual dan fisik menyambut bulan Ramadhan.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/@masjidaljabbar',
      category: 'khusus',
      date: '25 Maret 2025',
      duration: '50:12',
      speaker: 'Ustadz Ahmad',
    },
  ];

  // Filter videos berdasarkan kategori tab
  const filteredVideos =
    activeTab === 'semua'
      ? videos
      : videos.filter((video) => video.category === activeTab);

  // Pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  // Fungsi untuk mengubah halaman pagination
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

  const highlights = [
    {
      title: 'Kajian Spesial: Hikmah Ramadan',
      description:
        'Kajian mendalam tentang makna dan hikmah bulan suci Ramadan',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example1',
      date: '20 Maret 2025',
      speaker: 'Ustadz Ahmad',
    },
    {
      title: 'Kajian Subuh: Pentingnya Keikhlasan',
      description:
        'Ustadz Ahmad membahas pentingnya keikhlasan dalam beribadah',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example2',
      date: '18 Maret 2025',
      speaker: 'Ustadz Ahmad',
    },
    {
      title: 'Kajian Dzuhur: Menjaga Lisan',
      description:
        'Pembahasan tentang pentingnya menjaga lisan dalam kehidupan',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example3',
      date: '15 Maret 2025',
      speaker: 'Ustadz Budi',
    },
    {
      title: 'Kajian Magrib: Memaafkan dan Melupakan',
      description: 'Pentingnya memaafkan dan melupakan kesalahan orang lain',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example4',
      date: '12 Maret 2025',
      speaker: 'Ustadz Hasan',
    },
    {
      title: 'Kajian Isya: Makna Sabar dalam Islam',
      description: 'Diskusi tentang makna sabar dalam perspektif Islam',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example5',
      date: '10 Maret 2025',
      speaker: 'Ustadz Farhan',
    },
  ];

  // Event schedule data
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
            backgroundImage:
              "url('https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg')",
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
            <span className="text-[#6DB144] text-sm font-semibold uppercase tracking-wider mb-2">
              DIREKOMENDASIKAN
            </span>
            <h2 className="text-3xl font-bold text-[#1C5827] relative inline-block">
              Kajian Utama
              <div className="absolute -bottom-2 left-0 right-0 h-1 w-full bg-[#6DB144] rounded-full"></div>
            </h2>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4 mx-auto">
              <a
                href={mainVideo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative aspect-video">
                  <img
                    src={mainVideo.thumbnail}
                    alt={mainVideo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#6DB144] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <PlayIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                      {mainVideo.title}
                    </h3>
                    <p className="text-gray-200 mb-4 max-w-2xl">
                      {mainVideo.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
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
          ) : (
            <>
              {/* Video Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentVideos.length > 0 ? (
                  currentVideos.map((video, index) => (
                    <a
                      key={index}
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
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
                            {video.duration}
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
                <div className="space-y-6">
                  {highlights.map((highlight, index) => (
                    <a
                      key={index}
                      href={highlight.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
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
              href="https://www.youtube.com/@masjidbaiturrohim"
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
      <footer className="bg-[#1C1C1C] text-white pt-16 pb-8">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 pb-12 border-b border-gray-800">
            <div className="flex items-center mb-6 md:mb-0">
              <img
                src="/images/Logo Masjid Baiturrohim.png"
                alt="Logo Masjid Baiturrohim"
                width="60"
                height="60"
                className="mr-4"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Masjid Baiturrohim
                </h3>
                <p className="text-gray-400 text-sm">
                  Rumah Ibadah & Pusat Kegiatan Islam
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/masjidbaiturrohim"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6DB144] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@masjidbaiturrohim"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6DB144] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="https://wa.me/+6281234567890"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#6DB144] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <MapPinIcon className="w-5 h-5 text-[#6DB144] mr-2" />
                Alamat
              </h4>
              <p className="text-gray-400 mb-4">
                Jl. Masjid Baiturrohim No. 14, Kota Bandung, Jawa Barat 40292
              </p>
              <a
                href="https://goo.gl/maps/cnxeTzAyf9a9cuGy9"
                target="_blank"
                className="inline-flex items-center text-[#6DB144] hover:text-white"
              >
                Lihat di Google Maps
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <EnvelopeIcon className="w-5 h-5 text-[#6DB144] mr-2" />
                Kontak
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@baiturrohim.id"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-6 text-center mr-2">📧</span>
                    info@baiturrohim.id
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/+6281234567890"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <span className="w-6 text-center mr-2">📱</span>
                    (+62) 812-3456-7890
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                <PlayIcon className="w-5 h-5 text-[#6DB144] mr-2" />
                Kegiatan
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/kajian"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Kajian Rutin
                  </a>
                </li>
                <li>
                  <a
                    href="/tahfidz"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Program Tahfidz
                  </a>
                </li>
                <li>
                  <a
                    href="/sosial"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Kegiatan Sosial
                  </a>
                </li>
                <li>
                  <a
                    href="/ramadhan"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Program Ramadhan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Dapatkan informasi terbaru tentang kegiatan Masjid Baiturrohim
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="bg-white/10 rounded-l-lg px-4 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#6DB144] w-full"
                />
                <button className="bg-[#6DB144] hover:bg-[#5ca23a] text-white px-4 rounded-r-lg transition-colors">
                  Daftar
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              Dewan Kemakmuran Masjid Baiturrohim
            </p>
            <p className="text-gray-500">
              Copyright © {new Date().getFullYear()} • All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
