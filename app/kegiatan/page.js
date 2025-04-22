'use client';

import { useState } from 'react';
import {
  CalendarIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/navbar/footer';

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
      <Footer />
    </div>
  );
}
