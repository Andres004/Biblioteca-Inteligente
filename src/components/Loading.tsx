import React from 'react';

export function Loading() {
    const fakeCards = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '20px' 
        }}>
            {fakeCards.map((n) => (
                <div key={n} className="book-card">
                    <div className="skeleton skeleton-img"></div>
                    
                    <div className="book-info">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text short"></div>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <div className="skeleton skeleton-btn"></div>
                        <div className="skeleton skeleton-btn"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}