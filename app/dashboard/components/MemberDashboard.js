// file: app/dashboard/components/MemberDashboard.js
'use client';

import Link from 'next/link';
import { FiCalendar, FiHeart, FiUser } from 'react-icons/fi';

// Component สำหรับการ์ดแสดงผล
function InfoCard({ icon, title, description, link, linkText }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-gray-100 rounded-full mr-4">{icon}</div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link href={link} className="text-brand-red font-semibold hover:underline">
        {linkText} →
      </Link>
    </div>
  );
}

export default function MemberDashboard({ session }) {
  // เราส่ง session เข้ามาเพื่อแสดงชื่อผู้ใช้
  const userName = session?.user?.name || 'Member';

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">ยินดีต้อนรับ, {userName}!</h1>
      <p className="text-gray-600 mb-8">นี่คือภาพรวมบัญชีของคุณ</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard
          icon={<FiCalendar size={24} className="text-brand-red" />}
          title="การจองล่าสุด"
          description="ติดตามสถานะทริปและจัดการการจองของคุณ"
          link="/dashboard/bookings"
          linkText="ดูการจองทั้งหมด"
        />
        <InfoCard
          icon={<FiHeart size={24} className="text-pink-500" />}
          title="รายการโปรด"
          description="ดูและจัดการทัวร์ที่คุณบันทึกไว้"
          link="/dashboard/wishlist"
          linkText="ดูรายการโปรด"
        />
        <InfoCard
          icon={<FiUser size={24} className="text-blue-500" />}
          title="โปรไฟล์ของคุณ"
          description="จัดการข้อมูลส่วนตัวและเปลี่ยนรหัสผ่าน"
          link="/dashboard/profile"
          linkText="ไปที่หน้าโปรไฟล์"
        />
      </div>
    </div>
  );
}