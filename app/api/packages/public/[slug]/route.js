// file: app/api/packages/public/[slug]/route.js

import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // ตรวจสอบ path ให้ถูกต้อง

export async function GET(request, { params }) {
  // ดึงค่า slug จาก URL (เช่น /api/packages/public/tokyo-sakura-5d3n)
  const { slug } = params;

  try {
    const tourPackage = await prisma.tourPackage.findUnique({
      // ค้นหา record ที่ slug ตรงกัน และ ต้องเผยแพร่แล้วเท่านั้น
      where: {
        slug: slug,
        isPublished: true,
      },
    });

    // ถ้าไม่พบข้อมูลทัวร์ ให้ส่ง response 404 Not Found
    if (!tourPackage) {
      return NextResponse.json({ error: 'Tour package not found' }, { status: 404 });
    }

    // ถ้าพบข้อมูล ส่งข้อมูลกลับไป
    return NextResponse.json(tourPackage);

  } catch (error) {
    console.error(`Failed to fetch package ${slug}:`, error);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}