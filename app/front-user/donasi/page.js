import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';

export default function Donasi() {
  return (
    <main className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-[#1C1C1C] text-white py-20 mt-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sumbangkan Kebaikan Anda
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Donasi Anda akan membantu dalam pembangunan, perawatan, dan
              kegiatan dakwah Masjid Baiturrohim.
            </p>
            <div className="inline-block bg-[#6DB144] text-white px-6 py-3 rounded-full font-medium">
              Jazakumullah Khairan Kathira
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* QR Code Section */}
            <div className="bg-gray-50 p-8 md:p-12 rounded-3xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Scan QR Code
              </h2>
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <img
                    src="/images/qris1.png"
                    alt="QR Code Donasi"
                    className="w-100 h-100"
                  />
                </div>
              </div>
              <p className="text-center text-gray-600 mb-4">
                Scan QR code di atas menggunakan aplikasi mobile banking Anda
              </p>
              <p className="text-center text-sm text-gray-500">
                QR Code mendukung semua mobile banking dan e-wallet
              </p>
            </div>

            {/* Bank Transfer Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Transfer Bank</h2>
              <p className="text-gray-600 mb-6">
                Anda juga dapat melakukan transfer melalui rekening berikut:
              </p>

              <div className="space-y-4">
                {/* Bank Card 1 */}
                <div className="border border-gray-200 rounded-xl p-6 transition-all hover:border-[#6DB144] hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="font-bold text-blue-600">BRI</span>
                    </div>
                    <div>
                      <h3 className="font-bold">Bank Rakyat Indonesia</h3>
                      <p className="text-gray-500 text-sm">
                        Bank Rakyat Indonesia
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-500 text-sm mb-1">Nomor Rekening</p>
                    <p className="font-mono text-lg font-medium">
                      5802-01-008405-50-8
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Atas Nama</p>
                    <p className="font-medium"> PENGURUS MASJID BAITURROHIM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Information */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Donasi Anda Akan Digunakan Untuk
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#6DB144]/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-[#6DB144]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pembangunan Masjid</h3>
                <p className="text-gray-600">
                  Pembangunan dan renovasi sarana ibadah untuk kenyamanan jamaah
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#6DB144]/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-[#6DB144]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kegiatan Dakwah</h3>
                <p className="text-gray-600">
                  Mendukung kajian rutin, ceramah, dan kegiatan dakwah lainnya
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#6DB144]/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-[#6DB144]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Santunan</h3>
                <p className="text-gray-600">
                  Membantu kaum dhuafa, anak yatim, dan masyarakat yang
                  membutuhkan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6DB144] py-16 mt-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              "Sedekah Tidak Akan Mengurangi Harta"
            </h2>
            <p className="text-white/80 mb-8">
              "Tidaklah berkurang harta karena sedekah, dan tidaklah Allah
              menambah bagi seorang hamba yang pemaaf melainkan kemuliaan."
            </p>
            <p className="italic text-white/90 font-medium">(HR. Muslim)</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
