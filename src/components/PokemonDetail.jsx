import React, { useState, useEffect } from 'react';

const PokemonDetail = ({ pokemon, onBack, isFavorite, onToggleFavorite, personalNote = '', onSaveNote }) => {
  const { id, name, image, types, stats, height, weight, baseExperience, abilities } = pokemon;
  const [note, setNote] = useState(personalNote);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => { setNote(personalNote); }, [personalNote]);

  const handleSave = () => {
    onSaveNote(id, note);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const translateStat = (s) => ({
    hp: 'PS', attack: 'Ataque', defense: 'Defensa',
    'special-attack': 'At. Esp.', 'special-defense': 'Def. Esp.', speed: 'Velocidad'
  }[s] || s);

  const getStatColor = (s) => ({
    hp: '#ef4444', attack: '#f97316', defense: '#eab308',
    'special-attack': '#3b82f6', 'special-defense': '#10b981', speed: '#ec4899'
  }[s] || 'var(--accent-primary)');

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={onBack}
        style={{ marginBottom: '1.5rem' }} aria-label="Volver">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver
      </button>

      <div className="detail-card">
        <section className="detail-visual" style={{ '--type-color': `var(--type-${types[0]})` }}>
          <img src={image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'}
            alt={`Imagen oficial de ${name}`} className="detail-visual-image" />
        </section>

        <section className="detail-info">
          <div className="detail-header">
            <div className="detail-name-row">
              <h1 className="detail-name">{name}</h1>
              <span className="detail-number">#{String(id).padStart(4, '0')}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {types.map((type) => (
                <span key={type} className={`type-badge type-${type}`}
                  style={{ '--type-color': `var(--type-${type})`, '--type-text': 'var(--type-text)' }}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="physicals">
            <div className="physical-item"><span className="physical-title">Altura</span><span className="physical-value">{height} m</span></div>
            <div className="physical-item"><span className="physical-title">Peso</span><span className="physical-value">{weight} kg</span></div>
            <div className="physical-item"><span className="physical-title">EXP Base</span><span className="physical-value">{baseExperience}</span></div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Habilidades</h2>
            <div className="abilities-container">
              {abilities.map((a) => <span key={a} className="ability-badge">{a.replace('-', ' ')}</span>)}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Estadísticas Base</h2>
            <div className="detail-stats-grid">
              {stats.map((stat) => (
                <div key={stat.name} className="stat-row">
                  <span className="stat-name">{translateStat(stat.name)}</span>
                  <span className="stat-val">{stat.value}</span>
                  <div className="stat-bar-container">
                    <div className="stat-bar-fill"
                      style={{ width: `${Math.min(100, (stat.value / 160) * 100)}%`, backgroundColor: getStatColor(stat.name) }}>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Favoritos</h2>
              <button type="button" className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
                onClick={() => { onToggleFavorite(pokemon); if (isFavorite) setNote(''); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                {isFavorite ? 'Eliminar Favorito' : 'Añadir Favorito'}
              </button>
            </div>

            {isFavorite ? (
              <div className="notes-section">
                <label htmlFor={`note-${id}`} style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Nota Personal:
                </label>
                <textarea id={`note-${id}`} className="notes-textarea" value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Notas de combate, naturaleza recomendada, estrategias...">
                </textarea>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button type="button" className="btn btn-primary"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={handleSave}>
                    Guardar nota
                  </button>
                  {saveSuccess && (
                    <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                      ✓ ¡Guardado!
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Añade este Pokémon a tus favoritos para escribir notas personalizadas.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PokemonDetail;
