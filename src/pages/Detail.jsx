import React, { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../api/pokeApi';
import PokemonDetail from '../components/PokemonDetail';
import Spinner from '../components/Spinner';

const Detail = ({ pokemonId, onBack, pokemonList = [], favorites, onToggleFavorite, notes, onSaveNote }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      const local = pokemonList.find((p) => p.id === pokemonId);
      if (local) { setPokemon(local); setLoading(false); return; }
      const fav = favorites.find((p) => p.id === pokemonId);
      if (fav) { setPokemon(fav); setLoading(false); return; }
      try {
        setPokemon(await fetchPokemonDetail(pokemonId));
      } catch (err) {
        setError(err.message || 'Error al cargar el detalle.');
      } finally {
        setLoading(false);
      }
    };
    if (pokemonId) load();
  }, [pokemonId, pokemonList, favorites]);

  const isFavorite = favorites.some((f) => f.id === pokemonId);

  if (loading) return <Spinner message="Cargando ficha técnica..." />;

  if (error) return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '1.5rem' }}>Volver</button>
      <div className="error-alert" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <span>{error}</span>
      </div>
    </div>
  );

  return pokemon && (
    <PokemonDetail pokemon={pokemon} onBack={onBack} isFavorite={isFavorite}
      onToggleFavorite={onToggleFavorite} personalNote={notes[pokemonId] || ''} onSaveNote={onSaveNote} />
  );
};

export default Detail;
