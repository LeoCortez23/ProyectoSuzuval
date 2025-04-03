import React, { useEffect, useState } from 'react';
import { useSideMenu } from './SideMenuContext'; // Usamos el contexto para controlar el estado del menú
import './SideMenu.css'; // Importa el archivo CSS para el menú

const SideMenu: React.FC = () => {
  const { menuVisible, showMenu, hideMenu } = useSideMenu();
  const [hovering, setHovering] = useState(false);

  // Detectar cuando el mouse se acerca al borde izquierdo de la pantalla
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientX < 50) { // Si el mouse está cerca del borde izquierdo
        showMenu();
      } else if (event.clientX > 250) { // Si el mouse está lejos del borde izquierdo
        hideMenu();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showMenu, hideMenu]);

  return (
    <div 
      className={`side-menu ${menuVisible ? 'show' : ''}`}
      onMouseEnter={() => setHovering(true)}  // Al entrar el mouse al área del menú
      onMouseLeave={() => setHovering(false)} // Al salir el mouse del área del menú
    >
      <h3>Menú</h3>
      <ul>
        <li><a href="/home">Inicio</a></li>
        <li><a href="/document">Generar Documento</a></li>
      </ul>
    </div>
  );
};

export default SideMenu;
