export const validateSearchQuery = (query: string): string | null => {
  if (!query || query.trim().length < 3) {
    return 'La búsqueda debe tener al menos 3 caracteres.';
  }
  return null;
};

export const validateYearFilter = (minYear?: string, maxYear?: string): string | null => {
  const min = minYear ? Number(minYear) : undefined;
  const max = maxYear ? Number(maxYear) : undefined;

  if (min !== undefined && isNaN(min)) return 'El año mínimo debe ser un número válido.';
  if (max !== undefined && isNaN(max)) return 'El año máximo debe ser un número válido.';
  if (min !== undefined && min < 0) return 'El año no puede ser negativo.';
  if (min !== undefined && max !== undefined && min > max) {
    return 'El año mínimo no puede ser mayor al año máximo.';
  }
  return null;
};
