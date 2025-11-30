'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/navbar/footer';
import {
  generateMonthlyReport,
  generateYearlyReport,
  downloadPdf,
} from '../../../lib/generatePdf';

export default function Laporan() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donasi, setDonasi] = useState([]);
  const [summaryData, setSummaryData] = useState({
    pendapatan: 0,
    saldo: 0,
    donatur: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Fetch donasi data from backend
  useEffect(() => {
    const fetchDonasi = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/donasi');

        if (!response.ok) {
          throw new Error('Failed to fetch donation data');
        }

        const data = await response.json();

        // Set raw data
        setDonasi(data);

        // Process data for summary
        processData(data);

        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error fetching donations:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonasi();
  }, []);

  // Process data for different sections
  const processData = (data) => {
    if (!data || !data.length) return;

    // 1. Calculate summary data
    const totalDonasi = data.reduce((sum, item) => {
      // Only count verified donations
      return item.status === 'Terverifikasi' ? sum + Number(item.nominal) : sum;
    }, 0);

    const uniqueDonors = new Set(data.map((item) => item.nama_donatur)).size;

    setSummaryData({
      pendapatan: totalDonasi,
      saldo: totalDonasi, // Since we're removing expenses, saldo equals total income
      donatur: uniqueDonors,
    });

    // 2. Calculate monthly data
    const monthlyDonations = processMonthlyData(data);
    setMonthlyData(monthlyDonations);

    // 3. Get recent transactions
    const recent = data
      .filter((item) => item.status === 'Terverifikasi')
      .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
      .slice(0, 5)
      .map((item) => ({
        id: item.id,
        date: new Date(item.tanggal).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        description: item.deskripsi || `Donasi dari ${item.nama_donatur}`,
        amount: Number(item.nominal),
        type: 'income',
      }));

    setRecentTransactions(recent);
  };

  // Process monthly data for chart
  const processMonthlyData = (data) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Mei',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Des',
    ];

    // Get last 6 months
    const today = new Date();
    const lastSixMonths = [];

    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      lastSixMonths.push({
        month: months[month.getMonth()],
        year: month.getFullYear(),
        monthIndex: month.getMonth(),
        income: 0,
      });
    }

    // Fill in donation amounts
    data.forEach((donation) => {
      const donationDate = new Date(donation.tanggal);

      // Only count verified donations
      if (donation.status !== 'Terverifikasi') return;

      // Check if this donation falls within our 6-month window
      const monthEntry = lastSixMonths.find(
        (m) =>
          m.monthIndex === donationDate.getMonth() &&
          m.year === donationDate.getFullYear()
      );

      if (monthEntry) {
        monthEntry.income += Number(donation.nominal);
      }
    });

    return lastSixMonths;
  };

  // Generate and download monthly report
  const handleDownloadMonthlyReport = async () => {
    try {
      setIsGeneratingPdf(true);

      // Get current month and year
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Generate report
      const doc = await generateMonthlyReport(donasi, currentMonth, currentYear);

      // Generate filename
      const monthName = now.toLocaleString('id-ID', { month: 'long' });
      const filename = `Laporan_Bulanan_${monthName}_${currentYear}.pdf`;

      // Download
      downloadPdf(doc, filename);
    } catch (err) {
      console.error('Error generating monthly report:', err);
      alert('Gagal membuat laporan bulanan. Silakan coba lagi.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Generate and download yearly report
  const handleDownloadYearlyReport = async () => {
    try {
      setIsGeneratingPdf(true);

      // Get current year
      const currentYear = new Date().getFullYear();

      // Generate report
      const doc = await generateYearlyReport(donasi, currentYear);

      // Generate filename
      const filename = `Laporan_Tahunan_${currentYear}.pdf`;

      // Download
      downloadPdf(doc, filename);
    } catch (err) {
      console.error('Error generating yearly report:', err);
      alert('Gagal membuat laporan tahunan. Silakan coba lagi.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

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
              {lastUpdated.toLocaleString('id-ID', {
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
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#6DB144] mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Memuat data laporan keuangan...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
                <p className="font-medium">
                  Terjadi kesalahan saat memuat data
                </p>
                <p className="text-sm mt-1">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">
                      Total Pendapatan
                    </h3>
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
                    Total donasi terverifikasi
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 font-medium">
                      Saldo Saat Ini
                    </h3>
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
                    <h3 className="text-gray-500 font-medium">
                      Jumlah Donatur
                    </h3>
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
                    <span className="text-sm font-normal text-gray-500">
                      orang
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Jumlah donatur unik
                  </p>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
                <h2 className="text-xl font-bold mb-6">
                  Grafik Donasi 6 Bulan Terakhir
                </h2>
                <div className="h-80 w-full">
                  {/* Chart visualization */}
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
                            style={{
                              height: `${
                                data.income > 0
                                  ? (data.income /
                                      Math.max(
                                        ...monthlyData.map((d) => d.income || 1)
                                      )) *
                                      70 +
                                    10
                                  : 5
                              }%`,
                            }}
                            title={`Pendapatan: ${formatCurrency(data.income)}`}
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
                      <span className="text-sm text-gray-600">
                        Total Donasi
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">
                    Transaksi Donasi Terbaru
                  </h2>
                </div>
                {recentTransactions.length > 0 ? (
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
                              TR-{transaction.id.toString().padStart(4, '0')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-green-600">
                              + {formatCurrency(transaction.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Belum ada transaksi donasi yang tercatat.
                  </div>
                )}
              </div>

              {/* Download Reports Section */}
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
                        <h3 className="font-medium">
                          Laporan Keuangan Bulanan
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date().toLocaleString('id-ID', {
                            month: 'long',
                            year: 'numeric',
                          })}{' '}
                          (PDF)
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-[#6DB144] hover:text-[#5ca23a] flex items-center"
                      onClick={handleDownloadMonthlyReport}
                      disabled={isGeneratingPdf}
                    >
                      {isGeneratingPdf ? (
                        <div className="w-6 h-6 border-2 border-[#6DB144] border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
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
                      )}
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
                        <h3 className="font-medium">
                          Laporan Keuangan Tahunan
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date().getFullYear()} (PDF)
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-[#6DB144] hover:text-[#5ca23a] flex items-center"
                      onClick={handleDownloadYearlyReport}
                      disabled={isGeneratingPdf}
                    >
                      {isGeneratingPdf ? (
                        <div className="w-6 h-6 border-2 border-[#6DB144] border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
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
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
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
