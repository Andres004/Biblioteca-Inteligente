import React from 'react';

export type BookCardProps = {
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

export function BookCard({
    id,
    title,
    author,
    coverId,
    coverUrl,
    firstPublishYear,
    editionCount,
    isFavorite,
    onToggleFavorite,
    onViewDetails
}: BookCardProps) {
    const finalCover = coverUrl || (coverId 
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
        : 'https://placehold.co/200x300?text=Sin+Portada');
    
    const authorName = Array.isArray(author) ? author.join(', ') : author;

    return (
        <div className="book-card">
            <img 
                src={finalCover} 
                alt={title} 
                className="book-cover" 
                onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/200x300?text=Sin+Portada';
                }}
            />
            
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p><strong>Autor:</strong> {authorName || 'Desconocido'}</p>
                {firstPublishYear ? <p><strong>Publicacion:</strong> {firstPublishYear}</p> : null}
                {editionCount ? <p><strong>Ediciones:</strong> {editionCount}</p> : null}
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