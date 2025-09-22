import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // <-- ตรวจสอบ/แก้ไข Relative Path ให้ถูกต้อง
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/route'; // <-- ตรวจสอบ/แก้ไข Relative Path ให้ถูกต้อง

// GET: ดึงข้อมูลแพ็กเกจเดียวตาม ID
export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  
  const { id } = params;
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: id },
    });
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    return NextResponse.json(pkg);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

// PUT: อัปเดตแพ็กเกจ
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    const data = await request.json();
    const updatedPackage = await prisma.package.update({
      where: { id: id },
      data: {
        name: data.name,
        slug: data.slug,
        duration: parseInt(data.duration, 10),
        price: parseFloat(data.price),
        description: data.description,
        imageUrl: data.imageUrl,
        isPublished: data.isPublished,
      },
    });
    return NextResponse.json(updatedPackage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

// DELETE: ลบแพ็กเกจ
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  try {
    await prisma.package.delete({
      where: { id: id },
    });
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}