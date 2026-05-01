import React from 'react';

export type BookCardProps = {
    id: string;
    title: string;
    author: string | string[];
    coverId?: number;
    firstPublishYear?: number;
    editionCount?: number;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onViewDetails: (id: string) => void;
};

export function BookCard({
    id,
    title,
    author,
    coverId,
    firstPublishYear,
    editionCount,
    isFavorite,
    onToggleFavorite,
    onViewDetails
}: BookCardProps) {
    const coverUrl = coverId 
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
        : 'https://via.placeholder.com/200x300?text=Sin+Portada';
    
    const authorName = Array.isArray(author) ? author.join(', ') : author;

    return (
        <div className="book-card">
            <img src={coverUrl} alt={title} className="book-cover" />
            
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p><strong>Autor:</strong> {authorName || 'Desconocido'}</p>
                {firstPublishYear && <p><strong>Publicacion:</strong> {firstPublishYear}</p>}
                {editionCount && <p><strong>Ediciones:</strong> {editionCount}</p>}
            </div>

            <div style={{ marginTop: '15px' }}>
                <button className="btn btn-primary" onClick={() => onViewDetails(id)}>
                    Ver detalle
                </button>
                <button className="btn" onClick={() => onToggleFavorite(id)}>
                    {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </button>
            </div>
        </div>
    );
}