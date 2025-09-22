import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
// --- แก้ไข Path ที่บรรทัดนี้ ---
import { authOptions } from '../../../auth/[...nextauth]/route';

// GET: ดึงข้อมูลบทความเดียว
export async function GET(request, { params }) {
    const { id } = params;
    try {
        const article = await prisma.article.findUnique({ where: { id } });
        if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
    }
}

// PUT: อัปเดตบทความ
export async function PUT(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { id } = params;
    try {
        const data = await request.json();
        const updatedArticle = await prisma.article.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                imageUrl: data.imageUrl,
                isPublished: data.isPublished,
            },
        });
        return NextResponse.json(updatedArticle);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }
}

// DELETE: ลบบทความ
export async function DELETE(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { id } = params;
    try {
        await prisma.article.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}