'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { FiUser, FiMail, FiPhone, FiCamera, FiSave, FiLock, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State for form data, separate from original data
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  // Fetch profile data when session is available
  useEffect(() => {
    if (status === 'authenticated') {
      setLoading(true);
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          if(data) {
            setFormData({
              name: data.name || '',
              phone: data.phone || '',
            });
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch profile", err);
          setLoading(false);
        });
    }
  }, [status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
      });
      
      const result = await response.json();

      if(!response.ok) {
          throw new Error(result.error || 'Something went wrong');
      }

      alert('อัปเดตโปรไฟล์สำเร็จ!');
    } catch (error) {
        alert(`เกิดข้อผิดพลาด: ${error.message}`);
    } finally {
        setIsSaving(false);
    }
  };

  // Show loading state while fetching session or data
  if (status === 'loading' || loading) {
    return (
        <div className="flex justify-center items-center h-64">
            <p>Loading profile...</p>
        </div>
    );
  }

  // If authenticated, show the profile form
  if (status === 'authenticated') {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">จัดการโปรไฟล์</h1>
        
        <form onSubmit={handleProfileSubmit} className="p-8 bg-white rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-6">ข้อมูลส่วนตัว</h2>
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-6">
            <div className="relative">
              <Image 
                src={session.user.image || '/my-logo.png'} // Use image from session or a default
                alt="Profile Picture" 
                width={100} 
                height={100} 
                className="rounded-full object-cover" 
              />
              <label htmlFor="file-upload" className="absolute bottom-0 right-0 p-2 bg-brand-red text-white rounded-full cursor-pointer hover:bg-brand-red-dark">
                <FiCamera />
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
            </div>
            <div className="flex-grow w-full">
              <div className="relative mb-4">
                <FiUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-12 p-3 border rounded-md" placeholder="ชื่อ-นามสกุล"/>
              </div>
              <div className="relative">
                <FiPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-12 p-3 border rounded-md" placeholder="เบอร์โทรศัพท์"/>
              </div>
            </div>
          </div>
          <div className="relative mb-6">
            <FiMail className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input type="email" name="email" value={session.user.email || ''} disabled className="w-full pl-12 p-3 border rounded-md bg-gray-100 cursor-not-allowed" />
          </div>
          <button 
            type="submit" 
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-red-dark disabled:bg-gray-400"
          >
            <FiSave />
            <span>{isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</span>
          </button>
        </form>

        <div className="p-8 bg-white rounded-lg shadow-md">
           <h2 className="text-2xl font-semibold mb-6">ความปลอดภัย</h2>
           <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300">
                  <FiLock />
                  <span>เปลี่ยนรหัสผ่าน</span>
              </button>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 font-bold py-3 px-6 rounded-lg hover:bg-red-200">
                  <FiLogOut />
                  <span>ออกจากระบบ</span>
              </button>
           </div>
        </div>
      </div>
    );
  }

  // Fallback for any other state (should not be reached if logic is correct)
  return null;
}

