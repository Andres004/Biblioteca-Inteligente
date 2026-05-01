export const getFavorites = () => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('favoritos_biblioteca');
  return data ? JSON.parse(data) : [];
}

export const addFavorite = (book: any) => {
  if (typeof window === 'undefined') return;
  const favs = getFavorites();
  const exists = favs.find((f: any) => f.id === book.id);
  
  if (!exists) {
    favs.push(book);
    localStorage.setItem('favoritos_biblioteca', JSON.stringify(favs));
  }
}

export const removeFavorite = (id: string) => {
  if (typeof window === 'undefined') return;
  const favs = getFavorites();
  const newFavs = favs.filter((f: any) => f.id !== id);
  localStorage.setItem('favoritos_biblioteca', JSON.stringify(newFavs));
}

export const isFavorite = (id: string) => {
  const favs = getFavorites();
  return favs.some((f: any) => f.id === id);
}