export function Loading() {
  const fakeCards = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="books-grid">
      {fakeCards.map((n) => (
        <div key={n} className="book-card">
          <div className="skeleton skeleton-img" />
          <div className="book-info">
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text short" />
          </div>
          <div style={{ marginTop: '15px' }}>
            <div className="skeleton skeleton-btn" />
            <div className="skeleton skeleton-btn" />
          </div>
        </div>
      ))}
    </div>
  );
}