import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseFormData, saveImage, deleteImage } from '@/lib/imageUrl';

// Configure route settings
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET - Mengambil detail satu pengurus
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const pengurusId = Number(id);

    if (isNaN(pengurusId)) {
      return NextResponse.json(
        { error: 'ID pengurus harus berupa angka' },
        { status: 400 }
      );
    }

    const pengurus = await prisma.pengurus.findUnique({
      where: { id: pengurusId },
    });

    if (!pengurus) {
      return NextResponse.json(
        { error: 'Pengurus tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(pengurus);
  } catch (error) {
    console.error('Error fetching pengurus detail:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil detail pengurus' },
      { status: 500 }
    );
  }
}

// PUT - Memperbarui pengurus dengan gambar
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const pengurusId = Number(id);

    if (isNaN(pengurusId)) {
      return NextResponse.json(
        { error: 'ID pengurus harus berupa angka' },
        { status: 400 }
      );
    }

    const existingPengurus = await prisma.pengurus.findUnique({
      where: { id: pengurusId },
    });

    if (!existingPengurus) {
      return NextResponse.json(
        { error: 'Pengurus tidak ditemukan' },
        { status: 404 }
      );
    }

    // Parse form data with possible new image
    const { fields, files } = await parseFormData(request);

    // Extract jabatan from fields
    const { jabatan } = fields;

    // Jika jabatan diubah, periksa apakah jabatan baru sudah digunakan
    if (jabatan && jabatan !== existingPengurus.jabatan) {
      const jabatanTaken = await prisma.pengurus.findFirst({
        where: {
          jabatan: jabatan,
          id: { not: pengurusId }, // Exclude current pengurus
        },
      });

      if (jabatanTaken) {
        return NextResponse.json(
          {
            error: `Jabatan ${jabatan} sudah ditempati oleh ${jabatanTaken.nama}`,
          },
          { status: 409 } // Conflict status code
        );
      }
    }

    // Process new image if uploaded
    let imageUrl = existingPengurus.imageUrl;
    if (files.image) {
      // Delete old image if exists
      if (existingPengurus.imageUrl) {
        await deleteImage(existingPengurus.imageUrl);
      }
      // Save new image
      imageUrl = await saveImage(files.image);
    }

    // Handle special case where user wants to remove image without uploading a new one
    const removeImage = fields.removeImage === 'true';
    if (removeImage && !files.image) {
      await deleteImage(existingPengurus.imageUrl);
      imageUrl = null;
    }

    // Extract other fields from form
    const { nama, deskripsi, no_telepon, email } = fields;

    // Update pengurus
    const updatedPengurus = await prisma.pengurus.update({
      where: { id: pengurusId },
      data: {
        nama: nama || existingPengurus.nama,
        jabatan: jabatan || existingPengurus.jabatan,
        deskripsi:
          deskripsi !== undefined ? deskripsi : existingPengurus.deskripsi,
        no_telepon:
          no_telepon !== undefined ? no_telepon : existingPengurus.no_telepon,
        email: email !== undefined ? email : existingPengurus.email,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(updatedPengurus);
  } catch (error) {
    console.error('Error updating pengurus:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui pengurus: ' + error.message },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus pengurus
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const pengurusId = Number(id);

    if (isNaN(pengurusId)) {
      return NextResponse.json(
        { error: 'ID pengurus harus berupa angka' },
        { status: 400 }
      );
    }

    // Validasi keberadaan pengurus
    const existingPengurus = await prisma.pengurus.findUnique({
      where: { id: pengurusId },
    });

    if (!existingPengurus) {
      return NextResponse.json(
        { error: 'Pengurus tidak ditemukan' },
        { status: 404 }
      );
    }

    // Delete the associated image if exists
    if (existingPengurus.imageUrl) {
      await deleteImage(existingPengurus.imageUrl);
    }

    // Delete the pengurus
    await prisma.pengurus.delete({
      where: { id: pengurusId },
    });

    return NextResponse.json(
      { message: 'Pengurus berhasil dihapus' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting pengurus:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus pengurus' },
      { status: 500 }
    );
  }
}
