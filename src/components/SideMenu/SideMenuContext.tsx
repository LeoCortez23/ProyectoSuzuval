import { createContext, useContext, useState, ReactNode } from 'react';

// Crear el contexto
const SideMenuContext = createContext({
  menuVisible: false,
  showMenu: () => {},
  hideMenu: () => {},
});

// Definir el tipo para los props del proveedor (debemos incluir `children` como ReactNode)
interface SideMenuProviderProps {
  children: ReactNode;
}

// El componente que provee el contexto
export const SideMenuProvider: React.FC<SideMenuProviderProps> = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const showMenu = () => {
    setMenuVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };

  return (
    <SideMenuContext.Provider value={{ menuVisible, showMenu, hideMenu }}>
      {children}
    </SideMenuContext.Provider>
  );
};

// Crear el hook para consumir el contexto
export const useSideMenu = () => {
  return useContext(SideMenuContext);
};
