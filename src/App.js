import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login/Login';
import Pilot from './Components/pilot/Pilot';
import Home from './Components/home/Home';
import CadastrarProfessor from './Components/professores/cadastrar/CadastrarProfessor';
import ListarProfessores from './Components/professores/listar/ListarProfessores';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';

function App() {
  const [profCadastrados, setProfCadastrados] = useState([]);

  const adicionarProf = (prof) => {
      setProfCadastrados([...profCadastrados, prof]);
  };
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Pilot />} />
        <Route path='/Login' element={<Login />} />
        <Route path='*' element={<Pilot />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path='Home' element={<Home />} />
          <Route path='professores/cadastrarProfessor' element={<CadastrarProfessor adicionarProf={adicionarProf}/>} />
          <Route path='professores/listarProfessores' element={<ListarProfessores profs={profCadastrados}/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
