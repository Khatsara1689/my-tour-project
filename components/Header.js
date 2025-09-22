'use client'; 

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// 1. Import เครื่องมือจาก NextAuth.js เข้ามา
import { useSession, signOut } from 'next-auth/react'; 
import { FaChevronDown, FaLine, FaPhoneAlt } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import PrivateToursDropdown from './PrivateToursDropdown';
import MobileMenuDrawer from './MobileMenuDrawer';

export default function Header() {
  // 2. ดึงข้อมูล session และ status มาใช้งาน
  const { data: session, status } = useSession(); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 200);
  };

  // --- Component ย่อยสำหรับจัดการการแสดงผลปุ่ม Login/Logout ---
  const AuthButtons = () => {
    // กรณีที่ 1: กำลังตรวจสอบสถานะ
    if (status === "loading") {
      return <div className="h-[44px] w-[220px] bg-gray-200 animate-pulse rounded-lg"></div>;
    }

    // กรณีที่ 2: ล็อกอินแล้ว (Authenticated)
    if (status === "authenticated") {
      return (
        <div className="flex items-center gap-4">
          <Link href="/dashboard/profile" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-brand-red transition-colors">
            {/* ในอนาคต session.user.image จะมาจากฐานข้อมูล */}
            <Image 
              src={session.user.image || '/my-logo.png'} 
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{session.user.name}</span>
          </Link>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="font-semibold text-gray-500 hover:text-brand-red transition-colors"
            title="ออกจากระบบ"
          >
            ออกจากระบบ
          </button>
        </div>
      );
    }

    // กรณีที่ 3: ยังไม่ได้ล็อกอิน (Unauthenticated) - ใช้ปุ่มเดิมของคุณ
    return (
      <div className="flex items-center space-x-2">
        <Link 
          href="/login" 
          className="font-semibold text-brand-red px-5 py-2 rounded-lg border-2 border-brand-red hover:bg-brand-red hover:text-white transition-all duration-300"
        >
          เข้าสู่ระบบ
        </Link>
        <Link
          href="/register"
          className="font-bold text-white bg-brand-red px-5 py-2.5 rounded-lg shadow-md hover:bg-brand-red-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          สมัครสมาชิก
        </Link>
      </div>
    );
  };
  // --- สิ้นสุด Component ย่อย ---


  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        {/* ===== Top Bar (ไม่มีการเปลี่ยนแปลง) ===== */}
        <div className="bg-[#B20000] text-white text-xs">
          <div className="w-full px-4 sm:px-8 h-12 flex items-center justify-center lg:justify-between">
            <div className="hidden lg:flex items-center space-x-3 opacity-90">
              <span>บริษัท สยามโปร เอสเอส ควอลิตี้ จํากัด</span>
              <span className="opacity-50">|</span>
              <span>ใบอนุญาตเลขที่ กทท.11/13275</span>
              <span className="opacity-50">|</span>
              <span>จันทร์ - เสาร์ 8:30-17:30</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 font-semibold text-sm">
                <a href="https://line.me/ti/p/~siamproxsanta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-200">
                  <FaLine />
                  <span>@siamproxsanta</span>
                </a>
                <a href="tel:021204665" className="flex items-center gap-1.5 hover:text-gray-200">
                  <FaPhoneAlt />
                  <span>02-120-4665</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Main Navigation ===== */}
        <div className="container mx-auto px-4 md:px-6 py-2 flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="relative inline-block" style={{ height: '64px' }}>
            <div className="h-full bg-brand-red text-white rounded-full shadow-lg flex items-center pr-8 pl-14">
              <div className="ml-4">
                <div className="font-bold text-2xl tracking-wide">SIAMPRO</div>
                <div className="text-sm">X siamsanta</div>
              </div>
            </div>
            <div className="absolute top-0 left-0 h-full flex items-center">
              <Image 
                src="/my-logo.png" // Path รูปโลโก้ของคุณ
                alt="Logo" 
                width={64}
                height={64}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
          </Link>
          
          {/* เมนูสำหรับ Desktop (ซ่อนในจอมือถือ) */}
          <nav className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">
            <Link href="/" className="hover:text-brand-red transition-colors">หน้าแรก</Link>
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`transition-colors flex items-center gap-1 ${isMenuOpen ? 'text-brand-red' : ''}`}>
                <span>เที่ยวญี่ปุ่นส่วนตัว</span>
                <FaChevronDown size={12} />
              </button>
              <AnimatePresence>
                {isMenuOpen && <PrivateToursDropdown />}
              </AnimatePresence>
            </div>
            <Link href="/recommended-programs" className="hover:text-brand-red transition-colors">โปรแกรมแนะนำ</Link>
            <Link href="/packages" className="hover:text-brand-red transition-colors">แพ็กเกจทัวร์</Link>
            <Link href="/private-car" className="hover:text-brand-red transition-colors">รถนำเที่ยว</Link>
            <Link href="/promotion" className="hover:text-brand-red transition-colors">โปรโมชั่น</Link>
            <Link href="/reviews" className="hover:text-brand-red transition-colors">รีวิวลูกค้า</Link>
            <Link href="/about" className="hover:text-brand-red transition-colors">เกี่ยวกับเรา</Link>
            <Link href="/article" className="hover:text-brand-red transition-colors">บทความ</Link>
          </nav>

          {/* 3. แทนที่ปุ่มเดิมด้วย Component AuthButtons ที่เราสร้าง */}
          <div className="hidden lg:flex items-center">
            <AuthButtons />
          </div>

          {/* ปุ่ม Hamburger (แสดงเฉพาะจอมือถือ) */}
          <div className="lg:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="p-2 border-2 border-gray-200 rounded-md text-gray-700 bg-gray-50 hover:bg-brand-red hover:text-white hover:border-brand-red transition-colors"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </header>
      
      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenuDrawer closeMenu={() => setMobileMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}