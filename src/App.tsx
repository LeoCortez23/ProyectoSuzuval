
import './App.css'
import Login from './pages/auth/login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Document from './pages/documents/document';
import { SideMenuProvider } from './components/SideMenu/SideMenuContext'; // Importar el proveedor de contexto
import SideMenu from './components/SideMenu/SideMenu'; // Importar el componente que muestra el menú
import Home from './pages/home/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de Login no tiene el menú lateral visible */}
          <Route path="/" element={<Login />} />
          
          {/* Envuelves el SideMenuProvider solo para las rutas que lo necesiten */}
          <Route 
            path="/document" 
            element={
              <SideMenuProvider>
                <SideMenu />
                <Document />
              </SideMenuProvider>
            } 
          />
          <Route 
            path="/home" 
            element={
              <SideMenuProvider>
                <SideMenu />
                <Home />
              </SideMenuProvider>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App
