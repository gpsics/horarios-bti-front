// DocentesContext.js
import React, { createContext, useContext, useState } from 'react';

const DocentesContext = createContext();

export function useDocentes() {
  return useContext(DocentesContext);
}

export function DocentesProvider({ children }) {
  const [docentesSelecionados, setDocentesSelecionados] = useState([]);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  return (
    <DocentesContext.Provider value={{ docentesSelecionados, setDocentesSelecionados, professorSelecionado, setProfessorSelecionado }}>
      {children}
    </DocentesContext.Provider>
  );
}
