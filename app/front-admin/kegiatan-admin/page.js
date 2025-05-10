'use client';
import { useState, useEffect, useRef } from 'react';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';
import { useRouter } from 'next/navigation';
import LoadingModal from '@/app/components/modal/loading-modal';
export default function KegiatanAdmin() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [kegiatan, setKegiatan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    content: '',
  });

  // Delete confirmation modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [removeImage, setRemoveImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Cek auth saat komponen dimount
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }

    fetchKegiatan();
  }, []);

  // Fetch semua kegiatan
  const fetchKegiatan = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/kegiatan');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      // Format tanggal untuk form input
      const formattedData = data.map((item) => ({
        ...item,
        tanggal: new Date(item.tanggal).toISOString().split('T')[0],
      }));

      setKegiatan(formattedData);
    } catch (err) {
      console.error('Error fetching kegiatan:', err);
      setError('Gagal mengambil data kegiatan');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentKegiatan({
      ...currentKegiatan,
      [name]: value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(file);
    setRemoveImage(false);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle remove image button
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    setRemoveImage(true);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
      content: '',
    });
    setSelectedImage(null);
    setImagePreview('');
    setRemoveImage(false);
    setShowModal(true);
  };

  // Submit form handler (add/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data to handle file upload
      const formData = new FormData();

      // Add all text fields to form data
      formData.append('nama', currentKegiatan.nama);
      formData.append('tanggal', currentKegiatan.tanggal);
      formData.append('waktu', currentKegiatan.waktu);
      formData.append('lokasi', currentKegiatan.lokasi);
      formData.append('penanggungjawab', currentKegiatan.penanggungjawab);

      // Optional fields
      if (currentKegiatan.deskripsi) {
        formData.append('deskripsi', currentKegiatan.deskripsi);
      }

      if (currentKegiatan.content) {
        formData.append('content', currentKegiatan.content);
      }

      // Add image if selected
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // Add remove flag if needed
      if (removeImage) {
        formData.append('removeImage', 'true');
      }

      if (isEdit) {
        // Update existing activity
        const response = await fetch(`/api/kegiatan/${currentKegiatan.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to update kegiatan');
        }
      } else {
        // Add new activity
        const response = await fetch('/api/kegiatan', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to create kegiatan');
        }
      }

      // Refresh the data
      fetchKegiatan();

      // Close modal
      setShowModal(false);
    } catch (err) {
      console.error('Error in submit:', err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete activity handler
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/kegiatan/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete kegiatan');
      }

      // Remove from state
      setKegiatan(kegiatan.filter((item) => item.id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Error deleting kegiatan:', err);
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Set up edit mode
  const handleEdit = (item) => {
    setIsEdit(true);
    setCurrentKegiatan(item);
    setSelectedImage(null);
    setRemoveImage(false);

    // Set image preview if item has image
    if (item.imageUrl) {
      setImagePreview(item.imageUrl);
    } else {
      setImagePreview('');
    }

    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Memuat data kegiatan...</p>
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
              onClick={fetchKegiatan}
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
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md overflow-hidden">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.nama}
                                  className="h-12 w-12 object-cover"
                                />
                              ) : (
                                <div className="h-12 w-12 flex items-center justify-center text-gray-400">
                                  <PhotoIcon className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
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
                            onClick={() => handleEdit(item)}
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
              className="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Simplified header */}
              <div className="border-l-4 border-green-600 bg-white px-4 py-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* More compact form layout */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* First row - Name */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Kegiatan
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={currentKegiatan.nama}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="Masukkan nama kegiatan"
                        required
                      />
                    </div>

                    {/* Second row - Date and Time side by side */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Tanggal
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="tanggal"
                          value={currentKegiatan.tanggal}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Waktu
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <ClockIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="time"
                          name="waktu"
                          value={currentKegiatan.waktu}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Third row - Location and PIC */}
                    <div className="col-span-2 grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Lokasi
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                            <MapPinIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="lokasi"
                            value={currentKegiatan.lokasi}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            placeholder="Lokasi"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Penanggung Jawab
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                            <UserIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="penanggungjawab"
                            value={currentKegiatan.penanggungjawab}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                            placeholder="PIC"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fourth row - Description (smaller) */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi Kegiatan
                      </label>
                      <textarea
                        name="deskripsi"
                        value={currentKegiatan.deskripsi || ''}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="Deskripsi singkat kegiatan..."
                      ></textarea>
                    </div>

                    {/* Fifth row - Full content (smaller) */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                        <span>Konten Lengkap</span>
                        <span className="text-xs text-gray-500 font-normal">
                          Opsional
                        </span>
                      </label>
                      <textarea
                        name="content"
                        value={currentKegiatan.content || ''}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="Detail lengkap kegiatan..."
                      ></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div className="col-span-2 mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gambar Kegiatan
                      </label>

                      {/* Image Preview */}
                      {imagePreview && !removeImage && (
                        <div className="mb-3">
                          <div className="relative w-full rounded-lg overflow-hidden h-48 bg-gray-100">
                            <img
                              src={
                                imagePreview.startsWith('data:')
                                  ? imagePreview
                                  : imagePreview
                              }
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute top-2 right-2 bg-red-600 rounded-full p-1 text-white shadow hover:bg-red-700"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* File Upload */}
                      {(!imagePreview || removeImage) && (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500"
                              >
                                <span>Upload gambar</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  accept="image/*"
                                  ref={fileInputRef}
                                  onChange={handleImageChange}
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">atau drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 2MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Compact footer */}
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

      {/* Minimalist Delete Confirmation Modal */}
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
              className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
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
                      Apakah Anda yakin ingin menghapus kegiatan ini?
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
      <LoadingModal isOpen={isSubmitting} type={isEdit ? 'submit' : 'add'} />

      <LoadingModal isOpen={isDeleting} type="delete" />
    </div>
  );
}
