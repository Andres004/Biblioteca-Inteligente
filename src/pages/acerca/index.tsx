import { Navbar } from '../../components/NavBar';

export default function Acerca() {
  return (
    <div>
      <Navbar />
      <div className="container page-content">
        <div className="about-page">
          <h1 className="section-title">Acerca de Biblioteca Inteligente</h1>

          <p className="about-page__intro">
            Este proyecto fue desarrollado como examen para demostrar la implementación de React y Next.js.
            La aplicación consume la API pública de Open Library para buscar libros, visualizar detalles
            y gestionar favoritos mediante almacenamiento local.
          </p>

          <div className="about-page__card">
            <h2>Equipo de Desarrollo</h2>
            <ul className="about-page__team-list">
              <li>Ricardo Andrade</li>
              <li>Mauricio Garron</li>
              <li>Nahuel Pairumani</li>
            </ul>
          </div>

          <div className="about-page__footer">
            <p>Universidad Católica Boliviana "San Pablo"</p>
            <p>Departamento de Ingeniería de Sistemas</p>
            <p>Docente: Ing. Mauricio Alejandro Quezada Bustillo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
