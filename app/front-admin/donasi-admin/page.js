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
import LoadingModal from '@/app/components/modal/loading-modal';

export default function DonasiAdmin() {
  const router = useRouter();

  // States for data and UI
  const [donasi, setDonasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal and form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentDonasi, setCurrentDonasi] = useState({
    id: null,
    nama_donatur: '',
    tanggal: '',
    nominal: '',
    deskripsi: '',
    status: 'Menunggu',
  });

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Cek auth saat komponen dimount
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      fetchDonasi();
    }
  }, []);

  // Fetch data donasi
  const fetchDonasi = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/donasi');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Format tanggal untuk form input
      const formattedData = data.map((item) => ({
        ...item,
        tanggal: new Date(item.tanggal).toISOString().split('T')[0],
        // Convert Decimal to number for form handling
        nominal: Number(item.nominal),
      }));

      setDonasi(formattedData);
    } catch (err) {
      console.error('Error fetching donasi:', err);
      setError('Gagal mengambil data donasi');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDonasi({
      ...currentDonasi,
      [name]: name === 'nominal' ? (value === '' ? '' : Number(value)) : value,
    });
  };

  // Buka modal untuk tambah donasi baru
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentDonasi({
      id: null,
      nama_donatur: '',
      tanggal: '',
      nominal: '',
      deskripsi: '',
      status: 'Menunggu',
    });
    setShowModal(true);
  };

  // Handler submit form (tambah/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        nama_donatur: currentDonasi.nama_donatur,
        tanggal: currentDonasi.tanggal,
        nominal: currentDonasi.nominal,
        deskripsi: currentDonasi.deskripsi,
        status: currentDonasi.status,
      };

      if (isEdit) {
        // Update existing donasi
        const response = await fetch(`/api/donasi/${currentDonasi.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to update donasi');
        }
      } else {
        // Add new donasi
        const response = await fetch('/api/donasi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to create donasi');
        }
      }

      // Refresh the data
      fetchDonasi();

      // Close modal
      setShowModal(false);
    } catch (err) {
      console.error('Error in submit:', err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler hapus donasi
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/donasi/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete donasi');
      }

      // Remove from state
      setDonasi(donasi.filter((item) => item.id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting donasi:', err);
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Format jumlah sebagai mata uang Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Memuat data donasi...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-2">⚠️ Error</div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchDonasi}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                                {item.nama_donatur}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {item.deskripsi || '-'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {formatRupiah(item.nominal)}
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
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-l-4 border-green-600 bg-white px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {isEdit ? 'Edit Donasi' : 'Tambah Donasi Baru'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Donatur
                      </label>
                      <input
                        type="text"
                        name="nama_donatur"
                        value={currentDonasi.nama_donatur}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nominal (Rp)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <BanknotesIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          name="nominal"
                          value={currentDonasi.nominal}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                          min="1000"
                          step="1000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tanggal
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="tanggal"
                          value={currentDonasi.tanggal}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={currentDonasi.status}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        required
                      >
                        <option value="Menunggu">Menunggu</option>
                        <option value="Terverifikasi">Terverifikasi</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi
                      </label>
                      <textarea
                        name="deskripsi"
                        value={currentDonasi.deskripsi || ''}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="Tujuan donasi atau catatan lainnya"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Footer form */}
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-end space-x-2 text-sm">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-green-600 rounded-md text-white hover:bg-green-700 transition-colors shadow-sm font-medium flex items-center"
                  >
                    {isEdit ? (
                      <>
                        <PencilSquareIcon className="h-3.5 w-3.5 mr-1" />
                        Simpan
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-3.5 w-3.5 mr-1" />
                        Tambah
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 transition-opacity"
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-l-4 border-red-500 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
                      <TrashIcon className="h-4 w-4 text-red-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">
                      Konfirmasi Hapus
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Apakah Anda yakin ingin menghapus donasi ini?
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm font-medium"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-3 py-1.5 text-sm bg-red-600 rounded-md text-white hover:bg-red-700 transition-colors shadow-sm font-medium flex items-center"
                  >
                    <TrashIcon className="h-3.5 w-3.5 mr-1" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading modals */}
      <LoadingModal isOpen={isSubmitting} type={isEdit ? 'submit' : 'add'} />
      <LoadingModal isOpen={isDeleting} type="delete" />
    </div>
  );
}
