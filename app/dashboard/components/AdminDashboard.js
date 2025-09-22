// file: app/dashboard/components/AdminDashboard.js
'use client';

import Link from 'next/link';
import { FiUsers, FiCalendar, FiMessageSquare, FiStar } from 'react-icons/fi';

// Component สำหรับการ์ดแสดงสถิติ
function StatCard({ icon, title, value, link, linkText }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="bg-brand-red text-white p-3 rounded-full mr-4">{icon}</div>
        <div>
          <p className="text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {link && <Link href={link} className="block text-brand-red hover:underline mt-4">{linkText} →</Link>}
    </div>
  );
}

export default function AdminDashboard() {
  // ข้อมูลจำลองสำหรับแสดงผล
  const stats = {
    totalUsers: 125,
    pendingBookings: 8,
    pendingReviews: 3,
    newInquiries: 5,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">ภาพรวมทั้งหมดของระบบ</p>

      {/* ส่วนแสดงสถิติ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FiUsers size={24}/>} title="สมาชิกทั้งหมด" value={stats.totalUsers} link="/dashboard/admin/users" linkText="จัดการสมาชิก" />
        <StatCard icon={<FiCalendar size={24}/>} title="การจองที่รอจัดการ" value={stats.pendingBookings} link="/dashboard/admin/bookings" linkText="จัดการ Booking" />
        <StatCard icon={<FiStar size={24}/>} title="รีวิวที่รออนุมัติ" value={stats.pendingReviews} link="/dashboard/admin/reviews" linkText="จัดการรีวิว" />
        <StatCard icon={<FiMessageSquare size={24}/>} title="คำถามใหม่" value={stats.newInquiries} link="/dashboard/admin/inquiries" linkText="ดูคำถาม" />
      </div>
    </div>
  );
}