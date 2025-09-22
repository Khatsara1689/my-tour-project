// file: app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* ===== Hero Section ใหม่ ===== */}
      <section 
        className="relative h-[60vh] min-h-[400px] max-h-[600px] rounded-2xl overflow-hidden flex items-center justify-center text-center text-white -mt-8"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1528133418093-c9e5b01542f1?q=80&w=2070" 
            alt="Cherry Blossoms in Japan"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-xl">
            เที่ยวญี่ปุ่น...
          </h1>
          <p className="mt-4 text-xl md:text-2xl drop-shadow-lg">
            ทริปส่วนตัวสุดพิเศษ ออกแบบได้ตามใจคุณ
          </p>
          <Link 
            href="/packages" 
            className="mt-8 inline-block bg-pink-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-pink-600 transition-colors shadow-lg"
          >
            ดูแพ็กเกจทั้งหมด
          </Link>
        </div>
      </section>

      {/* ===== ส่วนอื่นๆ ของหน้าเว็บ (ตัวอย่าง) ===== */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">บริการของเรา</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">ทัวร์ส่วนตัว</h3>
            <p className="text-gray-600">ออกแบบทริปของคุณเอง</p>
          </div>
          <div className="border rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">รถนำเที่ยว</h3>
            <p className="text-gray-600">พร้อมคนขับผู้เชี่ยวชาญ</p>
          </div>
          <div className="border rounded-lg shadow-sm p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">กรุ๊ปเหมา</h3>
            <p className="text-gray-600">สำหรับองค์กรและสัมมนา</p>
          </div>
        </div>
      </section>
    </>
  );
}