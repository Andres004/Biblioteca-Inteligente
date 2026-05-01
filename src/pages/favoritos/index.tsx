import { useEffect, useState } from 'react';
import { Navbar } from '../../components/NavBar';
import { BookCard } from '../../components/BookCard';
import { getFavorites, removeFavorite } from '../../utils/storage';

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
      <div className="container page-content">
        <h2 className="section-title">Mis Libros Favoritos</h2>

        {favs.length === 0 ? (
          <p className="empty-state">No tienes libros en favoritos todavía.</p>
        ) : (
          <div className="books-grid">
            {favs.map((b: any) => (
              <BookCard
                key={b.id}
                id={b.id}
                title={b.title}
                author={b.author}
                firstPublishYear={b.year}
                editionCount={b.editions}
                coverUrl={b.cover || b.coverUrl}
                isFavorite={true}
                onToggleFavorite={() => handleRemove(b.id)}
                onViewDetails={(id) => window.location.href = `/libro/${id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
