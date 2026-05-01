import { useEffect, useState } from 'react';
import { Navbar } from '../components/NavBar';
import { BookCard } from '../components/BookCard';
import { Loading } from '../components/Loading';
import { searchBooks } from '../services/openLibraryService';

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInicio = async () => {
      const res = await searchBooks('programming');
      setBooks(res);
      setLoading(false);
    };
    fetchInicio();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ paddingLeft: '20px' }}>Libros Destacados</h2>
      
      {loading ? (
        <Loading />
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {books.map((b: any) => (
            <BookCard
              key={b.id}
              id={b.id}
              title={b.title}
              author={b.author}
              firstPublishYear={b.year}
              editionCount={b.editions}
              isFavorite={false}
              onToggleFavorite={(id) => console.log('agregar a fav', id)}
              onViewDetails={(id) => window.location.href = `/libro/${id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}