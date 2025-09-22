import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// GET: ดึงข้อมูลบทความที่เผยแพร่แล้วทั้งหมด
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}