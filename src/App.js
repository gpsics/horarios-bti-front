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
// import { useState } from 'react';
// import ListarComponentes from './Components/componentes/listar/ListarComp';
import Dados from './Components/componentes/dados/Dados';
import EditarComponente from './Components/componentes/editar/EditarComponente';
import { DocentesProvider } from './Components/turmas/cadastrar/DocentesContext';
import ListarTurmas from './Components/turmas/listagem/ListarTurmas';
import ListarComponentes from './Components/componentes/listar/ListarComponentes';
import Teste from './Components/turmas/listagem/Teste';
import DadosTurma from './Components/turmas/dados/DadosTurma';


function App() {
  // Funções destinadas para professor
  // const [professorSelecionado, setProfessorSelecionado] = useState(null);
  // const profEdit = (item) => {
  //   setProfessorSelecionado(item);
  // };

  // Funções destinadas para componentes curriculares
  // const [compSelecionado, setCompSelecionado] = useState(null)
  // const compVerDados = (item) => {
  //   setCompSelecionado(item)
  // }

  // const [componenteEditar, setComponenteEditar] = useState(null)
  // const compEdit = (item) => {
  //   setComponenteEditar(item)
  // }

  // //Funcoes destinadas para turmas
  // const [turmaSelecionada, setTurmaSelecionada] = useState(null)
  // const turVerDados = (item) => {
  //   setTurmaSelecionada(item)
  // }

  // const [turmaEditar, setTurmaEditar] = useState(null)
  // const turmaEdit = (item) => {
  //   setComponenteEditar(item)
  // }

  return (
    <DocentesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Pilot />} />
          <Route path='/Login' element={<Login />} />
          <Route path='*' element={<Pilot />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path='Home' element={<Home />} />
            {/* Rotas para professor */}
            <Route path='professores/cadastrarProfessor' element={<CadastrarProfessor />} />
            <Route path='professores/editarProfessor/:idProf' element={<EditarProfessor  />} />
            <Route path='professores/listarProfessores' element={<ListarProfessores  />} />
            {/* Rotas para turmas */}

            <Route path='turmas/cadastrarTurma' element={<CadastrarTurma />} />
            <Route path='turmas/listarTurmas' element={<ListarTurmas />}/>
            <Route path='turmas/verDadosTurma/:idTurma' element={<DadosTurma  /> } />

            {/* <Route path='turmas/listarTurmas' element={<ListarTurmas turmaEdit={turmaEdit} turVerDados={turVerDados}/>}/>
            <Route path='turmas/verDadosTurma/:idTurma' element={<DadosTurma turmaEdit={turmaEdit} turma={turmaSelecionada} /> } /> */}

            {/* Rotas para componente curricular */}
            <Route path='componentes/cadastrarComponente' element={<CadComp />} />
            <Route path='/componentes/listarComponentes' element={<ListarComponentes  />} />
            <Route path='/componentes/verDadosComponente/:idComp' element={<Dados  />} />
            <Route path='/componentes/editarComponente/:idComp' element={<EditarComponente />} />


            {/* <Route path='/componentes/listarComponentes' element={<ListarComponentes compEdit={compEdit} compVerDados={compVerDados} />} />
            <Route path='/componentes/verDadosComponente/:idComp' element={<Dados compEdit={compEdit} componente={compSelecionado} />} />
            <Route path='/componentes/editarComponente/:idComp' element={<EditarComponente componente={componenteEditar} />} /> */}

            {/* Página teste */}
            <Route path='/teste' element={<Teste/>} />
          </Route>
        </Routes>
      </Router>
    </DocentesProvider>
  );
}

export default App;