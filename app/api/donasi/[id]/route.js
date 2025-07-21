import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Configure route settings
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

// GET - Mengambil detail satu donasi
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const donasiId = Number(id);

    if (isNaN(donasiId)) {
      return NextResponse.json(
        { error: 'ID donasi harus berupa angka' },
        { status: 400 }
      );
    }

    const donasi = await prisma.donasi.findUnique({
      where: { id: donasiId },
    });

    if (!donasi) {
      return NextResponse.json(
        { error: 'Donasi tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(donasi);
  } catch (error) {
    console.error('Error fetching donasi detail:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail donasi' },
      { status: 500 }
    );
  }
}

// PUT - Memperbarui donasi
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const donasiId = Number(id);

    if (isNaN(donasiId)) {
      return NextResponse.json(
        { error: 'ID donasi harus berupa angka' },
        { status: 400 }
      );
    }

    const existingDonasi = await prisma.donasi.findUnique({
      where: { id: donasiId },
    });

    if (!existingDonasi) {
      return NextResponse.json(
        { error: 'Donasi tidak ditemukan' },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { nama_donatur, tanggal, nominal, deskripsi, status } = body;

    // Update donasi
    const updatedDonasi = await prisma.donasi.update({
      where: { id: donasiId },
      data: {
        nama_donatur: nama_donatur || existingDonasi.nama_donatur,
        tanggal: tanggal ? new Date(tanggal) : existingDonasi.tanggal,
        nominal:
          nominal !== undefined ? parseFloat(nominal) : existingDonasi.nominal,
        deskripsi:
          deskripsi !== undefined ? deskripsi : existingDonasi.deskripsi,
        status: status || existingDonasi.status,
      },
    });

    return NextResponse.json(updatedDonasi);
  } catch (error) {
    console.error('Error updating donasi:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui donasi: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus donasi
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const donasiId = Number(id);

    if (isNaN(donasiId)) {
      return NextResponse.json(
        { error: 'ID donasi harus berupa angka' },
        { status: 400 }
      );
    }

    // Validasi keberadaan donasi
    const existingDonasi = await prisma.donasi.findUnique({
      where: { id: donasiId },
    });

    if (!existingDonasi) {
      return NextResponse.json(
        { error: 'Donasi tidak ditemukan' },
        { status: 404 }
      );
    }

    // Delete the donasi
    await prisma.donasi.delete({
      where: { id: donasiId },
    });

    return NextResponse.json(
      { message: 'Donasi berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting donasi:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus donasi' },
      { status: 500 }
    );
  }
}
