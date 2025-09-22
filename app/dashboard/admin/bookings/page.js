'use client';

import { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';

// ข้อมูลจำลอง
const sampleBookings = [
  { id: 'BK5678', customerName: 'Test Member', tour: 'เทศกาลหิมะ ฮอกไกโด', status: 'รอการยืนยัน' },
  { id: 'BK1234', customerName: 'John Doe', tour: 'ทัวร์โตเกียว 5 วัน', status: 'ยืนยันแล้ว' },
  { id: 'BK9101', customerName: 'Jane Smith', tour: 'ชมซากุระ โอซาก้า', status: 'ยกเลิก' },
];

const statusStyles = {
  'ยืนยันแล้ว': 'bg-green-100 text-green-800',
  'รอการยืนยัน': 'bg-yellow-100 text-yellow-800',
  'ยกเลิก': 'bg-red-100 text-red-800',
};

const filterTabs = ['ทั้งหมด', 'รอการยืนยัน', 'ยืนยันแล้ว', 'ยกเลิก'];

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState(sampleBookings);
  const [activeTab, setActiveTab] = useState('ทั้งหมด');

  const filteredBookings = activeTab === 'ทั้งหมด'
    ? bookings
    : bookings.filter(b => b.status === activeTab);
  
  const handleConfirm = (bookingId) => {
    alert(`ยืนยัน Booking ID: ${bookingId}`);
    // TODO: เรียก API PUT /api/admin/bookings/${bookingId}/confirm
  }

  const handleCancel = (bookingId) => {
     if(window.confirm('คุณแน่ใจหรือไม่ว่าต้องการยกเลิก Booking นี้?')) {
        alert(`ยกเลิก Booking ID: ${bookingId}`);
        // TODO: เรียก API PUT /api/admin/bookings/${bookingId}/cancel
     }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">จัดการ Booking</h1>

      {/* Filter Tabs */}
      <div className="flex border-b mb-6">
        {filterTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 font-semibold ${
              activeTab === tab 
              ? 'border-b-2 border-brand-red text-brand-red' 
              : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Booking ID</th>
              <th className="p-4">ลูกค้า</th>
              <th className="p-4">แพ็กเกจ</th>
              <th className="p-4">สถานะ</th>
              <th className="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-4 font-mono">{b.id}</td>
                <td className="p-4 font-semibold">{b.customerName}</td>
                <td className="p-4">{b.tour}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {b.status === 'รอการยืนยัน' && (
                      <>
                        <button onClick={() => handleConfirm(b.id)} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600" title="ยืนยัน"><FiCheckCircle /></button>
                        <button onClick={() => handleCancel(b.id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600" title="ยกเลิก"><FiXCircle /></button>
                      </>
                    )}
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