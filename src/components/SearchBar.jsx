import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => { setInputValue(initialValue); }, [initialValue]);

  const handleSubmit = (e) => { e.preventDefault(); onSearch(inputValue); };
  const handleClear = () => { setInputValue(''); onSearch(''); };

  return (
    <div className="search-container">
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>¿Qué Pokémon buscas?</h2>
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre o número (Ej: pikachu o 25)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            aria-label="Buscar Pokémon por nombre o número"
          />
          {inputValue && (
            <button type="button" className="search-clear-btn" onClick={handleClear} aria-label="Limpiar búsqueda">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
    </div>
  );
};

export default SearchBar;
