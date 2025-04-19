'use client';

import { useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../components/navbar/navbar';

export default function Kegiatan() {
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const kegiatanPerPage = 6;

  // Data kegiatan masjid
  const kegiatan = [
    {
      id: 1,
      title: 'Kajian Akbar Menyambut Ramadhan 1446 H',
      date: '11 Februari 2025',
      author: 'Admin DKM',
      category: 'Kajian',
      image:
        'https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?ixlib=rb-4.0.3',
      excerpt:
        'Kegiatan kajian akbar menyambut bulan suci Ramadhan dengan pembicara Ustadz Dr. Ahmad Zainuddin, Lc., M.A.',
      content:
        'Alhamdulillah telah dilaksanakan kajian akbar dalam rangka menyambut bulan suci Ramadhan 1446 H di Masjid Baiturrohim. Kajian ini dihadiri oleh ratusan jamaah dari berbagai kalangan. Ustadz Dr. Ahmad Zainuddin menyampaikan tausiyah tentang persiapan rohani dan amalan utama di bulan Ramadhan. Acara berlangsung khidmat dan penuh manfaat bagi seluruh jamaah yang hadir.',
    },
    {
      id: 2,
      title: 'Santunan Anak Yatim dan Dhuafa',
      date: '5 Februari 2025',
      author: 'Panitia Sosial',
      category: 'Sosial',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3',
      excerpt:
        'Program santunan rutin untuk 50 anak yatim dan keluarga dhuafa di sekitar lingkungan masjid.',
      content:
        'Masjid Baiturrohim kembali mengadakan program santunan untuk 50 anak yatim dan keluarga dhuafa di sekitar lingkungan masjid. Program ini merupakan kegiatan rutin bulanan yang diselenggarakan oleh Panitia Sosial Masjid. Bantuan yang diberikan berupa paket sembako, perlengkapan sekolah, dan bantuan tunai. Semoga bantuan ini dapat meringankan beban mereka dan menjadi amal jariyah bagi para donatur.',
    },
    {
      id: 3,
      title: 'Pembangunan Perpustakaan Masjid',
      date: '20 Januari 2025',
      author: 'Tim Pembangunan',
      category: 'Pengembangan',
      image:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3',
      excerpt:
        'Peresmian perpustakaan masjid yang dilengkapi dengan berbagai koleksi buku Islam dan ruang baca yang nyaman.',
      content:
        'Alhamdulillah, perpustakaan Masjid Baiturrohim telah diresmikan pada Minggu, 20 Januari 2025. Perpustakaan ini dilengkapi dengan berbagai koleksi buku Islam, Al-Quran terjemah, tafsir, hadits, fikih, sejarah Islam, dan buku-buku keislaman lainnya. Selain itu, perpustakaan juga dilengkapi dengan ruang baca yang nyaman dan area diskusi. Fasilitas ini diharapkan dapat meningkatkan minat baca jamaah dan menjadi pusat ilmu pengetahuan Islam di lingkungan sekitar.',
    },
    {
      id: 4,
      title: 'Program Tahfidz Quran untuk Anak-anak',
      date: '15 Januari 2025',
      author: 'Divisi Pendidikan',
      category: 'Pendidikan',
      image:
        'https://images.unsplash.com/photo-1609599006353-a08a96c4c4ae?ixlib=rb-4.0.3',
      excerpt:
        'Program hafalan Al-Quran untuk anak-anak usia 7-15 tahun dengan metode menyenangkan dan efektif.',
      content:
        'Masjid Baiturrohim membuka pendaftaran Program Tahfidz Quran untuk anak-anak usia 7-15 tahun. Program ini menggunakan metode menghafal yang menyenangkan dan efektif dengan bimbingan para hafidz yang berpengalaman. Kegiatan akan dilaksanakan setiap hari Senin, Rabu, dan Jumat setelah shalat Ashar. Pendaftaran dapat dilakukan melalui sekretariat masjid atau secara online melalui website resmi Masjid Baiturrohim.',
    },
    {
      id: 5,
      title: 'Festival Kuliner Halal',
      date: '5 Januari 2025',
      author: 'Panitia Festival',
      category: 'Kegiatan',
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3',
      excerpt:
        'Festival kuliner halal yang menampilkan berbagai kuliner khas Nusantara dengan sertifikasi halal.',
      content:
        'Festival Kuliner Halal Masjid Baiturrohim telah sukses diselenggarakan pada Minggu, 5 Januari 2025. Festival ini menampilkan berbagai kuliner khas Nusantara dengan sertifikasi halal. Sebanyak 30 stand kuliner berpartisipasi dalam festival ini, menawarkan beragam hidangan lezat mulai dari masakan tradisional hingga fusion modern. Acara ini juga dimeriahkan dengan lomba memasak dan workshop kuliner halal. Pengunjung yang hadir tidak hanya dari kalangan jamaah masjid tetapi juga masyarakat umum.',
    },
    {
      id: 6,
      title: 'Pelatihan Manajemen Masjid',
      date: '28 Desember 2024',
      author: 'Tim DKM',
      category: 'Pelatihan',
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3',
      excerpt:
        'Pelatihan untuk pengurus masjid tentang manajemen masjid modern dan profesional.',
      content:
        'Masjid Baiturrohim mengadakan Pelatihan Manajemen Masjid untuk para pengurus masjid di wilayah Bandung. Pelatihan ini bertujuan untuk meningkatkan kapasitas pengurus dalam mengelola masjid secara modern dan profesional. Materi yang disampaikan meliputi perencanaan program masjid, manajemen keuangan, pengembangan SDM, dan pemanfaatan teknologi untuk masjid. Pelatihan diikuti oleh 50 pengurus masjid dari berbagai daerah.',
    },
    {
      id: 7,
      title: 'Pembagian Hewan Kurban Idul Adha',
      date: '15 Desember 2024',
      author: 'Panitia Kurban',
      category: 'Sosial',
      image:
        'https://images.unsplash.com/photo-1604856967366-163de2d8842a?ixlib=rb-4.0.3',
      excerpt:
        'Penyembelihan dan pembagian hewan kurban kepada masyarakat kurang mampu di sekitar masjid.',
      content:
        'Pada Idul Adha 1445 H, Masjid Baiturrohim melaksanakan penyembelihan hewan kurban sebanyak 10 ekor sapi dan 25 ekor kambing. Daging kurban dibagikan kepada masyarakat kurang mampu di sekitar masjid dan beberapa daerah terpencil. Alhamdulillah, kegiatan berlangsung lancar dan daging kurban dapat didistribusikan dengan baik kepada mereka yang berhak menerimanya.',
    },
    {
      id: 8,
      title: 'Seminar Kesehatan Islami',
      date: '5 Desember 2024',
      author: 'Tim Kesehatan',
      category: 'Pendidikan',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3',
      excerpt:
        'Seminar tentang kesehatan dalam perspektif Islam dengan pembicara dokter muslim terkemuka.',
      content:
        'Masjid Baiturrohim menyelenggarakan Seminar Kesehatan Islami dengan tema "Hidup Sehat Cara Rasulullah SAW". Seminar ini menghadirkan pembicara dokter muslim terkemuka, Dr. Hasan Basri, Sp.PD dan Ustadz Dr. Khalid Basalamah, MA. Materi yang disampaikan meliputi pola hidup sehat sesuai sunnah, pengobatan ala Nabi (thibbun nabawi), dan berbagai tips kesehatan dalam perspektif Islam. Seminar dihadiri oleh ratusan peserta dan mendapat sambutan yang sangat positif.',
    },
    {
      id: 9,
      title: 'Lomba Tahfidz dan Tilawah Al-Quran',
      date: '20 November 2024',
      author: 'Divisi Pendidikan',
      category: 'Lomba',
      image:
        'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3',
      excerpt:
        'Kompetisi hafalan dan bacaan Al-Quran untuk berbagai kategori usia tingkat kota Bandung.',
      content:
        'Masjid Baiturrohim sukses menyelenggarakan Lomba Tahfidz dan Tilawah Al-Quran tingkat kota Bandung. Lomba ini diikuti oleh 200 peserta dari berbagai kategori usia, mulai dari anak-anak hingga dewasa. Dewan juri terdiri dari para qari dan hafidz terkemuka. Para pemenang mendapatkan hadiah berupa piala, sertifikat, dan uang pembinaan. Kegiatan ini bertujuan untuk meningkatkan kecintaan masyarakat terhadap Al-Quran dan membina bibit-bibit unggul qari dan hafidz di kota Bandung.',
    },
  ];

  // Hitung total halaman
  const totalPages = Math.ceil(kegiatan.length / kegiatanPerPage);

  // Hitung kegiatan yang ditampilkan pada halaman saat ini
  const indexOfLastKegiatan = currentPage * kegiatanPerPage;
  const indexOfFirstKegiatan = indexOfLastKegiatan - kegiatanPerPage;
  const currentKegiatan = kegiatan.slice(
    indexOfFirstKegiatan,
    indexOfLastKegiatan
  );

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Kategori untuk filter (untuk pengembangan lebih lanjut)
  const categories = [
    'Semua',
    'Kajian',
    'Sosial',
    'Pendidikan',
    'Kegiatan',
    'Lomba',
    'Pengembangan',
  ];

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: '75vh' }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?ixlib=rb-4.0.3')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-bold text-5xl">
                  Kegiatan Masjid Baiturrohim
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Berbagai kegiatan islami, sosial, dan pendidikan yang
                  diselenggarakan untuk jamaah dan masyarakat sekitar.
                </p>
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
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Featured Post - first kegiatan */}
          <div className="flex flex-wrap items-center mb-16">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-[#6DB144]">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl mb-2 font-bold leading-normal">
                {kegiatan[0].title}
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
                {kegiatan[0].content}
              </p>
              <div className="flex items-center mt-6">
                <UserIcon className="w-5 h-5 text-[#1C5827] mr-2" />
                <span className="text-sm text-gray-600 mr-4">
                  {kegiatan[0].author}
                </span>
                <CalendarIcon className="w-5 h-5 text-[#1C5827] mr-2" />
                <span className="text-sm text-gray-600">
                  {kegiatan[0].date}
                </span>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                <img
                  alt="Featured Post"
                  src={kegiatan[0].image}
                  className="w-full align-middle rounded-t-lg h-64 object-cover"
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-xl font-bold text-gray-800">
                    {kegiatan[0].category}
                  </h4>
                  <p className="text-md font-light mt-2 text-gray-600">
                    {kegiatan[0].excerpt}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Category Filters - for future development */}
          <div className="flex flex-wrap justify-center mb-12">
            <div className="flex overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 mx-1 rounded-full text-sm font-medium ${
                    index === 0
                      ? 'bg-[#1C5827] text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Kegiatan Grid */}
          <div className="flex flex-wrap">
            {currentKegiatan.slice(1).map((item) => (
              <div
                key={item.id}
                className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8"
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      alt={item.title}
                      className="w-full rounded-t-lg h-48 object-cover"
                      src={item.image}
                    />
                    <div className="absolute top-0 right-0 m-2">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#6DB144] text-white rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2 text-gray-800 hover:text-[#1C5827] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 text-[#1C5827] mr-1" />
                        <span className="text-xs text-gray-500">
                          {item.date}
                        </span>
                      </div>
                      <button className="px-3 py-1 text-xs rounded text-[#1C5827] border border-[#1C5827] hover:bg-[#1C5827] hover:text-white transition-colors">
                        Selengkapnya
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 mb-16">
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
                  } transition`}
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
                        } transition`}
                      >
                        {number}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    paginate(
                      currentPage < totalPages ? currentPage + 1 : totalPages
                    )
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md flex items-center ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#1C5827] text-white hover:bg-[#6DB144]'
                  } transition`}
                >
                  <span>Selanjutnya</span>
                  <ChevronRightIcon className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative block py-24 bg-[#1C5827]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold text-white text-center">
                    Ingin berpartisipasi dalam kegiatan Masjid Baiturrohim?
                  </h4>
                  <p className="leading-relaxed mt-1 mb-4 text-white text-center">
                    Silakan hubungi kami untuk informasi lebih lanjut atau
                    ajukan proposal kegiatan Anda.
                  </p>
                  <div className="text-center mt-6">
                    <button
                      className="bg-white text-[#1C5827] active:bg-gray-100 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Hubungi Kami
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
