import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // ตรวจสอบ/แก้ไข Path ให้ถูกต้อง
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../auth/[...nextauth]/route'; // ตรวจสอบ/แก้ไข Path ให้ถูกต้อง

// GET: ดึงข้อมูลบทความทั้งหมด (สำหรับ Admin)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } }, // ดึงชื่อผู้เขียนมาด้วย
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST: สร้างบทความใหม่
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const data = await request.json();
    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        imageUrl: data.imageUrl,
        isPublished: data.isPublished,
        authorId: session.user.id, // กำหนดให้ผู้เขียนคือ Admin ที่ล็อกอินอยู่
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}