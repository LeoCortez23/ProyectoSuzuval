import React from 'react';
import './Home.css'; // Asegúrate de importar el archivo CSS
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/document'); // Redirige a la página '/document'
      };
  return (
    <div className="home-container">
      <header className="home-header">
        Suzuval
      </header>
      
      <div className="home-content">
        <div className="content-container">
          <h2>Bienvenido</h2>
          <p>
            Aquí podrás generar un certificado de operatividad
          </p>
          
          <button onClick={handleButtonClick}>
          
          Generar Certificado
          </button>
        </div>
      </div>
      
      <footer className="home-footer">
        © 2025 Suzuval - Todos los derechos reservados
      </footer>
    </div>
  );
}

export default Home;
