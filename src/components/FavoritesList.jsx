import React, { useState } from 'react';

const FavoritesList = ({ favorites, onRemove, onViewDetails, notes, onSaveNote }) => {
  const [editingId, setEditingId] = useState(null);
  const [tempNote, setTempNote] = useState('');

  if (favorites.length === 0) {
    return (
      <div className="info-section">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--text-muted)' }} aria-hidden="true">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <h3>Tu Pokédex de Favoritos está vacía</h3>
        <p>Explora la lista y pulsa el corazón para guardar tus Pokémon aquí.</p>
      </div>
    );
  }

  return (
    <div className="favorites-grid">
      {favorites.map((pokemon) => {
        const { id, name, image, types } = pokemon;
        const currentNote = notes[id] || '';
        const isEditing = editingId === id;

        return (
          <article key={id} className="favorite-card">
            <div className="favorite-header">
              <img src={image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}
                alt={`Imagen de ${name}`} className="favorite-image" />
              <div className="favorite-meta">
                <span className="favorite-number">#{String(id).padStart(4, '0')}</span>
                <h3 className="favorite-name">{name}</h3>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                  {types.map((type) => (
                    <span key={type} className={`type-badge type-${type}`}
                      style={{ padding: '0.15rem 0.5rem', fontSize: '0.65rem',
                        '--type-color': `var(--type-${type})`, '--type-text': 'var(--type-text)' }}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="favorite-note-box">
              <div className="favorite-note-title">
                <span>Nota de Entrenador</span>
                {!isEditing && (
                  <button type="button" onClick={() => { setEditingId(id); setTempNote(currentNote); }}
                    style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}
                    aria-label={`Editar nota de ${name}`}>
                    Editar
                  </button>
                )}
              </div>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <textarea className="notes-textarea" value={tempNote}
                    onChange={(e) => setTempNote(e.target.value)} autoFocus
                    style={{ minHeight: '60px' }} aria-label={`Nota de ${name}`} />
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-secondary"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
                      onClick={() => setEditingId(null)}>Cancelar</button>
                    <button type="button" className="btn btn-primary"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
                      onClick={() => { onSaveNote(id, tempNote); setEditingId(null); }}>Guardar</button>
                  </div>
                </div>
              ) : (
                <p className="favorite-note-text">
                  {currentNote.trim() || 'Sin notas. ¡Pulsa Editar para escribir tus apuntes!'}
                </p>
              )}
            </div>

            <div className="favorite-actions">
              <button type="button" className="btn btn-secondary" onClick={() => onViewDetails(id)}>
                Ver ficha
              </button>
              <button type="button" className="btn btn-danger" onClick={() => onRemove(pokemon)}
                aria-label={`Eliminar ${name} de favoritos`}>
                Eliminar
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default FavoritesList;
