import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Color scheme
const colors = {
  primary: '#6DB144',
  secondary: '#1C5827',
  light: '#F8FAFC',
  dark: '#1C1C1C',
  gray: '#64748B',
};

// Helper for formatting dates
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Format currency helper
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Generate monthly report
export const generateMonthlyReport = (donasi, month, year) => {
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Filter donations for specific month and year
  const targetDate = new Date(year, month, 1);
  const monthlyDonations = donasi.filter((item) => {
    const donationDate = new Date(item.tanggal);
    return (
      donationDate.getMonth() === targetDate.getMonth() &&
      donationDate.getFullYear() === targetDate.getFullYear() &&
      item.status === 'Terverifikasi'
    );
  });

  // Calculate total
  const totalAmount = monthlyDonations.reduce(
    (sum, item) => sum + Number(item.nominal),
    0
  );

  // Header and title
  doc.setFillColor(colors.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Laporan Keuangan Bulanan', pageWidth / 2, 20, { align: 'center' });

  const monthName = targetDate.toLocaleString('id-ID', {
    month: 'long',
    year: 'numeric',
  });
  doc.setFontSize(14);
  doc.text(`Masjid Baiturrohim - ${monthName}`, pageWidth / 2, 30, {
    align: 'center',
  });

  // Summary section
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 50, pageWidth - 30, 35, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Ringkasan Donasi', 25, 62);

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(totalAmount), 25, 75);

  doc.setFontSize(10);
  doc.setTextColor(colors.gray);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Total ${monthlyDonations.length} transaksi donasi`,
    pageWidth - 25,
    75,
    { align: 'right' }
  );

  // Table of transactions
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Detail Transaksi', 15, 105);

  const tableColumn = ['Tanggal', 'Donatur', 'Deskripsi', 'Nominal'];
  const tableRows = [];

  monthlyDonations.forEach((item) => {
    const formattedDate = formatDate(item.tanggal);
    const donatur = item.nama_donatur;
    const description = item.deskripsi || '-';
    const amount = formatCurrency(item.nominal);

    tableRows.push([formattedDate, donatur, description, amount]);
  });

  // Add auto table - using imported function
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 110,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: {
      fillColor: [109, 177, 68],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { top: 10 },
  });

  // Get the y position after the table
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 50 : 200;

  // Footer
  doc.setFillColor(colors.primary);
  doc.rect(0, finalY, pageWidth, 20, 'F');

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Dicetak pada ${currentDate}`, pageWidth / 2, finalY + 10, {
    align: 'center',
  });

  // Return the PDF document
  return doc;
};

// Generate yearly report
export const generateYearlyReport = (donasi, year) => {
  // Create new PDF document
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Filter donations for specific year
  const yearlyDonations = donasi.filter((item) => {
    const donationDate = new Date(item.tanggal);
    return (
      donationDate.getFullYear() === year && item.status === 'Terverifikasi'
    );
  });

  // Calculate total for the year
  const totalAmount = yearlyDonations.reduce(
    (sum, item) => sum + Number(item.nominal),
    0
  );

  // Calculate monthly breakdown
  const monthlyBreakdown = Array(12)
    .fill(0)
    .map((_, index) => {
      const monthDonations = yearlyDonations.filter((item) => {
        const donationDate = new Date(item.tanggal);
        return donationDate.getMonth() === index;
      });

      const monthAmount = monthDonations.reduce(
        (sum, item) => sum + Number(item.nominal),
        0
      );

      return {
        month: new Date(year, index, 1).toLocaleString('id-ID', {
          month: 'long',
        }),
        amount: monthAmount,
        count: monthDonations.length,
      };
    });

  // Header and title
  doc.setFillColor(colors.secondary);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Laporan Keuangan Tahunan', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(14);
  doc.text(`Masjid Baiturrohim - Tahun ${year}`, pageWidth / 2, 30, {
    align: 'center',
  });

  // Summary section
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 50, pageWidth - 30, 35, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Total Donasi Tahunan', 25, 62);

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(totalAmount), 25, 75);

  doc.setFontSize(10);
  doc.setTextColor(colors.gray);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Total ${yearlyDonations.length} transaksi donasi`,
    pageWidth - 25,
    75,
    { align: 'right' }
  );

  // Monthly breakdown
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Ringkasan Bulanan', 15, 105);

  const tableColumn = ['Bulan', 'Jumlah Transaksi', 'Total'];
  const tableRows = [];

  monthlyBreakdown.forEach((item) => {
    tableRows.push([
      item.month,
      `${item.count} transaksi`,
      formatCurrency(item.amount),
    ]);
  });

  // Add auto table - using imported function
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 110,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: {
      fillColor: [28, 88, 39],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { top: 10 },
  });

  // Get the y position after the table
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : 200;

  if (yearlyDonations.length > 0) {
    // Group donations by donor
    const donorGroups = {};
    yearlyDonations.forEach((item) => {
      const donorName = item.nama_donatur;
      if (!donorGroups[donorName]) {
        donorGroups[donorName] = 0;
      }
      donorGroups[donorName] += Number(item.nominal);
    });

    // Convert to array and sort
    const topDonors = Object.entries(donorGroups)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text('Donatur Terbesar', 15, finalY);

    const donorColumns = ['Nama', 'Total Donasi'];
    const donorRows = topDonors.map((donor) => [
      donor.name,
      formatCurrency(donor.amount),
    ]);

    // Add second auto table - using imported function
    autoTable(doc, {
      head: [donorColumns],
      body: donorRows,
      startY: finalY + 5,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [109, 177, 68],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { top: 10 },
    });
  }

  // Get the final y position
  const finalYAfterDonors = doc.lastAutoTable
    ? doc.lastAutoTable.finalY + 30
    : finalY + 100;

  // Footer
  if (finalYAfterDonors < pageHeight - 20) {
    doc.setFillColor(colors.secondary);
    doc.rect(0, finalYAfterDonors, pageWidth, 20, 'F');

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    doc.text(
      `Dicetak pada ${currentDate}`,
      pageWidth / 2,
      finalYAfterDonors + 10,
      { align: 'center' }
    );
  }

  // Return the PDF document
  return doc;
};

// Helper function to download the generated PDF
export const downloadPdf = (doc, filename) => {
  doc.save(filename);
};
