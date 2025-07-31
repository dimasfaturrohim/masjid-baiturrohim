import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email dibutuhkan' }, { status: 400 });
    }

    // Cek environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY tidak ditemukan');
      return NextResponse.json(
        { error: 'Konfigurasi email tidak lengkap' },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('NEXT_PUBLIC_APP_URL tidak ditemukan');
      return NextResponse.json(
        { error: 'URL aplikasi tidak dikonfigurasi' },
        { status: 500 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email tidak ditemukan' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 jam

    // Simpan reset token ke database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Kirim email reset password
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/front-admin/reset-password?token=${resetToken}`;

    try {
      const emailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Password - Masjid Baiturrohim',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Reset Password</h2>
            <p>Halo ${user.name || user.username},</p>
            <p>Anda telah meminta reset password untuk akun Anda.</p>
            <p>Klik link di bawah ini untuk reset password:</p>
            <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
              Reset Password
            </a>
            <p>Link ini akan kadaluarsa dalam 1 jam.</p>
            <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
            <hr style="margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Email ini dikirim dari sistem Masjid Baiturrohim
            </p>
          </div>
        `,
      });

      console.log('Email berhasil dikirim:', emailResult);
    } catch (emailError) {
      console.error('Error mengirim email:', emailError);
      return NextResponse.json(
        { error: 'Gagal mengirim email. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Email reset password telah dikirim',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
