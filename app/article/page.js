async function getArticles() {
  const apiUrl = `${process.env.NEXTAUTH_URL}/api/articles/public`;
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">บทความท่องเที่ยว</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <div key={article.id} className="border rounded-lg shadow-md overflow-hidden">
            {/* You can add a Link here to the article's detail page */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600">โดย {article.author.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}