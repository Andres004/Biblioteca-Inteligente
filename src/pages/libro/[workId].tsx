import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Navbar } from '../../components/NavBar';
import { getBookDetail } from '../../services/openLibraryService';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/storage';

export default function LibroDetalle() {
  const router = useRouter();
  const { workId } = router.query;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (workId) {
      getBookDetail(workId as string).then((data) => {
        setBook(data);
        setFav(isFavorite(workId as string));
        setLoading(false);
      });
    }
  }, [workId]);

  const handleToggleFav = () => {
    if (fav) {
      removeFavorite(book.id);
    } else {
      addFavorite({ id: book.id, title: book.title, author: [], year: book.date, editions: 1, coverUrl: book.coverLg });
    }
    setFav(!fav);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container page-content">
          <p className="empty-state">Cargando detalle del libro...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div>
        <Navbar />
        <div className="container page-content">
          <p className="empty-state">Libro no encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container page-content">
        <div className="detail-page">
          <button className="btn btn-outline" onClick={() => router.back()}>← Volver</button>

          <div className="detail-page__layout" style={{ marginTop: '24px' }}>
            <div className="detail-page__cover">
              {book.coverLg
                ? <img src={book.coverLg} alt={book.title} />
                : <div className="detail-page__cover--placeholder">Sin portada</div>
              }
            </div>

            <div className="detail-page__info">
              <h1>{book.title}</h1>
              <p><strong>Fecha de publicación:</strong> {book.date}</p>

              {book.subjects?.length > 0 && (
                <p><strong>Temas:</strong> {book.subjects.join(', ')}</p>
              )}

              <div className="detail-page__actions">
                <button className="btn btn-primary" onClick={handleToggleFav}>
                  {fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </button>
              </div>

              <div className="detail-page__description">
                <h3>Descripción</h3>
                <p>{book.description}</p>
              </div>

              <a
                href={`https://openlibrary.org/works/${book.id}`}
                target="_blank"
                rel="noreferrer"
                className="detail-page__link"
              >
                Ver en Open Library →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}