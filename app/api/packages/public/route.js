// file: app/api/packages/public/route.js

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // ตรวจสอบว่า path ถูกต้อง

// GET: ดึงข้อมูลแพ็กเกจทัวร์ที่ "เผยแพร่แล้ว" ทั้งหมด
export async function GET() {
  try {
    const packages = await prisma.tourPackage.findMany({
      // เงื่อนไขสำคัญ: ดึงเฉพาะแพ็กเกจที่ isPublished: true เท่านั้น
      where: {
        isPublished: true,
      },
      // เรียงลำดับจากใหม่ไปเก่า
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error("Failed to fetch tour packages:", error);
    // ส่ง response แจ้งว่าเกิดข้อผิดพลาด
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}