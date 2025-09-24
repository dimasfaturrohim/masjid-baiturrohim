'use client';
import { useState, useEffect, useRef } from 'react';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  PhotoIcon,
  ExclamationCircleIcon, // Added this icon
} from '@heroicons/react/24/outline';
import SidebarAdmin from '@/app/components/navbar/sidebar-admin';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoadingModal from '@/app/components/modal/loading-modal';

export default function PengurusAdmin() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal dan form
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPengurus, setCurrentPengurus] = useState({
    id: null,
    nama: '',
    jabatan: '',
    deskripsi: '',
    no_telepon: '',
    email: '',
    imageUrl: '',
  });

  const [formError, setFormError] = useState('');
  const [takenPositions, setTakenPositions] = useState({});

  // State for position warning popup
  const [positionWarningOpen, setPositionWarningOpen] = useState(false);
  const [warningPosition, setWarningPosition] = useState('');
  const [warningTakenBy, setWarningTakenBy] = useState('');

  // State untuk upload gambar
  const [selectedImage, setSelectedImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Modal konfirmasi hapus
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data pengurus
  useEffect(() => {
    // Cek auth saat komponen dimount
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }

    fetchPengurus();
  }, []);

  const fetchPengurus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pengurus');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPengurus(data);

      // Build the taken positions mapping
      const positions = {};
      data.forEach((person) => {
        positions[person.jabatan] = person.id;
      });
      setTakenPositions(positions);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Gagal mengambil data pengurus. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Periksa apakah jabatan sudah diambil oleh pengurus lain
  const isPositionTaken = (jabatan) => {
    // For special positions that can have multiple people
    if (jabatan === 'Anggota' || jabatan === 'Lainnya') {
      return false;
    }

    // Untuk kasus edit, jabatan yang dimiliki oleh pengurus yang sedang diedit tidak dianggap sebagai "taken"
    if (isEdit && takenPositions[jabatan] === currentPengurus.id) {
      return false;
    }
    return takenPositions[jabatan] !== undefined;
  };

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Reset form error when user changes input
    setFormError('');

    // Jika field adalah jabatan, cek validasi
    if (name === 'jabatan' && value) {
      if (isPositionTaken(value)) {
        // Temukan nama pengurus yang memiliki jabatan ini
        const personWithPosition = pengurus.find((p) => p.jabatan === value);
        if (personWithPosition) {
          // Show warning popup
          setWarningPosition(value);
          setWarningTakenBy(personWithPosition.nama);
          setPositionWarningOpen(true);

          setFormError(
            `Jabatan ${value} sudah ditempati oleh ${personWithPosition.nama}`
          );
        } else {
          setFormError(`Jabatan ${value} sudah terisi`);
        }
      }
    }

    setCurrentPengurus({
      ...currentPengurus,
      [name]: value,
    });
  };

  // Handle perubahan gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setRemoveImage(false);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle hapus gambar
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setRemoveImage(true);
    setImagePreview(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Buka modal untuk tambah pengurus baru
  const openAddModal = () => {
    setIsEdit(false);
    setCurrentPengurus({
      id: null,
      nama: '',
      jabatan: '',
      deskripsi: '',
      no_telepon: '',
      email: '',
      imageUrl: '',
    });
    setSelectedImage(null);
    setRemoveImage(false);
    setImagePreview(null);
    setFormError('');
    setShowModal(true);
  };

  // Buka modal untuk edit pengurus
  const openEditModal = (item) => {
    setIsEdit(true);
    setCurrentPengurus(item);
    setSelectedImage(null);
    setRemoveImage(false);
    setImagePreview(item.imageUrl);
    setFormError('');
    setShowModal(true);
  };

  // Handler submit form (tambah/edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jabatan sebelum submit
    if (isPositionTaken(currentPengurus.jabatan)) {
      const personWithPosition = pengurus.find(
        (p) => p.jabatan === currentPengurus.jabatan
      );

      // Show warning popup
      setWarningPosition(currentPengurus.jabatan);
      setWarningTakenBy(personWithPosition?.nama || 'orang lain');
      setPositionWarningOpen(true);

      setFormError(
        `Jabatan ${currentPengurus.jabatan} sudah ditempati oleh ${
          personWithPosition?.nama || 'orang lain'
        }`
      );
      return;
    }

    setIsSubmitting(true);

    // Create FormData object
    const formData = new FormData();
    formData.append('nama', currentPengurus.nama);
    formData.append('jabatan', currentPengurus.jabatan);

    if (currentPengurus.deskripsi) {
      formData.append('deskripsi', currentPengurus.deskripsi);
    }

    if (currentPengurus.no_telepon) {
      formData.append('no_telepon', currentPengurus.no_telepon);
    }

    if (currentPengurus.email) {
      formData.append('email', currentPengurus.email);
    }

    // Add image if selected
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    // Flag to remove existing image
    if (removeImage) {
      formData.append('removeImage', 'true');
    }

    try {
      let response;

      if (isEdit) {
        // Update existing pengurus
        response = await fetch(`/api/pengurus/${currentPengurus.id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Add new pengurus
        response = await fetch('/api/pengurus', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();

        // Handle conflict error (jabatan already taken)
        if (response.status === 409) {
          // Show warning popup for server-side validation failure
          const match = errorData.error.match(
            /Jabatan (.*?) sudah ditempati oleh (.*?)$/
          );
          if (match) {
            setWarningPosition(match[1]);
            setWarningTakenBy(match[2]);
            setPositionWarningOpen(true);
          }

          setFormError(errorData.error);
          setIsSubmitting(false);
          return;
        }

        throw new Error(errorData.error || 'Failed to save');
      }

      // Reload data
      fetchPengurus();

      // Close modal
      setShowModal(false);
    } catch (error) {
      console.error('Error saving pengurus:', error);
      setFormError(`Gagal menyimpan data: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler hapus pengurus
  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/pengurus/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete');
      }

      // Remove from state
      setPengurus(pengurus.filter((item) => item.id !== deleteId));

      // Update taken positions
      const updatedTakenPositions = { ...takenPositions };
      const deletedPerson = pengurus.find((p) => p.id === deleteId);
      if (deletedPerson) {
        delete updatedTakenPositions[deletedPerson.jabatan];
      }
      setTakenPositions(updatedTakenPositions);

      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting pengurus:', error);
      alert(`Gagal menghapus data: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarAdmin />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Memuat data pengurus...</p>
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
              onClick={fetchPengurus}
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
            {!loading && !error && pengurus.length > 0 ? (
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
                            {item.imageUrl ? (
                              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                                <Image
                                  src={item.imageUrl}
                                  alt={item.nama}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <UserIcon className="h-6 w-6 text-gray-500" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.nama}
                              </div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {item.deskripsi || '-'}
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
                              {item.no_telepon || '-'}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <EnvelopeIcon className="h-4 w-4 mr-1" />
                              {item.email || '-'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(item)}
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
            ) : !loading && !error ? (
              <div className="py-12 text-center text-gray-500">
                <p>Belum ada data pengurus yang tersedia.</p>
                <button
                  onClick={openAddModal}
                  className="mt-3 text-green-600 hover:text-green-800"
                >
                  Tambah Pengurus Pertama
                </button>
              </div>
            ) : null}
          </div>
        </main>
      </div>

      {/* Modal Tambah/Edit Pengurus - Styled like kegiatan-admin */}
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
                  {isEdit ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Show form error if exists */}
                {formError && (
                  <div className="mx-4 mt-4 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-start">
                    <ExclamationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p>{formError}</p>
                  </div>
                )}

                {/* More compact form layout */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* First row - Name */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={currentPengurus.nama}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>

                    {/* Second row - Position */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jabatan <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="jabatan"
                        value={currentPengurus.jabatan}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border ${
                          isPositionTaken(currentPengurus.jabatan)
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm`}
                        required
                      >
                        <option value="" disabled>
                          Pilih Jabatan
                        </option>
                        <optgroup label="Pimpinan">
                          {['Ketua DKM', 'Wakil Ketua'].map((position) => {
                            const isTaken =
                              isPositionTaken(position) &&
                              (!isEdit || currentPengurus.jabatan !== position);
                            const takenBy =
                              pengurus.find((p) => p.jabatan === position)
                                ?.nama || '';

                            return (
                              <option
                                key={position}
                                value={position}
                                className={isTaken ? 'text-gray-400' : ''}
                                disabled={false} // We don't disable to allow better error handling
                              >
                                {position}{' '}
                                {isTaken ? `(Sudah diisi oleh ${takenBy})` : ''}
                              </option>
                            );
                          })}
                        </optgroup>

                        {/* Other option groups similarly */}
                        <optgroup label="Sekretariat">
                          {['Sekretaris', 'Wakil Sekretaris'].map(
                            (position) => {
                              const isTaken =
                                isPositionTaken(position) &&
                                (!isEdit ||
                                  currentPengurus.jabatan !== position);
                              const takenBy =
                                pengurus.find((p) => p.jabatan === position)
                                  ?.nama || '';

                              return (
                                <option
                                  key={position}
                                  value={position}
                                  className={isTaken ? 'text-gray-400' : ''}
                                >
                                  {position}{' '}
                                  {isTaken
                                    ? `(Sudah diisi oleh ${takenBy})`
                                    : ''}
                                </option>
                              );
                            }
                          )}
                        </optgroup>

                        <optgroup label="Keuangan">
                          {['Bendahara', 'Wakil Bendahara'].map((position) => {
                            const isTaken =
                              isPositionTaken(position) &&
                              (!isEdit || currentPengurus.jabatan !== position);
                            const takenBy =
                              pengurus.find((p) => p.jabatan === position)
                                ?.nama || '';

                            return (
                              <option
                                key={position}
                                value={position}
                                className={isTaken ? 'text-gray-400' : ''}
                              >
                                {position}{' '}
                                {isTaken ? `(Sudah diisi oleh ${takenBy})` : ''}
                              </option>
                            );
                          })}
                        </optgroup>

                        <optgroup label="Kepala Bidang">
                          {[
                            'Bidang Ibadah',
                            'Bidang Pendidikan',
                            'Bidang Sosial',
                            'Bidang Sarana',
                            'Bidang Humas',
                            'Bidang Dakwah',
                          ].map((position) => {
                            const isTaken =
                              isPositionTaken(position) &&
                              (!isEdit || currentPengurus.jabatan !== position);
                            const takenBy =
                              pengurus.find((p) => p.jabatan === position)
                                ?.nama || '';

                            return (
                              <option
                                key={position}
                                value={position}
                                className={isTaken ? 'text-gray-400' : ''}
                              >
                                {position}{' '}
                                {isTaken ? `(Sudah diisi oleh ${takenBy})` : ''}
                              </option>
                            );
                          })}
                        </optgroup>

                        <optgroup label="Lainnya">
                          <option value="Anggota">Anggota</option>
                          <option value="Lainnya">Lainnya</option>
                        </optgroup>
                      </select>
                      {isPositionTaken(currentPengurus.jabatan) && (
                        <p className="mt-1 text-xs text-red-500">
                          Jabatan ini sudah diisi
                        </p>
                      )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nomor Telepon
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <PhoneIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="no_telepon"
                          value={currentPengurus.no_telepon || ''}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          placeholder="082377321000"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={currentPengurus.email || ''}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 pl-8 pr-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                          placeholder="nama@example.com"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                        <span>Deskripsi</span>
                        <span className="text-xs text-gray-500 font-normal">
                          Opsional
                        </span>
                      </label>
                      <textarea
                        name="deskripsi"
                        value={currentPengurus.deskripsi || ''}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors text-sm"
                        placeholder="Deskripsi singkat tentang pengurus..."
                      ></textarea>
                    </div>

                    {/* Image Upload Section */}
                    <div className="col-span-2 mt-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Foto Profil
                      </label>

                      {/* Image Preview */}
                      {imagePreview && !removeImage && (
                        <div className="mb-3">
                          <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto">
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
                              className="absolute top-1 right-1 bg-red-600 rounded-full p-1 text-white shadow hover:bg-red-700"
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
                                <span>Upload foto</span>
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
                    disabled={
                      isPositionTaken(currentPengurus.jabatan) || isSubmitting
                    }
                    className={`px-3 py-1.5 rounded-md text-white shadow-sm font-medium flex items-center ${
                      isPositionTaken(currentPengurus.jabatan) || isSubmitting
                        ? 'bg-gray-400'
                        : 'bg-green-600 hover:bg-green-700 transition-colors'
                    }`}
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

      {/* Position Warning Popup */}
      {positionWarningOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 transition-opacity"
            onClick={() => setPositionWarningOpen(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div
              className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-l-4 border-yellow-500 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100">
                      <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Jabatan Sudah Terisi
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Jabatan{' '}
                      <span className="font-semibold">{warningPosition}</span>{' '}
                      sudah ditempati oleh{' '}
                      <span className="font-semibold">{warningTakenBy}</span>.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Satu jabatan hanya dapat diisi oleh satu orang. Silakan
                      pilih jabatan lain.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setPositionWarningOpen(false)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors shadow-sm font-medium text-sm"
                  >
                    Saya Mengerti
                  </button>
                </div>
              </div>
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
                      Apakah Anda yakin ingin menghapus data pengurus ini?
                      Tindakan ini tidak dapat dibatalkan.
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

      {/* Loading Modals */}
      <LoadingModal isOpen={isSubmitting} type={isEdit ? 'submit' : 'add'} />
      <LoadingModal isOpen={isDeleting} type="delete" />
    </div>
  );
}
