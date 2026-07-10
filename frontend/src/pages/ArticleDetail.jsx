import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { summarizeArticle, saveSummary } from '../api/news';
import { useAuth } from '../context/AuthContext';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuthed } = useAuth();
  const article = state?.article;

  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error

  if (!article) {
    return (
      <main className="article-detail">
        <div className="dispatch-empty" style={{ margin: '60px auto', maxWidth: 480 }}>
          <span className="eyebrow">Dispatch Not Found</span>
          <p>
            This article wasn't opened from the vibe feed, so its details aren't available.{' '}
            <Link to="/">Return to the front page</Link>.
          </p>
        </div>
      </main>
    );
  }

  const handleSummarize = async () => {
    setLoadingSummary(true);
    setSummaryError(null);
    try {
      const textToSummarize =
        article.content || article.description || article.title || '';
      const result = await summarizeArticle(textToSummarize);
      setSummary(result);
    } catch (err) {
      setSummaryError(
        err.response?.data?.error || 'The AI desk could not summarize this dispatch. Try again.'
      );
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthed) {
      navigate('/login');
      return;
    }
    setSaveState('saving');
    try {
      await saveSummary({
        articleId: article.id,
        title: article.title,
        source: article.source,
        url: article.url,
        urlToImage: article.urlToImage,
        summary,
      });
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
  };

  return (
    <main className="article-detail">
      <Link to="/" className="article-detail__back">
        ← Back to the desk
      </Link>

      <span className="tag-pill">{article.source || 'Wire Service'}</span>
      <h1 className="article-detail__title">{article.title}</h1>

      <div className="article-detail__meta dateline">
        {article.author && <span>By {article.author}</span>}
        {article.publishedAt && (
          <span>
            {new Date(article.publishedAt).toLocaleString('en-US', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </span>
        )}
      </div>

      <hr className="wire-rule wire-rule--soft" style={{ margin: '16px 0 24px' }} />

      {article.urlToImage && (
        <img className="article-detail__image" src={article.urlToImage} alt="" />
      )}

      <p className="article-detail__body">
        {article.description}
        {article.content && (
          <>
            <br />
            <br />
            {article.content.replace(/\[\+\d+ chars\]$/, '')}
          </>
        )}
      </p>

      {article.url && (
        <a
          className="article-detail__read-full"
          href={article.url}
          target="_blank"
          rel="noreferrer"
        >
          Read Full Article ↗
        </a>
      )}

      <section className="summarizer">
        <div className="summarizer__header">
          <span className="eyebrow">AI Desk</span>
          <h2>Summarize this dispatch</h2>
        </div>

        <button
          className="summarizer__button"
          onClick={handleSummarize}
          disabled={loadingSummary}
          type="button"
        >
          {loadingSummary ? 'Summarizing…' : summary ? 'Re-summarize' : 'Summarize'}
        </button>

        {loadingSummary && (
          <div className="summarizer__loading">
            <div className="skeleton" style={{ height: 14, width: '95%' }} />
            <div className="skeleton" style={{ height: 14, width: '85%', marginTop: 8 }} />
            <div className="skeleton" style={{ height: 14, width: '70%', marginTop: 8 }} />
          </div>
        )}

        {summaryError && <p className="summarizer__error">{summaryError}</p>}

        {summary && !loadingSummary && (
          <div className="summarizer__result">
            <pre>{summary}</pre>
            <button
              className="summarizer__save"
              onClick={handleSave}
              disabled={saveState === 'saving' || saveState === 'saved'}
              type="button"
            >
              {saveState === 'saved'
                ? 'Saved to My Summaries ✓'
                : saveState === 'saving'
                ? 'Saving…'
                : isAuthed
                ? 'Save to My Summaries'
                : 'Sign in to save'}
            </button>
            {saveState === 'error' && (
              <p className="summarizer__error">Could not save. Please try again.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
