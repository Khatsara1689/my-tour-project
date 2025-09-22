// file: app/api/profile/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // ตรวจสอบว่า path ถูกต้อง

const prisma = new PrismaClient();

// ฟังก์ชันนี้จะทำงานเมื่อมีการ fetch('/api/profile') ด้วย method GET
export async function GET() {
  // 1. ตรวจสอบว่าใครกำลังส่งคำขอมา (ความปลอดภัย)
  const session = await getServerSession(authOptions);

  // ถ้าไม่มี session (ยังไม่ได้ล็อกอิน) ให้ส่ง error กลับไป
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. ถ้าล็อกอินแล้ว ให้ไปค้นหาข้อมูลในฐานข้อมูล
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id }, // ค้นหาโปรไฟล์จาก ID ของผู้ใช้ที่ล็อกอินอยู่
      include: { user: { select: { email: true } } } // ดึง email มาด้วย
    });
    
    // 3. ส่งข้อมูลที่เจอ ส่งกลับไปให้หน้าเว็บ
    return NextResponse.json(profile);

  } catch (error) {
    // 4. ถ้าเกิดข้อผิดพลาด ให้แจ้งกลับไป
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}


export async function PUT(request) {
  // 1. ตรวจสอบสิทธิ์ก่อน (เหมือนเดิม)
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. รับข้อมูลใหม่ที่ผู้ใช้กรอกมาจากหน้าเว็บ
  try {
    const { fullName, phone } = await request.json(); // ดึงชื่อและเบอร์โทรใหม่จาก request

    // 3. สั่งให้ Prisma อัปเดตข้อมูลในฐานข้อมูล
    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id }, // อัปเดตเฉพาะโปรไฟล์ของคนที่ล็อกอินอยู่
      data: { // ข้อมูลใหม่ที่จะบันทึกทับของเก่า
        fullName,
        phone,
      },
    });

    // 4. ส่งข้อมูลที่อัปเดตแล้วกลับไปให้หน้าเว็บเพื่อยืนยัน
    return NextResponse.json(updatedProfile);

  } catch (error) {
    // 5. จัดการข้อผิดพลาด
    console.error("Profile PUT Error:", error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}