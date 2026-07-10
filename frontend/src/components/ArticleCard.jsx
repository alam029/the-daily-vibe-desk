import { Link } from 'react-router-dom';
import './ArticleCard.css';

export default function ArticleCard({ article }) {
  return (
    <Link
      to={`/article/${encodeURIComponent(article.id)}`}
      state={{ article }}
      className="article-card"
    >
      <div className="article-card__media">
        {article.urlToImage ? (
          <img src={article.urlToImage} alt="" loading="lazy" />
        ) : (
          <div className="article-card__media-fallback">No Image on the Vibe</div>
        )}
      </div>
      <div className="article-card__body">
        <span className="eyebrow">{article.source || 'Wire Service'}</span>
        <h3 className="article-card__title">{article.title}</h3>
        {article.description && <p className="article-card__desc">{article.description}</p>}
      </div>
    </Link>
  );
}
