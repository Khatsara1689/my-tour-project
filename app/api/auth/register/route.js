import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Ensure this relative path is correct
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // --- Validation Checks ---
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 });
    }

    // Check password length
    if (password.length < 6) {
      return NextResponse.json({ error: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' }, { status: 400 });
    }

    // --- Database Operations ---
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'อีเมลนี้มีผู้ใช้งานแล้ว' }, { status: 409 });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role: 'member',
      },
    });

    // Don't send the hashed password back to the client
    const { hashedPassword: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ message: 'สมัครสมาชิกสำเร็จ!', user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    // This will catch any unexpected errors, including Prisma errors
    console.error("Registration API Error:", error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง' }, { status: 500 });
  }
}

