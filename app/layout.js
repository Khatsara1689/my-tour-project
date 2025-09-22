// file: app/layout.js
import { Noto_Sans_Thai } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});

export const metadata = {
  title: 'ทัวร์ญี่ปุ่นส่วนตัว by J-Tours',
  description: 'บริการจัดทัวร์ญี่ปุ่นแบบส่วนตัวและกรุ๊ปเหมา',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      {/* คอมเมนต์ที่เคยอยู่ตรงนี้ คือสาเหตุของปัญหา 
        เราจะย้ายมันเข้าไปใน <body> หรือลบทิ้งไปเลยก็ได้
      */}
      <body className={`${notoSansThai.variable} font-sans`}>
        {/* ย้ายคอมเมนต์มาไว้ตรงนี้แทนได้ ไม่มีปัญหา */}
        <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-6 py-8">
            {children}
          </main>
          <Footer />
        </div>
          </AuthProvider>
      </body>
    </html>
  );
}