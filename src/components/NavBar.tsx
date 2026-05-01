import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('modo_oscuro');
    if (saved === 'si') {
      setIsDark(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.body.classList.toggle('dark', nextDark);
    localStorage.setItem('modo_oscuro', nextDark ? 'si' : 'no');
  };

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <div className="navbar__links">
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/buscar" className="nav-link">Buscar</Link>
          <Link href="/favoritos" className="nav-link">Favoritos</Link>
          <Link href="/acerca" className="nav-link">Acerca de</Link>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          <img src="/icons/sun.png" alt="Modo claro" width={14} height={14} />
          <img src="/icons/moon.png" alt="Modo oscuro" width={14} height={14} />
          <div className="toggle-thumb" />
        </button>
      </div>
    </nav>
  );
}