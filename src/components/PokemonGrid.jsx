import React from 'react';
import PokemonCard from './PokemonCard';
import Spinner from './Spinner';

const PokemonGrid = ({ pokemonList, onViewDetails, favorites, onToggleFavorite, loading, onLoadMore, hasMore }) => {
  const favoriteIds = new Set(favorites.map((f) => f.id));

  if (pokemonList.length === 0 && !loading) {
    return (
      <div className="info-section">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--text-muted)' }} aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2M9 9h.01M15 9h.01" />
        </svg>
        <h3>No se encontraron Pokémon</h3>
        <p>Intenta con otro término de búsqueda o verifica que el número sea correcto.</p>
      </div>
    );
  }

  return (
    <>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} onViewDetails={onViewDetails}
            isFavorite={favoriteIds.has(pokemon.id)} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
      {loading && <Spinner message="Cargando más Pokémon..." />}
      {!loading && hasMore && pokemonList.length > 0 && (
        <div className="load-more-container">
          <button type="button" className="btn btn-primary" onClick={onLoadMore}
            style={{ minWidth: '200px', fontSize: '1rem', padding: '0.8rem 2rem' }}>
            Cargar más
          </button>
        </div>
      )}
    </>
  );
};

export default PokemonGrid;
