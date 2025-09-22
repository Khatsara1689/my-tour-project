// file: components/dashboard/Sidebar.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiUser, FiLock, FiShoppingCart, FiMessageSquare, FiStar, FiCalendar, FiCreditCard, FiFileText, FiHeart, FiUsers, FiBox, FiImage, FiPenTool, FiCheckSquare, FiMail, FiBarChart2, FiSettings, FiShield, FiTrendingUp, FiDatabase, FiActivity
} from 'react-icons/fi';

// --- รายการเมนูสำหรับแต่ละ Role ---
const memberMenu = [
  { name: 'โปรไฟล์', href: '/dashboard/profile', icon: FiUser },
  { name: 'แพ็กเกจทัวร์', href: '/packages', icon: FiShoppingCart },
  { name: 'สอบถามข้อมูล', href: '/dashboard/inquiry', icon: FiMessageSquare },
  { name: 'สถานะการจอง', href: '/dashboard/bookings', icon: FiCalendar },
  { name: 'ประวัติชำระเงิน', href: '/dashboard/payments', icon: FiCreditCard },
  { name: 'รายการโปรด', href: '/dashboard/wishlist', icon: FiHeart },
];

const adminMenu = [
  ...memberMenu.slice(0, 1), // เอา 'โปรไฟล์' มาจาก member
  { name: 'จัดการสมาชิก', href: '/dashboard/admin/users', icon: FiUsers },
  { name: 'จัดการแพ็กเกจ', href: '/dashboard/admin/packages', icon: FiBox },
  { name: 'จัดการบทความ', href: '/dashboard/admin/articles', icon: FiPenTool },
  { name: 'อนุมัติรีวิว', href: '/dashboard/admin/reviews', icon: FiCheckSquare },
  { name: 'จัดการ Booking', href: '/dashboard/admin/bookings', icon: FiCalendar },
  { name: 'ตั้งค่าเว็บไซต์', href: '/dashboard/admin/settings', icon: FiSettings },
];

const ownerMenu = [
  ...adminMenu, // Owner มีทุกอย่างของ Admin
  { name: 'จัดการ Admin', href: '/dashboard/owner/admins', icon: FiShield },
  { name: 'รายงานการเงิน', href: '/dashboard/owner/reports', icon: FiTrendingUp },
  { name: 'Audit Trail', href: '/dashboard/owner/logs', icon: FiActivity },
];

const menuConfig = {
  member: memberMenu,
  admin: adminMenu,
  owner: ownerMenu,
};

export default function Sidebar({ role }) {
  const pathname = usePathname();
  const menuItems = menuConfig[role] || [];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <span className="text-sm bg-blue-500 text-white px-2 py-0.5 rounded-full">{role}</span>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4">
         <Link href="/" className="text-gray-400 hover:text-white">← กลับหน้าหลัก</Link>
      </div>
    </aside>
  );
}