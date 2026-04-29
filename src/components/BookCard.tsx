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
    : 'https://www.pngfind.com/pngs/m/651-6516020_portada-libro-png-metal-transparent-png.png';

    const authorName = Array.isArray(author) ? author.join(', ') : author;

    return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem', width: '250px' }}>
        <img src={coverUrl} alt={`Portada de ${title}`} style={{ width: '100%', height: 'auto' }} />
        <h3>{title}</h3>
        <p><strong>Autor:</strong> {authorName || 'Desconocido'}</p>
        {firstPublishYear && <p><strong>Año de publicación:</strong> {firstPublishYear}</p>}
        {editionCount && <p><strong>Ediciones:</strong> {editionCount}</p>}
    
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        <button onClick={() => onViewDetails(id)}> Ver detalle </button>
        <button onClick={() => onToggleFavorite(id)}>
            {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
        </div>
    </div>
    );
}
