import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login/Login';
import Pilot from './Components/pilot/Pilot';
import Home from './Components/home/Home';
import CadastrarProfessor from './Components/professores/cadastrar/CadastrarProfessor';
import ListarProfessores from './Components/professores/listar/ListarProfessores';
import ProtectedRoute from './ProtectedRoute';
import CadastrarTurma from './Components/turmas/cadastrar/CadastrarTurma';
import CadComp from './Components/componentes/cadastro/CadComp';
import EditarProfessor from './Components/professores/editar/EditarProfessor';
import { useState } from 'react';
import ListarComponentes from './Components/componentes/listar/ListarComp';


function App() {
  const [professorSelecionado, setProfessorSelecionado] = useState([]);

  const profEdit = (item) => {
    setProfessorSelecionado([...professorSelecionado, item]);
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Pilot />} />
        <Route path='/Login' element={<Login />} />
        <Route path='*' element={<Pilot />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path='Home' element={<Home />} />
          <Route path='professores/cadastrarProfessor' element={<CadastrarProfessor/>} />
          <Route path='professores/editarProfessor' element={<EditarProfessor professor={professorSelecionado}/>} />
          <Route path='professores/listarProfessores' element={<ListarProfessores profEdit={profEdit}/>} />


          <Route path='turmas/cadastrarTurma' element={<CadastrarTurma/>} />

          <Route path='componentes/cadastrarComponente' element={<CadComp/>} />
          <Route path='/componentes/listarComponentes' element={<ListarComponentes/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
