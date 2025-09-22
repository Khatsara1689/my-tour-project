// file: app/dashboard/inquiry/page.js
'use client';
export default function InquiryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">ส่งคำถามถึงเรา</h1>
      <form className="p-8 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2 font-semibold text-gray-700">หัวข้อ</label>
          <input type="text" id="subject" className="w-full p-3 border rounded-md" placeholder="เช่น สอบถามเรื่องวีซ่า..." />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">ข้อความ</label>
          <textarea id="message" rows="8" className="w-full p-3 border rounded-md" placeholder="กรอกรายละเอียดคำถามของคุณ..."></textarea>
        </div>
        <button type="submit" className="bg-brand-red text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-red-dark">ส่งข้อความ</button>
      </form>
    </div>
  );
}