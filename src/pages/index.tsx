import { useEffect, useState } from 'react';
import { Navbar } from '../components/NavBar';
import { BookCard } from '../components/BookCard';
import { Loading } from '../components/Loading';
import { searchBooks } from '../services/openLibraryService';
import { isFavorite, addFavorite, removeFavorite } from '../utils/storage';

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchInicio = async () => {
      const res = await searchBooks('programming');
      setBooks(res);
      setLoading(false);
    };
    fetchInicio();
  }, []);

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
      <div className="container">
        <h2 style={{ marginBottom: '20px' }}>Libros Destacados</h2>
        
        {loading ? (
          <Loading />
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {books.map((b: any) => (
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
        )}
      </div>
    </div>
  );
}