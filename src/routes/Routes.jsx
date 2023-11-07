import React from "react";
import { Router, Route, Routes } from "react-router-dom"; // Corrigi as importações

import AuthProvider from "./provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Pilot from "../Components/pilot/Pilot";
import Login from "../Components/login/Login";
import Home from "../Components/home/Home";
import CadastrarProfessor from "../Components/professores/cadastrar/CadastrarProfessor";
import EditarProfessor from "../Components/professores/editar/EditarProfessor";
import ListarProfessores from "../Components/professores/listar/ListarProfessores";
import CadastrarTurma from "../Components/turmas/cadastrar/CadastrarTurma";
import TabelaHorarios from "../Components/turmas/cadastrar/TabelaHorarios";
import ListarTurmas from "../Components/turmas/listagem/ListarTurmas";
import ListarTurmasSemestre from "../Components/turmas/listagem/ListarTurmasSemestre";
import ListarTurmasProfessor from "../Components/turmas/listagem/ListarTurmasProfessor";
import ListarTurmasComponente from "../Components/turmas/listagem/ListarTurmasComponente";
import ListarTurmasConflito from "../Components/turmas/listagem/ListarTurmasConflito";
import DadosTurma from "../Components/turmas/dados/DadosTurma";
import CadComp from "../Components/componentes/cadastro/CadComp";
import ListarComponentes from "../Components/componentes/listar/ListarComponentes";
import Dados from "../Components/componentes/dados/Dados";
import EditarComponente from "../Components/componentes/editar/EditarComponente";

const Routes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Pilot />} />
          <Route path="/Login" element={<Login />} />

          {/* Rotas acessíveis a todos os usuários */}
          <Route path="*" element={<Pilot />} />

          {/* Rotas acessíveis apenas para usuários autenticados */}
          <Route
            path="/"
            element={<ProtectedRoute />}
          >
            <Route path="Home" element={<Home />} />

            {/* Rotas para professor */}
            <Route path="professores/cadastrarProfessor" element={<CadastrarProfessor />} />
            <Route path="professores/editarProfessor/:idProf" element={<EditarProfessor />} />
            <Route path="professores/listarProfessores" element={<ListarProfessores />} />

            {/* Rotas para turmas */}
            <Route path="turmas/cadastrarTurma" element={<CadastrarTurma />} />
            <Route path="turmas/cadastrarTurma/horarios/:codComp/:numTurma/:numVagas" element={<TabelaHorarios />} />
            <Route path="turmas/listarTurmas" element={<ListarTurmas />} />
            <Route path="turmas/listarTurmas/semestre" element={<ListarTurmasSemestre />} />
            <Route path="turmas/listarTurmas/professor" element={<ListarTurmasProfessor />} />
            <Route path="turmas/listarTurmas/componente" element={<ListarTurmasComponente />} />
            <Route path="turmas/listarTurmas/conflito" element={<ListarTurmasConflito />} />
            <Route path="turmas/verDadosTurma/:idTurma" element={<DadosTurma />} />

            {/* Rotas para componente curricular */}
            <Route path="componentes/cadastrarComponente" element={<CadComp />} />
            <Route path="componentes/listarComponentes" element={<ListarComponentes />} />
            <Route path="componentes/verDadosComponente/:idComp" element={<Dados />} />
            <Route path="componentes/editarComponente/:idComp" element={<EditarComponente />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Routes;
