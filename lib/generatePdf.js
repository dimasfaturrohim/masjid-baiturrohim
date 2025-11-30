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
  return new Date(date).toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
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

const loadImageAsBase64 = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};


// Generate monthly report
export const generateMonthlyReport = async (donasi, month, year) => {
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

  const tableColumn = ['Tanggal/Waktu', 'Donatur', 'Deskripsi', 'Nominal'];
  const tableRows = [];

  monthlyDonations.forEach((item) => {
    const formattedDate = formatDate(item.createdAt);
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

  const footerHeight = 20;
const footerY = pageHeight - footerHeight;

  const signatureBase64 = await loadImageAsBase64('/images/ttd.png');

// Signature layout
const blockCenterX = pageWidth - 40;
const signatureWidth = 40;
const signatureHeight = 15;

// Letakkan blok tanda tangan 70px di atas footer
const signatureBlockTop = footerY - 70;

// Text: Mengetahui
doc.setFontSize(11);
doc.setTextColor(30, 30, 30);
doc.text('Mengetahui,', blockCenterX, signatureBlockTop, { align: 'center' });

// Text: Kepala Badan Musyawarah
doc.setFontSize(11);
doc.text('Kepala Badan Musyawarah', blockCenterX, signatureBlockTop + 8, {
  align: 'center',
});

// Add signature image
doc.addImage(
  signatureBase64.startsWith('data:image')
    ? signatureBase64
    : `data:image/png;base64,${signatureBase64}`,
  'PNG',
  blockCenterX - signatureWidth / 2,
  signatureBlockTop + 15,
  signatureWidth,
  signatureHeight
);

// Text: Name
doc.setFontSize(11);
doc.text('M. Syaifuddin', blockCenterX, signatureBlockTop + 15 + signatureHeight + 10, {
  align: 'center',
});

  
  // Footer (fixed at bottom

const currentDate = new Date().toLocaleDateString('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

doc.setFillColor(colors.primary);
doc.rect(0, footerY, pageWidth, footerHeight, 'F');

doc.setFontSize(10);
doc.setTextColor(255, 255, 255);

doc.text(`Dicetak pada ${currentDate}`, pageWidth / 2, footerY + 12, {
  align: 'center',
});


  // Return the PDF document
  return doc;
};

// Generate yearly report
export const generateYearlyReport = async (donasi, year) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Filter donations for the year
  const yearlyDonations = donasi.filter((item) => {
    const donationDate = new Date(item.tanggal);
    return donationDate.getFullYear() === year && item.status === 'Terverifikasi';
  });

  const totalAmount = yearlyDonations.reduce(
    (sum, item) => sum + Number(item.nominal),
    0
  );

  // Monthly breakdown
  const monthlyBreakdown = Array(12).fill(0).map((_, index) => {
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

  // Header
  doc.setFillColor(colors.secondary);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text('Laporan Keuangan Tahunan', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(14);
  doc.text(`Masjid Baiturrohim - Tahun ${year}`, pageWidth / 2, 30, {
    align: 'center',
  });

  // Summary Box
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

  // Monthly Table
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Ringkasan Bulanan', 15, 105);

  autoTable(doc, {
    head: [['Bulan', 'Jumlah Transaksi', 'Total']],
    body: monthlyBreakdown.map((item) => [
      item.month,
      `${item.count} transaksi`,
      formatCurrency(item.amount),
    ]),
    startY: 110,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: {
      fillColor: [28, 88, 39],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  // --- NEW PAGE FOR TOP DONORS ---
  doc.addPage();

  const finalY = 40; // offset start on new page

  // Top Donors
  const donorGroups = {};
  yearlyDonations.forEach((item) => {
    const donorName = item.nama_donatur;
    if (!donorGroups[donorName]) donorGroups[donorName] = 0;
    donorGroups[donorName] += Number(item.nominal);
  });

  const topDonors = Object.entries(donorGroups)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Donatur Terbesar', 15, finalY);

  autoTable(doc, {
    head: [['Nama', 'Total Donasi']],
    body: topDonors.map((d) => [d.name, formatCurrency(d.amount)]),
    startY: finalY + 10,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: {
      fillColor: [109, 177, 68],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  // SIGNATURE + FOOTER ONLY ON LAST PAGE
  const lastPageNumber = doc.internal.getNumberOfPages();
  doc.setPage(lastPageNumber);

  const footerHeight = 20;
  const footerY = pageHeight - footerHeight;

  // --- SIGNATURE SECTION ---
  const signatureBase64 = await loadImageAsBase64('/images/ttd.png');
  const blockCenterX = pageWidth - 40; // kanan
  const signatureWidth = 50;
  const signatureHeight = 25;
  const signatureBlockTop = footerY - 70;

  doc.setFontSize(11);
  doc.setTextColor(30, 30, 30);
  doc.text('Mengetahui,', blockCenterX, signatureBlockTop, { align: 'center' });
  doc.text(
    'Kepala Badan Musyawarah',
    blockCenterX,
    signatureBlockTop + 8,
    { align: 'center' }
  );

  doc.addImage(
    signatureBase64.startsWith('data:image')
      ? signatureBase64
      : `data:image/png;base64,${signatureBase64}`,
    'PNG',
    blockCenterX - signatureWidth / 2,
    signatureBlockTop + 15,
    signatureWidth,
    signatureHeight
  );

  doc.text(
    'M. Syaifuddin',
    blockCenterX,
    signatureBlockTop + 15 + signatureHeight + 10,
    { align: 'center' }
  );

  // --- FOOTER ALWAYS ON LAST PAGE ---
  doc.setFillColor(colors.secondary);
  doc.rect(0, footerY, pageWidth, footerHeight, 'F');

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
    footerY + 12,
    { align: 'center' }
  );

  return doc;
};


// Helper function to download the generated PDF
export const downloadPdf = (doc, filename) => {
  doc.save(filename);
};
