import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';

// GET - Mengambil semua data donasi
export async function GET(request) {
  try {
    const donasi = await prisma.donasi.findMany({
      orderBy: {
        tanggal: 'desc',
      },
    });

    return NextResponse.json(donasi);
  } catch (error) {
    console.error('Error fetching donasi:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data donasi' },
      { status: 500 }
    );
  }
}

// POST - Menambahkan donasi baru
export async function POST(request) {
  try {
    const body = await request.json();

    // Extract fields
    const { nama_donatur, tanggal, nominal, deskripsi, status } = body;

    // Validate required fields
    if (!nama_donatur || !tanggal || !nominal || !status) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi kecuali deskripsi' },
        { status: 400 }
      );
    }

    // Membuat donasi baru
    const donasi = await prisma.donasi.create({
      data: {
        nama_donatur,
        tanggal: new Date(tanggal),
        nominal: parseFloat(nominal),
        deskripsi,
        status,
      },
    });

    return NextResponse.json(donasi, { status: 201 });
  } catch (error) {
    console.error('Error creating donasi:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan donasi: ' + error.message },
      { status: 500 }
    );
  }
}
