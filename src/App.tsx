import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/navbar'; // Importa el Navbar
import Home from './pages/home/home';
import Document from './pages/documents/document';
import Login from './pages/auth/login';

function App() {
  return (
    <Router>
      <div className="App">
      <NavbarWrapper /> {/* Condicional para mostrar el Navbar */}
        
        {/* Definimos las rutas */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Página de login */}
          <Route path="/home" element={<Home />} /> {/* Página Home */}
          <Route path="/document" element={<Document />} /> {/* Página Document */}
        </Routes>
      </div>
    </Router>
  );
  function NavbarWrapper() {
    const location = useLocation();
    // Verificamos si estamos en la página de login
    if (location.pathname === '/') {
      return null; // No mostrar el Navbar en la página de login
    }
    
    return <Navbar />; // Mostrar el Navbar en otras páginas
  }
}

export default App;
