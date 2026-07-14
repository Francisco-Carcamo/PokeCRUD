import React from 'react';

const Spinner = ({ message = 'Cargando Pokémon...' }) => (
  <div className="spinner-container" role="status" aria-live="polite" aria-busy="true">
    <span className="spinner" aria-hidden="true"></span>
    <p style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{message}</p>
  </div>
);

export default Spinner;
