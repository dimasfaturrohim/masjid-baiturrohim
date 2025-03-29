'use client';
import { useState } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
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
      {/* Carousel */}
      <div className="relative w-screen overflow-hidden shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-screen flex-shrink-0 relative group">
              <img
                src={image.src}
                alt={`Masjid ${index + 1}`}
                className="w-full h-[600px] object-cover"
              />
              {/* Deskripsi muncul saat hover */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation Buttons */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100"
          onClick={handlePrevSlide}
        >
          &#8249;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100"
          onClick={handleNextSlide}
        >
          &#8250;
        </button>
      </div>

      {/* Jadwal Shalat Selanjutnya */}
      <div className="w-full mx-auto px-0">
        {' '}
        {/* Tambahkan mb-12 untuk jarak */}
        <div className="bg-green-500 p-6 text-white text-center mb-8">
          <h1 className="text-xl mb-2">Jadwal Shalat Selanjutnya</h1>
          <h2 className="text-4xl font-bold mb-2">{nextPrayer.name}</h2>
          <p className="text-lg">
            akan dimulai dalam{' '}
            <span className="font-bold text-xl">
              {hoursLeft} jam : {minutesLeft} menit
            </span>{' '}
            lagi
          </p>
        </div>
        {/* Jadwal Shalat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className="bg-green-100 rounded-lg p-4 text-center shadow-md"
            >
              <p className="text-lg font-bold text-green-600 mb-2">
                {prayer.name}
              </p>
              <p className="text-gray-700">{prayer.time} WIB</p>
            </div>
          ))}
        </div>
        {/* Aturan Kunjungan Ke Masjid */}
        <section className="mt-12">
          {/* Header Section */}
          <div className="bg-[#16A75C] text-white py-12 md:py-16 mb-8">
            {' '}
            {/* Tambahkan rounded-2xl */}
            <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
              <h1 className="font-semibold text-3xl md:text-4xl leading-tight mb-4">
                Aturan Kunjungan Ke Masjid Baiturrohim
              </h1>
              <p className="text-lg leading-relaxed">
                Berikut adalah beberapa aturan bagi pengunjung dalam mengunjungi
                Masjid Baiturrohim.
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl flex flex-col md:flex-row gap-8">
            {/* Card 1 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 h-[400px]">
              <div>
                <section className="flex items-center border-b border-gray-200 pb-4">
                  <CheckCircleIcon className="w-7 h-7 text-green-500" />
                  <h2 className="font-semibold text-xl text-gray-800 ml-4">
                    Aktivitas Yang Boleh Dilakukan
                  </h2>
                </section>
                <ul className="flex flex-col gap-4 mt-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    <p className="text-gray-700 ml-4">
                      Memakai pakaian yang bersih, suci, dan menutup aurat (Q.S
                      Al-Araf: 31).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    <p className="text-gray-700 ml-4">
                      Membawa keresek/alat penyimpan alas kaki, kemudian membuka
                      alas kaki ketika masuk masjid.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    <p className="text-gray-700 ml-4">
                      Menjaga kebersihan masjid dan membuang sampah ke
                      tempatnya.
                    </p>
                  </li>
                </ul>
              </div>
              <button className="flex items-center justify-center font-semibold text-green-600 text-sm mt-6 pt-4 border-t border-gray-200 hover:text-green-700">
                <span>Lihat Semua</span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-white p-6 rounded-2xl shadow-2xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 h-[400px]">
              <div>
                <section className="flex items-center border-b border-gray-200 pb-4">
                  <XCircleIcon className="w-7 h-7 text-red-500" />
                  <h2 className="font-semibold text-xl text-gray-800 ml-4">
                    Aktivitas Yang Tidak Boleh Dilakukan
                  </h2>
                </section>
                <ul className="flex flex-col gap-4 mt-4">
                  <li className="flex items-start">
                    <XCircleIcon className="w-6 h-6 text-red-500" />
                    <p className="text-gray-700 ml-4">
                      Tidak melakukan aktivitas jual beli di masjid (HR.
                      Tirmidzi no. 1232).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="w-6 h-6 text-red-500" />
                    <p className="text-gray-700 ml-4">
                      Tidak boleh melakukan selfie atau pemotretan yang
                      mengganggu aktivitas ibadah.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="w-6 h-6 text-red-500" />
                    <p className="text-gray-700 ml-4">
                      Tidak boleh tidur, makan, atau minum di dalam masjid
                      kecuali untuk tujuan i'tikaf.
                    </p>
                  </li>
                </ul>
              </div>
              <button className="flex items-center justify-center font-semibold text-green-600 text-sm mt-6 pt-4 border-t border-gray-200 hover:text-green-700">
                <span>Lihat Semua</span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Kegiatan Masjid */}
      <div className="py-12">
        <div className="container mx-auto px-1 2xl:px-0 xl:max-w-7xl">
          {/* Header */}
          <div className="flex flex-col mb-7">
            <h1 className="font-medium text-[#212121] text-[32px] md:text-4xl leading-[38px] md:self-center">
              Kegiatan Masjid
            </h1>
            <div className="border-t-[3px] border-[#16A75C] w-[128px] mt-[26px] mb-[26px] md:self-center"></div>
            <p className="text-sm md:text-base text-[#616161] leading-[23px] md:leading-[26px] md:self-center md:text-center md:max-w-[600px]">
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
                <div className="absolute flex flex-col justify-between p-4 w-full h-full rounded-lg bg-gradient-to-t from-[#000000]/70 group-hover:from-[#000000]/90 to-[#000000]/0 group-hover:to-[#000000]/40 transition-all duration-500">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer transition-all duration-500 bg-[#FFFFFF]/20 group-hover:bg-[#16A75C] rounded-full w-[38px] h-[38px] flex justify-center items-center self-end"
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
    </div>
  );
}
