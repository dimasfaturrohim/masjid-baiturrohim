'use client';
import { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';

export default function Beranda() {
  const prayerTimes = [
    { name: 'Shalat Shubuh', time: '04:36' },
    { name: 'Syuruk/Terbit', time: '05:53' },
    { name: 'Shalat Dzuhur', time: '11:55' },
    { name: 'Shalat Ashar', time: '15:10' },
    { name: 'Shalat Maghrib', time: '17:57' },
    { name: 'Shalat Isya', time: '19:06' },
  ];

  const kegiatan = [
    {
      title: 'Fasilitas Masjid',
      description: 'Berbagai fasilitas yang tersedia di Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: '/fasilitas',
    },
    {
      title: 'Petunjuk Arah',
      description: 'Petunjuk arah menuju Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan2.jpeg',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Masjid+Baiturrohim',
    },
    {
      title: 'Profil Masjid',
      description: 'Informasi lengkap tentang Masjid Baiturrohim.',
      image: '/images/kegiatan/kegiatan3.jpeg',
      link: 'https://drive.google.com/file/d/1JiLpx1eRkr7PPX9Lk2NH3fPzJmtkl39-/view',
    },
    {
      title: 'Pendaftaran Kegiatan',
      description: 'Daftar kegiatan taklim dan pengajian di masjid.',
      image: '/images/kegiatan/kegiatan2.jpeg',
      link: 'https://s.id/permohonan-mraj',
    },
    {
      title: 'Galeri Masjid',
      description: 'Galeri foto dan dokumentasi kegiatan masjid.',
      image: '/images/kegiatan/kegiatan1.jpeg',
      link: 'https://masjidraya-aljabbar.jabarprov.go.id/',
    },
  ];

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

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const getNextPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Waktu saat ini dalam menit

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

    // Jika waktu saat ini melewati semua jadwal, kembali ke jadwal pertama (besok)
    const [hours, minutes] = prayerTimes[0].time.split(':').map(Number);
    const prayerTimeInMinutes = hours * 60 + minutes + 24 * 60; // Tambahkan 24 jam
    return {
      ...prayerTimes[0],
      remainingTime: prayerTimeInMinutes - currentTime,
    };
  };

  const nextPrayer = getNextPrayer();

  // Hitung waktu yang tersisa dalam jam dan menit
  const hoursLeft = Math.floor(nextPrayer.remainingTime / 60);
  const minutesLeft = nextPrayer.remainingTime % 60;

  return (
    <div>
      {/* Hero Section dengan Jadwal Shalat */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/masjid1.jpg" // Ganti dengan salah satu gambar dari carousel
          alt="Masjid Baiturrohim"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 to-transparent"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide">
            Masjid Baiturrohim
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium max-w-2xl">
            Menyebarkan kedamaian dan keindahan Islam melalui kegiatan ibadah
            dan sosial.
          </p>
        </div>

        {/* Jadwal Shalat Selanjutnya */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#6DB144] to-[#1C5827] text-white shadow-lg rounded-t-3xl px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Informasi Waktu Shalat Selanjutnya */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">
                Jadwal Shalat Selanjutnya
              </h1>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
                {nextPrayer.name}
              </h2>
              <p className="text-lg">
                Akan dimulai dalam{' '}
                <span className="font-bold text-2xl text-[#F6A623]">
                  {hoursLeft} jam : {minutesLeft} menit
                </span>
              </p>
            </div>

            {/* Ikon dan Waktu */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm font-medium">Waktu Saat Ini</p>
                <p className="text-lg font-bold">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jadwal Shalat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {prayerTimes.map((prayer, index) => (
          <div
            key={index}
            className="bg-[#F3E9DC] rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-lg font-bold text-[#1C5827] mb-2">
              {prayer.name}
            </p>
            <p className="text-[#1C1C1C] text-xl font-semibold">
              {prayer.time} WIB
            </p>
          </div>
        ))}
      </div>

      {/* Kegiatan Masjid */}
      <div className="py-12">
        <div className="container mx-auto px-1 2xl:px-0 xl:max-w-7xl">
          {/* Header */}
          <div className="flex flex-col mb-7">
            <h1 className="font-medium text-[#1C1C1C] text-[32px] md:text-4xl leading-[38px] md:self-center">
              Kegiatan Masjid
            </h1>
            <div className="border-t-[3px] border-[#6DB144] w-[128px] mt-[26px] mb-[26px] md:self-center"></div>
            <p className="text-sm md:text-base text-[#1C1C1C] leading-[23px] md:leading-[26px] md:self-center md:text-center md:max-w-[600px]">
              Masjid Baiturrohim memiliki berbagai kegiatan yang dapat diikuti
              oleh jamaah dari berbagai kalangan.
            </p>
          </div>

          {/* Kegiatan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {kegiatan.map((item, index) => (
              <div
                key={index}
                className="relative w-full h-[330px] rounded-lg overflow-hidden group mx-auto"
              >
                {/* Background Image */}
                <div
                  className="absolute w-full h-full bg-no-repeat bg-cover rounded-lg group-hover:scale-110 transition-all duration-500"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>

                {/* Overlay and Content */}
                <div className="absolute flex flex-col justify-between p-4 w-full h-full rounded-lg bg-gradient-to-t from-[#1C1C1C]/70 group-hover:from-[#1C1C1C]/90 to-[#1C1C1C]/0 group-hover:to-[#1C1C1C]/40 transition-all duration-500">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-all duration-500 bg-[#FFFFFF]/20 group-hover:bg-[#6DB144] rounded-full w-[38px] h-[38px] flex justify-center items-center self-end"
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white" />
                  </a>
                  <h2 className="text-xl text-white leading-8">{item.title}</h2>
                  <p className="text-sm text-white leading-5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Kajian Terbaru */}
      <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl mb-12">
        {/* Header */}
        <div className="flex flex-col mb-6 md:mb-12">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="font-medium text-[#1C1C1C] text-[32px] md:text-4xl leading-[38px]">
                Video Kajian Terbaru
              </h1>
              <div className="border-t-[3px] border-[#6DB144] max-w-[128px] mt-[26px]"></div>
            </div>
            <button className="px-4 py-[9px] flex items-center rounded-lg border whitespace-nowrap font-bold hidden md:block max-h-[38px] text-[#1C5827] text-sm leading-[18px] border-[#1C5827] hover:bg-[#1C5827] hover:text-white transition">
              <div className="flex justify-center items-center gap-3 w-full">
                <a
                  href="https://www.youtube.com/@masjidaljabbar"
                  target="_blank"
                  className="flex justify-between w-full"
                >
                  <p className="mr-[10px]">Lihat Semua Video</p>
                  <PlayIcon className="w-5 h-5" />
                </a>
              </div>
            </button>
          </div>
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            {
              title: 'Shalat Jumat Masjid Raya Al Jabbar Imam Ahmad',
              thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
              link: 'https://www.youtube.com/watch?v=8Gy1pQQoElA',
              date: '3 hari yang lalu',
            },
            {
              title:
                'Memaknai Halal Bihalal | Khotbah Jumat Dr. Imam Sucipto, M.Ag',
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
          ].map((video, index) => (
            <a href={video.link} target="_blank" key={index}>
              <article className="flex flex-col group hover:cursor-pointer">
                <div className="relative overflow-hidden w-full min-h-[200px] rounded-lg mb-4">
                  <div
                    className="absolute w-full h-full bg-cover bg-no-repeat rounded-lg group-hover:scale-110 transition-all"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  ></div>
                  <div className="absolute w-full h-full bg-[#1C1C1C]/10 flex justify-center items-center">
                    <div className="transition-all bg-[#6DB144] group-hover:bg-[#1C5827] rounded-full w-[50px] h-[50px] flex justify-center items-center">
                      <PlayIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <h2 className="font-medium leading-[26px] text-[#1C1C1C] mb-2 line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-sm leading-[23px] text-[#757575]">
                  {video.date}
                </p>
              </article>
            </a>
          ))}
        </div>

        {/* Button for Mobile */}
        <button className="px-4 py-[9px] flex items-center rounded-lg border whitespace-nowrap font-bold md:hidden max-h-[38px] w-full mt-12 text-[#1C5827] text-sm leading-[18px] border-[#1C5827] hover:bg-[#1C5827] hover:text-white transition">
          <div className="flex justify-center items-center gap-3 w-full">
            <a
              href="https://www.youtube.com/@masjidaljabbar"
              target="_blank"
              className="flex justify-between w-full"
            >
              Lihat Semua Video
              <PlayIcon className="w-5 h-5" />
            </a>
          </div>
        </button>
      </div>

      {/* Footer Section */}
      <footer className="relative flex flex-col bg-[#1C1C1C] text-white pt-12 pb-7">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          {/* Logo and Text */}
          <div className="flex items-center mb-6">
            <a href="/" className="hover:cursor-pointer" aria-current="page">
              <img
                src="/images/Logo Masjid Baiturrohim.png"
                alt="Logo Masjid Baiturrohim"
                width="50"
                height="50"
                className="mr-4"
              />
            </a>
            <span className="text-white text-lg font-semibold">
              Masjid Baiturrohim
            </span>
          </div>

          {/* Footer Content */}
          <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPinIcon className="w-6 h-6 text-[#6DB144]" />
              <div>
                <p className="font-bold text-base leading-6 mb-3">
                  Alamat Lengkap
                </p>
                <a
                  href="https://goo.gl/maps/cnxeTzAyf9a9cuGy9"
                  className="text-gray-400 text-sm leading-6 hover:text-[#6DB144]"
                >
                  Jl. Masjid Baiturrohim No. 14, Kota Bandung, Jawa Barat 40292
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <EnvelopeIcon className="w-6 h-6 text-[#6DB144]" />
              <div>
                <p className="font-bold text-base leading-6 mb-3">Email</p>
                <a
                  href="mailto:info@baiturrohim.id"
                  className="text-gray-400 text-sm leading-6 hover:text-[#6DB144]"
                >
                  info@baiturrohim.id
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-4">
              <PhoneIcon className="w-6 h-6 text-[#6DB144]" />
              <div>
                <p className="font-bold text-base leading-6 mb-3">Kontak DKM</p>
                <a
                  href="https://wa.me/+6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm leading-6 hover:text-[#6DB144]"
                >
                  (+62) 812-3456-7890
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-start gap-4">
              <GlobeAltIcon className="w-6 h-6 text-[#6DB144]" />
              <div>
                <p className="font-bold text-base leading-6 mb-3">
                  Sosial Media
                </p>
                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  <a
                    href="https://www.instagram.com/masjidbaiturrohim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-[#6DB144]"
                  >
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-400 text-sm leading-6 font-medium ml-3">
                      Instagram
                    </p>
                  </a>
                  <a
                    href="https://www.youtube.com/@masjidbaiturrohim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-[#6DB144]"
                  >
                    <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                    <p className="text-gray-400 text-sm leading-6 font-medium ml-3">
                      YouTube
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-500 mt-8 pt-4 border-t border-gray-700">
            <p>Dewan Kemakmuran Masjid Baiturrohim</p>
            <p>Copyright © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
