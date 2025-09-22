// file: components/PrivateToursDropdown.js
import Link from 'next/link';
import { FaHeart, FaTree, FaFish, FaLandmark, FaBuilding, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const menuVariants = {
  hidden: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

export default function PrivateToursDropdown() {
  const packageLinkStyle = "text-center border border-gray-200 rounded-lg py-3 px-3 hover:border-brand-red hover:text-brand-red hover:bg-red-50 transition-all duration-200 font-medium hover:-translate-y-1 shadow-sm hover:shadow-md";
  const styleLinkStyle = "group flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors";

  return (
    // เพิ่ม -translate-x-[150px] เพื่อขยับไปทางซ้าย 150px
    <motion.div 
      className="absolute top-full left-0 mt-2 w-max -translate-x-[225px]" // <-- ปรับตำแหน่งในขั้นตอนต่อไป
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 border">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* ... เนื้อหาเมนูไม่มีการเปลี่ยนแปลง ... */}
          {/* Column 1: Packages */}
          <div className="space-y-4 px-6">
            <h3 className="font-semibold text-gray-500 text-sm tracking-wider uppercase">Packages</h3>
            <h2 className="text-xl font-bold text-gray-800">แพ็กเกจเที่ยวญี่ปุ่นส่วนตัว</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/private-tours/standard" className={packageLinkStyle}>STANDARD</Link>
              <Link href="/private-tours/gold" className={packageLinkStyle}>GOLD</Link>
              <Link href="/private-tours/premium-plus" className={packageLinkStyle}>PREMIUM PLUS</Link>
              <Link href="/private-tours/premium-vvip" className={packageLinkStyle}>PREMIUM VVIP</Link>
            </div>
            <Link href="/packages" className="group text-sm text-brand-red hover:underline font-semibold inline-flex items-center gap-1">
              ดูแพ็กเกจทั้งหมด <FaArrowRight className="transition-transform group-hover:translate-x-1"/>
            </Link>
          </div>

          {/* Column 2: Styles (เพิ่มเส้นแบ่งด้านซ้าย) */}
          <div className="space-y-2 px-6 border-l border-gray-200">
            <h3 className="font-semibold text-gray-500 text-sm tracking-wider uppercase">Styles</h3>
            <h2 className="text-xl font-bold text-gray-800">เลือกสไตล์ทริป</h2>
            <ul className="space-y-1">
              <li className={styleLinkStyle}><FaHeart className="text-pink-500" /> <span className="group-hover:text-brand-red">สัมผัส / คู่รัก</span></li>
              <li className={styleLinkStyle}><FaTree className="text-green-500" /> <span className="group-hover:text-brand-red">ครอบครัว / เด็ก</span></li>
              <li className={styleLinkStyle}><FaLandmark className="text-yellow-600"/> <span className="group-hover:text-brand-red">ฮิปเตอร์ / ออนเซ็น</span></li>
              <li className={styleLinkStyle}><FaFish className="text-blue-500"/> <span className="group-hover:text-brand-red">สกี / หิมะ</span></li>
              <li className={styleLinkStyle}><FaBuilding className="text-gray-500"/> <span className="group-hover:text-brand-red">โอตาคุ / คาเฟ่</span></li>
            </ul>
          </div>

          {/* Column 3: Destinations (เพิ่มเส้นแบ่งด้านซ้าย) */}
          <div className="space-y-4 px-6 border-l border-gray-200">
            <h3 className="font-semibold text-gray-500 text-sm tracking-wider uppercase">Destinations</h3>
            <h2 className="text-xl font-bold text-gray-800">เมืองยอดนิยม</h2>
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className={packageLinkStyle}>โตเกียว</a>
              <a href="#" className={packageLinkStyle}>โอซาก้า</a>
              <a href="#" className="text-center border border-gray-200 rounded-lg py-3 px-3 hover:border-brand-red hover:text-brand-red hover:bg-red-50 transition-all duration-200 font-medium hover:-translate-y-1 shadow-sm hover:shadow-md">ซัปโปโร</a>
              <a href="#" className={packageLinkStyle}>เกียวโต</a>
              <a href="#" className={packageLinkStyle}>โอกินาว่า</a>
              <a href="#" className={packageLinkStyle}>ภูเขาไฟฟูจิ</a>
            </div>
            <Link href="/destinations" className="group text-sm text-brand-red hover:underline font-semibold inline-flex items-center gap-1">
              ดูปลายทางทั้งหมด <FaArrowRight className="transition-transform group-hover:translate-x-1"/>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}