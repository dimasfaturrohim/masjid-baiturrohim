import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseFormData, saveImage, deleteImage } from '@/lib/imageUrl'; // Fixed import path
import Kegiatan from '@/app/front-user/kegiatan/page';

// Configure route settings
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

// GET - Mengambil detail satu kegiatan
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const kegiatanId = Number(id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID kegiatan harus berupa angka' },
        { status: 400 }
      );
    }

    const kegiatan = await prisma.kegiatan.findUnique({
      where: { id: kegiatanId },
    });

    if (!kegiatan) {
      return NextResponse.json(
        { error: 'Kegiatan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(kegiatan);
  } catch (error) {
    console.error('Error fetching kegiatan detail:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail kegiatan' },
      { status: 500 }
    );
  }
}

// PUT - Memperbarui kegiatan dengan gambar
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const kegiatanId = Number(id);

    if (isNaN(kegiatanId)) {
      return NextResponse.json(
        { error: 'ID kegiatan harus berupa angka' },
        { status: 400 }
      );
    }

    const existingKegiatan = await prisma.kegiatan.findUnique({
      where: { id: kegiatanId },
    });

    if (!existingKegiatan) {
      return NextResponse.json(
        { error: 'Kegiatan tidak ditemukan' },
        { status: 404 }
      );
    }

    // Parse form data with possible new image
    const { fields, files } = await parseFormData(request);

    // Process new image if uploaded
    let imageUrl = existingKegiatan.imageUrl;
    if (files.image) {
      // Delete old image if exists
      if (existingKegiatan.imageUrl) {
        await deleteImage(existingKegiatan.imageUrl);
      }
      // Save new image
      imageUrl = await saveImage(files.image);
    }

    // Handle special case where user wants to remove image without uploading a new one
    const removeImage = fields.removeImage === 'true';
    if (removeImage && !files.image) {
      await deleteImage(existingKegiatan.imageUrl);
      imageUrl = null;
    }

    // Extract other fields from form
    const nama = fields.nama;
    const tanggal = fields.tanggal;
    const waktu = fields.waktu;
    const lokasi = fields.lokasi;
    const deskripsi = fields.deskripsi;
    const penanggungjawab = fields.penanggungjawab;
    const content = fields.content;

    // Update kegiatan
    const updatedKegiatan = await prisma.kegiatan.update({
      where: { id: kegiatanId },
      data: {
        nama: nama || existingKegiatan.nama,
        tanggal: tanggal ? new Date(tanggal) : existingKegiatan.tanggal,
        waktu: waktu || existingKegiatan.waktu,
        lokasi: lokasi || existingKegiatan.lokasi,
        deskripsi:
          deskripsi !== undefined ? deskripsi : existingKegiatan.deskripsi,
        penanggungjawab: penanggungjawab || existingKegiatan.penanggungjawab,
        content: content !== undefined ? content : existingKegiatan.content,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(updatedKegiatan);
  } catch (error) {
    console.error('Error updating kegiatan:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui kegiatan: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus kegiatan
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const kegiatanId = Number(id);

    if (isNaN(kegiatanId)) {
      return NextResponse.json(
        { error: 'ID kegiatan harus berupa angka' },
        { status: 400 }
      );
    }

    // Validasi keberadaan kegiatan
    const existingKegiatan = await prisma.kegiatan.findUnique({
      where: { id: kegiatanId },
    });

    if (!existingKegiatan) {
      return NextResponse.json(
        { error: 'Kegiatan tidak ditemukan' },
        { status: 404 }
      );
    }

    // Delete the associated image if exists
    if (existingKegiatan.imageUrl) {
      await deleteImage(existingKegiatan.imageUrl);
    }

    // Delete the kegiatan
    await prisma.kegiatan.delete({
      where: { id: kegiatanId },
    });

    return NextResponse.json(
      { message: 'Kegiatan berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting kegiatan:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus kegiatan' },
      { status: 500 }
    );
  }
}
