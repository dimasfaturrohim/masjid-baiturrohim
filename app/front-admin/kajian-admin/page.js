'use client';
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  LinkIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';

export default function KajianAdmin() {
  // Data kajian dalam Bahasa Indonesia
  const [kajian, setKajian] = useState([
    {
      id: 1,
      judul: 'Kajian Subuh: Pentingnya Keikhlasan',
      deskripsi:
        'Ustadz Ahmad memberikan kajian tentang keikhlasan dalam ibadah.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'subuh',
      tanggal: '12 April 2025',
      durasi: '32:15',
      penceramah: 'Ustadz Ahmad',
    },
    {
      id: 2,
      judul: 'Kajian Dzuhur: Menjaga Lisan',
      deskripsi:
        'Kajian tentang pentingnya menjaga lisan dalam kehidupan sehari-hari.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'dzuhur',
      tanggal: '10 April 2025',
      durasi: '28:45',
      penceramah: 'Ustadz Budi',
    },
    {
      id: 3,
      judul: 'Kajian Magrib: Memaafkan dan Melupakan',
      deskripsi:
        'Kajian tentang pentingnya memaafkan dan melupakan kesalahan orang lain.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'magrib',
      tanggal: '8 April 2025',
      durasi: '35:20',
      penceramah: 'Ustadz Hasan',
    },
    {
      id: 4,
      judul: 'Kajian Subuh: Berkah Shalat Subuh',
      deskripsi: 'Kajian tentang berkah dan keutamaan shalat subuh berjamaah.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'subuh',
      tanggal: '5 April 2025',
      durasi: '30:18',
      penceramah: 'Ustadz Ahmad',
    },
    {
      id: 5,
      judul: 'Kajian Isya: Makna Sabar dalam Islam',
      deskripsi: 'Ustadz Farhan membahas makna sabar dalam perspektif Islam.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'isya',
      tanggal: '2 April 2025',
      durasi: '40:05',
      penceramah: 'Ustadz Farhan',
    },
    {
      id: 6,
      judul: 'Kajian Dzuhur: Keutamaan Sedekah',
      deskripsi:
        'Pembahasan tentang keutamaan sedekah dan balasannya di dunia dan akhirat.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'dzuhur',
      tanggal: '1 April 2025',
      durasi: '25:35',
      penceramah: 'Ustadz Budi',
    },
    {
      id: 7,
      judul: 'Kajian Khusus: Persiapan Ramadhan',
      deskripsi:
        'Kajian khusus tentang persiapan spiritual dan fisik menyambut bulan Ramadhan.',
      thumbnail: 'https://i.ytimg.com/vi/8Gy1pQQoElA/sddefault.jpg',
      tautan: 'https://www.youtube.com/@masjidaljabbar',
      kategori: 'khusus',
      tanggal: '25 Maret 2025',
      durasi: '50:12',
      penceramah: 'Ustadz Ahmad',
    },
  ]);

  // State untuk modal dan form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentKajian, setCurrentKajian] = useState({
    id: null,
    judul: '',
    deskripsi: '',
    thumbnail: '',
    tautan: '',
    kategori: '',
    tanggal: '',
    durasi: '',
    penceramah: '',
  });

  // Modal konfirmasi hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentKajian({
      ...currentKajian,
      [name]: value,
    });
  };

  // Buka modal untuk tambah kajian baru
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentKajian({
      id: null,
      judul: '',
      deskripsi: '',
      thumbnail: '',
      tautan: '',
      kategori: '',
      tanggal: '',
      durasi: '',
      penceramah: '',
    });
    setShowModal(true);
  };

  // Handler submit form (tambah/edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Update kajian yang sudah ada
      setKajian(
        kajian.map((item) =>
          item.id === currentKajian.id ? currentKajian : item
        )
      );
    } else {
      // Tambah kajian baru dengan ID yang digenerate
      const newId =
        kajian.length > 0 ? Math.max(...kajian.map((item) => item.id)) + 1 : 1;
      setKajian([...kajian, { ...currentKajian, id: newId }]);
    }

    // Tutup modal
    setShowModal(false);
  };

  // Handler hapus kajian
  const handleDelete = () => {
    setKajian(kajian.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 overflow-x-auto">
          {/* Header halaman */}
          <div className="flex justify-between items-center mb-6 min-w-max">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Manajemen Kajian
              </h1>
              <p className="text-gray-500 mt-1">
                Kelola semua kajian Masjid Baiturrohim
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Tambah Kajian
            </button>
          </div>

          {/* Card utama dengan handling overflow */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden min-w-[40rem]">
            {/* Header card */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Daftar Kajian</h2>
            </div>

            {/* Tabel dengan handling overflow yang diperbaiki */}
            {kajian.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kajian
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal & Durasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penceramah
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kajian.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            <img
                              src={item.thumbnail}
                              alt={item.judul}
                              className="w-20 h-14 object-cover rounded-md"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.judul}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {item.deskripsi}
                              </div>
                              <a
                                href={item.tautan}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center mt-1"
                              >
                                <LinkIcon className="h-3.5 w-3.5 mr-1" />
                                Tonton Video
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-900 mb-1">
                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {item.tanggal}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {item.durasi}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                            {item.kategori}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{item.penceramah}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setCurrentKajian(item);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteId(item.id);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                <p>Belum ada data kajian yang tersedia.</p>
                <button
                  onClick={openAddModal}
                  className="mt-3 text-green-600 hover:text-green-800"
                >
                  Tambah Kajian Pertama
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Tambah/Edit Kajian */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEdit ? 'Edit Kajian' : 'Tambah Kajian Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Kajian
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={currentKajian.judul}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    value={currentKajian.deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Thumbnail
                  </label>
                  <input
                    type="url"
                    name="thumbnail"
                    value={currentKajian.thumbnail}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tautan Video
                  </label>
                  <input
                    type="url"
                    name="tautan"
                    value={currentKajian.tautan}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={currentKajian.kategori}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="subuh">Kajian Subuh</option>
                    <option value="dzuhur">Kajian Dzuhur</option>
                    <option value="ashar">Kajian Ashar</option>
                    <option value="magrib">Kajian Magrib</option>
                    <option value="isya">Kajian Isya</option>
                    <option value="khusus">Kajian Khusus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="text"
                    name="tanggal"
                    placeholder="Contoh: 12 April 2025"
                    value={currentKajian.tanggal}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durasi
                  </label>
                  <input
                    type="text"
                    name="durasi"
                    placeholder="Contoh: 32:15"
                    value={currentKajian.durasi}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Penceramah
                  </label>
                  <input
                    type="text"
                    name="penceramah"
                    value={currentKajian.penceramah}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
                >
                  {isEdit ? 'Simpan Perubahan' : 'Tambah Kajian'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Konfirmasi Hapus
              </h3>
              <p className="text-gray-600">
                Apakah Anda yakin ingin menghapus kajian ini? Tindakan ini tidak
                dapat dibatalkan.
              </p>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
