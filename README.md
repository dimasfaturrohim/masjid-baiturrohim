# Masjid Baiturrohim - Website Management System

[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.7.0-green)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC)](https://tailwindcss.com/)

Website manajemen masjid yang modern dan responsif dengan sistem role-based access control untuk mengelola kegiatan, kajian, donasi, dan pengurus masjid.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Database](#-struktur-database)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Struktur Proyek](#-struktur-proyek)
- [Deployment](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur Utama

### 🎯 **Content Management System (CMS)**

- **Kegiatan Management**: Kelola kegiatan masjid dengan gambar dan deskripsi
- **Kajian Management**: Atur jadwal kajian dengan integrasi YouTube
- **Pengurus Management**: Direktori pengurus dengan foto dan kontak
- **Donasi Management**: Sistem tracking donasi dengan status verifikasi

### 🔐 **Role-Based Access Control**

- **Super Admin**: Akses penuh ke seluruh sistem + manajemen user
- **Admin**: Akses terbatas untuk manajemen konten

### 📊 **Financial Management**

- **Donasi Tracking**: Monitor semua donasi masuk
- **Laporan Keuangan**: Generate laporan bulanan dan tahunan dalam PDF
- **Analytics**: Analisis donatur dan trend keuangan

### 🎨 **User Interface**

- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Modern UI**: Interface yang clean dan user-friendly
- **Real-time Updates**: Data terupdate secara real-time

## 🛠️ Teknologi yang Digunakan

| Komponen               | Teknologi         | Versi          | Keterangan                               |
| ---------------------- | ----------------- | -------------- | ---------------------------------------- |
| **Frontend Framework** | Next.js           | 15.2.3         | React-based full-stack framework         |
| **UI Framework**       | Tailwind CSS      | 4.x            | Utility-first CSS framework              |
| **Database**           | PostgreSQL        | -              | Database relasional                      |
| **ORM**                | Prisma            | 6.7.0          | Database toolkit & ORM                   |
| **Authentication**     | JWT + bcryptjs    | 9.0.2 + 3.0.2  | Token-based auth dengan password hashing |
| **Image Processing**   | Sharp             | 0.34.1         | Image optimization & resizing            |
| **File Upload**        | Vercel Blob       | 1.0.1          | Cloud storage untuk gambar               |
| **PDF Generation**     | jsPDF + autoTable | 2.5.1 + 3.5.28 | Laporan PDF                              |
| **Icons**              | Heroicons         | 2.2.0          | Icon library                             |
| **Form Handling**      | Formidable        | 3.5.4          | Multipart form parsing                   |

## ️ Struktur Database

### Schema Prisma

```prisma
// User Management
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  name      String?
  role      String   @default("admin") // "super_admin" atau "admin"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Content Management
model Kegiatan {
  id               Int      @id @default(autoincrement())
  nama             String
  tanggal          DateTime
  waktu            String
  lokasi           String
  deskripsi        String?
  penanggungjawab  String
  content          String?
  imageUrl         String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Kajian {
  id               Int      @id @default(autoincrement())
  judul            String
  tanggal          DateTime
  waktu            String
  deskripsi        String?
  imageUrl         String?
  linkYoutube      String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

// Financial Management
model Donasi {
  id               Int      @id @default(autoincrement())
  nama_donatur     String
  tanggal          DateTime
  nominal          Decimal @db.Decimal(15, 2)
  deskripsi        String?
  status           String
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

// Organization Management
model Pengurus {
  id               Int      @id @default(autoincrement())
  nama             String
  jabatan          String
  deskripsi        String?
  no_telepon       String?
  email            String?
  imageUrl         String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

## 🚀 Instalasi

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**

```bash
git clone https://github.com/yourusername/masjid-baiturrohim.git
cd masjid-baiturrohim
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

4. **Konfigurasi database**

```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push

# Seed data awal
npm run seed
```

5. **Jalankan development server**

```bash
npm run dev
```

6. **Buka browser**
