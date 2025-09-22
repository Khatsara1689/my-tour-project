'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน!');
      return;
    }

    setIsLoading(true);
    setError(null);

    const requestBody = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
    };

    console.log("Sending data from Frontend:", requestBody);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดบางอย่าง');
      }

      alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
      router.push('/login');
      
    } catch (err) {
      setError(err.message);
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">สร้างบัญชีใหม่</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
            <input 
              id="name" 
              name="name"
              type="text" 
              required 
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">อีเมล</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              required 
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red" />
          </div>

          <div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-red hover:bg-brand-red-dark focus:outline-none disabled:bg-gray-400"
            >
              {isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
          </div>

          {error && (
            <p className="text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}

        </form>
         <p className="text-center text-sm text-gray-600">
          มีบัญชีอยู่แล้ว?{' '}
          <Link href="/login" className="font-medium text-brand-red hover:underline">
            เข้าสู่ระบบที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}