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
    isFavorite,
    onToggleFavorite,
    onViewDetails
}: BookCardProps) {
    const finalCover = coverUrl || (coverId 
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
        : 'https://placehold.co/200x320?text=Sin+Portada');
    
    const authorName = Array.isArray(author) ? author.join(', ') : author;

    return (
        <div className="book-card">
            <img 
                src={finalCover} 
                alt={title} 
                className="book-cover" 
                onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/200x320?text=Sin+Portada';
                }}
            />
            
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                
                <div className="book-detail-row">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    <span>{authorName || 'Autor Desconocido'}</span>
                </div>

                {firstPublishYear ? (
                    <div className="book-detail-row">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{firstPublishYear}</span>
                    </div>
                ) : null}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button className="btn btn-outline" style={{ flex: 1, margin: 0 }} onClick={() => onViewDetails(id)}>
                    Ver Detalles
                </button>
                <div 
                    onClick={() => onToggleFavorite(id)}
                    style={{ 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--btn-bg)',
                        boxShadow: 'inset 2px 2px 5px var(--shadow-dark), inset -2px -2px 5px var(--shadow-light)',
                        transition: 'transform 0.1s ease'
                    }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill={isFavorite ? "#f59e0b" : "none"} 
                        stroke={isFavorite ? "#f59e0b" : "var(--text-muted)"} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </div>
            </div>
        </div>
    );
}