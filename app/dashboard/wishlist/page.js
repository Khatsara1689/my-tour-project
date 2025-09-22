// file: app/dashboard/wishlist/page.js
'use client';
import Link from 'next/link';
import Image from 'next/image';

const sampleTours = [
  { id: 1, slug: 'tokyo-delight', name: 'ทัวร์โตเกียว 5 วัน 3 คืน', price: 35900, imageUrl: '/tours/tokyo.jpg' },
  { id: 3, slug: 'hokkaido-snow', name: 'เทศกาลหิมะ ฮอกไกโด', price: 55000, imageUrl: '/tours/hokkaido.jpg' },
];

function WishlistTourCard({ tour }) {
  const formatPrice = (price) => new Intl.NumberFormat('th-TH').format(price);
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden relative">
      <Link href={`/packages/${tour.slug}`}>
        <div className="relative h-48">
          <Image src={tour.imageUrl} alt={tour.name} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{tour.name}</h3>
          <p className="text-xl font-bold text-brand-red mt-4">฿{formatPrice(tour.price)}</p>
        </div>
      </Link>
      <button className="absolute top-2 right-2 p-2 bg-white/70 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors" title="ลบออกจากรายการโปรด">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
      </button>
    </div>
  );
}

export default function WishlistPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ทัวร์ในรายการโปรด</h1>
      {sampleTours.length === 0 ? (
        <p className="text-center text-gray-600">คุณยังไม่มีทัวร์ในรายการโปรด</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleTours.map(tour => (
            <WishlistTourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}