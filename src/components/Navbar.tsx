import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar__logo">Biblioteca Inteligente</h1>

      <div className="navbar__links">
        <Link href="/">Inicio</Link>
        <Link href="/buscar">Buscar</Link>
        <Link href="/favoritos">Favoritos</Link>
        <Link href="/acerca">Acerca</Link>
      </div>
    </nav>
  );
}