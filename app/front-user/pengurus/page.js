'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';
import Image from 'next/image';
import {
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

export default function Pengurus() {
  const [pengurus, setPengurus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBidang, setExpandedBidang] = useState({});

  // Definisi struktur organisasi berdasarkan bidang
  const struktur = {
    pimpinan: {
      nama: 'Pimpinan',
      deskripsi: 'Bertanggung jawab atas seluruh kegiatan dan kebijakan masjid',
      roles: ['Ketua DKM', 'Wakil Ketua'],
      color: '#1C1C1C', // Warna header untuk bidang ini
      colorLight: '#e2e8f0', // Warna latar belakang card
    },
    sekretariat: {
      nama: 'Sekretariat',
      deskripsi: 'Mengelola administrasi, dokumentasi, dan kesekretariatan',
      roles: ['Sekretaris', 'Wakil Sekretaris'],
      color: '#6DB144',
      colorLight: '#f0fdf4',
    },
    keuangan: {
      nama: 'Keuangan',
      deskripsi: 'Mengelola seluruh keuangan masjid, donasi dan pelaporan',
      roles: ['Bendahara', 'Wakil Bendahara'],
      color: '#6DB144',
      colorLight: '#f0fdf4',
    },
    ibadah: {
      nama: 'Bidang Ibadah',
      deskripsi: 'Mengatur jadwal ibadah, imam, muadzin dan kegiatan ramadhan',
      roles: ['Bidang Ibadah'],
      color: '#3B82F6',
      colorLight: '#eff6ff',
    },
    pendidikan: {
      nama: 'Bidang Pendidikan',
      deskripsi: 'Mengelola TPA, kajian rutin dan program pendidikan Islam',
      roles: ['Bidang Pendidikan'],
      color: '#3B82F6',
      colorLight: '#eff6ff',
    },
    sosial: {
      nama: 'Bidang Sosial',
      deskripsi: 'Menangani zakat, infaq, sedekah dan bantuan sosial',
      roles: ['Bidang Sosial'],
      color: '#3B82F6',
      colorLight: '#eff6ff',
    },
    sarana: {
      nama: 'Bidang Sarana',
      deskripsi: 'Mengelola pemeliharaan fasilitas masjid dan pembangunan',
      roles: ['Bidang Sarana'],
      color: '#3B82F6',
      colorLight: '#eff6ff',
    },
    humas: {
      nama: 'Bidang Humas',
      deskripsi: 'Menangani publikasi kegiatan dan hubungan dengan masyarakat',
      roles: ['Bidang Humas'],
      color: '#3B82F6',
      colorLight: '#eff6ff',
    },
    dakwah: {
      nama: 'Bidang Dakwah',
      deskripsi: 'Mengkoordinasikan program dakwah dan kegiatan keagamaan',
      roles: ['Bidang Dakwah'],
      color: '#3B82F6',
      colorLight: '#eff6ff',
    },
    anggota: {
      nama: 'Anggota',
      deskripsi: 'Membantu pelaksanaan program dan kegiatan masjid',
      roles: ['Anggota', 'Lainnya'],
      color: '#64748b',
      colorLight: '#f1f5f9',
    },
  };

  // Toggle expanded state for bidang
  const toggleBidang = (bidangKey) => {
    setExpandedBidang((prev) => ({
      ...prev,
      [bidangKey]: !prev[bidangKey],
    }));
  };

  // Fetch data pengurus
  useEffect(() => {
    async function fetchPengurus() {
      setLoading(true);
      try {
        const response = await fetch('/api/pengurus');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPengurus(data);

        // Default expand Pimpinan section
        setExpandedBidang({ pimpinan: true });
      } catch (error) {
        console.error('Error fetching pengurus:', error);
        setError('Gagal mengambil data pengurus');
      } finally {
        setLoading(false);
      }
    }

    fetchPengurus();
  }, []);

  // Organize pengurus by department structure
  const organizePengurus = () => {
    const organized = {};

    // Initialize each department with empty array
    Object.keys(struktur).forEach((key) => {
      organized[key] = [];
    });

    // Distribute people to their departments
    pengurus.forEach((person) => {
      let assigned = false;

      // Check each department
      for (const [key, dept] of Object.entries(struktur)) {
        if (dept.roles.some((role) => person.jabatan.includes(role))) {
          organized[key].push(person);
          assigned = true;
          break;
        }
      }

      // Default to anggota if not assigned elsewhere
      if (!assigned) {
        organized.anggota.push(person);
      }
    });

    // Sort each department - leaders first
    for (const [key, dept] of Object.entries(organized)) {
      dept.sort((a, b) => {
        // Pimpinan: Ketua DKM before Wakil Ketua
        if (key === 'pimpinan') {
          return a.jabatan.includes('Ketua DKM') ? -1 : 1;
        }
        // For others: [Head of Dept] before others
        return a.jabatan.includes('Ketua') || a.jabatan.includes('Kepala')
          ? -1
          : 1;
      });
    }

    return organized;
  };

  // Member profile card
  const MemberCard = ({ person, isLeader = false }) => (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden ${
        isLeader ? 'border-l-4 border-l-[#6DB144]' : ''
      }`}
    >
      <div className="flex p-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            {person.imageUrl ? (
              <Image
                src={person.imageUrl}
                alt={person.nama}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-bold text-gray-900">{person.nama}</h3>
          <p className="text-sm text-[#6DB144] font-medium">{person.jabatan}</p>
          {person.no_telepon && (
            <p className="text-xs text-gray-600 mt-1 flex items-center">
              {person.no_telepon}
            </p>
          )}
          {person.deskripsi && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {person.deskripsi}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Department section with collapsible content
  const DepartmentSection = ({ bidangKey, members }) => {
    const bidang = struktur[bidangKey];
    const isExpanded = expandedBidang[bidangKey] || false;

    if (!members || members.length === 0) return null;

    const leader = members[0]; // Assume first person is leader
    const otherMembers = members.slice(1);

    return (
      <div className="mb-10">
        <div
          className={`rounded-lg bg-${bidang.color} text-white p-4 flex justify-between items-center cursor-pointer hover:bg-opacity-90 transition-colors`}
          style={{ backgroundColor: bidang.color }}
          onClick={() => toggleBidang(bidangKey)}
        >
          <div>
            <h2 className="text-lg font-bold">{bidang.nama}</h2>
            <p className="text-sm text-white/80">{bidang.deskripsi}</p>
          </div>
          <div className="flex-shrink-0">
            {isExpanded ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Department leader */}
            {leader && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Ketua Bidang
                </h3>
                <MemberCard person={leader} isLeader={true} />
              </div>
            )}

            {/* Other members */}
            {otherMembers.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Anggota Bidang
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherMembers.map((person) => (
                    <MemberCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Get organized pengurus data
  const organizedPengurus = loading || error ? null : organizePengurus();

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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6DB144]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <>
              {/* Organization Chart Overview */}
              <div className="mb-16">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-center mb-12">
                    Struktur Organisasi Lengkap
                  </h2>
                  <div className="overflow-auto">
                    <div className="org-chart min-w-[850px]">
                      {/* Chairman */}
                      <div className="flex flex-col items-center">
                        <div className="bg-[#1C1C1C] text-white px-6 py-3 rounded-lg min-w-[200px] text-center">
                          <p className="font-bold">Ketua DKM</p>
                          {organizedPengurus?.pimpinan[0]?.nama && (
                            <p className="text-sm text-gray-300 mt-1">
                              {organizedPengurus.pimpinan[0].nama}
                            </p>
                          )}
                        </div>

                        {/* Connecting line */}
                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* First Row - Administration */}
                        <div className="flex justify-center space-x-20 mb-10">
                          <div className="flex flex-col items-center">
                            <div className="bg-[#6DB144] text-white px-4 py-3 rounded-lg min-w-[180px] text-center">
                              <p className="font-bold">Sekretaris</p>
                              {organizedPengurus?.sekretariat[0]?.nama && (
                                <p className="text-sm text-gray-100 mt-1">
                                  {organizedPengurus.sekretariat[0].nama}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="bg-[#6DB144] text-white px-4 py-3 rounded-lg min-w-[180px] text-center">
                              <p className="font-bold">Bendahara</p>
                              {organizedPengurus?.keuangan[0]?.nama && (
                                <p className="text-sm text-gray-100 mt-1">
                                  {organizedPengurus.keuangan[0].nama}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Long horizontal line connecting all departments */}
                        <div className="w-4/5 border-t-2 border-gray-300 mb-8"></div>

                        {/* Bidang Heads */}
                        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                          {[
                            'ibadah',
                            'pendidikan',
                            'sosial',
                            'sarana',
                            'humas',
                            'dakwah',
                          ].map((key) => {
                            const bidang = struktur[key];
                            const kepala = organizedPengurus?.[key]?.[0];

                            return (
                              <div
                                key={key}
                                className="flex flex-col items-center"
                              >
                                <div className="bg-[#3B82F6] text-white px-3 py-2 rounded text-center w-full min-h-[80px] flex flex-col justify-center">
                                  <p className="font-medium">{bidang.nama}</p>
                                  {kepala?.nama && (
                                    <p className="text-xs text-gray-100 mt-1">
                                      {kepala.nama}
                                    </p>
                                  )}
                                </div>

                                {/* Vertical line */}
                                <div className="w-px h-6 bg-gray-300"></div>

                                {/* Sub items */}
                                <div className="bg-white text-gray-800 border px-2 py-1 rounded text-center w-full text-sm">
                                  <p>
                                    Anggota (
                                    {(organizedPengurus?.[key]?.length || 1) -
                                      1}
                                    )
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Department Sections */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-center mb-12">
                  Detail Bidang
                </h2>

                {/* Pimpinan Section */}
                <DepartmentSection
                  bidangKey="pimpinan"
                  members={organizedPengurus?.pimpinan}
                />

                {/* Admin Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DepartmentSection
                    bidangKey="sekretariat"
                    members={organizedPengurus?.sekretariat}
                  />
                  <DepartmentSection
                    bidangKey="keuangan"
                    members={organizedPengurus?.keuangan}
                  />
                </div>

                {/* All Bidang Sections */}
                <DepartmentSection
                  bidangKey="ibadah"
                  members={organizedPengurus?.ibadah}
                />
                <DepartmentSection
                  bidangKey="pendidikan"
                  members={organizedPengurus?.pendidikan}
                />
                <DepartmentSection
                  bidangKey="sosial"
                  members={organizedPengurus?.sosial}
                />
                <DepartmentSection
                  bidangKey="sarana"
                  members={organizedPengurus?.sarana}
                />
                <DepartmentSection
                  bidangKey="humas"
                  members={organizedPengurus?.humas}
                />
                <DepartmentSection
                  bidangKey="dakwah"
                  members={organizedPengurus?.dakwah}
                />

                {/* Anggota Section */}
                <DepartmentSection
                  bidangKey="anggota"
                  members={organizedPengurus?.anggota}
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#6DB144] py-12">
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
