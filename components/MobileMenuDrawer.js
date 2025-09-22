// file: components/MobileMenuDrawer.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- Import Image component
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const menuLinks = [
    { href: '/', label: 'หน้าแรก' },
    { href: '/recommended-programs', label: 'โปรแกรมแนะนำ' },
    { href: '/packages', label: 'แพ็กเกจทัวร์' },
    { href: '/private-car', label: 'รถนำเที่ยว' },
    { href: '/promotion', label: 'โปรโมชั่น' },
    { href: '/reviews', label: 'รีวิวลูกค้า' },
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/article', label: 'บทความ' },
];

const privateTourLinks = [
    { href: '/private-tours/standard', label: 'STANDARD' },
    { href: '/private-tours/gold', label: 'GOLD' },
    { href: '/private-tours/premium-plus', label: 'PREMIUM PLUS' },
    { href: '/private-tours/premium-vvip', label: 'PREMIUM VVIP' },
    { href: '/private-tours/seminar-group', label: 'รับจัดกรุ๊ปเหมา' },
];

export default function MobileMenuDrawer({ closeMenu }) {
    const [isPrivateToursOpen, setPrivateToursOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={closeMenu}
        >
            {/* 1. เปลี่ยนพื้นหลังเป็นสีขาว */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white text-gray-800 shadow-lg flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    {/* 2. เพิ่มโลโก้เข้ามา */}
                    <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
                        <Image
                            src="/my-logo.png" // Path รูปโลโก้ของคุณ
                            alt="Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="font-bold text-xl text-gray-800">SIAMPRO</span>
                    </Link>
                    <button onClick={closeMenu} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="p-4 flex flex-col space-y-1 overflow-y-auto">
                    {/* 3. ปรับสไตล์ Accordion และลิงก์ทั้งหมด */}
                    <div>
                        <button
                            onClick={() => setPrivateToursOpen(!isPrivateToursOpen)}
                            className="w-full flex justify-between items-center py-3 px-3 rounded-lg text-left font-semibold text-lg hover:bg-red-50 hover:text-brand-red transition-colors"
                        >
                            <span>เที่ยวญี่ปุ่นส่วนตัว</span>
                            <motion.div animate={{ rotate: isPrivateToursOpen ? 180 : 0 }}>
                                <FaChevronDown className={`${isPrivateToursOpen ? 'text-brand-red' : ''}`} />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isPrivateToursOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden pl-6"
                                >
                                    <div className="flex flex-col items-start space-y-1 py-2 border-l-2 border-red-200">
                                        {privateTourLinks.map(link => (
                                            <Link key={link.href} href={link.href} onClick={closeMenu} className="w-full py-2 px-3 rounded-md text-gray-600 hover:bg-red-50 hover:text-brand-red transition-colors">{link.label}</Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {menuLinks.map(link => (
                        <Link key={link.href} href={link.href} onClick={closeMenu} className="py-3 px-3 rounded-lg font-semibold text-lg hover:bg-red-50 hover:text-brand-red transition-colors">{link.label}</Link>
                    ))}

                    <hr className="my-4 border-gray-200" />

                    {/* 4. ปรับสไตล์ปุ่ม Login/Register ให้เหมือน Desktop */}
                    <div className="flex flex-col space-y-3 pt-4">
                        <Link
                            href="/login"
                            onClick={closeMenu}
                            className="py-3 text-center font-semibold text-lg text-brand-red border-2 border-brand-red rounded-lg hover:bg-brand-red hover:text-white transition-all duration-300"
                        >
                            เข้าสู่ระบบ
                        </Link>
                        <Link
                            href="/register"
                            onClick={closeMenu}
                            className="py-3 text-center font-bold text-lg text-white bg-brand-red rounded-lg hover:bg-brand-red-dark transition-colors"
                        >
                            สมัครสมาชิก
                        </Link>
                    </div>
                </nav>
            </motion.div>
        </motion.div>
    );
}