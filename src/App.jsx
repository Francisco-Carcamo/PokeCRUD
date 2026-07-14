import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { usePokemon } from './hooks/usePokemon';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';

function AppContent() {
  const pokemonHook = usePokemon();
  const [page, setPage] = useState({ name: 'home' });

  const goTo = (name, extra = {}) => {
    setPage({ name, ...extra });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('poke-favorites')) || []; } catch { return []; }
  });

  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('poke-notes')) || {}; } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem('poke-favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('poke-notes', JSON.stringify(notes)); }, [notes]);

  const handleToggleFavorite = (pokemon) => {
    const isFav = favorites.some((f) => f.id === pokemon.id);
    if (isFav) {
      setFavorites((prev) => prev.filter((f) => f.id !== pokemon.id));
      setNotes((prev) => { const n = { ...prev }; delete n[pokemon.id]; return n; });
    } else {
      setFavorites((prev) => [...prev, pokemon]);
    }
  };

  const handleSaveNote = (id, text) => setNotes((prev) => ({ ...prev, [id]: text }));

  const renderPage = () => {
    switch (page.name) {
      case 'home':
        return <Home pokemonHook={pokemonHook} onViewDetails={(id) => goTo('detail', { pokemonId: id, from: 'home' })}
          favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'detail':
        return <Detail pokemonId={page.pokemonId} onBack={() => goTo(page.from || 'home')}
          pokemonList={pokemonHook.pokemonList} favorites={favorites} onToggleFavorite={handleToggleFavorite}
          notes={notes} onSaveNote={handleSaveNote} />;
      case 'favorites':
        return <Favorites favorites={favorites} onRemoveFavorite={handleToggleFavorite}
          onViewDetails={(id) => goTo('detail', { pokemonId: id, from: 'favorites' })}
          notes={notes} onSaveNote={handleSaveNote} />;
      default:
        return null;
    }
  };

  return (
    <>
      <header className="navbar">
        <div className="app-container navbar-content">
          <button type="button" className="navbar-logo" onClick={() => goTo('home')} aria-label="Inicio PokeCRUD">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ color: 'var(--accent-primary)' }} aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <circle cx="12" cy="12" r="3" fill="var(--bg-secondary)" />
            </svg>
            <span>PokeCRUD</span>
          </button>
          <nav className="navbar-nav" aria-label="Navegación principal">
            <button type="button" className={`nav-link ${page.name === 'home' ? 'active' : ''}`}
              onClick={() => goTo('home')} aria-current={page.name === 'home' ? 'page' : undefined}>
              Inicio
            </button>
            <button type="button" className={`nav-link ${page.name === 'favorites' ? 'active' : ''}`}
              onClick={() => goTo('favorites')} aria-current={page.name === 'favorites' ? 'page' : undefined}>
              Favoritos
            </button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="main-content app-container">
        {renderPage()}
      </main>

      <footer className="footer">
        <div className="app-container">
          <p>PokeCRUD © 2026 — Datos de{' '}
            <a href="https://pokeapi.co/" className="footer-link" target="_blank" rel="noopener noreferrer">pokeapi.co</a>
          </p>
        </div>
      </footer>
    </>
  );
}

function App() {
  return <ThemeProvider><AppContent /></ThemeProvider>;
}

export default App;
