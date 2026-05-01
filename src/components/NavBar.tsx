import React, { useEffect, useState } from 'react';
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
        if (isDark) {
            document.body.classList.remove('dark');
            localStorage.setItem('modo_oscuro', 'no');
            setIsDark(false);
        } else {
            document.body.classList.add('dark');
            localStorage.setItem('modo_oscuro', 'si');
            setIsDark(true);
        }
    };

    return (
        <nav style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'var(--text-color)' }}>Inicio</Link>
                <Link href="/buscar" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>Buscar</Link>
                <Link href="/favoritos" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>Favoritos</Link>
                <Link href="/acerca" style={{ textDecoration: 'none', color: 'var(--text-color)' }}>Acerca de</Link>
            </div>
            <button className="btn" style={{ width: 'auto', margin: 0, padding: '5px 10px' }} onClick={toggleTheme}>
                {isDark ? 'Modo Claro' : 'Modo Oscuro'}
            </button>
        </nav>
    );
}