// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Asegúrate de tener el archivo de estilos adecuado

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">Suzuval</Link>
        <ul className="navbar-menu">
          <li><Link to="/document">Generar Certificado</Link></li>
          <li><Link to="/about">Acerca de</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
