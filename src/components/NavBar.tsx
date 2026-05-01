import React from 'react';
import Link from 'next/link';

export function Navbar() {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
            <Link href="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
            <Link href="/buscar" style={{ textDecoration: 'none' }}>Buscar</Link>
            <Link href="/favoritos" style={{ textDecoration: 'none' }}>Favoritos</Link>
            <Link href="/acerca" style={{ textDecoration: 'none' }}>Acerca de</Link>
        </nav>
    );
}
