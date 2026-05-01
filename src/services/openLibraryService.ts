export const searchBooks = async (query: string, type: string = 'q') => {
  try {
    const url = `https://openlibrary.org/search.json?${type}=${query}&limit=15`;
    const res = await fetch(url);
    const data = await res.json();

    return data.docs.map((book: any) => ({
      id: book.key.replace('/works/', ''),
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Desconocido',
      year: book.first_publish_year || 0,
      editions: book.edition_count || 1,
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : null
    }));
  } catch (e) {
    console.log("error buscando", e);
    return [];
  }
}

export const getBookDetail = async (id: string) => {
  try {
    const res = await fetch(`https://openlibrary.org/works/${id}.json`);
    const data = await res.json();

    let desc = "No hay descripcion";
    if (data.description) {
      desc = typeof data.description === 'string' ? data.description : data.description.value;
    }

    return {
      id: id,
      title: data.title,
      description: desc,
      coverLg: data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : null,
      subjects: data.subjects ? data.subjects.slice(0, 5) : [],
      date: data.first_publish_date || 'Desconocida'
    };
  } catch (e) {
    console.log("error detalle", e);
    return null;
  }
}