'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) {
      await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      fetchArticles();
    }
  };

  if (loading) return <p>กำลังโหลดบทความ...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">จัดการบทความ</h1>
        <Link href="/dashboard/admin/articles/new" className="flex items-center gap-2 bg-brand-red text-white font-bold py-2 px-4 rounded-lg">
          <FiPlus />
          <span>เขียนบทความใหม่</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">หัวข้อ</th>
              <th className="p-4">ผู้เขียน</th>
              <th className="p-4">สถานะ</th>
              <th className="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t">
                <td className="p-4 font-semibold">{article.title}</td>
                <td className="p-4 text-gray-600">{article.author.name}</td>
                <td className="p-4">{article.isPublished ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/admin/articles/edit/${article.id}`} className="p-2 bg-blue-500 text-white rounded-md"><FiEdit /></Link>
                    <button onClick={() => handleDelete(article.id)} className="p-2 bg-red-500 text-white rounded-md"><FiTrash2 /></button>
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