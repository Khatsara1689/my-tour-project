import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiClock, FiTag } from 'react-icons/fi';

// รับ props เป็น { tour }
export default function TourCard({ tour }) {
  return (
    // ทำให้การ์ดทั้งใบเป็นลิงก์ไปยังหน้ารายละเอียดตาม slug
    <Link href={`/packages/${tour.slug}`} className="group block overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <Image
          src={tour.imageUrl || '/placeholder.jpg'} // ใช้รูป placeholder หากไม่มีรูป
          alt={tour.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-0 right-0 bg-brand-red text-white text-sm font-bold px-3 py-1 m-2 rounded-md">
          {tour.destination}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-brand-red transition-colors">
          {tour.title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <FiClock className="mr-1.5" />
          <span>{tour.duration}</span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500 text-sm">ราคาเริ่มต้น</p>
          <p className="text-xl font-bold text-brand-red">
            {/* จัดรูปแบบราคาให้มีจุลภาค */}
            ฿{tour.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}