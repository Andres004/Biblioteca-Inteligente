import { useState } from 'react';
import { validateYearFilter } from '../utils/utils';

export type FilterValues = {
  minYear?: string;
  maxYear?: string;
  language?: string;
  author?: string;
  sortBy?: 'year' | 'editions' | '';
};

type Props = {
  onApplyFilters: (filters: FilterValues) => void;
};

export function FilterPanel({ onApplyFilters }: Props) {
  const [filters, setFilters] = useState<FilterValues>({
    minYear: '',
    maxYear: '',
    language: '',
    author: '',
    sortBy: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const validationError = validateYearFilter(filters.minYear, filters.maxYear);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onApplyFilters(filters);
  };

  return (
    <div className="filter-panel">
      <h4 className="filter-panel__title">Filtros Avanzados</h4>
      {error && <p className="filter-panel__error">{error}</p>}

      <div className="filter-panel__grid">
        <div className="form-group">
          <label htmlFor="minYear">Año Mínimo</label>
          <input id="minYear" type="number" name="minYear" value={filters.minYear} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="maxYear">Año Máximo</label>
          <input id="maxYear" type="number" name="maxYear" value={filters.maxYear} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="language">Idioma (ej. spa, eng)</label>
          <input id="language" type="text" name="language" value={filters.language} onChange={handleChange} placeholder="spa" />
        </div>
        <div className="form-group">
          <label htmlFor="filterAuthor">Autor</label>
          <input id="filterAuthor" type="text" name="author" value={filters.author} onChange={handleChange} placeholder="Nombre del autor..." />
        </div>
        <div className="form-group form-group--full">
          <label htmlFor="sortBy">Ordenar por</label>
          <select id="sortBy" name="sortBy" value={filters.sortBy} onChange={handleChange}>
            <option value="">Seleccionar...</option>
            <option value="year">Año de publicación</option>
            <option value="editions">Cantidad de ediciones</option>
          </select>
        </div>
      </div>

      <button className="btn btn-action" onClick={handleApply}>Aplicar Filtros</button>
    </div>
  );
}
