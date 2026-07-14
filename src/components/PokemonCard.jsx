import React from 'react';

const PokemonCard = ({ pokemon, onViewDetails, isFavorite, onToggleFavorite }) => {
  const { id, name, image, types } = pokemon;
  const formattedId = `#${String(id).padStart(4, '0')}`;

  return (
    <article className={`pokemon-card type-${types[0]}`} style={{ '--type-color': `var(--type-${types[0]})` }}>
      <div className="pokemon-card-id">
        <span>{formattedId}</span>
        <button
          type="button"
          className={`btn-favorite-toggle btn-icon-only ${isFavorite ? 'is-favorite' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(pokemon); }}
          aria-label={isFavorite ? `Eliminar ${name} de favoritos` : `Agregar ${name} a favoritos`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      <div className="pokemon-card-image-container">
        <div className="pokemon-card-image-bg" aria-hidden="true"></div>
        <img
          src={image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}
          alt={`Imagen oficial de ${name}`}
          className="pokemon-card-image"
          loading="lazy"
        />
      </div>

      <h3 className="pokemon-card-name">{name}</h3>

      <div className="pokemon-card-types">
        {types.map((type) => (
          <span key={type} className={`type-badge type-${type}`}
            style={{ '--type-color': `var(--type-${type})`, '--type-text': 'var(--type-text)' }}>
            {type}
          </span>
        ))}
      </div>

      <div className="pokemon-card-actions">
        <button type="button" className="btn btn-secondary" style={{ width: '100%' }}
          onClick={() => onViewDetails(id)}>
          Ver más
        </button>
      </div>
    </article>
  );
};

export default PokemonCard;
