'use client';
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';

export default function PengurusAdmin() {
  // Data pengurus dalam Bahasa Indonesia
  const [pengurus, setPengurus] = useState([
    {
      id: 1,
      nama: 'KH. Ahmad Fauzi',
      jabatan: 'Ketua DKM',
      foto: 'https://randomuser.me/api/portraits/men/32.jpg',
      deskripsi: 'Ketua DKM Masjid Baiturrohim periode 2023-2026',
      telepon: '08123456789',
      email: 'ahmad.fauzi@example.com',
    },
    {
      id: 2,
      nama: 'H. Budi Santoso',
      jabatan: 'Wakil Ketua',
      foto: 'https://randomuser.me/api/portraits/men/41.jpg',
      deskripsi: 'Wakil Ketua DKM Masjid Baiturrohim periode 2023-2026',
      telepon: '08123456788',
      email: 'budi.santoso@example.com',
    },
    {
      id: 3,
      nama: 'Drs. Hasan Mahmud',
      jabatan: 'Sekretaris',
      foto: 'https://randomuser.me/api/portraits/men/55.jpg',
      deskripsi: 'Sekretaris DKM Masjid Baiturrohim periode 2023-2026',
      telepon: '08123456787',
      email: 'hasan.mahmud@example.com',
    },
    {
      id: 4,
      nama: 'H. Slamet Riyadi',
      jabatan: 'Bendahara',
      foto: 'https://randomuser.me/api/portraits/men/61.jpg',
      deskripsi: 'Bendahara DKM Masjid Baiturrohim periode 2023-2026',
      telepon: '08123456786',
      email: 'slamet.riyadi@example.com',
    },
    {
      id: 5,
      nama: 'Ustadz Abdul Rahman',
      jabatan: 'Imam Besar',
      foto: 'https://randomuser.me/api/portraits/men/72.jpg',
      deskripsi: 'Imam Besar Masjid Baiturrohim',
      telepon: '08123456785',
      email: 'abdul.rahman@example.com',
    },
    {
      id: 6,
      nama: 'Ustadz Farhan Zakaria',
      jabatan: 'Koordinator Dakwah',
      foto: 'https://randomuser.me/api/portraits/men/83.jpg',
      deskripsi: 'Koordinator bidang dakwah dan kajian',
      telepon: '08123456784',
      email: 'farhan.zakaria@example.com',
    },
  ]);

  // State untuk modal dan form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPengurus, setCurrentPengurus] = useState({
    id: null,
    nama: '',
    jabatan: '',
    foto: '',
    deskripsi: '',
    telepon: '',
    email: '',
  });

  // Modal konfirmasi hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPengurus({
      ...currentPengurus,
      [name]: value,
    });
  };

  // Buka modal untuk tambah pengurus baru
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentPengurus({
      id: null,
      nama: '',
      jabatan: '',
      foto: '',
      deskripsi: '',
      telepon: '',
      email: '',
    });
    setShowModal(true);
  };

  // Handler submit form (tambah/edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Update pengurus yang sudah ada
      setPengurus(
        pengurus.map((item) =>
          item.id === currentPengurus.id ? currentPengurus : item
        )
      );
    } else {
      // Tambah pengurus baru dengan ID yang digenerate
      const newId =
        pengurus.length > 0
          ? Math.max(...pengurus.map((item) => item.id)) + 1
          : 1;
      setPengurus([...pengurus, { ...currentPengurus, id: newId }]);
    }

    // Tutup modal
    setShowModal(false);
  };

  // Handler hapus pengurus
  const handleDelete = () => {
    setPengurus(pengurus.filter((item) => item.id !== deleteId));
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
                Manajemen Pengurus
              </h1>
              <p className="text-gray-500 mt-1">
                Kelola data pengurus Masjid Baiturrohim
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Tambah Pengurus
            </button>
          </div>

          {/* Card utama dengan handling overflow */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden min-w-[40rem]">
            {/* Header card */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Daftar Pengurus</h2>
            </div>

            {/* Tabel dengan handling overflow yang diperbaiki */}
            {pengurus.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pengurus
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jabatan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kontak
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pengurus.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.foto}
                              alt={item.nama}
                              className="w-12 h-12 rounded-full object-cover border border-gray-200"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.nama}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {item.deskripsi}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.jabatan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <PhoneIcon className="h-4 w-4 mr-1" />
                              {item.telepon}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <EnvelopeIcon className="h-4 w-4 mr-1" />
                              {item.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setCurrentPengurus(item);
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
                <p>Belum ada data pengurus yang tersedia.</p>
                <button
                  onClick={openAddModal}
                  className="mt-3 text-green-600 hover:text-green-800"
                >
                  Tambah Pengurus Pertama
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Tambah/Edit Pengurus */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEdit ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}
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
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={currentPengurus.nama}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    name="jabatan"
                    value={currentPengurus.jabatan}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Foto
                  </label>
                  <input
                    type="url"
                    name="foto"
                    value={currentPengurus.foto}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    placeholder="https://example.com/foto.jpg"
                  />
                  {currentPengurus.foto && (
                    <div className="mt-2">
                      <img
                        src={currentPengurus.foto}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-full border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    value={currentPengurus.deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="telepon"
                    value={currentPengurus.telepon}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="08123456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={currentPengurus.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="nama@example.com"
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
                  {isEdit ? 'Simpan Perubahan' : 'Tambah Pengurus'}
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
                Apakah Anda yakin ingin menghapus data pengurus ini? Tindakan
                ini tidak dapat dibatalkan.
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
