'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // ดึง ID ของบทความจาก URL
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState(null); // เริ่มต้นเป็น null
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  // 1. ดึงข้อมูลบทความเดิมมาแสดง
  useEffect(() => {
    // ป้องกันหน้า
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
      router.push('/dashboard');
    }
    
    // ถ้ามี id และล็อกอินแล้ว ให้เริ่มดึงข้อมูล
    if (status === 'authenticated' && id) {
      fetch(`/api/admin/articles/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            // กรณีหาบทความไม่เจอ
            alert(data.error);
            router.push('/dashboard/admin/articles');
          } else {
            setFormData(data);
          }
          setLoading(false);
        });
    }
  }, [id, session, status, router]);

  // 2. จัดการการเปลี่ยนแปลงในฟอร์ม
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  // 3. ส่งข้อมูลที่แก้ไขแล้วกลับไปที่ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('อัปเดตบทความสำเร็จ!');
        router.push('/dashboard/admin/articles');
      } else {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update article');
      }
    } catch (error) {
      console.error(error);
      alert(`เกิดข้อผิดพลาด: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  // แสดงสถานะ Loading ขณะรอข้อมูล
  if (loading || !formData) {
      return <p>กำลังโหลดข้อมูลบทความ...</p>
  }

  // 4. แสดงผลฟอร์มที่มีข้อมูลเดิมอยู่
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">แก้ไขบทความ</h1>
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium">หัวข้อบทความ</label>
          <input type="text" name="title" id="title" value={formData.title || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div>
          <label htmlFor="slug" className="block font-medium">Slug (สำหรับ URL)</label>
          <input type="text" name="slug" id="slug" value={formData.slug || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium">เนื้อหา</label>
          <textarea name="content" id="content" rows="10" value={formData.content || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" required></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block font-medium">URL รูปภาพหน้าปก</label>
          <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </div>
        <div className="flex items-center gap-4">
            <input type="checkbox" name="isPublished" id="isPublished" checked={formData.isPublished || false} onChange={handleChange} className="h-4 w-4"/>
            <label htmlFor="isPublished" className="font-medium">เผยแพร่</label>
        </div>
        <button type="submit" disabled={isUpdating} className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-red-dark disabled:bg-gray-400">
          {isUpdating ? 'กำลังอัปเดต...' : 'อัปเดตบทความ'}
        </button>
      </form>
    </div>
  );
}