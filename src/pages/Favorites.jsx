import React from 'react';
import FavoritesList from '../components/FavoritesList';

const Favorites = ({ favorites, onRemoveFavorite, onViewDetails, notes, onSaveNote }) => (
  <section aria-labelledby="favorites-title">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <h1 id="favorites-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Tus Favoritos</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Gestiona tus notas de combate personalizadas.
        </p>
      </div>
      <div style={{ backgroundColor: 'var(--accent-primary)', color: '#fff', padding: '0.4rem 1rem',
        borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.9rem' }}>
        {favorites.length} Pokémon
      </div>
    </div>
    <FavoritesList favorites={favorites} onRemove={onRemoveFavorite} onViewDetails={onViewDetails}
      notes={notes} onSaveNote={onSaveNote} />
  </section>
);

export default Favorites;
