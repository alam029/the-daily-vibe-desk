import ArticleCard from './ArticleCard';
import './ArticleList.css';

function CardSkeleton() {
  return (
    <div className="article-card article-card--skeleton">
      <div className="skeleton article-card__media" />
      <div className="article-card__body">
        <div className="skeleton" style={{ height: 10, width: '40%' }} />
        <div className="skeleton" style={{ height: 18, width: '90%', marginTop: 8 }} />
        <div className="skeleton" style={{ height: 14, width: '70%', marginTop: 6 }} />
      </div>
    </div>
  );
}

export default function ArticleList({ articles, loading, error }) {
  if (loading) {
    return (
      <div className="article-list">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="dispatch-empty">
        <span className="eyebrow">Vibe Interrupted</span>
        <p>{error}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="dispatch-empty">
        <span className="eyebrow">No Dispatches</span>
        <p>No articles found for this desk. Try another category or search term.</p>
      </div>
    );
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
