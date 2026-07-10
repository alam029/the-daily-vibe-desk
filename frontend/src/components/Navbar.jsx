import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar({ onSearch }) {
  const { theme, toggleTheme } = useTheme();
  const { isAuthed, username, logout } = useAuth();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query.trim());
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar__top">
        <span className="dateline">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <button className="theme-toggle" onClick={toggleTheme} type="button">
          {theme === 'broadsheet' ? '☾ Night Desk' : '☼ Broadsheet'}
        </button>
      </div>

      <hr className="wire-rule" />

      <div className="navbar__main">
        <Link to="/" className="navbar__brand">
          <span className="masthead-title">The Daily Vibe Desk</span>
          <span className="eyebrow navbar__tagline">EST. 2026 &#183; newsvibe</span>
        </Link>

        <form className="navbar__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search the vibe…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search articles"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <hr className="wire-rule" />

      <nav className="navbar__links">
        <Link to="/">Home</Link>
        <Link to="/my-summaries">My Summaries</Link>
        <span className="navbar__spacer" />
        {isAuthed ? (
          <>
            <span className="eyebrow">Byline: {username}</span>
            <button className="link-button" onClick={logout} type="button">
              Sign out
            </button>
          </>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
