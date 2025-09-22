'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiLogIn } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      const result = await signIn('credentials', {
        redirect: false, // We handle redirect manually
        email,
        password,
      });

      if (result.error) {
        // Handle login errors (e.g., wrong password)
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
        setIsLoading(false);
      } else if (result.ok) {
        // On successful login, redirect to the dashboard
        router.push('/dashboard');
      }
    } catch (err) {
      // Handle unexpected errors
      setError('เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่ในภายหลัง');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">เข้าสู่ระบบ</h1>
            <p className="mt-2 text-gray-600">ยินดีต้อนรับสู่ SIAMPRO TOUR!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-center text-sm text-red-800 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">อีเมล</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red transition duration-150"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-red focus:border-brand-red transition duration-150"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-brand-red hover:underline">
              ลืมรหัสผ่าน?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand-red hover:bg-brand-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red disabled:bg-gray-400 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                <>
                  <FiLogIn />
                  <span>เข้าสู่ระบบ</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          ยังไม่มีบัญชี?{' '}
          <Link href="/register" className="font-medium text-brand-red hover:underline">
            สมัครสมาชิกที่นี่
          </Link>
        </p>
      </div>
    </div>
  );
}
