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
      const fetchDetalle = async () => {
        const data = await getBookDetail(workId as string);
        setBook(data);
        setFav(isFavorite(workId as string));
        setLoading(false);
      };
      fetchDetalle();
    }
  }, [workId]);

  const handleToggleFav = () => {
    if (fav) {
      removeFavorite(book.id);
      setFav(false);
    } else {
      addFavorite({
        id: book.id,
        title: book.title,
        author: ['Ver detalle para autor'], 
        year: book.date,
        editions: 1,
        coverUrl: book.coverLg
      });
      setFav(true);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <p style={{ padding: '20px', textAlign: 'center' }}>Cargando detalle del libro...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div>
        <Navbar />
        <p style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Libro no encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <button 
          onClick={() => router.back()} 
          style={{ padding: '8px 15px', marginBottom: '20px', cursor: 'pointer' }}
        >
          Volver
        </button>
        
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {book.coverLg ? (
            <img src={book.coverLg} alt={book.title} style={{ maxWidth: '300px', width: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ width: '300px', height: '400px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Sin portada grande
            </div>
          )}
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ marginBottom: '10px' }}>{book.title}</h1>
            <p><strong>Fecha de publicacion:</strong> {book.date}</p>
            
            {book.subjects && book.subjects.length > 0 && (
              <p style={{ marginTop: '10px' }}><strong>Temas:</strong> {book.subjects.join(', ')}</p>
            )}
            
            <button 
              onClick={handleToggleFav} 
              style={{ padding: '10px 15px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
            
            <div style={{ marginTop: '30px' }}>
              <h3>Descripcion</h3>
              <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{book.description}</p>
            </div>
            
            <a 
              href={`https://openlibrary.org/works/${book.id}`} 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'inline-block', marginTop: '30px', color: 'blue' }}
            >
              Ver en Open Library
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}