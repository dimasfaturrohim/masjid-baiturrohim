import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseFormData, saveImage } from '@/lib/imageUrl';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const kegiatan = await prisma.kegiatan.findMany({
      orderBy: {
        tanggal: 'desc',
      },
    });

    return NextResponse.json(kegiatan);
  } catch (error) {
    console.error('Error fetching kegiatan:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data kegiatan' },
      { status: 500 }
    );
  }
}

// POST - Menambahkan kegiatan baru dengan gambar
export async function POST(request) {
  try {
    // Parse the multipart form data using our adapted method
    const { fields, files } = await parseFormData(request);

    // Extract fields from form
    const {
      nama,
      tanggal,
      waktu,
      lokasi,
      deskripsi,
      penanggungjawab,
      content,
    } = fields;

    // Validate required fields
    if (!nama || !tanggal || !waktu || !lokasi || !penanggungjawab) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi kecuali deskripsi dan content' },
        { status: 400 }
      );
    }

    let imageUrl = null;

    // Process the image if provided
    if (files.image) {
      imageUrl = await saveImage(files.image);
    }

    // Membuat kegiatan baru dengan gambar jika ada
    const kegiatan = await prisma.kegiatan.create({
      data: {
        nama: Array.isArray(nama) ? nama[0] : nama,
        tanggal: new Date(Array.isArray(tanggal) ? tanggal[0] : tanggal),
        waktu: Array.isArray(waktu) ? waktu[0] : waktu,
        lokasi: Array.isArray(lokasi) ? lokasi[0] : lokasi,
        deskripsi: Array.isArray(deskripsi) ? deskripsi[0] : deskripsi,
        penanggungjawab: Array.isArray(penanggungjawab)
          ? penanggungjawab[0]
          : penanggungjawab,
        content: Array.isArray(content) ? content[0] : content,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(kegiatan, { status: 201 });
  } catch (error) {
    console.error('Error creating kegiatan:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan kegiatan: ' + error.message },
      { status: 500 }
    );
  }
}
