import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/login/Login';
import Pilot from './Components/pilot/Pilot';
import Home from './Components/home/Home';
import CadastrarProfessor from './Components/professores/cadastrar/CadastrarProfessor';
import ListarProfessores from './Components/professores/listar/ListarProfessores';
import CadastrarTurma from './Components/turmas/cadastrar/CadastrarTurma';
import CadComp from './Components/componentes/cadastro/CadComp';
import EditarProfessor from './Components/professores/editar/EditarProfessor';
import Dados from './Components/componentes/dados/Dados';
import EditarComponente from './Components/componentes/editar/EditarComponente';
import { DocentesProvider } from './Components/turmas/cadastrar/DocentesContext';
import ListarTurmas from './Components/turmas/listagem/ListarTurmas';
import ListarComponentes from './Components/componentes/listar/ListarComponentes';
import Teste from './Components/turmas/listagem/TabelaListagem';
import DadosTurma from './Components/turmas/dados/DadosTurma';
import TabelaHorarios from './Components/turmas/cadastrar/TabelaHorarios';
import ListarTurmasSemestre from './Components/turmas/listagem/ListarTurmasSemestre';
import ListarTurmasProfessor from './Components/turmas/listagem/ListarTurmasProfessor';
import ListarTurmasComponente from './Components/turmas/listagem/ListarTurmasComponente';
import ListarTurmasConflito from './Components/turmas/listagem/ListarTurmasConflito';
import { ProtectedRoute } from './routes/ProtectedRoute';
import EditarTurma from './Components/turmas/editar/EditarTurma';


function App() {
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
            <Route path='professores/editarProfessor/:idProf' element={<EditarProfessor />} />
            <Route path='professores/listarProfessores' element={<ListarProfessores />} />


            {/* Rotas para turmas */}
            <Route path='turmas/cadastrarTurma' element={<CadastrarTurma />} />
            <Route path='turmas/cadastrarTurma/horarios/:codComp/:numTurma/:numVagas' element={<TabelaHorarios />} />
            <Route path='turmas/listarTurmas' element={<ListarTurmas />} />
            <Route path='turmas/listarTurmas/semestre' element={<ListarTurmasSemestre />} />
            <Route path='turmas/listarTurmas/professor' element={<ListarTurmasProfessor />} />
            <Route path='turmas/listarTurmas/componente' element={<ListarTurmasComponente />} />
            <Route path='turmas/listarTurmas/conflito' element={<ListarTurmasConflito />} />
            <Route path='turmas/verDadosTurma/:idTurma' element={<DadosTurma />} />
            <Route path='turmas/EditarTurma/:idTurma' element={<EditarTurma />} />

            {/* Rotas para componente curricular */}
            <Route path='componentes/cadastrarComponente' element={<CadComp />} />
            <Route path='/componentes/listarComponentes' element={<ListarComponentes />} />
            <Route path='/componentes/verDadosComponente/:idComp' element={<Dados />} />
            <Route path='/componentes/editarComponente/:idComp' element={<EditarComponente />} />

            {/* Página teste */}
            <Route path='/teste' element={<Teste />} />
          </Route>
        </Routes>
      </Router>
    </DocentesProvider>
  );
}

export default App;