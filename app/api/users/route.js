import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, verifyToken } from '@/lib/auth';

// GET - Mendapatkan semua user (super admin only)
export async function GET(request) {
  try {
    // Verify token and check role
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = await verifyToken(token);

    if (!payload || payload.role !== 'super_admin') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data user' },
      { status: 500 }
    );
  }
}

// POST - Membuat user baru (super admin only)
export async function POST(request) {
  try {
    // Verify token and check role
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = await verifyToken(token);

    if (!payload || payload.role !== 'super_admin') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const body = await request.json();
    const { username, password, name, role } = body;

    // Validasi input
    if (!username || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    if (!['admin', 'super_admin'].includes(role)) {
      return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 });
    }

    // Cek username sudah ada atau belum
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Gagal membuat user' }, { status: 500 });
  }
}

// PUT - Update user (super admin only)
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    // Verify token and check role
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = await verifyToken(token);

    if (!payload || payload.role !== 'super_admin') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    const body = await request.json();
    const { username, password, name, role } = body;

    // Validasi input
    if (!username || !name || !role) {
      return NextResponse.json(
        { error: 'Username, name, dan role wajib diisi' },
        { status: 400 }
      );
    }

    if (!['admin', 'super_admin'].includes(role)) {
      return NextResponse.json({ error: 'Role tidak valid' }, { status: 400 });
    }

    // Cek user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Cek username sudah digunakan oleh user lain
    const usernameExists = await prisma.user.findFirst({
      where: {
        username,
        id: { not: parseInt(id) },
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        { error: 'Username sudah digunakan' },
        { status: 409 }
      );
    }

    // Prepare update data
    const updateData = {
      username,
      name,
      role,
    };

    // Hash password jika ada
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate user' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus user (super admin only)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Verify token and check role
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const payload = await verifyToken(token);

    if (!payload || payload.role !== 'super_admin') {
      return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 });
    }

    // Cek user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Jangan izinkan super admin menghapus dirinya sendiri
    if (payload.id === parseInt(id)) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus akun sendiri' },
        { status: 400 }
      );
    }

    // Hapus user
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus user' },
      { status: 500 }
    );
  }
}
