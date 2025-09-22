'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/dashboard/Sidebar';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // This effect will run when the session status changes
  useEffect(() => {
    if (status === 'unauthenticated') {
      // If the user is not logged in, redirect them to the login page
      router.push('/login');
    }
  }, [status, router]);

  // While the session is loading, show a loading indicator
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  // If the user is authenticated, render the dashboard
  if (status === 'authenticated') {
    return (
      <div className="flex">
        {/* Pass the actual user role from the session to the Sidebar */}
        <Sidebar role={session.user.role} />
        <main className="flex-grow p-4 sm:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    );
  }

  // Fallback content, though the redirect should handle most cases
  return null;
}
