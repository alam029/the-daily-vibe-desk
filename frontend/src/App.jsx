import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import MySummaries from './pages/MySummaries';
import Login from './pages/Login';
import Footer from './components/Footer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route
          path="/"
          element={<Home searchQuery={searchQuery} onSearchConsumed={() => setSearchQuery('')} />}
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/my-summaries" element={<MySummaries />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
