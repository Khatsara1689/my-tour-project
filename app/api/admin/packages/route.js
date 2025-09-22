// file: app/api/admin/packages/route.js

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route'; // ตรวจสอบ path ให้ถูกต้อง

// GET: ดึงข้อมูลแพ็กเกจทัวร์ "ทั้งหมด" สำหรับ Admin
export async function GET() {
  const session = await getServerSession(authOptions);

  // ตรวจสอบสิทธิ์ ต้องเป็น Admin หรือ Owner เท่านั้น
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const packages = await prisma.tourPackage.findMany({
      orderBy: {
        createdAt: 'desc', // เรียงจากใหม่ไปเก่า
      },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Failed to fetch admin packages:", error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}