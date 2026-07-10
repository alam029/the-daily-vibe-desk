import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSavedArticles, deleteSummary } from '../api/news';
import './MySummaries.css';

export default function MySummaries() {
  const { isAuthed } = useAuth();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthed) {
      setLoading(false);
      return;
    }
    getSavedArticles()
      .then(setSaved)
      .catch(() => setError('Could not load your saved summaries.'))
      .finally(() => setLoading(false));
  }, [isAuthed]);

  const handleDelete = async (id) => {
    setSaved((prev) => prev.filter((s) => s._id !== id));
    try {
      await deleteSummary(id);
    } catch {
      // nothing
    }
  };

  if (!isAuthed) {
    return (
      <main className="my-summaries">
        <div className="dispatch-empty">
          <span className="eyebrow">Byline Required</span>
          <p>
            <Link to="/login">Sign in</Link> to save AI summaries and read them back later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="my-summaries">
      <span className="eyebrow">Filed Summaries</span>
      <h1 className="masthead-title">My Summaries</h1>
      <hr className="wire-rule wire-rule--soft" style={{ margin: '16px 0 24px' }} />

      {loading && <p className="eyebrow">Loading archive…</p>}
      {error && <p className="summarizer__error">{error}</p>}

      {!loading && !error && saved.length === 0 && (
        <div className="dispatch-empty">
          <span className="eyebrow">Archive Empty</span>
          <p>Summaries you save from articles will appear here.</p>
        </div>
      )}

      <div className="my-summaries__list">
        {saved.map((item) => (
          <article key={item._id} className="saved-item">
            <div className="saved-item__header">
              <span className="tag-pill">{item.source || 'Wire Service'}</span>
              <span className="dateline">
                {new Date(item.savedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </span>
            </div>
            <h3>{item.title}</h3>
            <pre>{item.summary}</pre>
            <div className="saved-item__footer">
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer">
                  Read Full Article ↗
                </a>
              )}
              <button onClick={() => handleDelete(item._id)} type="button">
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
