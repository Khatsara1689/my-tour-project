// file: app/dashboard/bookings/page.js
'use client';
import { FiDownload, FiCreditCard, FiStar, FiEye } from 'react-icons/fi';
import Link from 'next/link';

const bookings = [
  { id: 'BK1234', tour: 'ทัวร์โตเกียว 5 วัน 3 คืน', date: '2025-12-10', status: 'เสร็จสิ้น', total: 35900, reviewSubmitted: true },
  { id: 'BK5678', tour: 'เทศกาลหิมะ ฮอกไกโด', date: '2026-02-05', status: 'ยืนยันแล้ว', total: 55000, reviewSubmitted: false },
  { id: 'BK9101', tour: 'ชมซากุระ โอซาก้า', date: '2026-04-01', status: 'รอชำระเงิน', total: 42500, reviewSubmitted: false },
  { id: 'BK1121', tour: 'ใบไม้เปลี่ยนสี เกียวโต', date: '2025-11-15', status: 'ยกเลิก', total: 48000, reviewSubmitted: false },
];

const statusStyles = {
  'เสร็จสิ้น': 'bg-blue-100 text-blue-800',
  'ยืนยันแล้ว': 'bg-green-100 text-green-800',
  'รอชำระเงิน': 'bg-yellow-100 text-yellow-800',
  'ยกเลิก': 'bg-red-100 text-red-800',
};

export default function BookingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">สถานะการจองของฉัน</h1>
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">รหัสการจอง</th>
              <th className="p-4">ทริป</th>
              <th className="p-4">สถานะ</th>
              <th className="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-t">
                <td className="p-4 font-medium">{b.id}</td>
                <td className="p-4">
                  <div className="font-semibold">{b.tour}</div>
                  <div className="text-sm text-gray-500">เดินทาง: {b.date}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {b.status === 'รอชำระเงิน' && (<Link href={`/dashboard/bookings/${b.id}/pay`} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600" title="ชำระเงิน"><FiCreditCard /></Link>)}
                    {b.status === 'ยืนยันแล้ว' && (<><button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" title="ดาวน์โหลดเอกสาร"><FiDownload /></button>{!b.reviewSubmitted && <Link href={`/dashboard/reviews/write?bookingId=${b.id}`} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" title="เขียนรีวิว"><FiStar /></Link>}</>)}
                    {b.status === 'เสร็จสิ้น' && (<><button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" title="ดาวน์โหลดเอกสาร"><FiDownload /></button>{b.reviewSubmitted ? <span className="text-xs text-gray-400 italic">รีวิวแล้ว</span> : <Link href={`/dashboard/reviews/write?bookingId=${b.id}`} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" title="เขียนรีวิว"><FiStar /></Link>}</>)}
                    <button className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300" title="ดูรายละเอียด"><FiEye /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}