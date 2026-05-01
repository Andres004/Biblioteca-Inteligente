import { useState } from 'react';
import { Navbar } from '../components/NavBar';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel, FilterValues } from '../components/FilterPanel';
import { BookCard } from '../components/BookCard';
import { Loading } from '../components/Loading';
import { searchBooks } from '../services/openLibraryService';
import { isFavorite, addFavorite, removeFavorite } from '../utils/storage';

export default function Buscar() {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSearch = async (query: string, type: 'q' | 'title' | 'author' | 'subject') => {
    setLoading(true);
    setHasSearched(true);
    const results = await searchBooks(query, type);
    setBooks(results);
    setFilteredBooks(results);
    setLoading(false);
  };

  const handleApplyFilters = (filters: FilterValues) => {
    let result = [...books];

    if (filters.minYear) {
      result = result.filter(b => b.year >= parseInt(filters.minYear as string));
    }
    if (filters.maxYear) {
      result = result.filter(b => b.year <= parseInt(filters.maxYear as string));
    }
    if (filters.language) {
      result = result.filter(b => 
        b.language && b.language.includes(filters.language?.toLowerCase())
      );
    }
    if (filters.author) {
      result = result.filter(b => 
        b.author.toLowerCase().includes((filters.author as string).toLowerCase())
      );
    }
    if (filters.sortBy === 'year') {
      result.sort((a, b) => b.year - a.year);
    } else if (filters.sortBy === 'editions') {
      result.sort((a, b) => b.editions - a.editions);
    }

    setFilteredBooks(result);
  };

  const handleFav = (book: any) => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
    setRefresh(!refresh);
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Buscador Avanzado</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          <SearchBar onSearch={handleSearch} />
          <FilterPanel onApplyFilters={handleApplyFilters} />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div>
            {hasSearched && filteredBooks.length === 0 && (
              <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
                No se encontraron resultados.
              </p>
            )}
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '20px' 
            }}>
              {filteredBooks.map((b: any) => (
                <BookCard
                  key={b.id}
                  id={b.id}
                  title={b.title}
                  author={b.author}
                  firstPublishYear={b.year}
                  editionCount={b.editions}
                  isFavorite={isFavorite(b.id)}
                  onToggleFavorite={() => handleFav(b)}
                  onViewDetails={(id) => window.location.href = `/libro/${id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}