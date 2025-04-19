'use client';
import { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  PlayIcon,
  ClockIcon,
  ChevronRightIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export default function Beranda() {
  const [currentKegiatanPage, setCurrentKegiatanPage] = useState(1);
  const kegiatanPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prayerTimes = [
    { name: 'Shalat Shubuh', time: '04:36', icon: '🌅' },
    { name: 'Syuruk/Terbit', time: '05:53', icon: '☀️' },
    { name: 'Shalat Dzuhur', time: '11:55', icon: '🌤️' },
    { name: 'Shalat Ashar', time: '15:10', icon: '🌇' },
    { name: 'Shalat Maghrib', time: '17:57', icon: '🌆' },
    { name: 'Shalat Isya', time: '19:06', icon: '🌙' },
  ];

  const kegiatan = [
    {
      title: 'Fasilitas Masjid',
      description: 'Berbagai fasilitas yang tersedia di Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: '/fasilitas',
      date: '25 April 2025',
    },
    {
      title: 'Petunjuk Arah',
      description: 'Petunjuk arah menuju Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan2.jpeg',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Masjid+Baiturrohim',
      date: '23 April 2025',
    },
    {
      title: 'Profil Masjid',
      description: 'Informasi lengkap tentang Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan3.jpeg',
      link: 'https://drive.google.com/file/d/1JiLpx1eRkr7PPX9Lk2NH3fPzJmtkl39-/view',
      date: '20 April 2025',
    },
    {
      title: 'Pendaftaran Kegiatan',
      description: 'Daftar kegiatan taklim dan pengajian di masjid.',
      image: '/images/kegiatan/kegiatan2.jpeg',
      link: 'https://s.id/permohonan-mraj',
      date: '18 April 2025',
    },
    {
      title: 'Galeri Masjid',
      description: 'Galeri foto dan dokumentasi kegiatan masjid.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: 'https://masjidraya-aljabbar.jabarprov.go.id/',
      date: '15 April 2025',
    },
    {
      title: 'Jadwal Kajian',
      description: 'Jadwal kajian rutin dan spesial di Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: '/kajian',
      date: '10 April 2025',
    },
    {
      title: 'Program Ramadhan',
      description: 'Kegiatan khusus di bulan suci Ramadhan.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: '/ramadhan',
      date: '5 April 2025',
    },
    {
      title: 'Donasi Online',
      description: 'Layanan donasi online untuk pengembangan masjid.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: '/donasi',
      date: '1 April 2025',
    },
  ];

  const totalKegiatanPages = Math.ceil(kegiatan.length / kegiatanPerPage);
  const indexOfLastKegiatan = currentKegiatanPage * kegiatanPerPage;
  const indexOfFirstKegiatan = indexOfLastKegiatan - kegiatanPerPage;
  const currentKegiatan = kegiatan.slice(
    indexOfFirstKegiatan,
    indexOfLastKegiatan
  );
  const paginateKegiatan = (pageNumber) => setCurrentKegiatanPage(pageNumber);

  const images = [
    {
      src: '/images/masjid1.jpg',
      description:
        'Masjid Baiturrohim tampak depan dengan arsitektur modern yang mencerminkan keindahan dan ketenangan.',
    },
    {
      src: '/images/masjid2.jpg',
      description:
        'Kegiatan shalat berjamaah di Masjid Baiturrohim yang dihadiri oleh jamaah dari berbagai kalangan.',
    },
    {
      src: '/images/masjid2.jpg',
      description:
        'Pemandangan malam hari di Masjid Baiturrohim dengan pencahayaan yang indah dan suasana yang damai.',
    },
  ];

  const videos = [
    {
      title: 'Shalat Jumat Masjid Raya Al Jabbar Imam Ahmad',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=8Gy1pQQoElA',
      date: '3 hari yang lalu',
    },
    {
      title: 'Memaknai Halal Bihalal | Khotbah Jumat Dr. Imam Sucipto, M.Ag',
      thumbnail: 'https://i.ytimg.com/vi/dfxFor84QHg/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=dfxFor84QHg',
      date: '3 hari yang lalu',
    },
    {
      title: 'Murottal QS An-Nisa:155-162 Ary Mutawalie',
      thumbnail: 'https://i.ytimg.com/vi/mod18kECF00/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=mod18kECF00',
      date: '4 hari yang lalu',
    },
    {
      title: "Keutamaan QS Al-Fatihah Intisari Al-Qur'an",
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=b_FSItby1SY',
      date: '4 hari yang lalu',
    },
    {
      title: "Keutamaan QS Al-Fatihah Intisari Al-Qur'an",
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=b_FSItby1SY',
      date: '4 hari yang lalu',
    },
    {
      title: "Keutamaan QS Al-Fatihah Intisari Al-Qur'an",
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=b_FSItby1SY',
      date: '4 hari yang lalu',
    },
    {
      title: "Keutamaan QS Al-Fatihah Intisari Al-Qur'an",
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=b_FSItby1SY',
      date: '4 hari yang lalu',
    },
    {
      title: "Keutamaan QS Al-Fatihah Intisari Al-Qur'an",
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=b_FSItby1SY',
      date: '4 hari yang lalu',
    },
    {
      title: 'QS Al-Baqarah - Kajian Tafsir',
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example',
      date: '5 hari yang lalu',
    },
    {
      title: "Penjelasan Hadits Arba'in - Kajian Spesial",
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example2',
      date: '6 hari yang lalu',
    },
    {
      title: 'Sirah Nabawiyah - Kajian Rutin',
      thumbnail: 'https://i.ytimg.com/vi/b_FSItby1SY/sddefault.jpg',
      link: 'https://www.youtube.com/watch?v=example3',
      date: '7 hari yang lalu',
    },
  ];

  const totalPages = Math.ceil(videos.length / videosPerPage);
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getNextPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;

      if (currentTime < prayerTimeInMinutes) {
        return {
          ...prayerTimes[i],
          remainingTime: prayerTimeInMinutes - currentTime,
        };
      }
    }

    const [hours, minutes] = prayerTimes[0].time.split(':').map(Number);
    const prayerTimeInMinutes = hours * 60 + minutes + 24 * 60;
    return {
      ...prayerTimes[0],
      remainingTime: prayerTimeInMinutes - currentTime,
    };
  };

  const nextPrayer = getNextPrayer();
  const hoursLeft = Math.floor(nextPrayer.remainingTime / 60);
  const minutesLeft = nextPrayer.remainingTime % 60;

  return (
    <div className="bg-white">
      {/* Hero Section - Modern Carousel */}
      <div className="relative w-full h-screen overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
          </div>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-10'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <span className="px-4 py-1 bg-[#6DB144]/80 text-white text-sm rounded-full mb-4 backdrop-blur-sm">
            Selamat Datang di
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            <span className="text-[#6DB144]">Masjid</span> Baiturrohim
          </h1>
          <p className="max-w-2xl mx-auto text-white/90 text-lg md:text-xl font-medium px-6">
            Menyebarkan kedamaian dan keindahan Islam melalui kegiatan ibadah
            dan sosial dalam kehidupan sehari-hari.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="/kegiatan"
              className="px-6 py-3 bg-[#6DB144] hover:bg-[#1C5827] text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Kegiatan Masjid
            </a>
            <a
              href="/kajian"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-lg transition-all border border-white/30"
            >
              Jadwal Kajian
            </a>
          </div>
        </div>

        {/* Prayer Time Card */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white rounded-2xl shadow-2xl z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 gap-6 items-center">
            <div className="space-y-4 md:space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#1C5827]/10 text-[#1C5827] text-sm font-medium">
                  Selanjutnya
                </span>
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                <ClockIcon className="h-4 w-4 text-[#6DB144]" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#1C5827]">
                {nextPrayer.name}{' '}
                <span className="text-sm text-gray-500">
                  • {nextPrayer.time}
                </span>
              </h2>

              <div className="flex items-center justify-center md:justify-start mt-1">
                <div className="px-4 py-2 rounded-lg bg-[#6DB144]/10 text-[#6DB144] font-medium inline-flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  <span className="text-lg">
                    {hoursLeft.toString().padStart(2, '0')}:
                    {minutesLeft.toString().padStart(2, '0')}
                  </span>
                </div>
                <p className="ml-3 text-gray-500">Waktu tersisa</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {prayerTimes.slice(0, 3).map((prayer, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
                >
                  <p className="text-3xl mb-1">{prayer.icon}</p>
                  <p className="text-sm font-medium text-gray-700">
                    {prayer.name}
                  </p>
                  <p className="text-lg font-bold text-[#1C5827]">
                    {prayer.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center pb-4">
            <a
              href="#jadwal-shalat"
              className="text-[#1C5827] flex items-center hover:underline"
            >
              Lihat semua jadwal <ChevronRightIcon className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Jadwal Shalat (Complete) */}
      <div
        id="jadwal-shalat"
        className="container mx-auto px-4 mt-32 md:mt-40 mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="inline-block relative text-3xl md:text-4xl font-bold text-[#1C5827] mb-4">
            Jadwal Shalat Hari Ini
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-[#6DB144] rounded-full"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Semua waktu shalat untuk tanggal{' '}
            {currentTime.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-6 md:p-8 text-center hover:shadow-lg transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#6DB144]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="inline-block text-4xl mb-2">{prayer.icon}</span>
              <p className="text-lg font-bold text-[#1C5827] mb-1">
                {prayer.name}
              </p>
              <p className="text-2xl font-bold text-[#1C1C1C] group-hover:text-[#6DB144] transition-colors">
                {prayer.time}
              </p>
              <span className="text-xs text-gray-500">WIB</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kegiatan Masjid - Modern Cards */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-[#6DB144] text-sm font-semibold uppercase tracking-wider mb-2">
              PROGRAM UNGGULAN
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C5827] mb-3">
              Kegiatan Masjid
            </h2>
            <div className="h-1 w-24 bg-[#6DB144] rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl">
              Masjid Baiturrohim memiliki berbagai kegiatan yang dapat diikuti
              oleh jamaah dari berbagai kalangan.
            </p>
          </div>

          {/* Kegiatan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentKegiatan.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-[#6DB144] transition-colors group-hover:bg-[#6DB144]"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-[#1C5827] group-hover:text-white" />
                  </a>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarIcon className="w-4 h-4 mr-2 text-[#6DB144]" />
                    {item.date}
                  </div>
                  <h3 className="text-xl font-bold text-[#1C5827] mb-2 group-hover:text-[#6DB144] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    className="inline-flex items-center text-[#6DB144] font-medium hover:text-[#1C5827]"
                  >
                    Selengkapnya <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalKegiatanPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="inline-flex items-center rounded-full bg-white shadow-md p-1">
                <button
                  onClick={() =>
                    paginateKegiatan(
                      currentKegiatanPage > 1 ? currentKegiatanPage - 1 : 1
                    )
                  }
                  disabled={currentKegiatanPage === 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentKegiatanPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition`}
                >
                  &laquo;
                </button>

                {Array.from(
                  { length: totalKegiatanPages },
                  (_, i) => i + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginateKegiatan(number)}
                    className={`w-10 h-10 rounded-full ${
                      currentKegiatanPage === number
                        ? 'bg-[#6DB144] text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() =>
                    paginateKegiatan(
                      currentKegiatanPage < totalKegiatanPages
                        ? currentKegiatanPage + 1
                        : totalKegiatanPages
                    )
                  }
                  disabled={currentKegiatanPage === totalKegiatanPages}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentKegiatanPage === totalKegiatanPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  } transition`}
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Kajian Terbaru */}
      <div className="py-16 container mx-auto px-4 xl:max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <span className="text-[#6DB144] text-sm font-semibold uppercase tracking-wider block mb-2">
              INSPIRASI ISLAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C5827] mb-3 relative inline-block">
              Video Kajian Terbaru
              <div className="absolute -bottom-2 left-0 right-0 h-1 w-full bg-[#6DB144] rounded-full"></div>
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@masjidaljabbar"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-[#1C5827] hover:bg-[#6DB144] text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <span>Lihat Semua Video</span>
            <PlayIcon className="w-5 h-5 ml-2" />
          </a>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {currentVideos.map((video, index) => (
            <a
              href={video.link}
              target="_blank"
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-[#6DB144] rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#6DB144] transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2 text-[#6DB144]" />
                  {video.date}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center rounded-full bg-white shadow-md p-1">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                } transition`}
              >
                &laquo;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-full ${
                      currentPage === number
                        ? 'bg-[#6DB144] text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                } transition`}
              >
                &raquo;
              </button>
            </div>
          </div>
        )}

        {/* Mobile View Button */}
        <div className="md:hidden mt-8 flex justify-center">
          <a
            href="https://www.youtube.com/@masjidaljabbar"
            target="_blank"
            className="inline-flex items-center justify-between w-full px-6 py-3 bg-white border border-[#1C5827] text-[#1C5827] font-medium rounded-lg hover:bg-[#1C5827] hover:text-white transition-colors"
          >
            <span>Lihat Semua Video</span>
            <PlayIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#1C5827] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Jadilah Bagian dari Jamaah Kami
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Bergabunglah dengan berbagai kegiatan dan program yang kami
            selenggarakan untuk meningkatkan keimanan dan ketaqwaan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/kegiatan"
              className="px-6 py-3 bg-white text-[#1C5827] font-medium rounded-lg hover:bg-[#F3E9DC] transition-colors"
            >
              Kegiatan Masjid
            </a>
            <a
              href="/donasi"
              className="px-6 py-3 bg-[#6DB144] text-white font-medium rounded-lg hover:bg-[#5ca23a] transition-colors"
            >
              Donasi Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* Footer - Modernized */}
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
