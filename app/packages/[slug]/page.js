// file: app/packages/[slug]/page.js

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FiClock, FiMapPin, FiCheckCircle } from 'react-icons/fi';

// ฟังก์ชันสำหรับดึงข้อมูลของทัวร์ 1 ชิ้นตาม slug
async function getPackageBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/packages/public/${slug}`, {
    next: { revalidate: 3600 }, // อัปเดตข้อมูลทุก 1 ชั่วโมง
  });

  // หาก API ตอบกลับมาว่าไม่พบ (404) ให้เรียกฟังก์ชัน notFound()
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error('Failed to fetch package data');
  }

  return res.json();
}

// ✨ ฟังก์ชันสร้าง Metadata สำหรับ SEO โดยเฉพาะ
export async function generateMetadata({ params }) {
  const tour = await getPackageBySlug(params.slug);
  return {
    title: `ทัวร์ ${tour.title}`,
    description: tour.description.substring(0, 160), // เอาคำอธิบายมาแสดงผลสั้นๆ
  };
}


// --- ส่วนประกอบหลักของหน้า ---
export default async function PackageDetailPage({ params }) {
  const tour = await getPackageBySlug(params.slug);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* --- ส่วนหัวเรื่องและข้อมูลหลัก --- */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{tour.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center"><FiMapPin className="mr-1.5" /> {tour.destination}</div>
            <div className="flex items-center"><FiClock className="mr-1.5" /> {tour.duration}</div>
          </div>
        </div>

        {/* --- ส่วนรูปภาพและ Booking --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Image
              src={tour.imageUrl || '/placeholder.jpg'}
              alt={tour.title}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              priority // โหลดรูปนี้ก่อนเพื่อความเร็ว
            />
          </div>

          {/* กล่องราคาและปุ่มจอง */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600">ราคาเริ่มต้นต่อท่าน</p>
              <p className="text-4xl font-bold text-brand-red my-2">
                ฿{tour.price.toLocaleString()}
              </p>
              <button className="w-full mt-4 bg-brand-red text-white font-bold py-3 rounded-lg text-lg hover:bg-brand-red-dark transition-colors duration-300">
                จองทริปนี้
              </button>
              <ul className="text-sm text-gray-600 mt-4 space-y-2">
                  <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /> รวมตั๋วเครื่องบินไป-กลับ</li>
                  <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /> รวมโรงแรมและอาหารตามโปรแกรม</li>
                  <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" /> มีไกด์และหัวหน้าทัวร์ดูแล</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* --- ส่วนคำอธิบายทัวร์ --- */}
        <div className="mt-10 max-w-4xl">
           <h2 className="text-2xl font-bold mb-4">รายละเอียดโปรแกรมทัวร์</h2>
           {/* ใช้ pre-wrap เพื่อให้เคารพการขึ้นบรรทัดใหม่จากฐานข้อมูล */}
           <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {tour.description}
           </p>
        </div>

      </div>
    </div>
  );
}