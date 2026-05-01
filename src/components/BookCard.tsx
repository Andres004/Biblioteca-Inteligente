type Props = {
  id: string;
  title: string;
  author: string | string[];
  coverId?: number;
  coverUrl?: string;
  firstPublishYear?: number;
  editionCount?: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
};

export function BookCard({ id, title, author, coverId, coverUrl, firstPublishYear, isFavorite, onToggleFavorite, onViewDetails }: Props) {
  const finalCover = coverUrl
    || (coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://libreriabosch.com/Content/img/Sin_portada.jpg');

  const authorName = Array.isArray(author) ? author.join(', ') : author;

  return (
    <div className="book-card">
      <img
        src={finalCover}
        alt={title}
        className="book-cover"
        onError={(e) => { e.currentTarget.src = 'https://libreriabosch.com/Content/img/Sin_portada.jpg'; }}
      />

      <div className="book-info">
        <h3 className="book-title">{title}</h3>

        <div className="book-detail-row">
          <img src="/icons/book.png" alt="Autor" width={16} height={16} />
          <span>{authorName || 'Autor Desconocido'}</span>
        </div>

        {firstPublishYear && (
          <div className="book-detail-row">
            <img src="/icons/calendar.png" alt="Año de publicación" width={16} height={16} />
            <span>{firstPublishYear}</span>
          </div>
        )}
      </div>

      <div className="book-actions">
        <button className="btn btn-outline" style={{ flex: 1, margin: 0 }} onClick={() => onViewDetails(id)}>
          Ver Detalles
        </button>
        <button
          className="btn-fav"
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <img
            src={isFavorite ? '/icons/star-filled.png' : '/icons/star-empty.png'}
            alt={isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
            width={22}
            height={22}
          />
        </button>
      </div>
    </div>
  );
}