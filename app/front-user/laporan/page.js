import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';

export default function Laporan() {
  // Sample data for financial reports - in a real app, this would come from an API
  const currentMonth = new Date().toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  const summaryData = {
    pendapatan: 48750000,
    pengeluaran: 32450000,
    saldo: 16300000,
    donatur: 83,
  };

  const monthlyData = [
    { month: 'Jan', income: 42000000, expense: 28000000 },
    { month: 'Feb', income: 45000000, expense: 30000000 },
    { month: 'Mar', income: 41000000, expense: 31000000 },
    { month: 'Apr', income: 47000000, expense: 35000000 },
    { month: 'Mei', income: 45500000, expense: 33000000 },
    { month: 'Jun', income: 48750000, expense: 32450000 },
  ];

  const recentTransactions = [
    {
      id: 'TR-2306-001',
      date: '18 Jun 2025',
      description: 'Infaq Jumat',
      category: 'Pendapatan',
      amount: 4250000,
      type: 'income',
    },
    {
      id: 'TR-2306-002',
      date: '19 Jun 2025',
      description: 'Pembayaran Listrik',
      category: 'Operasional',
      amount: 1450000,
      type: 'expense',
    },
    {
      id: 'TR-2306-003',
      date: '20 Jun 2025',
      description: 'Donasi Bulanan PT ABC',
      category: 'Pendapatan',
      amount: 5000000,
      type: 'income',
    },
    {
      id: 'TR-2306-004',
      date: '22 Jun 2025',
      description: 'Pembelian Mukena',
      category: 'Perlengkapan',
      amount: 3500000,
      type: 'expense',
    },
    {
      id: 'TR-2306-005',
      date: '24 Jun 2025',
      description: 'Santunan Anak Yatim',
      category: 'Program',
      amount: 7500000,
      type: 'expense',
    },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-[#1C1C1C] text-white py-20 mt-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Laporan Keuangan
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              Transparansi pengelolaan dana Masjid Baiturrohim
            </p>
            <div className="inline-block bg-[#6DB144] text-white px-4 py-1 rounded-full font-medium text-sm">
              Terakhir diperbarui:{' '}
              {new Date().toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-medium">Total Pendapatan</h3>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                {formatCurrency(summaryData.pendapatan)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Periode: {currentMonth}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-medium">Total Pengeluaran</h3>
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                {formatCurrency(summaryData.pengeluaran)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Periode: {currentMonth}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-medium">Saldo Saat Ini</h3>
                <div className="w-10 h-10 rounded-full bg-[#6DB144]/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#6DB144]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                {formatCurrency(summaryData.saldo)}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Diperbarui secara real-time
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 font-medium">Jumlah Donatur</h3>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                {summaryData.donatur}{' '}
                <span className="text-sm font-normal text-gray-500">orang</span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Periode: {currentMonth}
              </p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
            <h2 className="text-xl font-bold mb-6">
              Grafik Keuangan 6 Bulan Terakhir
            </h2>
            <div className="h-80 w-full">
              {/* This would be replaced with an actual Chart component */}
              <div className="h-full w-full bg-gray-50 rounded-lg p-4 flex items-end justify-between">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center space-y-2"
                    style={{ height: '100%' }}
                  >
                    <div className="w-16 flex flex-col items-center space-y-1">
                      <div
                        className="w-6 bg-green-500 rounded-t-md"
                        style={{ height: `${(data.income / 50000000) * 100}%` }}
                        title={`Pendapatan: ${formatCurrency(data.income)}`}
                      ></div>
                      <div
                        className="w-6 bg-red-500 rounded-t-md"
                        style={{
                          height: `${(data.expense / 50000000) * 100}%`,
                        }}
                        title={`Pengeluaran: ${formatCurrency(data.expense)}`}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-gray-600">
                      {data.month}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Pendapatan</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Pengeluaran</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Transaksi Terbaru</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID Transaksi
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tanggal
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Deskripsi
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Kategori
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.category === 'Pendapatan'
                              ? 'bg-green-100 text-green-800'
                              : transaction.category === 'Operasional'
                              ? 'bg-yellow-100 text-yellow-800'
                              : transaction.category === 'Program'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {transaction.category}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+ ' : '- '}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">Rincian Pengeluaran</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Operasional Masjid
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      40%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: '40%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Program Kajian
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      25%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#6DB144] h-2 rounded-full"
                      style={{ width: '25%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Bakti Sosial
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      20%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: '20%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Pembangunan
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      15%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: '15%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold mb-6">Unduh Laporan</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg flex justify-between items-center hover:border-[#6DB144] transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Laporan Keuangan Bulanan</h3>
                      <p className="text-sm text-gray-500">Juni 2025 (PDF)</p>
                    </div>
                  </div>
                  <button className="text-[#6DB144] hover:text-[#5ca23a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4 border rounded-lg flex justify-between items-center hover:border-[#6DB144] transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Laporan Keuangan Tahunan</h3>
                      <p className="text-sm text-gray-500">2024 (PDF)</p>
                    </div>
                  </div>
                  <button className="text-[#6DB144] hover:text-[#5ca23a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4 border rounded-lg flex justify-between items-center hover:border-[#6DB144] transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm0 2a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Laporan Program Ramadhan</h3>
                      <p className="text-sm text-gray-500">2025 (PDF)</p>
                    </div>
                  </div>
                  <button className="text-[#6DB144] hover:text-[#5ca23a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Statement */}
      <section className="bg-[#1C1C1C] py-12 mt-16">
        <div className="container mx-auto px-6 2xl:px-0 xl:max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Komitmen Transparansi
            </h2>
            <p className="text-gray-400 mb-8">
              Masjid Baiturrohim berkomitmen untuk menjaga transparansi dan
              akuntabilitas dalam pengelolaan dana umat. Setiap donasi digunakan
              sesuai peruntukannya dan dilaporkan secara berkala.
            </p>
            <a
              href="/donasi"
              className="inline-block bg-[#6DB144] hover:bg-[#5ca23a] text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Salurkan Donasi
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
