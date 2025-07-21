import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseFormData, saveImage } from '@/lib/imageUrl';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const pengurus = await prisma.pengurus.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return NextResponse.json(pengurus);
  } catch (error) {
    console.error('Error fetching pengurus:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data pengurus' },
      { status: 500 }
    );
  }
}

// POST - Menambahkan pengurus baru dengan gambar
export async function POST(request) {
  try {
    // Parse form data including possible image upload
    const { fields, files } = await parseFormData(request);
    const { nama, jabatan, deskripsi, no_telepon, email } = fields;

    // Validasi field yang diperlukan
    if (!nama || !jabatan) {
      return NextResponse.json(
        { error: 'Nama dan jabatan harus diisi' },
        { status: 400 }
      );
    }

    // Cek apakah jabatan sudah digunakan oleh orang lain
    const existingWithJabatan = await prisma.pengurus.findFirst({
      where: { jabatan: jabatan },
    });

    if (existingWithJabatan) {
      return NextResponse.json(
        {
          error: `Jabatan ${jabatan} sudah ditempati oleh ${existingWithJabatan.nama}`,
        },
        { status: 409 } // Conflict status code
      );
    }

    // Process image if uploaded
    let imageUrl = null;
    if (files.image) {
      imageUrl = await saveImage(files.image);
    }

    // Create new pengurus
    const newPengurus = await prisma.pengurus.create({
      data: {
        nama,
        jabatan,
        deskripsi: deskripsi || null,
        no_telepon: no_telepon || null,
        email: email || null,
        imageUrl,
      },
    });

    return NextResponse.json(newPengurus, { status: 201 });
  } catch (error) {
    console.error('Error creating pengurus:', error);
    return NextResponse.json(
      { error: 'Gagal membuat data pengurus: ' + error.message },
      { status: 500 }
    );
  }
}
