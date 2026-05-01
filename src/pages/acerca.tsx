import { Navbar } from '../components/NavBar';

export default function Acerca() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px', color: 'var(--text-color)' }}>
          Acerca de Biblioteca Inteligente
        </h1>
        
        <p style={{ marginBottom: '40px', lineHeight: '1.6', color: 'var(--text-muted)', fontSize: '18px' }}>
          Este proyecto fue desarrollado como examen para demostrar la implementacion de React y Next.js.
          La aplicacion consume la API publica de Open Library para buscar libros, visualizar detalles y gestionar favoritos mediante almacenamiento local.
        </p>
        
        <div style={{ backgroundColor: 'var(--card-bg)', padding: '30px', border: '1px solid var(--border-color)', borderRadius: '8px', marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--text-color)', fontSize: '20px' }}>
            Equipo de Desarrollo
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '16px' }}>
              Ricardo Andrade
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '16px' }}>
              Mauricio Garrón
            </li>
            <li style={{ padding: '10px 0', color: 'var(--text-color)', fontSize: '16px' }}>
              Nahuel Pairumani
            </li>
          </ul>
        </div>
          
        <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: '20px' }}>
          <p style={{ margin: '5px 0', fontWeight: 'bold', color: 'var(--text-color)' }}>
            Universidad Catolica Boliviana "San Pablo"
          </p>
          <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
            Departamento de Ingenieria de Sistemas
          </p>
          <p style={{ margin: '5px 0', color: 'var(--text-muted)' }}>
            Docente: Ing. Mauricio Alejandro Quezada Bustillo
          </p>
        </div>
      </div>
    </div>
  );
}