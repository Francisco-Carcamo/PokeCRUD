import React from 'react';
import SearchBar from '../components/SearchBar';
import PokemonGrid from '../components/PokemonGrid';
import Spinner from '../components/Spinner';

const Home = ({ pokemonHook, onViewDetails, favorites, onToggleFavorite }) => {
  const { pokemonList, loading, error, searchQuery, searchPokemon, loadMore, hasMore } = pokemonHook;

  return (
    <section aria-label="Listado de Pokémon">
      <SearchBar onSearch={searchPokemon} initialValue={searchQuery} />
      {error && (
        <div className="error-alert" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      {loading && pokemonList.length === 0 ? (
        <Spinner message="Obteniendo datos de la PokeAPI..." />
      ) : (
        <PokemonGrid pokemonList={pokemonList} onViewDetails={onViewDetails} favorites={favorites}
          onToggleFavorite={onToggleFavorite} loading={loading && pokemonList.length > 0}
          onLoadMore={loadMore} hasMore={hasMore} />
      )}
    </section>
  );
};

export default Home;
