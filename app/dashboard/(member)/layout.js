// file: app/dashboard/(member)/layout.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiUser, FiCalendar, FiHeart, FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';

const menuItems = [
  { name: 'โปรไฟล์', href: '/dashboard/profile', icon: FiUser },
  { name: 'การจองของฉัน', href: '/dashboard/bookings', icon: FiCalendar },
  { name: 'รายการโปรด', href: '/dashboard/wishlist', icon: FiHeart },
];

function MemberSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold">บัญชีของฉัน</h2>
        <span className="text-sm bg-green-500 px-2 py-0.5 rounded-full">member</span>
      </div>
      <nav className="flex-grow">
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
      <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors text-red-400 hover:bg-red-500 hover:text-white">
        <FiLogOut size={20} />
        <span>ออกจากระบบ</span>
      </button>
    </aside>
  );
}

export default function MemberLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <MemberSidebar />
      <main className="flex-grow p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}