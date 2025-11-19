'use client';

import { useState, useEffect } from 'react';
import {
  CalendarIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';

export default function Kegiatan() {
  // State untuk pagination dan selected content
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kegiatan, setKegiatan] = useState([]);
  const kegiatanPerPage = 6;

  // Fetch kegiatan data
  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/kegiatan');

        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }

        const data = await response.json();
        setKegiatan(data);
      } catch (err) {
        console.error('Error fetching kegiatan:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKegiatan();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Handle view detail click
  const handleViewDetail = (item) => {
    setSelectedKegiatan(item);
    // Scroll to top of main content
    window.scrollTo({
      top: document.getElementById('main-content').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  // Handle back to default view
  const handleBackToDefault = () => {
    setSelectedKegiatan(null);
  };

  // Hitung total halaman
  const totalPages = Math.ceil((kegiatan.length - 1) / kegiatanPerPage);

  // Hitung kegiatan yang ditampilkan pada halaman saat ini
  const indexOfLastKegiatan = currentPage * kegiatanPerPage;
  const indexOfFirstKegiatan = indexOfLastKegiatan - kegiatanPerPage;
  // Skip the first kegiatan for pagination since it's displayed separately
  const currentKegiatan = kegiatan
    .slice(1)
    .slice(indexOfFirstKegiatan, indexOfLastKegiatan);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Loading state
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#6DB144] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data kegiatan...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center pt-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#6DB144] text-white px-6 py-2 rounded-lg hover:bg-[#5ca23a] transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (kegiatan.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="pt-16">
          <div className="text-center py-20">
            <CalendarIcon className="h-16 w-16 mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              Tidak ada kegiatan
            </h2>
            <p className="mt-2 text-gray-500">
              Belum ada kegiatan yang tercatat saat ini
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            backgroundImage: "url('/images/kegiatan/masjid1.jpg')",
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
      <section id="main-content" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Featured Post - Selected kegiatan or first kegiatan */}
          <div className="flex flex-wrap items-center mb-16">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              {selectedKegiatan && (
                <button
                  onClick={handleBackToDefault}
                  className="flex items-center text-[#1C5827] mb-6 hover:text-[#6DB144] transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  <span>Kembali ke tampilan utama</span>
                </button>
              )}

              <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-[#6DB144]">
                <CalendarIcon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl mb-2 font-bold leading-normal">
                {selectedKegiatan ? selectedKegiatan.nama : kegiatan[0]?.nama}
              </h3>

              <div className="mt-4 mb-4">
                {/* Display metadata for selected kegiatan */}
                {selectedKegiatan && (
                  <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 text-[#1C5827] mr-2" />
                      <span className="text-sm text-gray-600">
                        {selectedKegiatan.waktu}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 text-[#1C5827] mr-2" />
                      <span className="text-sm text-gray-600">
                        {selectedKegiatan.lokasi}
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-lg font-light leading-relaxed text-gray-700">
                  {selectedKegiatan
                    ? selectedKegiatan.content || selectedKegiatan.deskripsi
                    : kegiatan[0]?.deskripsi}
                </p>
              </div>

              <div className="flex items-center mt-6">
                <UserIcon className="w-5 h-5 text-[#1C5827] mr-2" />
                <span className="text-sm text-gray-600 mr-4">
                  {selectedKegiatan
                    ? selectedKegiatan.penanggungjawab
                    : kegiatan[0]?.penanggungjawab}
                </span>
                <CalendarIcon className="w-5 h-5 text-[#1C5827] mr-2" />
                <span className="text-sm text-gray-600">
                  {selectedKegiatan
                    ? formatDate(selectedKegiatan.tanggal)
                    : kegiatan[0]
                    ? formatDate(kegiatan[0].tanggal)
                    : ''}
                </span>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                <img
                  alt={
                    selectedKegiatan ? selectedKegiatan.nama : kegiatan[0]?.nama
                  }
                  src={
                    selectedKegiatan
                      ? selectedKegiatan.imageUrl
                      : kegiatan[0]?.imageUrl
                  }
                  className="w-full align-middle rounded-t-lg h-64 object-cover"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/600x400?text=No+Image';
                  }}
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-xl font-bold text-gray-800">
                    {selectedKegiatan
                      ? 'Detail Kegiatan'
                      : 'Informasi Kegiatan'}
                  </h4>
                  <p className="text-md font-light mt-2 text-gray-600">
                    {selectedKegiatan
                      ? selectedKegiatan.deskripsi ||
                        'Tidak ada deskripsi tersedia.'
                      : kegiatan[0]?.deskripsi ||
                        'Tidak ada deskripsi tersedia.'}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Kegiatan Grid - Hide if something is selected */}
          {!selectedKegiatan && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Kegiatan Lainnya
              </h3>
              <div className="flex flex-wrap">
                {currentKegiatan.map((item) => (
                  <div
                    key={item.id}
                    className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8"
                  >
                    <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow h-full">
                      <div className="relative">
                        <img
                          alt={item.nama}
                          className="w-full rounded-t-lg h-48 object-cover"
                          src={item.imageUrl}
                          onError={(e) => {
                            e.target.src =
                              'https://via.placeholder.com/600x400?text=No+Image';
                          }}
                        />
                        <div className="absolute top-0 right-0 m-2">
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#6DB144] text-white rounded-full">
                            Kegiatan
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-xl font-bold mb-2 text-gray-800 hover:text-[#1C5827] transition-colors">
                          {item.nama}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                          {item.deskripsi || 'Tidak ada deskripsi tersedia.'}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 text-[#1C5827] mr-1" />
                            <span className="text-xs text-gray-500">
                              {formatDate(item.tanggal)}
                            </span>
                          </div>
                          <button
                            onClick={() => handleViewDetail(item)}
                            className="px-3 py-1 text-xs rounded text-[#1C5827] border border-[#1C5827] hover:bg-[#1C5827] hover:text-white transition-colors"
                          >
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
                      } transition`}
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
                    <a
                      href="https://wa.me/+6282377321000"
                      className="bg-white text-[#1C5827] active:bg-gray-100 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Hubungi Kami
                    </a>
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
