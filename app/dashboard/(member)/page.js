// file: app/dashboard/page.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardRedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const userRole = session.user?.role;

  // ตรวจสอบ Role แล้วส่งไปยังหน้าแรกของแต่ละ Role
  if (userRole === 'admin' || userRole === 'owner') {
    redirect('/dashboard/overview'); // หน้าหลักของ Admin
  } else {
    redirect('/dashboard/profile'); // หน้าหลักของ Member
  }

  // หน้านี้จะไม่แสดงผลอะไรเลย เพราะจะถูก redirect ก่อน
  return null;
}