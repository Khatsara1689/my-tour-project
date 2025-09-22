// file: app/dashboard/admin/users/page.js
'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiEdit, FiLock, FiTrash2 } from 'react-icons/fi';

// (ฟังก์ชันจัดการยังคงเป็นตัวอย่างก่อนนะครับ)
const handleResetPassword = (userId) => {
  alert(`กำลังส่งอีเมลรีเซ็ตรหัสผ่านไปให้ผู้ใช้ ID: ${userId}`);
};

const handleDeleteUser = (userId, userRole) => {
  if (userRole === 'owner') {
    alert('ไม่สามารถลบผู้ใช้ระดับ Owner ได้');
    return;
  }
  if(window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
    alert(`กำลังลบผู้ใช้ ID: ${userId}`);
  }
};

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>กำลังโหลดข้อมูลสมาชิก...</p>;
  }

  return (
    // ให้เริ่มต้นด้วย div ที่เป็นเนื้อหาของเพจเลย ไม่ต้องมี layout
    <div>
      <h1 className="text-3xl font-bold mb-8">จัดการสมาชิก</h1>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <FiSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
        <input 
          type="text"
          placeholder="ค้นหาด้วยชื่อ หรือ อีเมล..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 p-3 border rounded-md bg-white"
        />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">ชื่อ - อีเมล</th>
              <th className="p-4">สิทธิ์ (Role)</th>
              <th className="p-4">วันที่สมัคร</th>
              <th className="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">
                  <div className="font-semibold">{user.name || '-'}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    user.role === 'owner' ? 'bg-red-100 text-red-800' :
                    user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString('th-TH')}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" title="แก้ไขสิทธิ์"><FiEdit /></button>
                    <button onClick={() => handleResetPassword(user.id)} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" title="รีเซ็ตรหัสผ่าน"><FiLock /></button>
                    <button onClick={() => handleDeleteUser(user.id, user.role)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300" title="ลบผู้ใช้" disabled={user.role === 'owner'}>
                      <FiTrash2 />
                    </button>
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