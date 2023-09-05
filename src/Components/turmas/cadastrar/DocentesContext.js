import React, { createContext, useContext, useState } from 'react';

const DocentesContext = createContext();

export function useDocentes() {
  return useContext(DocentesContext);
}

export function DocentesProvider({ children }) {
  const [docentesSelecionados, setDocentesSelecionados] = useState([]);

  return (
    <DocentesContext.Provider value={{ docentesSelecionados, setDocentesSelecionados }}>
      {children}
    </DocentesContext.Provider>
  );
}
