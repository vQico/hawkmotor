'use server';

import { cookies } from 'next/headers';
import db from '@/lib/db';
import { comparePassword, signToken, verifyToken } from '@/lib/auth';

export async function loginAdmin(state: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, error: 'Lütfen tüm alanları doldurun.' };
    }

    const user = await db.adminUser.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'Hatalı e-posta veya şifre.' };
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Hatalı e-posta veya şifre.' };
    }

    // Sign Token
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    // Set HTTP-Only Cookie
    const cookieStore = await cookies();
    cookieStore.set('hawk_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true, name: user.name };
  } catch (error: any) {
    console.error('Login action error:', error);
    return { success: false, error: 'Sistem hatası oluştu.' };
  }
}

export async function logoutAdmin() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('hawk_admin_token');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false };
  }
}

export async function getCurrentAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('hawk_admin_token')?.value;
    if (!token) return null;

    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
