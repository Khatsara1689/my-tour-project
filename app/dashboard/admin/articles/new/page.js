// file: app/dashboard/admin/articles/new/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    imageUrl: '',
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/dashboard/admin/articles');
      } else {
        alert('Failed to create article');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">เขียนบทความใหม่</h1>
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block font-medium">หัวข้อบทความ</label>
          <input type="text" name="title" id="title" onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div>
          <label htmlFor="slug" className="block font-medium">Slug (สำหรับ URL)</label>
          <input type="text" name="slug" id="slug" onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </div>
        <div>
          <label htmlFor="content" className="block font-medium">เนื้อหา</label>
          <textarea name="content" id="content" rows="10" onChange={handleChange} className="w-full p-2 border rounded mt-1" required></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block font-medium">URL รูปภาพหน้าปก</label>
          <input type="text" name="imageUrl" id="imageUrl" onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </div>
        <div className="flex items-center gap-4">
            <input type="checkbox" name="isPublished" id="isPublished" onChange={handleChange} className="h-4 w-4"/>
            <label htmlFor="isPublished" className="font-medium">เผยแพร่ทันที</label>
        </div>
        <button type="submit" disabled={loading} className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg">
          {loading ? 'กำลังบันทึก...' : 'บันทึกบทความ'}
        </button>
      </form>
    </div>
  );
}