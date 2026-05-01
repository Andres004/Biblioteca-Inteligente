import { useEffect, useState } from 'react';
import { Navbar } from '../components/NavBar';
import { BookCard } from '../components/BookCard';
import { getFavorites, removeFavorite } from '../utils/storage';

export default function Favoritos() {
  const [favs, setFavs] = useState<any[]>([]);

  useEffect(() => {
    setFavs(getFavorites());
  }, []);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setFavs(getFavorites());
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Mis Libros Favoritos</h2>
        
        {favs.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>
            No tienes libros en favoritos todavia.
          </p>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {favs.map((b: any) => (
              <BookCard
                key={b.id}
                id={b.id}
                title={b.title}
                author={b.author}
                firstPublishYear={b.year}
                editionCount={b.editions}
                isFavorite={true}
                onToggleFavorite={handleRemove}
                onViewDetails={(id) => window.location.href = `/libro/${id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}