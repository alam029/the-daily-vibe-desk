import { api } from './client';

export const CATEGORIES = ['general', 'business', 'technology', 'sports', 'health', 'science'];

export async function fetchNews({ category, q } = {}) {
  const params = {};
  if (category) params.category = category;
  if (q) params.q = q;
  const { data } = await api.get('/news', { params });
  return data.articles;
}

export async function summarizeArticle(text) {
  const { data } = await api.post('/summarize', { text });
  return data.summary;
}

export async function signup(username, password) {
  const { data } = await api.post('/auth/signup', { username, password });
  return data;
}

export async function login(username, password) {
  const { data } = await api.post('/auth/login', { username, password });
  return data;
}

export async function getSavedArticles() {
  const { data } = await api.get('/user/saved');
  return data.saved;
}

export async function saveSummary(payload) {
  const { data } = await api.post('/user/saved', payload);
  return data.saved;
}

export async function deleteSummary(id) {
  const { data } = await api.delete(`/user/saved/${id}`);
  return data;
}
