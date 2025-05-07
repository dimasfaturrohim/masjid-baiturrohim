import '../app/globals.css';

export const metadata = {
  title: 'Masjid Baiturrohim', // Ganti judul website di sini
  icons: {
    icon: '/images/Logo Masjid Baiturrohim.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
