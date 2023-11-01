import React, { createContext, useContext, useState, useMemo } from 'react';

const DocentesContext = createContext();

export function useDocentes() {
  return useContext(DocentesContext);
}

export function DocentesProvider({ children }) {
  const [docentesSelecionados, setDocentesSelecionados] = useState([]);

  const contextValue = useMemo(() => ({
    docentesSelecionados,
    setDocentesSelecionados,
  }), [docentesSelecionados]);

  return (
    <DocentesContext.Provider value={contextValue}>
      {children}
    </DocentesContext.Provider>
  );
}
