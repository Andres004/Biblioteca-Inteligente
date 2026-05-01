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
        <nav style={{ padding: '20px 0', marginBottom: '30px', borderBottom: '1px solid var(--border-color)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link href="/" className="nav-link">Inicio</Link>
                    <Link href="/buscar" className="nav-link">Buscar</Link>
                    <Link href="/favoritos" className="nav-link">Favoritos</Link>
                    <Link href="/acerca" className="nav-link">Acerca de</Link>
                </div>
                
                <div className="theme-toggle" onClick={toggleTheme}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    
                    <div className="toggle-thumb"></div>
                </div>
            </div>
        </nav>
    );
}