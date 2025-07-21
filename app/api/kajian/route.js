import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseFormData, saveImage } from '@/lib/imageUrl';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const kajian = await prisma.kajian.findMany({
      orderBy: {
        tanggal: 'desc',
      },
    });

    return NextResponse.json(kajian);
  } catch (error) {
    console.error('Error fetching kajian:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data kajian' },
      { status: 500 }
    );
  }
}

// POST - Menambahkan kajian baru dengan gambar
export async function POST(request) {
  try {
    // Parse the multipart form data using our adapted method
    const { fields, files } = await parseFormData(request);

    // Extract fields from form
    const { judul, tanggal, waktu, deskripsi, linkYoutube } = fields;

    // Validate required fields
    if (!judul || !tanggal || !waktu || !linkYoutube) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi kecuali deskripsi' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Process the image if provided
    if (files.image) {
      imageUrl = await saveImage(files.image);
    }

    // Membuat kajian baru dengan gambar jika ada
    const kajian = await prisma.kajian.create({
      data: {
        judul: Array.isArray(judul) ? judul[0] : judul,
        tanggal: new Date(Array.isArray(tanggal) ? tanggal[0] : tanggal),
        waktu: Array.isArray(waktu) ? waktu[0] : waktu,
        linkYoutube: Array.isArray(linkYoutube) ? linkYoutube[0] : linkYoutube,
        deskripsi: Array.isArray(deskripsi) ? deskripsi[0] : deskripsi,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(kajian, { status: 201 });
  } catch (error) {
    console.error('Error creating kajian:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan kajian: ' + error.message },
      { status: 500 }
    );
  }
}
