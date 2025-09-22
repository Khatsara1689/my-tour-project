// file: app/about/page.js
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">เกี่ยวกับ SIAMPRO TOUR</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="prose lg:prose-lg">
          <p>เราคือผู้เชี่ยวชาญในการจัดทริปท่องเที่ยวประเทศญี่ปุ่นแบบส่วนตัว...</p>
          <p>ด้วยประสบการณ์กว่า 10 ปี ทีมงานของเราพร้อมที่จะเนรมิตทริปในฝันของคุณให้เป็นจริง...</p>
        </div>
        <div>
          <Image src="/team-photo.jpg" alt="ทีมงาน" width={500} height={300} className="rounded-lg shadow-lg"/>
          {/* อย่าลืมนำรูปทีมไปใส่ในโฟลเดอร์ public นะครับ */}
        </div>
      </div>
    </div>
  );
}