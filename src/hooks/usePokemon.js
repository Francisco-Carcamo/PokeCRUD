import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonList, fetchPokemonDetail } from '../api/pokeApi';

const LIMIT = 20;

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const loadPokemon = useCallback(async (currentOffset) => {
    try {
      setLoading(true);
      setError(null);
      const newPokemon = await fetchPokemonList(LIMIT, currentOffset);
      setPokemonList((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        return [...prev, ...newPokemon.filter((p) => !existingIds.has(p.id))];
      });
    } catch (err) {
      setError(err.message || 'Error al cargar Pokémon.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadPokemon(0); }, [loadPokemon]);

  const loadMore = useCallback(() => {
    if (loading || searching) return;
    const next = offset + LIMIT;
    setOffset(next);
    loadPokemon(next);
  }, [offset, loading, searching, loadPokemon]);

  const searchPokemon = useCallback(async (query) => {
    const clean = query.trim().toLowerCase();
    setSearchQuery(query);
    setSearchError(null);
    if (clean === '') { setSearchResults(null); return; }
    setSearching(true);
    try {
      const local = pokemonList.filter(
        (p) => p.name.includes(clean) || String(p.id) === clean
      );
      if (local.length > 0) {
        setSearchResults(local);
      } else {
        const remote = await fetchPokemonDetail(clean);
        setSearchResults([remote]);
      }
    } catch (err) {
      setSearchResults([]);
      setSearchError(err.message || 'No se pudo completar la búsqueda.');
    } finally {
      setSearching(false);
    }
  }, [pokemonList]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults(null);
    setSearchError(null);
  }, []);

  return {
    pokemonList: searchResults !== null ? searchResults : pokemonList,
    loading: loading || searching,
    error: error || searchError,
    isSearching: searchResults !== null,
    searchQuery,
    searchPokemon,
    clearSearch,
    loadMore,
    hasMore: searchResults === null,
  };
};
