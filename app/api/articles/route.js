import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
// --- แก้ไข Path ที่บรรทัดนี้ ---
import { authOptions } from '../../auth/[...nextauth]/route';

// GET: ดึงข้อมูลบทความทั้งหมด
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
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
        authorId: session.user.id,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}