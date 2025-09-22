'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (status === 'authenticated' && session?.user?.role !== 'admin' && session?.user?.role !== 'owner') {
        router.push('/dashboard');
    }
    if (status === 'authenticated' && id) {
      fetch(`/api/admin/packages/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData(data);
          setLoading(false);
        });
    }
  }, [id, session, status, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/dashboard/admin/packages');
      } else {
        alert('Failed to update package');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || !formData) {
      return <p>กำลังโหลดข้อมูลแพ็กเกจ...</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">แก้ไขแพ็กเกจ: {formData.name}</h1>
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium">ชื่อแพ็กเกจ</label>
          <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div>
          <label htmlFor="slug" className="block font-medium">Slug (สำหรับ URL)</label>
          <input type="text" name="slug" id="slug" value={formData.slug || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="duration" className="block font-medium">ระยะเวลา (วัน)</label>
                <input type="number" name="duration" id="duration" value={formData.duration || 0} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
            </div>
            <div>
                <label htmlFor="price" className="block font-medium">ราคา (บาท)</label>
                <input type="number" name="price" id="price" step="0.01" value={formData.price || 0} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
            </div>
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">รายละเอียด</label>
          <textarea name="description" id="description" rows="5" value={formData.description || ''} onChange={handleChange} className="w-full p-2 border rounded mt-1" required></textarea>
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
          {isUpdating ? 'กำลังอัปเดต...' : 'อัปเดตแพ็กเกจ'}
        </button>
      </form>
    </div>
  );
}