'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- TourCard Component ---
// คอมโพเนนต์ย่อยสำหรับแสดงการ์ดทัวร์แต่ละใบ
function TourCard({ tour }) {
  const formatPrice = (price) => new Intl.NumberFormat('th-TH').format(price);
  
  return (
    <div className="border rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/packages/${tour.slug || tour.id}`}>
        <div className="relative h-56">
          <Image 
            src={tour.imageUrl || `https://placehold.co/600x400/d1d5db/374151?text=${tour.name}`} 
            alt={tour.name} 
            fill // Use fill to cover the container
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col h-40">
          <p className="text-sm text-gray-500">{tour.duration} วัน</p>
          <h3 className="text-lg font-semibold mt-1 flex-grow">{tour.name}</h3>
          <p className="text-xl font-bold text-brand-red mt-2">เริ่มต้น {formatPrice(tour.price)} บาท</p>
        </div>
      </Link>
    </div>
  );
}
// --- End TourCard Component ---


// --- Main PackagesClientUI Component ---
export default function PackagesClientUI({ initialPackages }) {
  const [packages, setPackages] = useState(initialPackages);

  // ในอนาคต ส่วนนี้สามารถใช้สำหรับทำ Filter หรือ Search ได้

  if (!packages || packages.length === 0) {
    return <p className="text-center text-gray-500">ไม่พบแพ็กเกจทัวร์ในขณะนี้</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {packages.map(tour => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}