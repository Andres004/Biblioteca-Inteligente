import { useState } from 'react';
import { validateSearchQuery } from '../utils/utils';

type Props = {
  onSearch: (query: string, type: 'q' | 'title' | 'author' | 'subject') => void;
};

export function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'q' | 'title' | 'author' | 'subject'>('q');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateSearchQuery(query);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onSearch(query.trim(), searchType);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar libros..."
          className="search-bar__input"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as 'q' | 'title' | 'author' | 'subject')}
          className="search-bar__select"
        >
          <option value="q">Todos</option>
          <option value="title">Título</option>
          <option value="author">Autor</option>
          <option value="subject">Tema</option>
        </select>
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      {error && <p className="search-bar__error">{error}</p>}
    </div>
  );
}
