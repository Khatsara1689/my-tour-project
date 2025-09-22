// file: app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // 1. ค้นหาผู้ใช้ด้วยอีเมล
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 }); // 401 Unauthorized
  }

  // 2. เปรียบเทียบรหัสผ่านที่ส่งมากับรหัสผ่านที่เข้ารหัสไว้ใน DB
  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // 3. ส่งข้อมูลผู้ใช้กลับไป (โดยไม่ส่งรหัสผ่าน)
  const { hashedPassword, ...userWithoutPassword } = user;

  // !! หมายเหตุสำคัญ !!
  // ในระบบจริง ขั้นตอนนี้คือขั้นตอนที่คุณจะต้อง "สร้าง Session" หรือ "JWT Token"
  // เพื่อส่งกลับไปให้ Frontend ใช้ในการยืนยันตัวตนครั้งต่อไป
  // แต่สำหรับตอนนี้ เราจะส่งแค่ข้อมูลผู้ใช้กลับไปก่อน

  return NextResponse.json({ message: 'Login successful!', user: userWithoutPassword }, { status: 200 });
}