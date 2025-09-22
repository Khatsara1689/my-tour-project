// file: app/dashboard/admin/packages/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลจาก Admin API ที่เราเพิ่งสร้าง
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/packages');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPackages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return <p>กำลังโหลดข้อมูลแพ็กเกจ...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">จัดการแพ็กเกจทัวร์</h1>
        <Link 
          href="/dashboard/admin/packages/new"
          className="flex items-center gap-2 bg-brand-red text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-red-dark"
        >
          <FiPlus />
          <span>เพิ่มแพ็กเกจใหม่</span>
        </Link>
      </div>

      {/* ตารางแสดงผลแพ็กเกจทัวร์ */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">ชื่อแพ็กเกจ</th>
              <th className="p-4">ราคา</th>
              <th className="p-4">สถานะ</th>
              <th className="p-4">วันที่สร้าง</th>
              <th className="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t">
                <td className="p-4 font-semibold">{pkg.title}</td>
                <td className="p-4">{pkg.price.toLocaleString()} บาท</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    pkg.isPublished 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pkg.isPublished ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{new Date(pkg.createdAt).toLocaleDateString('th-TH')}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" title="แก้ไข"><FiEdit /></button>
                    <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600" title="ลบ"><FiTrash2 /></button>
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