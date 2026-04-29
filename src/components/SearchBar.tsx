import React, { useState } from 'react';
import { validateSearchQuery } from '../utils/utils';

export type SearchBarProps = {
    onSearch: (query: string, type: 'q' | 'title' | 'author' | 'subject') => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
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
    <div style={{ marginBottom: '1rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar libros..."
            style={{ padding: '0.5rem', flex: 1 }}/>
        <select 
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as any)}
            style={{ padding: '0.5rem' }}>
            <option value="q">Todos</option>
            <option value="title">Título</option>
            <option value="author">Autor</option>
            <option value="subject">Tema/Palabra clave</option>
        </select>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Buscar</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
    </div>
    );
}
