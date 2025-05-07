'use client';
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  CalendarIcon,
  CreditCardIcon,
  UserIcon,
  CheckCircleIcon,
  BanknotesIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';
import { useRouter } from 'next/navigation';
export default function DonasiAdmin() {
  const router = useRouter();

  useEffect(() => {
    // Cek auth saat komponen dimount
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);
  // Data donasi dalam Bahasa Indonesia
  const [donasi, setDonasi] = useState([
    {
      id: 1,
      nama: 'Ahmad Fadli',
      jumlah: 500000,
      tanggal: '2025-05-01',
      keterangan: 'Donasi untuk pembangunan masjid',
      status: 'Terverifikasi',
    },
    {
      id: 2,
      nama: 'Budi Santoso',
      jumlah: 1000000,
      tanggal: '2025-04-28',
      keterangan: 'Donasi rutin bulanan',
      status: 'Terverifikasi',
    },
    {
      id: 3,
      nama: 'Siti Rahma',
      jumlah: 250000,
      tanggal: '2025-04-25',
      keterangan: 'Donasi untuk kegiatan ramadhan',
      status: 'Terverifikasi',
    },
    {
      id: 4,
      nama: 'Hasan Mahmud',
      jumlah: 750000,
      tanggal: '2025-04-20',
      keterangan: 'Donasi untuk operasional masjid',
      status: 'Terverifikasi',
    },
    {
      id: 5,
      nama: 'Dewi Putriani',
      jumlah: 350000,
      tanggal: '2025-04-15',
      keterangan: 'Donasi untuk kegiatan anak-anak',
      status: 'Menunggu',
    },
    {
      id: 6,
      nama: 'Farhan Adityatama',
      jumlah: 2500000,
      tanggal: '2025-04-10',
      keterangan: 'Donasi untuk pembangunan perpustakaan',
      status: 'Terverifikasi',
    },
  ]);

  // State untuk modal dan form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDonasi, setCurrentDonasi] = useState({
    id: null,
    nama: '',
    jumlah: '',
    tanggal: '',
    keterangan: '',
    status: 'Menunggu',
  });

  // Modal konfirmasi hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDonasi({
      ...currentDonasi,
      [name]: name === 'jumlah' ? (value === '' ? '' : Number(value)) : value,
    });
  };

  // Buka modal untuk tambah donasi baru
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentDonasi({
      id: null,
      nama: '',
      jumlah: '',
      tanggal: '',
      keterangan: '',
      status: 'Menunggu',
    });
    setShowModal(true);
  };

  // Handler submit form (tambah/edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // Update donasi yang sudah ada
      setDonasi(
        donasi.map((item) =>
          item.id === currentDonasi.id ? currentDonasi : item
        )
      );
    } else {
      // Tambah donasi baru dengan ID yang digenerate
      const newId =
        donasi.length > 0 ? Math.max(...donasi.map((item) => item.id)) + 1 : 1;
      setDonasi([...donasi, { ...currentDonasi, id: newId }]);
    }

    // Tutup modal
    setShowModal(false);
  };

  // Handler hapus donasi
  const handleDelete = () => {
    setDonasi(donasi.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
  };

  // Format jumlah sebagai mata uang Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
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
                Manajemen Donasi
              </h1>
              <p className="text-gray-500 mt-1">
                Kelola semua donasi Masjid Baiturrohim
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors whitespace-nowrap"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Tambah Donasi
            </button>
          </div>

          {/* Card utama dengan handling overflow */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden min-w-[40rem]">
            {/* Header card */}
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Daftar Donasi</h2>
            </div>
            {/* Tabel dengan handling overflow yang diperbaiki */}
            {donasi.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Donatur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jumlah
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donasi.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-start">
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.nama}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {item.keterangan}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {formatRupiah(item.jumlah)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-900">
                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                            {new Date(item.tanggal).toLocaleDateString(
                              'id-ID',
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.status === 'Terverifikasi'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {item.status === 'Terverifikasi' && (
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                            )}
                            {item.status === 'Menunggu' && (
                              <InformationCircleIcon className="h-3 w-3 mr-1" />
                            )}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setCurrentDonasi(item);
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
                <p>Belum ada data donasi yang tersedia.</p>
                <button
                  onClick={openAddModal}
                  className="mt-3 text-green-600 hover:text-green-800"
                >
                  Tambah Donasi Pertama
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Tambah/Edit Donasi */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEdit ? 'Edit Donasi' : 'Tambah Donasi Baru'}
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
                    Nama Donatur
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={currentDonasi.nama}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Donasi (Rp)
                  </label>
                  <input
                    type="number"
                    name="jumlah"
                    value={currentDonasi.jumlah}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="1000"
                    step="1000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={currentDonasi.tanggal}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={currentDonasi.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Terverifikasi">Terverifikasi</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keterangan
                  </label>
                  <textarea
                    name="keterangan"
                    value={currentDonasi.keterangan}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tujuan donasi atau catatan lainnya"
                  ></textarea>
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
                  {isEdit ? 'Simpan Perubahan' : 'Tambah Donasi'}
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
                Apakah Anda yakin ingin menghapus donasi ini? Tindakan ini tidak
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
