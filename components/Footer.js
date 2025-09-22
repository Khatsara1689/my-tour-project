// file: components/Footer.js
import Link from 'next/link';
import { FaFacebook, FaLine, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg">SIAMPRO TOUR</h3>
          <p className="text-gray-400 mt-2">บริการจัดทัวร์ญี่ปุ่นส่วนตัวครบวงจร ออกแบบทริปในฝันของคุณ</p>
        </div>
        <div>
          <h4 className="font-semibold">เมนูหลัก</h4>
          <ul className="mt-4 space-y-2">
            <li><Link href="/packages" className="text-gray-400 hover:text-white">แพ็กเกจทัวร์</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-white">เกี่ยวกับเรา</Link></li>
            <li><Link href="/reviews" className="text-gray-400 hover:text-white">รีวิวลูกค้า</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">ติดต่อเรา</h4>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li>02-120-4665</li>
            <li>contact@siampro.co.th</li>
            <li>บริษัท สยามโปร เอสเอส ควอลิตี้ จํากัด</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">ติดตามเรา</h4>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLine size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <p className="text-center text-gray-500 text-sm">&copy; 2025 SIAMPRO Tour. All Rights Reserved.</p>
      </div>
    </footer>
  );
}