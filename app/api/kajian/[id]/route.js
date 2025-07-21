import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseFormData, saveImage, deleteImage } from '@/lib/imageUrl'; // Fixed import path
import Kajian from '@/app/front-user/kajian/page';

// Configure route settings
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // Ensure dynamic rendering

// GET - Mengambil detail satu kajian
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const kajianId = Number(id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID kajian harus berupa angka' },
        { status: 400 }
      );
    }

    const kajian = await prisma.kajian.findUnique({
      where: { id: kajianId },
    });

    if (!kajian) {
      return NextResponse.json(
        { error: 'Kajian tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(kajian);
  } catch (error) {
    console.error('Error fetching kajian detail:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail kajian' },
      { status: 500 }
    );
  }
}

// PUT - Memperbarui kajian dengan gambar
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const kajianId = Number(id);

    if (isNaN(kajianId)) {
      return NextResponse.json(
        { error: 'ID kajian harus berupa angka' },
        { status: 400 }
      );
    }

    const existingKajian = await prisma.kajian.findUnique({
      where: { id: kajianId },
    });

    if (!existingKajian) {
      return NextResponse.json(
        { error: 'Kajian tidak ditemukan' },
        { status: 404 }
      );
    }

    // Parse form data with possible new image
    const { fields, files } = await parseFormData(request);

    // Process new image if uploaded
    let imageUrl = existingKajian.imageUrl;
    if (files.image) {
      // Delete old image if exists
      if (existingKajian.imageUrl) {
        await deleteImage(existingKajian.imageUrl);
      }
      // Save new image
      imageUrl = await saveImage(files.image);
    }

    // Handle special case where user wants to remove image without uploading a new one
    const removeImage = fields.removeImage === 'true';
    if (removeImage && !files.image) {
      await deleteImage(existingKajian.imageUrl);
      imageUrl = null;
    }

    // Extract other fields from form
    const judul = fields.judul;
    const tanggal = fields.tanggal;
    const waktu = fields.waktu;
    const deskripsi = fields.deskripsi;
    const linkYoutube = fields.linkYoutube;

    // Update kajian
    const updatedKajian = await prisma.kajian.update({
      where: { id: kajianId },
      data: {
        judul: judul || existingKajian.judul,
        tanggal: tanggal ? new Date(tanggal) : existingKajian.tanggal,
        waktu: waktu || existingKajian.waktu,
        deskripsi:
          deskripsi !== undefined ? deskripsi : existingKajian.deskripsi,
        linkYoutube: linkYoutube || existingKajian.linkYoutube,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(updatedKajian);
  } catch (error) {
    console.error('Error updating kajian:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui kajian: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus kajian
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const kajianId = Number(id);

    if (isNaN(kajianId)) {
      return NextResponse.json(
        { error: 'ID kajian harus berupa angka' },
        { status: 400 }
      );
    }

    // Validasi keberadaan kajian
    const existingKajian = await prisma.kajian.findUnique({
      where: { id: kajianId },
    });

    if (!existingKajian) {
      return NextResponse.json(
        { error: 'Kajian tidak ditemukan' },
        { status: 404 }
      );
    }

    // Delete the associated image if exists
    if (existingKajian.imageUrl) {
      await deleteImage(existingKajian.imageUrl);
    }

    // Delete the kajian
    await prisma.kajian.delete({
      where: { id: kajianId },
    });

    return NextResponse.json(
      { message: 'Kajian berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting kajian:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus kajian' },
      { status: 500 }
    );
  }
}
