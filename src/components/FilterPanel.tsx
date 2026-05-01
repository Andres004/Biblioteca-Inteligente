import React, { useState } from 'react';
import { validateYearFilter } from '../utils/utils';

export type FilterValues = {
    minYear?: string;
    maxYear?: string;
    language?: string;
    author?: string;
    sortBy?: 'year' | 'editions' | '';
};

export type FilterPanelProps = {
    onApplyFilters: (filters: FilterValues) => void;
};

export function FilterPanel({ onApplyFilters }: FilterPanelProps) {
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
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
        <h4>Filtros Avanzados</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
            <label style={{ display: 'block' }}>Año Mínimo:</label>
            <input 
            type="number" 
            name="minYear" 
            value={filters.minYear} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '0.25rem' }}/>
        </div>
        <div>
            <label style={{ display: 'block' }}>Año Máximo:</label>
            <input 
            type="number" 
            name="maxYear" 
            value={filters.maxYear} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '0.25rem' }}/>
        </div>
        <div>
            <label style={{ display: 'block' }}>Idioma (ej. spa, eng):</label>
            <input 
            type="text" 
            name="language" 
            value={filters.language} 
            onChange={handleChange} 
            placeholder="spa"
            style={{ width: '100%', padding: '0.25rem' }}/>
        </div>
        <div>
            <label style={{ display: 'block' }}>Autor:</label>
            <input 
            type="text" 
            name="author" 
            value={filters.author} 
            onChange={handleChange} 
            placeholder="Nombre del autor..."
            style={{ width: '100%', padding: '0.25rem' }}/>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block' }}>Ordenar por:</label>
            <select 
            name="sortBy" 
            value={filters.sortBy} 
            onChange={handleChange}
            style={{ width: '100%', padding: '0.25rem' }}>
                <option value="">Seleccionar...</option>
                <option value="year">Año de publicación</option>
                <option value="editions">Cantidad de ediciones</option>
            </select>
        </div>
        </div>
        <button onClick={handleApply} style={{ padding: '0.5rem 1rem' }}>Aplicar Filtros</button>
    </div>
    );
}
