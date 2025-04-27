import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';

export default function Pengurus() {
  return (
    <main className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-[#1C1C1C] text-white py-20 mt-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Struktur Organisasi
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Dewan Kemakmuran Masjid Baiturrohim
              <br />
              Periode 2022-2027
            </p>
          </div>
        </div>
      </section>

      {/* Main Organization Structure */}
      <section className="py-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          {/* Top Leadership */}
          <div className="flex justify-center mb-20">
            <div className="relative bg-white shadow-lg rounded-xl p-6 text-center max-w-sm border border-gray-100">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full bg-[#6DB144] p-1">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Ketua DKM"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-16">
                <h3 className="text-xl font-bold">H. Ahmad Fauzi</h3>
                <p className="text-[#6DB144] font-medium mb-2">Ketua DKM</p>
                <p className="text-gray-600 text-sm">
                  Memimpin dan mengkoordinasikan seluruh kegiatan masjid untuk
                  kemakmuran umat
                </p>
              </div>
            </div>
          </div>

          {/* Second Tier - Secretary and Treasurer */}
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
            <div className="relative bg-white shadow-md rounded-xl p-6 text-center max-w-xs border border-gray-100">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full bg-[#6DB144] p-1">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/men/41.jpg"
                      alt="Sekretaris"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-lg font-bold">Budi Santoso</h3>
                <p className="text-[#6DB144] font-medium mb-2">Sekretaris</p>
                <p className="text-gray-600 text-sm">
                  Mengelola administrasi dan dokumentasi kegiatan masjid
                </p>
              </div>
            </div>

            <div className="relative bg-white shadow-md rounded-xl p-6 text-center max-w-xs border border-gray-100">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full bg-[#6DB144] p-1">
                  <div className="w-full h-full rounded-full bg-white overflow-hidden">
                    <img
                      src="https://randomuser.me/api/portraits/women/28.jpg"
                      alt="Bendahara"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-lg font-bold">Hj. Siti Aminah</h3>
                <p className="text-[#6DB144] font-medium mb-2">Bendahara</p>
                <p className="text-gray-600 text-sm">
                  Mengelola keuangan masjid dengan transparan dan akuntabel
                </p>
              </div>
            </div>
          </div>

          {/* Third Tier - Division Heads */}
          <h2 className="text-2xl font-bold text-center mb-12">
            Kepala Bidang
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Division 1 */}
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:border-[#6DB144] transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/73.jpg"
                    alt="Bidang Ibadah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Ust. Mahmud</h3>
                  <p className="text-[#6DB144] text-sm">Bidang Ibadah</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Mengkoordinasikan kegiatan ibadah harian, jumat, dan hari besar
                Islam
              </p>
            </div>

            {/* Division 2 */}
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:border-[#6DB144] transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/52.jpg"
                    alt="Bidang Pendidikan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Ust. Abdul Hakim</h3>
                  <p className="text-[#6DB144] text-sm">Bidang Pendidikan</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Mengelola TPA, kajian rutin, dan program pendidikan Islam
                lainnya
              </p>
            </div>

            {/* Division 3 */}
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:border-[#6DB144] transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/36.jpg"
                    alt="Bidang Sosial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">H. Rahmat</h3>
                  <p className="text-[#6DB144] text-sm">Bidang Sosial</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Mengelola program bantuan sosial dan kegiatan kemasyarakatan
              </p>
            </div>

            {/* Division 4 */}
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:border-[#6DB144] transition-all hover:shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/67.jpg"
                    alt="Bidang Sarana"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Ir. Hasan</h3>
                  <p className="text-[#6DB144] text-sm">Bidang Sarana</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Bertanggung jawab atas pemeliharaan dan pengembangan fasilitas
                masjid
              </p>
            </div>
          </div>

          {/* Organization Chart */}
          <div className="bg-gray-50 p-8 rounded-2xl mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              Struktur Organisasi Lengkap
            </h2>
            <div className="overflow-x-auto">
              <div className="min-w-[768px]">
                {/* Hierarchical Tree View */}
                <div className="flex flex-col items-center">
                  {/* Level 1 */}
                  <div className="bg-[#1C1C1C] text-white px-6 py-3 rounded-lg mb-4">
                    <p className="font-bold">Ketua DKM</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>

                  {/* Level 2 */}
                  <div className="flex justify-center items-start gap-20 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#6DB144] text-white px-4 py-2 rounded-lg">
                        <p className="font-bold">Sekretaris</p>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="flex gap-4">
                        <div className="bg-white text-gray-800 border px-3 py-1 rounded">
                          <p className="text-sm">Administrasi</p>
                        </div>
                        <div className="bg-white text-gray-800 border px-3 py-1 rounded">
                          <p className="text-sm">Kesekretariatan</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="bg-[#6DB144] text-white px-4 py-2 rounded-lg">
                        <p className="font-bold">Bendahara</p>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="flex gap-4">
                        <div className="bg-white text-gray-800 border px-3 py-1 rounded">
                          <p className="text-sm">Keuangan</p>
                        </div>
                        <div className="bg-white text-gray-800 border px-3 py-1 rounded">
                          <p className="text-sm">Aset</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level 3 - Division Heads */}
                  <div className="mt-8 w-full">
                    <div className="border-t-2 border-gray-300 pt-8">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex flex-col items-center">
                          <div className="bg-[#1C1C1C]/80 text-white px-3 py-2 rounded text-center w-full">
                            <p className="font-medium">Bidang Ibadah</p>
                          </div>
                          <div className="w-px h-6 bg-gray-300"></div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full text-sm">
                            <p>Imam & Muadzin</p>
                          </div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full mt-2 text-sm">
                            <p>Kegiatan Ramadhan</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="bg-[#1C1C1C]/80 text-white px-3 py-2 rounded text-center w-full">
                            <p className="font-medium">Bidang Pendidikan</p>
                          </div>
                          <div className="w-px h-6 bg-gray-300"></div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full text-sm">
                            <p>TPA</p>
                          </div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full mt-2 text-sm">
                            <p>Kajian Rutin</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="bg-[#1C1C1C]/80 text-white px-3 py-2 rounded text-center w-full">
                            <p className="font-medium">Bidang Sosial</p>
                          </div>
                          <div className="w-px h-6 bg-gray-300"></div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full text-sm">
                            <p>Zakat & Infaq</p>
                          </div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full mt-2 text-sm">
                            <p>Bakti Sosial</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="bg-[#1C1C1C]/80 text-white px-3 py-2 rounded text-center w-full">
                            <p className="font-medium">Bidang Sarana</p>
                          </div>
                          <div className="w-px h-6 bg-gray-300"></div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full text-sm">
                            <p>Kebersihan</p>
                          </div>
                          <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full mt-2 text-sm">
                            <p>Pembangunan</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6DB144] py-12 mt-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Mari Bersama Memakmurkan Masjid
            </h2>
            <p className="text-white/80 mb-8">
              "Hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang
              beriman kepada Allah dan hari kemudian."
            </p>
            <p className="italic text-white/90 font-medium">
              (QS. At-Taubah: 18)
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
