'use client';
import React from 'react';

const LoadingModal = ({ isOpen, type = 'submit' }) => {
  if (!isOpen) return null;

  // Determine colors and messages based on type
  const config = {
    submit: {
      borderColor: 'border-t-green-500',
      pingColor: 'bg-green-200',
      title: 'Menyimpan Perubahan',
      message: 'Mohon tunggu sebentar...',
    },
    add: {
      borderColor: 'border-t-green-500',
      pingColor: 'bg-green-200',
      title: 'Menambahkan Kegiatan',
      message: 'Mohon tunggu sebentar...',
    },
    delete: {
      borderColor: 'border-t-red-500',
      pingColor: 'bg-red-200',
      title: 'Menghapus Kegiatan',
      message: 'Mohon tunggu sebentar...',
    },
  };

  // Use the specified type or default to submit
  const { borderColor, pingColor, title, message } =
    config[type] || config.submit;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 transition-opacity"></div>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="relative bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full transform transition-all"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative flex justify-center">
              <div
                className={`absolute animate-ping h-8 w-8 rounded-full ${pingColor} opacity-75`}
              ></div>
              <div
                className={`relative animate-spin rounded-full h-10 w-10 border-4 border-gray-100 ${borderColor}`}
              ></div>
            </div>
            <h3 className="mt-5 text-gray-800 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>

      {/* Add this style for the fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingModal;
