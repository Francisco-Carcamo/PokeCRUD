/**
 * Servicio PokeAPI - pokeApi.js
 * Capa de abstracción para peticiones HTTP a la API pública de Pokémon.
 */

const BASE_URL = 'https://pokeapi.co/api/v2';

const formatPokemonData = (data) => ({
  id: data.id,
  name: data.name,
  image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default || '',
  types: data.types.map((t) => t.type.name),
  stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  height: data.height / 10,
  weight: data.weight / 10,
  baseExperience: data.base_experience || 0,
  abilities: data.abilities.map((a) => a.ability.name),
});

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error(`Error en listado: ${response.statusText}`);
    const data = await response.json();
    const detailPromises = data.results.map(async (pokemon) => {
      try {
        const detailRes = await fetch(pokemon.url);
        if (!detailRes.ok) return null;
        return formatPokemonData(await detailRes.json());
      } catch {
        return null;
      }
    });
    const results = await Promise.all(detailPromises);
    return results.filter(Boolean);
  } catch (error) {
    console.error('Error en fetchPokemonList:', error);
    throw new Error('No se pudo conectar con PokeAPI. Verifica tu conexión a Internet.');
  }
};

export const fetchPokemonDetail = async (idOrName) => {
  if (!idOrName || String(idOrName).trim() === '') {
    throw new Error('Debes ingresar un nombre o número válido.');
  }
  const query = String(idOrName).toLowerCase().trim();
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${query}`);
    if (response.status === 404) {
      throw new Error(`No se encontró ningún Pokémon con "${idOrName}".`);
    }
    if (!response.ok) throw new Error(`Error en detalle: ${response.statusText}`);
    return formatPokemonData(await response.json());
  } catch (error) {
    console.error('Error en fetchPokemonDetail:', error);
    if (error.message.includes('No se encontró') || error.message.includes('Debes ingresar')) {
      throw error;
    }
    throw new Error('Error al buscar el Pokémon. Inténtalo de nuevo.');
  }
};
