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
  
  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentType, setCurrentType] = useState<'q' | 'title' | 'author' | 'subject'>('q');

  const handleSearch = async (query: string, type: 'q' | 'title' | 'author' | 'subject', pageNum: number = 1) => {
    setLoading(true);
    setHasSearched(true);
    setCurrentQuery(query);
    setCurrentType(type);
    setPage(pageNum);

    const results = await searchBooks(query, type, pageNum);
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

  const prevPage = () => {
    if (page > 1) {
      handleSearch(currentQuery, currentType, page - 1);
    }
  };

  const nextPage = () => {
    handleSearch(currentQuery, currentType, page + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="container" style={{ paddingBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px' }}>Buscador Avanzado</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          <SearchBar onSearch={(q, t) => handleSearch(q, t, 1)} />
          <FilterPanel onApplyFilters={handleApplyFilters} />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div>
            {hasSearched && filteredBooks.length === 0 && (
              <p style={{ textAlign: 'center', padding: '40px' }}>
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
                  coverUrl={b.cover}
                  isFavorite={isFavorite(b.id)}
                  onToggleFavorite={() => handleFav(b)}
                  onViewDetails={(id) => window.location.href = `/libro/${id}`}
                />
              ))}
            </div>

            {filteredBooks.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                <button 
                  className="btn" 
                  style={{ width: 'auto', padding: '10px 20px' }} 
                  onClick={prevPage} 
                  disabled={page === 1}
                >
                  Anterior
                </button>
                <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                  Pagina {page}
                </span>
                <button 
                  className="btn" 
                  style={{ width: 'auto', padding: '10px 20px' }} 
                  onClick={nextPage}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}