import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
// --- แก้ไข Path ที่บรรทัดนี้ ---
import { authOptions } from '../../auth/[...nextauth]/route'; 

// GET: ดึงข้อมูลผู้ใช้ทั้งหมด
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'owner')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}