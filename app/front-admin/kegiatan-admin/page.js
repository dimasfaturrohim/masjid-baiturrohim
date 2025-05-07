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
} from '@heroicons/react/24/outline';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';
import { useRouter } from 'next/navigation';

export default function KegiatanAdmin() {
  const router = useRouter();

  useEffect(() => {
    // Cek auth saat komponen dimount
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);
  // Sample data for activities
  const [kegiatan, setKegiatan] = useState([
    {
      id: 1,
      nama: 'Pengajian Rutin Mingguan',
      tanggal: '2025-05-05',
      waktu: '19:30',
      lokasi: 'Masjid Baiturrohim Lt. 1',
      deskripsi: 'Pengajian rutin mingguan dengan tema Fiqih Kontemporer',
      penanggungjawab: 'Ust. Ahmad',
    },
    {
      id: 2,
      nama: 'Buka Puasa Bersama',
      tanggal: '2025-05-12',
      waktu: '17:45',
      lokasi: 'Halaman Masjid',
      deskripsi: 'Buka puasa bersama anak yatim dan duafa sekitar masjid',
      penanggungjawab: 'H. Budi Santoso',
    },
    {
      id: 3,
      nama: 'Tabligh Akbar',
      tanggal: '2025-05-20',
      waktu: '09:00',
      lokasi: 'Masjid Baiturrohim',
      deskripsi: "Tabligh akbar dengan tema Membangun Generasi Qur'ani",
      penanggungjawab: 'Panitia Ramadhan',
    },
  ]);

  // State for modal and form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentKegiatan, setCurrentKegiatan] = useState({
    id: null,
    nama: '',
    tanggal: '',
    waktu: '',
    lokasi: '',
    deskripsi: '',
    penanggungjawab: '',
  });

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentKegiatan({
      ...currentKegiatan,
      [name]: value,
    });
  };

  // Open modal for adding new activity
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentKegiatan({
      id: null,
      nama: '',
      tanggal: '',
      waktu: '',
      lokasi: '',
      deskripsi: '',
      penanggungjawab: '',
    });
    setShowModal(true);
  };

  // Submit form handler (add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Update existing activity
      setKegiatan(
        kegiatan.map((item) =>
          item.id === currentKegiatan.id ? currentKegiatan : item
        )
      );
    } else {
      // Add new activity with a generated ID
      const newId =
        kegiatan.length > 0
          ? Math.max(...kegiatan.map((item) => item.id)) + 1
          : 1;
      setKegiatan([...kegiatan, { ...currentKegiatan, id: newId }]);
    }

    // Close modal
    setShowModal(false);
  };

  // Delete activity handler
  const handleDelete = () => {
    setKegiatan(kegiatan.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 overflow-x-auto">
          {/* Page Header - wrapped in a min-width container */}
          <div className="flex justify-between items-center mb-6 min-w-max">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Manajemen Kegiatan
              </h1>
              <p className="text-gray-500 mt-1">
                Kelola semua kegiatan Masjid Baiturrohim
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Tambah Kegiatan
            </button>
          </div>

          {/* Main Card with overflow handling */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden min-w-[40rem]">
            {/* Card Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Daftar Kegiatan</h2>
            </div>

            {/* Table with improved overflow handling */}
            {kegiatan.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Kegiatan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal & Waktu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lokasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penanggung Jawab
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {kegiatan.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {item.nama}
                          </div>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.deskripsi}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-900 mb-1">
                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {new Date(item.tanggal).toLocaleDateString(
                              'id-ID',
                              { day: 'numeric', month: 'long', year: 'numeric' }
                            )}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {item.waktu}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{item.lokasi}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{item.penanggungjawab}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setCurrentKegiatan(item);
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
                <p>Belum ada data kegiatan yang tersedia.</p>
                <button
                  onClick={openAddModal}
                  className="mt-3 text-green-600 hover:text-green-800"
                >
                  Tambah Kegiatan Pertama
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Kegiatan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
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
                    Nama Kegiatan
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={currentKegiatan.nama}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={currentKegiatan.tanggal}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu
                  </label>
                  <input
                    type="time"
                    name="waktu"
                    value={currentKegiatan.waktu}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    name="lokasi"
                    value={currentKegiatan.lokasi}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Kegiatan
                  </label>
                  <textarea
                    name="deskripsi"
                    value={currentKegiatan.deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Penanggung Jawab
                  </label>
                  <input
                    type="text"
                    name="penanggungjawab"
                    value={currentKegiatan.penanggungjawab}
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
                  {isEdit ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Konfirmasi Hapus
              </h3>
              <p className="text-gray-600">
                Apakah Anda yakin ingin menghapus kegiatan ini? Tindakan ini
                tidak dapat dibatalkan.
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
