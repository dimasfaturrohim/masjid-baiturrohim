'use client';
import { useState, useEffect } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  ClockIcon,
  ChevronRightIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import Footer from '../../components/navbar/footer';

export default function Beranda() {
  const [currentKegiatanPage, setCurrentKegiatanPage] = useState(1);
  const kegiatanPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 8;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  // Update waktu saat ini setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Perbarui waktu sholat saat komponen dimuat
  useEffect(() => {
    fetchPrayerTimes();

    // Setup untuk memperbarui jadwal di tengah malam
    const setupMidnightUpdate = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const timeUntilMidnight = midnight - now;

      return setTimeout(() => {
        fetchPrayerTimes();
        // Setup untuk tengah malam berikutnya
        const nextInterval = setupMidnightUpdate();
        return () => clearTimeout(nextInterval);
      }, timeUntilMidnight);
    };

    const midnightTimeout = setupMidnightUpdate();

    return () => clearTimeout(midnightTimeout);
  }, []);

  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [prayerTimes, setPrayerTimes] = useState([
    { name: 'Shalat Shubuh', time: '--:--', icon: '🌅' },
    { name: 'Syuruk/Terbit', time: '--:--', icon: '☀️' },
    { name: 'Shalat Dzuhur', time: '--:--', icon: '🌤️' },
    { name: 'Shalat Ashar', time: '--:--', icon: '🌇' },
    { name: 'Shalat Maghrib', time: '--:--', icon: '🌆' },
    { name: 'Shalat Isya', time: '--:--', icon: '🌙' },
  ]);

  const fetchPrayerTimes = async () => {
    try {
      // Koordinat Lampung (Bandar Lampung)
      const latitude = -5.3971;
      const longitude = 105.2663;

      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const url = `http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=11`; // Method 11 for Indonesia

      const response = await fetch(url);
      const data = await response.json();

      const day = date.getDate() - 1; // API uses 0-based index
      const todayPrayers = data.data[day].timings;

      const prayerTimes = [
        {
          name: 'Shalat Shubuh',
          time: todayPrayers.Fajr.split(' ')[0],
          icon: '🌅',
        },
        {
          name: 'Syuruk/Terbit',
          time: todayPrayers.Sunrise.split(' ')[0],
          icon: '☀️',
        },
        {
          name: 'Shalat Dzuhur',
          time: todayPrayers.Dhuhr.split(' ')[0],
          icon: '🌤️',
        },
        {
          name: 'Shalat Ashar',
          time: todayPrayers.Asr.split(' ')[0],
          icon: '🌇',
        },
        {
          name: 'Shalat Maghrib',
          time: todayPrayers.Maghrib.split(' ')[0],
          icon: '🌆',
        },
        {
          name: 'Shalat Isya',
          time: todayPrayers.Isha.split(' ')[0],
          icon: '🌙',
        },
      ];

      setPrayerTimes(prayerTimes);
      setIsLoading(false);
      return prayerTimes;
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setIsLoading(false);
      return prayerTimes; // Return current state as fallback
    }
  };

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
      if (prayerTimes[i].time === '--:--') continue;

      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerTimeInMinutes = hours * 60 + minutes;

      if (currentTime < prayerTimeInMinutes) {
        return {
          ...prayerTimes[i],
          remainingTime: prayerTimeInMinutes - currentTime,
        };
      }
    }

    // Jika semua waktu sholat sudah lewat, ambil waktu sholat pertama untuk besok
    const [hours, minutes] = prayerTimes[0].time.split(':').map(Number);
    const prayerTimeInMinutes = hours * 60 + minutes + 24 * 60; // Tambahkan 24 jam
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
      <Footer />
    </div>
  );
}
