// file: app/dashboard/(admin)/layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiGrid, FiUsers, FiPackage } from 'react-icons/fi';

const menuItems = [
  { name: 'ภาพรวมระบบ', href: '/dashboard/overview', icon: FiGrid },
  { name: 'จัดการสมาชิก', href: '/dashboard/users', icon: FiUsers },
  { name: 'จัดการแพ็กเกจ', href: '/dashboard/packages', icon: FiPackage },
];

function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <span className="text-sm bg-blue-500 px-2 py-0.5 rounded-full">admin</span>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${ pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700/50' }`}>
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}