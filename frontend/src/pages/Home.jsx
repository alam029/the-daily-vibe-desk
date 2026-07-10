import { useEffect, useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import ArticleList from '../components/ArticleList';
import { fetchNews } from '../api/news';

// simple in-memory cache to avoid redundant fetches for the same query (bonus)
const cache = new Map();

export default function Home({ searchQuery, onSearchConsumed }) {
  const [category, setCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = searchQuery || '';
    const key = q ? `q:${q}` : `cat:${category}`;

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);

      if (cache.has(key)) {
        setArticles(cache.get(key));
        setLoading(false);
        return;
      }

      try {
        const data = await fetchNews(q ? { q } : { category });
        if (cancelled) return;
        cache.set(key, data);
        setArticles(data);
      } catch (err) {
        if (cancelled) return;
        setError(err.response?.data?.error || 'Could not reach the vibe. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [category, searchQuery]);

  const handleSelectCategory = (cat) => {
    onSearchConsumed?.();
    setCategory(cat);
  };

  return (
    <main>
      <CategoryTabs active={searchQuery ? null : category} onSelect={handleSelectCategory} />
      {searchQuery && (
        <p className="eyebrow" style={{ padding: '16px 24px 0' }}>
          Search results for “{searchQuery}”
        </p>
      )}
      <ArticleList articles={articles} loading={loading} error={error} />
    </main>
  );
}
