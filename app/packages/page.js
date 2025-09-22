import TourCard from '@/components/TourCard'; // ตรวจสอบ path ให้ถูกต้อง

// ฟังก์ชันสำหรับดึงข้อมูลจาก API ของเรา
async function getPublishedPackages() {
  // NEXT_PUBLIC_BASE_URL คือ http://localhost:3000
  // เราจำเป็นต้องใช้ URL เต็มในการ fetch ฝั่ง Server
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/packages/public`, {
    // Revalidate ทุก 1 ชั่วโมง (เพื่อให้ข้อมูลอัปเดตเป็นระยะ)
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    // หากดึงข้อมูลไม่สำเร็จ ให้โยน Error
    throw new Error('Failed to fetch packages');
  }
  
  return res.json();
}

// Page component ของเราเป็น async function
export default async function PackagesPage() {
  // เรียกใช้ฟังก์ชันและรอข้อมูล
  const packages = await getPublishedPackages();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">แพ็กเกจทัวร์ทั้งหมด</h1>
        <p className="text-center text-gray-600 mb-10">เลือกทริปที่ใช่ แล้วออกเดินทางไปกับเรา</p>

        {/* ตรวจสอบว่ามีข้อมูลแพ็กเกจหรือไม่ */}
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* วนลูปแสดงผลข้อมูลด้วย TourCard component */}
            {packages.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          // กรณีไม่มีข้อมูล
          <div className="text-center py-16">
            <p className="text-gray-500">ขออภัย ไม่พบแพ็กเกจทัวร์ในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}