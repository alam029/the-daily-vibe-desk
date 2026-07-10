import { CATEGORIES } from '../api/news';
import './CategoryTabs.css';

const LABELS = {
  general: 'Front Page',
  business: 'Business',
  technology: 'Tech',
  sports: 'Sports',
  health: 'Health',
  science: 'Science',
};

export default function CategoryTabs({ active, onSelect }) {
  return (
    <div className="category-tabs">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`category-tabs__item ${active === cat ? 'is-active' : ''}`}
          onClick={() => onSelect(cat)}
          type="button"
        >
          {LABELS[cat] || cat}
        </button>
      ))}
    </div>
  );
}
